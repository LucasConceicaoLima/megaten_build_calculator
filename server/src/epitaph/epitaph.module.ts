import { Module } from '@nestjs/common';
import { EpitaphController } from './epitaph.controller';
import { EpitaphService } from './epitaph.service'

@Module({
  controllers: [EpitaphController],
  providers: [EpitaphService],
})

export class EpitaphModule {}