import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const UserSchema = new mongoose.Schema({
  UserID: { type: String, default: uuidv4, index: true, required: true },
  EmailAddress: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  Password: { type: String, required: true },
  Name: { type: String, required: true },
});

export class IUser extends mongoose.Document {
  UserID: string;
  Name: string;
  EmailAddress: string;
  Password: string;
}

export class RegisterUserDTO {
  @IsNotEmpty() EmailAddress: string;
  @IsNotEmpty() Password: string;
  @IsNotEmpty() Name: string;
}

export class LoginDTO {
  @IsNotEmpty() EmailAddress: string;
  @IsNotEmpty() Password: string;
}
