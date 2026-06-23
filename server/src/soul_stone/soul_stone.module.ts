import { Module } from '@nestjs/common';
import { SoulStoneService } from './soul_stone.service';
import { SoulStoneController } from './soul_stone.controller';

@Module({
  controllers: [SoulStoneController],
  providers: [SoulStoneService],
})
export class SoulStoneModule {}