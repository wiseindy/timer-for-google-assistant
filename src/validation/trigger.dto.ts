import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class TriggerDto {

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  deviceName: string;

  @IsNumberString()
  @IsNotEmpty()
  durationInSeconds: number;
}