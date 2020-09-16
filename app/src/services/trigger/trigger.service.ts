import { Injectable, HttpService, HttpException } from '@nestjs/common';
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

  public trigger(deviceName: string, durationInMinutes: number, targetState: boolean) {
    const timestamp = new Date();
    const device: Device = {
      name: deviceName,
      added: timestamp,
      targetState,
      expiry: new Date(timestamp.getTime() + durationInMinutes * 60000),
    }
    this.deviceService.add(device);
    let eventType = this.onEvent;
    // If targetState is to turn the device ON (true), set current state to OFF
    if (targetState) {
      eventType = this.offEvent;
    }
    return this.iftttTrigger(`${device.name}${eventType}`)
  }

  private async iftttTrigger(eventName: string) {
    return await this.httpService.get(`https://maker.ifttt.com/trigger/${eventName}/with/key/${this.key}`).toPromise()
      .catch(e => {
        throw new HttpException(`Unable to communicate with IFTTT: ${e.response.statusText}`, e.response.status)
      });
  }

  private checkTime(device: Device): boolean {
    if (device) {
      const now = new Date();
      if ((device.expiry.getTime() - now.getTime()) <= 0) {
        this.deviceService.remove(device);
        let eventType = this.onEvent;
        if (!device.targetState) {
          eventType = this.offEvent;
        }
        this.iftttTrigger(`${device.name}${eventType}`);
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
