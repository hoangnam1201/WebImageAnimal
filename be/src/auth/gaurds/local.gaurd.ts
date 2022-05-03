import { AuthGuard } from '@nestjs/passport';

export class LocalGaurd extends AuthGuard('local') {}
