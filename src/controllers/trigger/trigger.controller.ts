import { Controller, Post, Body } from '@nestjs/common';
import { TriggerDto } from 'src/validation';

@Controller('trigger')
export class TriggerController {

  @Post()
  trigger(@Body() body: TriggerDto) {
    return true;
  }

}
