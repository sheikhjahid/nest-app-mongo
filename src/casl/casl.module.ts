import { Module } from '@nestjs/common';
import { RoleModule } from 'src/role/role.module';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';

@Module({
  imports: [RoleModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
