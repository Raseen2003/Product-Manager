import axios from 'axios';

const commonApi = async (httpMethod, url, reqBody) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
  }

  try {
    const response = await axios(reqConfig);
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("API Error:", error);
    return error.response ? error.response : error;
  }
};

export default commonApi;