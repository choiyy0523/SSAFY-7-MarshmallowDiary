import React, { useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginCheck = ({navigation}) => {
  // 항상 실행하면 안됨 >> AsyncStorage getallkeys로 비었는지 아닌지 확인 한 다음 비어있으면 setItem
  AsyncStorage.setItem('token', '')
  AsyncStorage.setItem('expireDate', '')
  AsyncStorage.setItem('password', '')
  AsyncStorage.setItem('isNew', true)

  // 최초 로그인 전인 유저는 token이 null >> Login으로
  AsyncStorage.getItem('token', (err, result) => {
    const token = result;
    if (token == null) {
      navigation.navigate('Login')
    }
  });
  
  // 기존 유저의 토큰 만료된 경우 >> Login으로
  AsyncStorage.getItem('expireDate', (err, result) => {
    const expireDate = result;
    if (expireDate == '만료') {
      navigation.navigate('Login')
    }
  });

  // 토큰 유효하고 비번 있으면 >> PW, 없으면 >> Main
  AsyncStorage.getItem('password', (err, result) => {
    const password = result;
    if (password == null) {
      navigation.navigate('Main')
    }
    else {
      navigation.navigate('Password')
    }
  });
  

}

export default LoginCheck