import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http'

const LoginCheck = ({navigation}) => {
  
  useEffect(() => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        var id = ''
        var refresh= ''
        // storage에서 userId, refresh토큰 꺼냄
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
        
        // 둘다 이미 존재하면 기존 회원
        if (id != null && refresh != null) {
          http.post('/user/reissue', {
            userId: id,
            refreshToken: refresh
          })
          // refresh 토큰 유효하면 access, refresh 재발급
          .then(res => {
            // console.log(res.data)
            console.log('기존회원 토큰 재발급')
            AsyncStorage.setItem('token', res.data.accessToken)
            AsyncStorage.setItem('refresh', res.data.refreshToken)

            // 비번 있으면 >> PW, 없으면 >> Main
            AsyncStorage.getItem('password', (err, result) => {
              const password = result;
              if (password == null) {
                console.log('토큰유효 비번없는 기존회원')
                navigation.replace('Main')
              }
              else {
                console.log('토큰유효 비번있는 기존회원')
                navigation.replace('Password')
              }
            });
          })
          // refresh 만료면 로그인 페이지로
          .catch(err => {
            console.log('refresh 만료')
            navigation.replace('Login')
          })
        }
        // 신규회원이면 id, refresh가 null, 로그인 페이지로
        else {
          AsyncStorage.setItem('token', '')
          AsyncStorage.setItem('password', '')      
          console.log('신규회원 데이터 세팅')
          navigation.replace('Login')
        }
      });
    })
  }, [])
}

export default LoginCheck