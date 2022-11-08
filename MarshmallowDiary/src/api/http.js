import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const axiosInstance = axios.create({
  baseURL: 'http://k7a303.p.ssafy.io:9090/api/v1',
  headers: {
    "Content-type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  async(config : any) => {
    const token = await AsyncStorage.getItem('token')
    config.headers["Content-Type"] = "application/json; charset=utf-8"
    config.headers["Authorization"] = `Bearer ${token}`
    return config;
  },
  err => {
    return Promise.reject(err)
  }
)

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export const http = axiosInstance
