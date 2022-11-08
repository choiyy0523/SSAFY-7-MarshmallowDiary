import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const axiosApi = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_NATIVE_APP_BASE_URL
  })
  return instance
}


const axiosAuthApi = () => {
  AsyncStorage.getItem('token', (err, result) => {
    const token = result;
    
    const instance = axios.create({
      baseURL: process.env.REACT_NATIVE_APP_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })

    return instance
  })
}

export const http = axiosApi(process.env.REACT_NATIVE_APP_BASE_URL)
export const http2 = axiosAuthApi(process.env.REACT_NATIVE_APP_BASE_URL)