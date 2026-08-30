import { Module } from '@nestjs/common';
import { TarotService } from './tarot.service';
import { TarotController } from './tarot.controller';

@Module({
  controllers: [TarotController],
  providers: [TarotService],
})
export class TarotModule {}