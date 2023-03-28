import * as bcrypt from "bcrypt";

 const bcrypt_util = {

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  },

  async comparePasswords(newPassword: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(newPassword, passwordHash);
  }

};

export { bcrypt_util }