import { AuthGuard } from '@nestjs/passport';

export class JwtGaurd extends AuthGuard('jwt') {}
