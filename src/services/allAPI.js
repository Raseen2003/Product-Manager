import commonApi from './commonApi';
import SERVER_BASE_URL from './serverUrl';

// add product
export const addProductAPI = async (reqBody) => {
    return await commonApi('POST', `${SERVER_BASE_URL}/addproducts`, reqBody);
}
