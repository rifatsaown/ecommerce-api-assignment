import { Document, ObjectId } from 'mongoose';

export interface IOrder extends Document {
  email: string;
  productId: ObjectId;
  price: number;
  quantity: number;
}
