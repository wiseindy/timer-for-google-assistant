import { Controller, Post, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { TriggerDto } from 'src/validation';
import { ConfigService } from '@nestjs/config';
import { TriggerService } from 'src/services/trigger';

@Controller('trigger')
export class TriggerController {

  constructor(
    private readonly configService: ConfigService,
    private readonly triggerService: TriggerService,
  ) { }

  @Post()
  async trigger(@Body() body: TriggerDto) {
    this.validateKey(body.key);
    const triggerResult = await this.triggerService.trigger(body.deviceName, body.durationInMinutes, body.targetState);
    if (triggerResult) {
      if (triggerResult.data) {
        return {
          success: true,
          message: triggerResult.data
        }
      }
    }
    throw new InternalServerErrorException('Unable to create trigger')
  }

  private validateKey(key: string) {
    if (key !== this.configService.get<string>('SECURITY_KEY')) {
      throw new BadRequestException();
    }
  }

}
