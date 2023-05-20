import { NotFoundException } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { CounterService } from 'src/counter/counter.service';
import { CartService } from 'src/cart/cart.service';
import { DeliveryAddressService } from 'src/deliveryAddress/deliveryAddress.service';
import { InvoiceService } from 'src/invoice/invoice.service';

export class OrderService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
    private counterService: CounterService,
    private cartService: CartService,
    private deliveryAddressService: DeliveryAddressService,
    private invoiceService: InvoiceService,
  ) {}

  async index() {
    return await Promise.all(
      (
        await this.firebase.firestore.collection('orders').get()
      ).docs.map(async (order) => {
        const orderItemsSegments = order
          .data()
          .order_items.map((orderItem) => orderItem?._path?.segments);

        const orderItemsPath = orderItemsSegments.map((orderItemPath) => {
          const [orderItemsCollection, orderItemsDocumentId] = orderItemPath;
          return `${orderItemsCollection}/${orderItemsDocumentId}`;
        });

        const orderItems = await Promise.all(
          orderItemsPath.map(async (orderItemPath) =>
            (await this.firebase.firestore.doc(orderItemPath).get()).data(),
          ),
        );

        return {
          _id: order.id,
          ...order.data(),
          order_items: orderItems,
          user: order.data().user?._path?.segments[1],
        };
      }),
    );
  }

  async create({ delivery_fee, delivery_address, user, userRef }) {
    const items: any = await this.cartService.index({ user });
    const items_count = items.reduce((total, item) => total + item.qty, 0);

    if (items.length === 0) {
      throw new NotFoundException();
    }

    const address = await this.deliveryAddressService.show({
      addressId: delivery_address,
    });

    const order_number = await this.counterService.getOrderNumber({ userRef });

    const order = {
      status: 'waiting_payment',
      delivery_fee,
      delivery_address: {
        provinsi: address.provinsi,
        kabupaten: address.kabupaten,
        kecamatan: address.kecamatan,
        kelurahan: address.kelurahan,
      },
      user: address.user,
      order_number,
      items_count,
    };

    const orderCreated = await this.firebase.firestore
      .collection('orders')
      .add(order);
    const orderCreatedId = orderCreated.id;
    const orderCreatedPath = orderCreated.path;
    const orderCreatedRef = (await orderCreated.get()).ref;

    const orderItems = await Promise.all(
      items.map(async (item) => {
        const orderItemCreated = await this.firebase.firestore
          .collection('orderItems')
          .add({
            name: item.product.name,
            qty: parseInt(item.qty),
            price: parseInt(item.product.price),
            order: orderCreatedId,
            product: item.product._id,
          });

        return (await orderItemCreated.get()).ref;
      }),
    );

    const orderUpdated = await this.firebase.firestore
      .doc(orderCreatedPath)
      .update({ order_items: orderItems });

    const orderSubtotal = items.reduce(
      (total, item) => (total += item.price * item.qty),
      0,
    );

    delete address.user;

    const invoice = {
      user: userRef,
      order: orderCreatedRef,
      payment_status: 'waiting_payment',
      sub_total: orderSubtotal,
      delivery_fee: parseInt(delivery_fee),
      total: parseInt(delivery_fee) + orderSubtotal,
      delivery_address: address,
    };

    this.invoiceService.create({ invoice });

    return orderUpdated;
  }
}
