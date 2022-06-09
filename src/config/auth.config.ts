import { registerAs } from '@nestjs/config';

export interface AuthOptions {
  expireIn: string;
  secretOrKey: string;
}
export default registerAs('auth', () => {
  return {
    expireIn: process.env.EXPIRES_IN || '12h',
    secretOrKey: process.env.SECRET_OR_KEY || 'secret-dev',
  };
});
