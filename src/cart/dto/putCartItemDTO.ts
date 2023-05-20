export interface PutCartItemDTO {
  items: {
    product: {
      _id: string;
      image_url: string;
      name: string;
      price: number;
    };
    qty: number;
  }[];
}
