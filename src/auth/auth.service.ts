import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register({ full_name, email, password }) {
    const newUser = {
      full_name,
      email,
      password,
      role: 'user',
      token: [],
    };

    return await this.userService.createUser({ newUser });
  }

  async login({ email }): Promise<any> {
    const user: {
      _id: string;
      customer_id?: string;
      full_name?: string;
      email?: string;
      password?: string;
      role?: string;
      token?: [];
      iat?: number;
    } = await this.userService.findUserByEmail(email);

    const payload = user;

    const token = await this.jwtService.signAsync(payload);

    await this.userService.updateUser(user._id, { token: [token] });

    return {
      token,
    };
  }

  async logout({ user }) {
    await this.userService.updateUser(user._id, { token: [] });
  }
}
