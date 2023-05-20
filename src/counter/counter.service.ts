import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

export class CounterService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async getCustomerId() {
    const counterFields = await Promise.all(
      (
        await this.firebase.firestore.collection('counters').listDocuments()
      ).map(async (field) => {
        const fieldWithKeyValue = (await field.get()).data();
        return Object.keys(fieldWithKeyValue);
      }),
    );

    const uniqueCounterFields = Array.from(new Set(counterFields.flat()));

    const isCustomerIdFieldExist = uniqueCounterFields.includes('customer_id');

    let id;

    if (isCustomerIdFieldExist === false) {
      const counterCreated = await this.firebase.firestore
        .collection('counters')
        .add({ customer_id: 0 });
      id = (await counterCreated.get()).id;
    }

    const findCustomerIdField = await Promise.all(
      (
        await this.firebase.firestore.collection('counters').listDocuments()
      ).map(async (v) => {
        const result = (await v.get()).data();
        const id = (await v.get()).id;

        if ('customer_id' in result) {
          return { _id: id, ...result };
        }
      }),
    );

    const onlyCustomerIdField = findCustomerIdField.filter(
      (result) => result !== undefined,
    )[0];

    const counterId = id === undefined ? onlyCustomerIdField?._id : id;

    const oldCustomerId = (
      await this.firebase.firestore.doc(`counters/${counterId}`).get()
    ).data()?.customer_id;

    const newCustomerId = oldCustomerId + 1;

    await this.firebase.firestore
      .doc(`counters/${counterId}`)
      .update({ customer_id: oldCustomerId + 1 });

    return newCustomerId;
  }

  async getOrderNumber({ userRef }) {
    const isDocumentsEmpty = (
      await this.firebase.firestore
        .collection('counters')
        .where('user', '==', userRef)
        .get()
    ).empty;

    const currentCounterId = (
      await this.firebase.firestore
        .collection('counters')
        .where('user', '==', userRef)
        .get()
    ).docs.map((v) => v.id);

    let counterId = currentCounterId.length !== 0 ? currentCounterId[0] : '';

    if (isDocumentsEmpty) {
      const counterCreated = await this.firebase.firestore
        .collection('counters')
        .add({ order_number: 0, user: userRef });
      counterId = (await counterCreated.get()).id;
    }

    const oldOrderNumber = (
      await this.firebase.firestore.doc(`counters/${counterId}`).get()
    ).data()?.order_number;

    const newOrderNumber = oldOrderNumber + 1;

    await this.firebase.firestore
      .doc(`counters/${counterId}`)
      .update({ order_number: oldOrderNumber + 1 });

    return newOrderNumber;
  }
}
