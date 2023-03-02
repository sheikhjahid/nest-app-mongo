import {
  Ability,
  AbilityBuilder,
  ExtractSubjectType,
  SubjectType,
} from '@casl/ability';
import { Report } from 'src/report/schemas/report.schema';
import { User } from 'src/user/schemas/user.schema';
import { Permission } from 'src/enums/permission.enum';
export type AppAbility = Ability;
export class CaslAbilityFactory {
  async createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    if (user.role.name === 'admin') {
      can(Permission.Manage, 'all'); // read-write access to everything
    } else {
      can(Permission.Read, 'all'); // read-only access to everything
    }

    can(Permission.Update, Report, { user: user._id });
    cannot(Permission.Delete, Report, { approved: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<SubjectType>,
    });
  }
}
