import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KakaoProfile, getProfile } from '@react-native-seoul/kakao-login';
import axios from 'axios';
import { http } from '../../../api/http'

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
          // axios.post('http://k7a303.p.ssafy.io:9090/api/v1/user/reissue', {
          //   userId: id,
          //   refreshToken: refresh
          // })
          http.post('/user/reissue', {
            userId: id,
            refresh: refresh
          })
          .then(res => {
            console.log(res.data)
            console.log('기존회원 토큰 재발급')
            AsyncStorage.setItem('token', res.data.accessToken)
            AsyncStorage.setItem('refresh', res.data.refreshToken)
          })
          .catch(err => {
            console.log(err)
            navigation.navigate('Login')
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
      console.log('신규회원 데이터 세팅')
    }
  });

  // 최초 로그인 전인 유저는 token이 null >> Login으로
  AsyncStorage.getItem('token', (err, result) => {
    const token = result;
    if (token == null) {
      console.log('신규회원 로그인으로')
      navigation.navigate('Login')
    }
  });
  
  // 기존 유저의 토큰 만료된 경우 >> Login으로
  AsyncStorage.getItem('isExpire', (err, result) => {
    const isExpire = result;
    if (isExpire == true) {
      console.log('토큰만료 기존회원')
      navigation.navigate('Login')
    }
  });

  // 토큰 유효하고 비번 있으면 >> PW, 없으면 >> Main
  AsyncStorage.getItem('password', (err, result) => {
    const password = result;
    if (password == null) {
      console.log('토큰유효 비번없는 기존회원')
      navigation.navigate('Main')
    }
    else {
      console.log('토큰유효 비번있는 기존회원')
      navigation.navigate('Password')
    }
  });
  

}

export default LoginCheck