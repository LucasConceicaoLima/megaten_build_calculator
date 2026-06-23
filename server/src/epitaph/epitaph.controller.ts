import { Controller, Get } from '@nestjs/common';
import { EpitaphService } from '../epitaph/epitaph.service';

@Controller('epitaph')
export class EpitaphController {
  constructor(private readonly epitaphService: EpitaphService) {}

  @Get()
  async getAllEpitaph() {
    return this.epitaphService.getAllEpitaph();
  }
}
