import { Controller, Get } from '@nestjs/common';
import { WeaponService } from './weapon.service';

@Controller('weapons')
export class WeaponController {
  constructor(private readonly weaponsService: WeaponService) {}

  @Get()
  async getAllWeapons() {
    return this.weaponsService.getAllWeapons();
  }
}
