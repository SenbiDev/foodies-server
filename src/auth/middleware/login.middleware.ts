import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectFirebaseAdmin, FirebaseAdmin } from 'nestjs-firebase';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const password = req.body.password;

    const user: {
        _id: string;
        customer_id?: string;
        full_name?: string;
        email?: string;
        password?: string;
        role?: string;
        token?: [];
        iat?: number;
    } = (
        await this.firebase.firestore
          .collection('users')
          .where('email', '==', email)
          .get()
    ).docs.map((user) => ({ ...user.data(), _id: user.id }))[0];

    user || (() => { throw new NotFoundException('user tidak ditemukan!') })();

    const result = bcrypt.compareSync(password, user.password)
    result || (() => { throw new UnauthorizedException('email atau password salah!') })();
        
    next();
  }
}