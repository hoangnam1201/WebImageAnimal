import { Module } from '@nestjs/common';
import { IsEmailAlreadyExistConstraint } from './is-email-already-exist.constraint copy';
import { IsTagNameAlreadyExistConstraint } from './is-tag-name-already-exist.constraint';

@Module({
  providers: [IsEmailAlreadyExistConstraint, IsTagNameAlreadyExistConstraint],
  exports: [IsEmailAlreadyExistConstraint, IsTagNameAlreadyExistConstraint],
})
export class DecoratorsModule {}
