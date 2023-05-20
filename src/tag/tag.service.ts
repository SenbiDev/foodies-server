import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

export class TagService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async index() {
    const allTag = (
      await this.firebase.firestore.collection('tags').orderBy('tagId').get()
    ).docs.map((tag) => ({ _id: tag.id, name: tag.data().name }));

    return await allTag;
  }
}
