import { Controller, Get } from '@nestjs/common';
import { DemonForceService } from './demon_force.service';

@Controller('demon-force')
export class DemonForceController {
  constructor(private readonly demonForceService: DemonForceService) {}

  @Get()
  async getAllDemonForce() {
    return this.demonForceService.getAllDemonForce();
  }
}
