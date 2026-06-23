import { Controller, Get } from '@nestjs/common';
import { DemonSkillsService } from './demon_skills.service';

@Controller('demon-skills')
export class DemonSkillsController {
  constructor(private readonly demonSkillsService: DemonSkillsService) {}

  @Get()
  async getAllDemonSkills() {
    return this.demonSkillsService.getAllDemonSkills();
  }
}
