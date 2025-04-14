import commonApi from './commonApi';
import SERVER_BASE_URL from './serverUrl';

// Add product
export const addProductAPI = async (reqBody) => {
  return await commonApi('POST', `${SERVER_BASE_URL}/products/addproducts`, reqBody,true);
};

// Get all products
export const getAllProductsAPI = async () => {
  return await commonApi('GET', `${SERVER_BASE_URL}/products/allproducts`);
};

// Update product
export const updateProductAPI = async (id, productData) => {
  return await commonApi('PUT', `${SERVER_BASE_URL}/products/updateproduct/${id}`, productData);
};

// Delete product
export const deleteProductAPI = async (id) => {
  return await commonApi('DELETE', `${SERVER_BASE_URL}/products/deleteproduct/${id}`);
};