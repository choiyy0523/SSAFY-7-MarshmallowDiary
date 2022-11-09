import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


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
  (error) => {
    return Promise.reject(error)
  }
)

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const {config, response: {status}} = error
//     const originalRequest = config

//     if (status == 403 && !originalRequest._retry) {
//       originalRequest._retry = true

//       AsyncStorage.getAllKeys((err, keys) => {
//         AsyncStorage.multiGet(keys, (err, stores) => {
//           var id = ''
//           var refresh= ''
//           stores.map((result, i, store) => {
//             if (stores[i][0] == 'userId') {
//               id = store[i][1]
//             }
//             if (stores[i][0] == 'refresh') {
//               refresh = store[i][1]
//             }
//           });
//           console.log('id', id)
//           console.log('refresh', refresh)

//           axios.post('http://k7a303.p.ssafy.io:9090/api/v1/user/reissue', {
//             userId: id,
//             refreshToken: refresh
//           })
//           .then(res => {
//             AsyncStorage.setItem('token', res.data.accessToken)
//             AsyncStorage.setItem('refresh', res.data.refreshToken)

//             originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`
//             console.log('retry')
//             // console.log(originalRequest)
//             console.log(originalRequest.headers.Authorization)
//             return axios(originalRequest)
// s
//           })
//           .catch(err => {
//             console.log('err1')
//           })
//         })
//       })
//     }

//     else {
//       return console.log('err')
//     }
//   }
// )

export const http = axiosInstance
