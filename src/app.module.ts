import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { EmailModule } from './email/email.module';
import configuration from '@config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@atlascluster.ercyohu.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
        console.log('MongoDB Connection URI:', uri);
        return { uri };
      },
    }),
    RedisModule,
    AuthModule,
    UsersModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('AppModule constructor executed');
  }
}
