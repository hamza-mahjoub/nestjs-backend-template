import {
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  ValidateNested,
  IsLowercase,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Address {
  @IsOptional()
  readonly city: string;

  @IsOptional()
  readonly country: string;

  @IsOptional()
  readonly postalCode: string;

  @IsOptional()
  readonly address: string;
}
export class UpdateUserDto {
  //name
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  readonly name: string;

  //firstName
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly firstName: string;

  //username
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  readonly username: string;

  //email
  @IsOptional()
  @IsString()
  @MinLength(6)
  @IsLowercase()
  @IsEmail()
  readonly email: string;

  //fullAddress
  @IsOptional()
  @Type(() => Address)
  @ValidateNested()
  readonly fullAddress: Address;

  //phoneNumber
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  readonly phoneNumber: string;
}
