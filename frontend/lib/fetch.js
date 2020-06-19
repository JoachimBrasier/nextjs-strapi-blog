import Axios from "axios";

export default fetch = async (method, url, data) => {
  try {
    const response = await Axios[method](`http://localhost:1337/${url}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
