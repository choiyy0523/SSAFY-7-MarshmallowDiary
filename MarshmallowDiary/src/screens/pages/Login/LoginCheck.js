import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KakaoProfile, getProfile } from '@react-native-seoul/kakao-login';

const LoginCheck = ({navigation}) => {
  
  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        var id = ''
        var refresh= ''
        stores.map((result, i, store) => {
          if (stores[i][0] == 'userId') {
            id = store[i][1]
          }
          if (stores[i][0] == 'refresh') {
            refresh = store[i][1]
          }
        });
        console.log('id', id)
        console.log('refresh', refresh)
  
        if (id != null && refresh != null) {
          axios.post('http://k7a303.p.ssafy.io:9090/api/v1/user/reissue', {
            userId: id,
            refreshToken: refresh
          })
          .then(res => {
            console.log(res.data)
            AsyncStorage.setItem('token', res.data.accessToken)
            AsyncStorage.setItem('refresh', res.data.refreshToken)
          })
        }
      });
    })
  }, [])

  // 최초 접속 유저의 경우 isNew = 없는 키 >> 값이 null
  AsyncStorage.getItem('isNew', (err, result) => {
    const isNew = result;
    if (isNew == null) {
      AsyncStorage.setItem('token', '')
      AsyncStorage.setItem('isExpire', '')
      AsyncStorage.setItem('password', '')
      AsyncStorage.setItem('isNew', 'true')      
    }
  });

  // 최초 로그인 전인 유저는 token이 null >> Login으로
  AsyncStorage.getItem('token', (err, result) => {
    const token = result;
    if (token == null) {
      navigation.navigate('Login')
    }
  });
  
  // 기존 유저의 토큰 만료된 경우 >> Login으로
  AsyncStorage.getItem('isExpire', (err, result) => {
    const isExpire = result;
    if (isExpire == true) {
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