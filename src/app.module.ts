import { Module, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TriggerController } from './controllers/trigger';
import { ConfigModule } from '@nestjs/config';
import { TriggerService } from './services/trigger';
import { DeviceService } from './services/device/device.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController, TriggerController],
  providers: [AppService, TriggerService, DeviceService],
})
export class AppModule { }
