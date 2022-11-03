import React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// asyncstorage에 뭔가를 저장할 때에는 string이어야함 - setItem 이용
// 객체나 배열을 저장하려면 JSON.stringfy 함수 필요

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}