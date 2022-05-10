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
export class IsTagNameAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private prisma: PrismaService) {}
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return this.prisma.tag.findFirst({ where: { name: value } }).then((tag) => {
      console.log(value);
      console.log(tag);
      if (tag) return false;
      return true;
    });
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'tag name already exist';
  }
}

export function IsTagNameAlreadyExist(validationOption?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: IsTagNameAlreadyExistConstraint,
    });
  };
}
