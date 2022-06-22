export interface OrderItem {
  productId: number;
  name: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface Order {
  id: number;
  buyerId: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  orderDate: string;
  subtotal: number;
  deliveryFee: number;
  orderStatus: string;
  total: number;
}
