import { Controller, Get } from '@nestjs/common';
import { TarotService } from './tarot.service';

@Controller('tarots')
export class TarotController {
  constructor(private readonly tarotService: TarotService) {}

  @Get()
  async getAllTarots() {
    return this.tarotService.getAllTarots();
  }
}
