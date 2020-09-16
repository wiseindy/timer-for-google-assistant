import { Module, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
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
  controllers: [TriggerController],
  providers: [TriggerService, DeviceService],
})
export class AppModule { }
