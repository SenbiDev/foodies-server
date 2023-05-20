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
    ).docs.map((category) => ({
      _id: category.id,
      name: category.data().name,
    }));

    return allCategory;
  }
}
