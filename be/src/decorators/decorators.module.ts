import { Module } from '@nestjs/common';
import { IsEmailAlreadyExistConstraint } from './is-email-already-exist.constraint';
import { IsTagNameAlreadyExistConstraint } from './is-tag-name-already-exist.constraint';
import { IsUsernameAlreadyExistConstraint } from './is-username-already-exist.constraint';

@Module({
  providers: [
    IsEmailAlreadyExistConstraint,
    IsTagNameAlreadyExistConstraint,
    IsUsernameAlreadyExistConstraint,
  ],
  exports: [
    IsEmailAlreadyExistConstraint,
    IsTagNameAlreadyExistConstraint,
    IsUsernameAlreadyExistConstraint,
  ],
})
export class DecoratorsModule {}
