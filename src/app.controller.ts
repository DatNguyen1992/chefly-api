import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  testConnection() {
    try {
      const isConnected = this.connection.readyState === 1;
      if (isConnected) {
        return {
          status: 'success',
          message: 'Successfully connected to MongoDB Atlas',
          connectionState: this.connection.readyState,
        };
      } else {
        return {
          status: 'error',
          message: 'Failed to connect to MongoDB Atlas',
          connectionState: this.connection.readyState,
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: 'Error connecting to MongoDB Atlas',
        error: error.message,
      };
    }
  }

  @Get('/test')
  getHome() {
    return { message: 'API is running!' };
  }
}
