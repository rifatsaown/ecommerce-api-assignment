import express from 'express';
import { productRoutes } from '../modules/Products/product.routes';
import { usersRoutes } from '../modules/Users/users.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/users', route: usersRoutes },
  { path: '/products', route: productRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
