import { Controller, Get } from '@nestjs/common';
import { SoulStoneService } from './soul_stone.service';

@Controller('soul-stones')
export class SoulStoneController {
  constructor(private readonly soulStoneService: SoulStoneService) {}

  @Get()
  async getAllSoulStones() {
    return this.soulStoneService.getAllSoulStones();
  }
}
