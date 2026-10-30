import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidPriceRange', async: false })
export class IsValidPriceRangeConstraint
  implements ValidatorConstraintInterface
{
  validate(value: number | undefined, args: ValidationArguments): boolean {
    const object = args.object as Record<string, unknown>;

    const maxProperty = args.constraints[0] as string;
    const maxValue = object[maxProperty];

    if (value === undefined || maxValue === undefined) {
      return true;
    }

    return value <= (maxValue as number);
  }

  defaultMessage(args: ValidationArguments): string {
    const maxProperty = args.constraints[0] as string;

    return `${args.property} must be less than or equal to ${maxProperty}`;
  }
}