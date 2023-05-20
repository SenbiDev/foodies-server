import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

export class InvoiceService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async show({ orderId }) {
    const allInvoice = await Promise.all(
      (
        await this.firebase.firestore.collection('invoices').get()
      ).docs.map(async (invoice) => {
        const [userCollection, userDocumentId] =
          invoice.data().user?._path?.segments;

        const userId = (
          await this.firebase.firestore
            .doc(`${userCollection}/${userDocumentId}`)
            .get()
        ).id;

        const userData = (
          await this.firebase.firestore
            .doc(`${userCollection}/${userDocumentId}`)
            .get()
        ).data();

        const user = { _id: userId, ...userData };

        const [orderCollection, orderDocumentId] =
          invoice.data().order?._path?.segments;
        const orderId = (
          await this.firebase.firestore
            .doc(`${orderCollection}/${orderDocumentId}`)
            .get()
        ).id;

        let orderData = (
          await this.firebase.firestore
            .doc(`${orderCollection}/${orderDocumentId}`)
            .get()
        ).data();

        orderData = {
          ...orderData,
          user: orderData.user?._path?.segments[1],
          order_items: orderData.order_items?.map(
            (data) => data?._path?.segments[1],
          ),
        };

        const order = [{ _id: orderId, ...orderData }];

        return { ...invoice.data(), user: user, order: order };
      }),
    );

    const getInvoiceByOrderId = allInvoice.filter(
      (invoice) => invoice.order[0]._id === orderId,
    )[0];

    return getInvoiceByOrderId;
  }

  async create({ invoice }) {
    await this.firebase.firestore.collection('invoices').add(invoice);
  }
}
