import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Permission } from 'src/enums/permission.enum';
import { Report } from 'src/report/schemas/report.schema';
import { IPolicyHandler } from './policy-handler';

export class UpdateReportHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Permission.Update, Report);
  }
}
