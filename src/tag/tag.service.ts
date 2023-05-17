import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

export class TagService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async index() {
    const allTag = (
      await this.firebase.firestore.collection('tags').orderBy('tagId').get()
    ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    return await allTag;
  }
}
