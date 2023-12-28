import axios from "axios";
import {getUserToken} from "./users";

const apiAxios = axios.create({
  baseURL: 'http://localhost:5000',
});

apiAxios.interceptors.request.use((config) => {
  if (!config) {
    return config;
  }

  const userToken = getUserToken();
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

export default apiAxios;
