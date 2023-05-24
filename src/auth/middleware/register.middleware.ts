import { Injectable, NestMiddleware, ConflictException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectFirebaseAdmin, FirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;

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

    user && (() => { throw new ConflictException('user sudah terdaftar!') })();
        
    next();
  }
}