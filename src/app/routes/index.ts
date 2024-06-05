import express from 'express';
import { productRoutes } from '../modules/Products/product.routes';
import { orderRoutes } from '../modules/Orders/order.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/products', route: productRoutes },
  { path: '/orders', route: orderRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
