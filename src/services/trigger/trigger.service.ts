import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeviceService } from '../device/device.service';
import { Device } from 'src/models';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TriggerService {

  private key: string;
  private offEvent: string;
  private onEvent: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly deviceService: DeviceService,
  ) {
    this.key = this.configService.get<string>('IFTTT_EVENT_KEY');
    this.offEvent = this.configService.get<string>('IFTTT_EVENT_OFF_SUFFIX') || '_off';
    this.onEvent = this.configService.get<string>('IFTTT_EVENT_ON_SUFFIX') || '_on';
  }

  public trigger(deviceName: string, durationInMinutes: number) {
    const timestamp = new Date();
    const device: Device = {
      name: deviceName,
      added: timestamp,
      expiry: new Date(timestamp.getTime() + durationInMinutes * 60000),
    }
    this.deviceService.add(device)
    this.iftttTrigger(`${device.name}${this.onEvent}`)
  }

  private async iftttTrigger(eventName: string) {
    return await this.httpService.get(`https://maker.ifttt.com/trigger/${eventName}/with/key/${this.key}`).toPromise();
  }

  private checkTime(device: Device): boolean {
    if (device) {
      const now = new Date();
      if ((device.expiry.getTime() - now.getTime()) <= 0) {
        this.deviceService.remove(device);
        this.iftttTrigger(`${device.name}${this.offEvent}`);
      }
    }
    return false;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  protected handleCron() {
    for (const device of this.deviceService.get()) {
      this.checkTime(device);
    }
  }
}
