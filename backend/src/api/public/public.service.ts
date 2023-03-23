import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import utils from 'src/services/Utils';
import { IUser, RegisterUserDTO } from './user.schema';

@Injectable()
export class PublicService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async login(EmailAddress: string, Password: string) {
    const objUser = await this.userModel.findOne({ EmailAddress }).exec();

    if (!objUser)
      throw new Error('User not found! Please try with different email');

    if (await utils.comparePassword(Password, objUser.Password)) {
      const { Password, ...result } = objUser.toJSON();

      return { ...result };
    }
    throw new Error('Credential Invalid!');
  }

  async register(RegisterUserDTO: RegisterUserDTO): Promise<IUser> {
    RegisterUserDTO.Password = await utils.encryptPassword(
      RegisterUserDTO.Password,
    );
    const objUser = new this.userModel(RegisterUserDTO);
    return await objUser.save();
  }
}
