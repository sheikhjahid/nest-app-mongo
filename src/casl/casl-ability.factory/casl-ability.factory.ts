import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Report } from 'src/report/schemas/report.schema';
import { User } from 'src/user/schemas/user.schema';
import { RoleService } from 'src/role/role.service';
import { Injectable } from '@nestjs/common';

type Subjects = InferSubjects<typeof Report | typeof User> | 'all';

export type AppAbility = Ability;

@Injectable()
export class CaslAbilityFactory {
  constructor(private roleService: RoleService) {}

  async createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    const role = await this.roleService.find({ name: user.role.name });

    if (role && role[0]?.permission.length > 0) {
      const permissionArr = role[0].permission.map((p) => p.name);

      permissionArr.forEach((permission) => {
        if (permission === 'update') {
          can(permission, Report, { user: user._id });
        }
        if (permission === 'delete') {
          cannot(permission, Report, { approved: true });
        }
        can(permission, 'all');
      });
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
