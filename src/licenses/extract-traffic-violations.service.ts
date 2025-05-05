import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';

interface ResolutionPlace {
  name: string;
  address?: string;
}

interface TrafficViolation {
  licensePlate?: string;
  plateColor?: string;
  vehicleType?: string;
  violationTime?: string;
  violationLocation?: string;
  violationBehavior?: string;
  status?: string;
  detectionUnit?: string;
  resolutionPlaces?: ResolutionPlace[];
}

@Injectable()
export class ExtractTrafficViolationsService {
  private readonly logger = new Logger(ExtractTrafficViolationsService.name);

  extractTrafficViolations(html: string): TrafficViolation[] {
    if (!html || typeof html !== 'string') {
      this.logger.error('Invalid or empty HTML provided');
      throw new HttpException('Invalid HTML content', HttpStatus.BAD_REQUEST);
    }

    const $ = cheerio.load(html);
    const violations: TrafficViolation[] = [];
    let currentViolation: TrafficViolation = {};
    let resolutionPlaces: ResolutionPlace[] = [];

    const formGroups = $('.form-group');
    if (formGroups.length === 0) {
      this.logger.warn('No violation records found in HTML');
      return [];
    }

    formGroups.each((index, element) => {
      const $element = $(element);
      const isRecordBoundary = $element.next().is('hr') || $element.prev().is('hr');

      if (isRecordBoundary && Object.keys(currentViolation).length > 0) {
        currentViolation.resolutionPlaces = resolutionPlaces;
        violations.push(currentViolation);
        currentViolation = {};
        resolutionPlaces = [];
      }

      const label = $element.find('label span').text().trim();
      const value = $element.find('.col-md-9').text().trim();

      if (label && value) {
        switch (label) {
          case 'Biển kiểm soát:':
            currentViolation.licensePlate = value;
            break;
          case 'Màu biển:':
            currentViolation.plateColor = value;
            break;
          case 'Loại phương tiện:':
            currentViolation.vehicleType = value;
            break;
          case 'Thời gian vi phạm:':
            currentViolation.violationTime = value;
            break;
          case 'Địa điểm vi phạm:':
            currentViolation.violationLocation = value;
            break;
          case 'Hành vi vi phạm:':
            currentViolation.violationBehavior = value;
            break;
          case 'Trạng thái:':
            currentViolation.status = value;
            break;
          case 'Đơn vị phát hiện vi phạm:':
            currentViolation.detectionUnit = value;
            break;
          default:
            this.logger.warn(`Unknown label encountered: ${label}`);
            break;
        }
      }

      const text = $element.text().trim();
      if (/^[1-2]\./.test(text)) {
        resolutionPlaces.push({ name: text });
      } else if (text.startsWith('Địa chỉ:')) {
        if (resolutionPlaces.length > 0) {
          resolutionPlaces[resolutionPlaces.length - 1].address = text
            .replace('Địa chỉ:', '')
            .trim();
        } else {
          this.logger.warn('Address found without preceding resolution place');
        }
      }
    });

    if (Object.keys(currentViolation).length > 0) {
      currentViolation.resolutionPlaces = resolutionPlaces;
      violations.push(currentViolation);
    }

    if (violations.length === 0) {
      this.logger.warn('No valid violation records extracted');
    } else {
      this.logger.log(`Extracted ${violations.length} violation records`);
    }

    return violations;
  }
}