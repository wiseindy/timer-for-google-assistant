import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  targetState? = false;
}