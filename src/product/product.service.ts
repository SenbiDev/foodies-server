import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';

export class ProductService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private categoryService: CategoryService,
    private tagService: TagService,
  ) {}

  async index({ q, limit, page, category, tags }) {
    let allProduct = (
      await this.firebase.firestore
        .collection('product')
        .orderBy('productId')
        .get()
    ).docs.map((val) => ({
      _id: val.id,
      productId: val.data()?.productId,
      name: val.data()?.name,
      description: val.data()?.description,
      price: val.data()?.price,
      category: val.data()?.category,
      tags: val.data()?.tags,
      image_url: val.data()?.image_url,
    }));

    const allTag = await this.tagService.index();
    const allCategory = await this.categoryService.index();

    allProduct = allProduct.map((data) => ({
      ...data,
      category: allCategory?.filter(
        (category) => category._id === data?.category?._path?.segments[1],
      )[0],
      tags: data?.tags
        ?.map((tag) => {
          return allTag?.filter(
            (value) => value._id === tag?._path?.segments[1],
          );
        })
        ?.flat(),
    }));

    const queryParam = q ?? '';
    const categoryParam = category;
    const tagsParam = tags;
    const limitParam = limit * 1;
    const offsetParam = (page - 1) * limitParam;

    allProduct = allProduct.filter((value) =>
      value?.name?.match(new RegExp(`\w*${queryParam}\w*`, 'i')),
    );
    allProduct = allProduct.filter((value) =>
      value?.category?.name?.match(new RegExp(`\w*${categoryParam}\w*`, 'i')),
    );
    allProduct =
      tagsParam === undefined || tagsParam?.length === 0
        ? allProduct
        : allProduct.filter((value) => {
            const mapResult = value?.tags?.map((productTAG) => {
              const result1 = tagsParam?.map((tag) => productTAG?.name === tag);

              const result2AfterRemoveDuplicate = new Set(result1);

              const result3AfterConvertToAray = Array.from([
                ...result2AfterRemoveDuplicate,
              ]);

              const result4AfterFilterOnlyTrue =
                result3AfterConvertToAray.includes(true);

              return result4AfterFilterOnlyTrue;
            });

            const result1AfterRemoveDuplicate = new Set(mapResult);

            const result2AfterConvertToAray = Array.from([
              ...result1AfterRemoveDuplicate,
            ]);

            const endResult = result2AfterConvertToAray.includes(true);

            return endResult;
          });

    const length = limitParam * page ?? allProduct.length;

    const products = [];

    for (let i = 0; i < length; i++) {
      if (i < offsetParam) {
        continue;
      } else {
        products.push(allProduct[i]);
      }
    }

    return {
      data: products.filter((product) => product !== undefined),
      totalPages: Math.ceil(allProduct.length / limit),
      currentPage: page,
    };
  }

  async getAllProductWithRef() {
    return (await this.firebase.firestore.collection('product').get()).docs.map(
      (product) => ({ _id: product.id, ...product.data(), ref: product.ref }),
    );
  }

  async create() {
    // const allCategory = (
    //   await this.firebase.firestore.collection('categories').get()
    // ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    // const allTag = (
    //   await this.firebase.firestore.collection('tags').get()
    // ).docs.map((val) => ({ _id: val.id, name: val.data().name }));

    // const newData = this.data.map((d, index) => {
    //   const oldTags = d.tags.map((v) => v);

    //   const tags = oldTags
    //     .map((t) => {
    //       const n = allTag.filter((v) => v.name === t);
    //       return n;
    //     })
    //     .flat();

    //   // console.log(tags);
    //   return {
    //     ...d,
    //     category: `categories/${
    //       allCategory.find((v) => v.name === d.category)._id
    //     }`,
    //     tags: tags.map((t) => `tags/${t._id}`),
    //     productId: index + 1,
    //   };
    // });
    // // console.log(JSON.stringify(newD, null, 2));
    // newData.forEach((value, index) => {
    //   setTimeout(async () => {
    //     console.log(`DATA KE ${index}:`, value);
    //     await this.firebase.firestore.collection('product').add(value);
    //   }, 2000);
    // });

    // (
    //   await this.firebase.firestore.collection('test').add({ name: 'test' })
    // ).onSnapshot((snapshot) => {
    //   console.log('SNAPSHOT:', snapshot.data());
    // });

    // CREATE DOCUMENT WITH NON REFERENCE VALUE (1)
    // await this.firebase.firestore.collection('test').add({ name: 'test' });

    // GET DOCUMENT BY ID AND GET VALUE BY REFERENCE (2)
    // const tag = (
    //   await this.firebase.firestore.doc('tags/2GLYbC7kkXXRRurPzaaC').get()
    // ).ref;

    // CREATE DOCUMENT WITH REFERENCE VALUE (3)
    // await this.firebase.firestore.collection('test').add({ tagEx: tag });

    // GET ONE DOCUMENT BY ID (4)
    // const f = await this.firebase.firestore
    //   .doc('test/CbEDSguIXH0DDm7j2Suc')
    //   .get()
    //   .data();

    // UPDATE ONE DOCUMENT BY ID (5)
    // const f = await this.firebase.firestore
    //   .doc('test/CbEDSguIXH0DDm7j2Suc')
    //   .update({ tagEx: tag });

    // DELETE ONE DOCUMENT BY ID (6)
    // const f = await this.firebase.firestore
    //   .doc('test/CbEDSguIXH0DDm7j2Suc')
    //   .delete();

    // GET ALL DOCUMENT AND REFER SOME CURRENT PROPERTY TO OTHER PROPERTY ON OTHER COLLECTION (7)
    // USE Promise.all() when map() use async function as argument
    const r = await Promise.all(
      (
        await this.firebase.firestore.collection('test').get()
      ).docs.map(async (v) => {
        const [collectionName, documentId] = v.data().tagEx?._path?.segments;
        const tag = (
          await this.firebase.firestore
            .doc(`${collectionName}/${documentId}`)
            .get()
        ).data();

        return { tagEx: tag };
      }),
    );

    // const r = await this.firebase.firestore
    //   .collection('test')
    //   .add({ myFavorite: ['Book', 'Music', 'Coding'] });

    // const r = await this.firebase.firestore
    //   .doc('test/1OEP0SSasGxGwYvfjBZB')
    //   .update({ first: 'Urahara', last: 'Kisuke' });

    // return (await this.firebase.firestore.collection('test').get()).docs.map((v) => v.data());
    return r;
  }
}
