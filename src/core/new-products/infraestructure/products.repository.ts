import axios from 'axios';
import { IProductsRepository } from '../domain/products.repository';

const API_URL = 'https://api.escuelajs.co/api/v1';

const getAllProducts: IProductsRepository['getAllProducts'] = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/products`);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

const getSingleProduct: IProductsRepository['getSingleProduct'] = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Error fetching product');
  }
};

const createProduct: IProductsRepository['createProduct'] = async (productData) => {
  try {
    const res = await axios.post(`${API_URL}/products`, productData);
    window.location.reload();
    return res.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
};

const deleteProduct: IProductsRepository['deleteProduct'] = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/products/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};

const updateProduct: IProductsRepository['updateProduct'] = async (id, productData) => {
  try {
    const res = await axios.put(`${API_URL}/products/${id}`, productData);
    window.location.reload();
    return res.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};

export const productsRepository: IProductsRepository = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
