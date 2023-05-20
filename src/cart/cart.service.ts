import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { ProductService } from 'src/product/product.service';

export class CartService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private productService: ProductService,
  ) {}

  async index({ user }) {
    let cartItems = await Promise.all(
      (
        await this.firebase.firestore.collection('cartItems').get()
      ).docs
        .map(async (cartItem) => {
          const [productCollection, productId] =
            cartItem.data()?.product?._path?.segments;

          let product = (
            await this.firebase.firestore
              .doc(`${productCollection}/${productId}`)
              .get()
          ).data();

          product = {
            _id: productId,
            ...product,
            category: product?.category?._path?.segments[1],
            tags: product?.tags?.map((tag) => tag?._path?.segments[1]),
          };

          return {
            ...cartItem.data(),
            product,
            user: cartItem.data().user?._path?.segments[1],
          };
        })
        .reverse(),
    );

    cartItems = cartItems.filter((cartItem) => cartItem.user === user._id);

    return cartItems;
  }

  async update({ items, userRef }: any) {
    const productIds = items.map((item) => item.product._id);

    const allProductWithRef: any =
      await this.productService.getAllProductWithRef();

    const productSelected = allProductWithRef.filter((product) =>
      productIds.includes(product._id),
    );

    const cartItems = items.map((item) => {
      const relatedProduct = productSelected.find(
        (product) => product._id === item.product._id,
      );

      return {
        product: relatedProduct.ref,
        price: relatedProduct.price,
        image_url: relatedProduct.image_url,
        name: relatedProduct.name,
        user: userRef,
        qty: item.qty,
      };
    });

    // DELETE ALL DOCUMENT WITHOUT FILTER
    // (await this.firebase.firestore.listCollections()).map((v) =>
    //   v.doc().delete(),
    // );

    // DELETE ALL DOCUMENT WITH FILTER AND REFERENCE
    (
      await this.firebase.firestore
        .collection('cartItems')
        .where('user', '==', userRef)
        .get()
    ).docs.map((cartItem) => cartItem.ref.delete());

    const newCartItems = await Promise.all(
      cartItems.map(
        async ({ product, image_url, name, price, qty, user }) =>
          await this.firebase.firestore
            .collection('cartItems')
            .add({ product, image_url, name, price, qty, user }),
      ),
    );

    return newCartItems;
  }
}
