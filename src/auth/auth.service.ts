import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CounterService } from 'src/counter/counter.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private counterService: CounterService,
  ) {}

  async register({ full_name, email, password }) {
    const customer_id = await this.counterService.getCustomerId();

    const newUser = {
      customer_id,
      full_name,
      email,
      password,
      role: 'user',
      token: [],
    };

    return await this.userService.createUser({ newUser });
  }

  async login({ email, password }): Promise<any> {
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

    if (user === undefined) {
      throw new NotFoundException();
    }

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = user;

    const token = await this.jwtService.signAsync(payload);

    await this.userService.updateUser(user._id, { token: [token] });

    return {
      access_token: token,
    };
  }

  async logout({ user }) {
    await this.userService.updateUser(user._id, { token: [] });
  }
}
