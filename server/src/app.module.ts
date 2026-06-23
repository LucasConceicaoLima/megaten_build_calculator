import { Module } from '@nestjs/common';
import { WeaponsModule } from './weapon/weapon.module';
import { TarotModule } from './tarot/tarot.module';
import { SoulStoneModule } from './soul_stone/soul_stone.module';
import { DemonForceModule } from './demon_force/demon_force.module';
import { EpitaphModule } from './epitaph/epitaph.module';
import { DemonSkillsModule } from './demon_skills/demon_skills.module';

@Module({
  imports: [WeaponsModule, TarotModule, SoulStoneModule, DemonForceModule, EpitaphModule, DemonSkillsModule],
})
export class AppModule {}
