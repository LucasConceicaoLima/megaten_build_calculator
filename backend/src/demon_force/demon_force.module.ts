import { Module } from '@nestjs/common';
import { DemonForceController } from './demon_force.controller';
import { DemonForceService } from './demon_force.service'

@Module({
  controllers: [DemonForceController],
  providers: [DemonForceService],
})
export class DemonForceModule {}