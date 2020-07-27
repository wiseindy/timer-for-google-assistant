import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TriggerDto {

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  deviceName: string;

  @IsNumber()
  @IsNotEmpty()
  durationInMinutes: number;
}