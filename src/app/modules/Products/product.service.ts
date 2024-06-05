import { IProduct } from './product.interface';
import Product from './product.model';

const createProductInDB = async (product: IProduct) => {
  try {
    const result = await Product.create(product);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllProductsFromDB = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductByIdFromDB = async (productId: string) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
};

const updateProductInDB = async (productId: string, product: IProduct) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProductFromDB = async (productId: string) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};

const searchProductsFromDB = async (searchQuery: string) => {
  try {
    // Search products by name 
    const products = await Product.find({ name: { $regex: searchQuery, $options: 'i' } });
    return products;
  } catch (error) {
    throw error;
  }
};

export const productServices = {
  createProductInDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductsFromDB,
};
