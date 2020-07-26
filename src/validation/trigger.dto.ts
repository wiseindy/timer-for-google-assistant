import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class TriggerDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  @IsNumberString()
  duration: number;
}