import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { CounterService } from 'src/counter/counter.service';

export class UserService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private counterService: CounterService,
  ) {}

  async createUser({ newUser }) {
    const customer_id = await this.counterService.getCustomerId();
    await this.firebase.firestore.collection('users').add({ customer_id, ...newUser });
    
    return newUser;
  }

  async updateUser(userId: string, field: { token: [string] | [] }) {
    await this.firebase.firestore.doc(`users/${userId}`).update(field);
  }

  async findUserByEmail(email: string) {
    return (
      await this.firebase.firestore
        .collection('users')
        .where('email', '==', email)
        .get()
    ).docs.map((user) => ({ ...user.data(), _id: user.id }))[0];
  }
}
