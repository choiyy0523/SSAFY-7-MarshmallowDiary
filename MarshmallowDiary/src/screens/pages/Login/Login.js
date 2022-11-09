import React, { useCallback, useState } from 'react';
import { Text, View, SafeAreaView, Image, Button, TouchableOpacity } from 'react-native';
import logo from '../../../assets/logo.png'
import kakao from '../../../assets/kakao.png'
import {
  KakaoOAuthToken,
  KakaoProfile,
  // getProfile as getKakaoProfile,
  getProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {http} from '../../../api/http';


const Login = ({navigation}) => {

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
  };
  
  // const signOutWithKakao = async (): Promise<void> => {
  //   const message = await logout();
  // };
  
  const getKakaoProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getProfile();

    // 카카오 로그인 성공하면(실패 시 로그인 안되는 건 카카오가 해줌)
    // 받아온 카카오프로필 id, nickname으로 요청 보냄(로그인 성공 시 무조건 성공)
    // storage에 access토큰, refresh토큰, userId, 기존회원 set
    http.post('/user/login', {
      authId: profile.id,
      nickname: profile.nickname,
    })
    .then(res => {
      console.log(res.data)
      AsyncStorage.setItem('token', res.data.accessToken)
      AsyncStorage.setItem('refresh', res.data.refreshToken)
      AsyncStorage.setItem('userId', res.data.userId)
      
      // pw 있으면 pw, 없으면 main으로
      AsyncStorage.getItem('password', (err, result) => {
        const pw = result;
        console.log(pw)
        if (pw == null) {
          navigation.navigate('Main')
        }
        else {
          navigation.navigate('Password')
        }
      })
    })
  };

  // const unlinkKakao = async (): Promise<void> => {
  //   const message = await unlink();
  
  //   setResult(message);
  // };

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <View>
          <Image source={logo} style={{ width: 150, height: 150, marginTop: '40%' }} />
        </View>
        <View>
          <Text style={{ fontSize: 30 }}>마시멜로일기</Text>
        </View>
        
        <TouchableOpacity style={{ flex:0.3 }} onPress={() => signInWithKakao() && getKakaoProfile()}>
          <Image source={kakao} style={{ marginTop: '40%' }} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default Login;