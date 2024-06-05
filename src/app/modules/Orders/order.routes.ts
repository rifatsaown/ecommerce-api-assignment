import { Router } from 'express';
import { orderServices } from './order.controller';
import { validateOrder } from './order.validation';

const router = Router();

router.post('/', validateOrder, orderServices.createOrder);
router.get('/', orderServices.getAllOrders);

export const orderRoutes = router;
