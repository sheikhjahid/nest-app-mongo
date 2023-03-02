import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from 'src/utils/handlers/policy-handler';

export const CHECK_POLICIES_KEY = 'check_policies';
export const checkPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
