import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';





const http = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${AsyncStorage.getItem('token')}`
  },
})

export default http