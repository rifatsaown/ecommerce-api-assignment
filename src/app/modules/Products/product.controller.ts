import { Request, Response } from 'express';
import { ApiResponse } from '../../utils/ApiResponse';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.createProductInDB(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, result, 'Product created successfully!'));
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;
  if (searchTerm) {
    try {
      const products = await productServices.searchProductsFromDB(searchTerm);
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            products,
            `Products matching search term ${searchTerm} fetched successfully!`
          ),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  } else {
    try {
      const products = await productServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: products,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productServices.getProductByIdFromDB(
      req.params.productId,
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res
      .status(200)
      .json(new ApiResponse(200, product, 'Product fetched successfully!'));
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productServices.updateProductInDB(
      req.params.productId,
      req.body,
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res
      .status(200)
      .json(new ApiResponse(200, product, 'Product updated successfully!'));
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productServices.deleteProductFromDB(
      req.params.productId,
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res
      .status(200)
      .json(new ApiResponse(200, null, 'Product deleted successfully!'));
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};

const searchProducts = async (req: Request, res: Response) => {};

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
