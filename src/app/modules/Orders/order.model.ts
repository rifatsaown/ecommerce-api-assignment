import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema = new Schema<IOrder>({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;
