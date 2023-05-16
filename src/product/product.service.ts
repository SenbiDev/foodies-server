import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

export class ProductService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async index() {
    let allProduct = (
      await this.firebase.firestore.collection('product').get()
    ).docs.map((val) => val.data());

    const allTag = (
      await this.firebase.firestore.collection('tags').get()
    ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    const allCategory = (
      await this.firebase.firestore.collection('categories').get()
    ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    allProduct = allProduct.map((data) => ({
      ...data,
      category: allCategory?.filter(
        (category) => category._id === data?.category?._path.segments[1],
      )[0],
      tags: data?.tags
        ?.map((tag) => {
          return allTag.filter((value) => value._id === tag?._path.segments[1]);
        })
        ?.flat(),
    }));
    return allProduct;
  }
}
