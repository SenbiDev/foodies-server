import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

export class DeliveryAddressService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async index({ user }) {
    let deliveryAddresses = (
      await this.firebase.firestore.collection('deliveryAddresses').get()
    ).docs.map((address) => ({
      _id: address.id,
      ...address.data(),
      user: address.data().user?._path?.segments[1],
    }));

    deliveryAddresses = deliveryAddresses.filter(
      (address) => address.user === user._id,
    );

    return deliveryAddresses;
  }

  async show({ addressId }) {
    return (
      await this.firebase.firestore.doc(`deliveryAddresses/${addressId}`).get()
    ).data();
  }

  async create({
    nama,
    provinsi,
    kabupaten,
    kecamatan,
    kelurahan,
    detail,
    userRef,
  }) {
    return await this.firebase.firestore.collection('deliveryAddresses').add({
      nama,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      detail,
      user: userRef,
    });
  }
}
