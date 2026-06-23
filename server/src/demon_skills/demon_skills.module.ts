import { Module } from '@nestjs/common';
import { DemonSkillsService } from './demon_skills.service';
import { DemonSkillsController } from './demon_skills.controller';

@Module({
  controllers: [DemonSkillsController],
  providers: [DemonSkillsService],
})

export class DemonSkillsModule {}