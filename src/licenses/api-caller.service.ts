import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as Tesseract from 'tesseract.js';
import * as qs from 'qs';
import * as tough from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import { ExtractTrafficViolationsService } from './extract-traffic-violations.service'; // Adjust path as needed

const CONFIG = {
  BASE_URL: 'https://www.csgt.vn',
  CAPTCHA_PATH: '/lib/captcha/captcha.class.php',
  FORM_ENDPOINT: '/?mod=contact&task=tracuu_post&ajax',
  RESULTS_URL: 'https://www.csgt.vn/tra-cuu-phuong-tien-vi-pham.html',
  MAX_RETRIES: 5,
  HEADERS: {
    USER_AGENT:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    ACCEPT:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    CONTENT_TYPE: 'application/x-www-form-urlencoded',
  },
};

@Injectable()
export class ApiCallerService {
  private readonly logger = new Logger(ApiCallerService.name);

  private createAxiosInstance(): AxiosInstance {
    const jar = new tough.CookieJar();
    const instance = wrapper(
      axios.create({
        baseURL: CONFIG.BASE_URL,
        withCredentials: true,
        headers: {
          'User-Agent': CONFIG.HEADERS.USER_AGENT,
          Accept: CONFIG.HEADERS.ACCEPT,
        },
        jar,
      })
    );
    return instance;
  }

  private async getCaptcha(instance: AxiosInstance): Promise<string> {
    try {
      const response = await instance.get(CONFIG.CAPTCHA_PATH, {
        responseType: 'arraybuffer',
      });
      const captchaResult = await Tesseract.recognize(Buffer.from(response.data));
      return captchaResult.data.text.trim();
    } catch (error) {
      this.logger.error(`Failed to process captcha: ${error.message}`);
      throw new HttpException(
        'Failed to process captcha',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async postFormData(
    instance: AxiosInstance,
    plate: string,
    captcha: string,
  ): Promise<any> {
    const formData = qs.stringify({
      BienKS: plate,
      Xe: '1',
      captcha,
      ipClient: '9.9.9.91',
      cUrl: '1',
    });

    try {
      return await instance.post(CONFIG.FORM_ENDPOINT, formData, {
        headers: {
          'Content-Type': CONFIG.HEADERS.CONTENT_TYPE,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to submit form: ${error.message}`);
      throw new HttpException(
        'Failed to submit form',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getViolationResults(
    instance: AxiosInstance,
    plate: string,
  ): Promise<any> {
    try {
      return await instance.get(
        `${CONFIG.RESULTS_URL}?&LoaiXe=1&BienKiemSoat=${plate}`,
      );
    } catch (error) {
      this.logger.error(`Failed to fetch results: ${error.message}`);
      throw new HttpException(
        'Failed to fetch results',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async callAPI(plate: string, retries: number = CONFIG.MAX_RETRIES): Promise<any> {
    if (!plate) {
      throw new HttpException(
        'License plate is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.logger.log(`Fetching traffic violations for plate: ${plate}`);
    const instance = this.createAxiosInstance();

    try {
      const captcha = await this.getCaptcha(instance);
      const response = await this.postFormData(instance, plate, captcha);

      if (response.data === 404) {
        if (retries > 0) {
          this.logger.warn(
            `Captcha verification failed. Retrying (${CONFIG.MAX_RETRIES - retries + 1}/${CONFIG.MAX_RETRIES})`,
          );
          return this.callAPI(plate, retries - 1);
        } else {
          this.logger.error('Maximum retry attempts reached for captcha.');
          throw new HttpException(
            'Could not verify captcha after maximum retries',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const resultsResponse = await this.getViolationResults(instance, plate);
      const violations = new ExtractTrafficViolationsService().extractTrafficViolations(resultsResponse.data);

      return violations || [];
    } catch (error) {
      this.logger.error(`Error fetching violations for plate ${plate}: ${error.message}`);
      throw new HttpException(
        error.message,
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}