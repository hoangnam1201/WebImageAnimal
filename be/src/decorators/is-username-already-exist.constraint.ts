import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUsernameAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return this.prisma.user
      .findFirst({ where: { username: value } })
      .then((user) => {
        if (user) return false;
        return true;
      });
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'username already exist';
  }
}

export function IsUsernameAlreadyExist(validationOption?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsUsernameAlreadyExistConstraint,
    });
  };
}
