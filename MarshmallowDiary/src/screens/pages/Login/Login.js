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

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
  // const [result,setResult] = useState('');
  // const [result2,setResult2] = useState('')

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
  
    // setResult(JSON.stringify(token));
  };
  
  // const signOutWithKakao = async (): Promise<void> => {
  //   const message = await logout();
  
  //   setResult(message);
  // };
  
  const getKakaoProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getProfile();
  
    // setResult2(JSON.stringify(profile));
    // console.log(profile.id)
    // console.log(profile.nickname)
    axios.post('http://k7a303.p.ssafy.io:9090/api/v1/user/login', {
      authId: profile.id,
      nickname: profile.nickname,
    })
    .then(res => {
      console.log(res.data)
      console.log(res.data.userId)
      
      AsyncStorage.mergeItem('token', JSON.stringify(res.data.accessToken))
      AsyncStorage.mergeItem('isNew', false)
      
    })
  };


  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();
  
    setResult(message);
  };

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <View>
          <Image source={logo} style={{ width: 150, height: 150, marginTop: '40%' }} />
        </View>
        <View>
          <Text style={{ fontSize: 30 }}>마시멜로일기</Text>
        </View>
        {/* <Text>result : {result}</Text>
        <Text>result2 : {result2}</Text> */}

        <TouchableOpacity onPress={() => signInWithKakao() && getKakaoProfile()}>
          <Image source={kakao} style={{ marginTop: '40%' }} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default Login;