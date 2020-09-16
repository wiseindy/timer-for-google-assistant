import { Injectable } from '@nestjs/common';
import { Device } from 'src/models';

@Injectable()
export class DeviceService {

  private devices: Array<Device> = [];

  public add(device: Device) {
    this.remove(device);
    this.devices.push(device);
  }

  public get(): Array<Device> {
    return this.devices;
  }

  public remove(device: Device) {
    this.devices.splice(this.devices.findIndex(d => d.name === device.name));
  }

}
