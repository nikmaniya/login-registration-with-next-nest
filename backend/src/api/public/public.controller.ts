import { Body, Controller, Post, Req } from '@nestjs/common';
import utils from 'src/services/Utils';
import { PublicService } from './public.service';
import { LoginDTO, RegisterUserDTO } from './user.schema';

@Controller('api/public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    try {
      const objUser = await this.publicService.login(
        loginDTO.EmailAddress,
        loginDTO.Password,
      );

      return utils.resSuccess(objUser, 'Login Successfully!');
    } catch (err) {
      console.log(err);
      return utils.resError(err.message, 'Error occurred while login!');
    }
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterUserDTO) {
    try {
      const objUser = await this.publicService.register(registerDTO);

      return utils.resSuccess(objUser, 'Register User Successfully!');
    } catch (err) {
      return utils.resError(err.message, 'Error occurred while register!');
    }
  }
}
