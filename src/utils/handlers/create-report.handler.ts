import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Permission } from 'src/enums/permission.enum';
import { Report } from 'src/report/schemas/report.schema';
import { IPolicyHandler } from './policy-handler';

export class CreateReportHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Permission.Create, Report);
  }
}
