import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";

// 4주 이상 미 접속시 access 만료, axios 요청 시 권한 없으면 로그인 유도해서 재발급

const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
})

console.log(Config.REACT_APP_API_BASE_URL)

axiosInstance.interceptors.request.use(
  async(config : any) => {
    const token = await AsyncStorage.getItem('token')
    config.headers["Content-Type"] = "application/json; charset=utf-8"
    config.headers["Authorization"] = `Bearer ${token}`
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const http = axiosInstance
