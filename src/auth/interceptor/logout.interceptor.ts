import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectFirebaseAdmin, FirebaseAdmin } from 'nestjs-firebase';


@Injectable()
export class LogoutInterceptor implements NestInterceptor {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse()
    
    const email = request.user.email;

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

    user.token.length === 0 && (() => { throw new NotFoundException('user tidak login!') })();

    const status = response.statusCode

    return next
      .handle()
      .pipe(
        tap(
          response
          .status(status)
          .json({
            statusCode: status,
            message: 'logout success',
          })
        )
      );
  }
}