import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

export class UserService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async createUser({ newUser }) {
    await this.firebase.firestore.collection('users').add(newUser);

    return newUser;
  }

  async updateUser(userId: string, field: { token: [string] | [] }) {
    await this.firebase.firestore.doc(`users/${userId}`).update(field);
  }

  async findUserByEmail(email) {
    return (
      await this.firebase.firestore
        .collection('users')
        .where('email', '==', email)
        .get()
    ).docs.map((user) => ({ ...user.data(), _id: user.id }))[0];
  }
}
