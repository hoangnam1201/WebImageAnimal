import { Module } from '@nestjs/common';
import { IsEmailAlreadyExistConstraint } from './is-email-already-exist.constraint';

@Module({
  providers: [IsEmailAlreadyExistConstraint],
  exports: [IsEmailAlreadyExistConstraint],
})
export class DecoratorsModule {}
