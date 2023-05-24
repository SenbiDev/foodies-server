import { Module } from '@nestjs/common';
import { CounterModule } from 'src/counter/counter.module';
import { UserService } from './user.service';

@Module({
  imports: [CounterModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
