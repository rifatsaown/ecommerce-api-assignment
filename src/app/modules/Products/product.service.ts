import { IProduct } from './product.interface';
import Product from './product.model';

const createProductInDB = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const products = await Product.find();
  return products;
};

const getProductByIdFromDB = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};

const updateProductInDB = async (productId: string, product: IProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
    new: true,
  });
  return updatedProduct;
};

const deleteProductFromDB = async (productId: string) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

const searchProductsFromDB = async (searchQuery: string) => {
  // Search products by name
  const products = await Product.find({
    name: { $regex: searchQuery, $options: 'i' },
  });
  return products;
};

export const productServices = {
  createProductInDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductsFromDB,
};
