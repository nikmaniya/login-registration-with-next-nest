import * as bcrypt from 'bcrypt';

class Utils {
  // function that create error object
  resError(err, message = '') {
    return {
      resType: 'THT',
      status: false,
      err: err,
      message: message,
    };
  }

  // function that create success object
  resSuccess(obj, message = '') {
    return {
      resType: 'THT',
      status: true,
      data: obj,
      message: message,
    };
  }

  //Return Promise
  encryptPassword(password: string) {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  //Return Promise
  comparePassword(password, encryptedPassword) {
    return bcrypt.compare(password, encryptedPassword);
  }
}

const utils = new Utils();

export default utils;
