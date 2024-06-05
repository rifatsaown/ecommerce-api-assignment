import { Router } from 'express';
import { productController } from './product.controller';
import { validateProduct } from './product.validation';

const router = Router();

router.post('/', validateProduct, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', validateProduct, productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

export const productRoutes = router;
