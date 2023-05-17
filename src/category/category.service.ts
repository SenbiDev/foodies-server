import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class CategoryService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async index() {
    const allCategory = (
      await this.firebase.firestore
        .collection('categories')
        .orderBy('categoryId')
        .get()
    ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    return allCategory;
  }
}
