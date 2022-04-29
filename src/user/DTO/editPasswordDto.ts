import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class EditPasswordDto {
  //password
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly newPassword: string;

  //password
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  readonly oldPassword: string;
}
