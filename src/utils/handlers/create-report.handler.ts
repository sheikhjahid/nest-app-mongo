import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Report } from 'src/report/schemas/report.schema';
import { IPolicyHandler } from './policy-handler';

export class CreateReportHandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can('create', Report);
  }
}
