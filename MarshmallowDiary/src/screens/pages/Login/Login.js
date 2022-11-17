import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import logo from '../../../assets/logo.png'
// import kakao from '../../../assets/kakao.png'
// import {
//   KakaoOAuthToken,
//   KakaoProfile,
//   getProfile,
//   login,
//   logout,
//   unlink,
// } from '@react-native-seoul/kakao-login';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http';


const Login = ({ navigation }) => {
  const [result, setResult] = useState()
  // 검수용 계정 로그인(7번 클릭)
  const [hidden, setHidden] = useState(0)

  const increase = () => {
    setHidden(hidden + 1)
  }

  const hiddenLogin = () => {
    if (hidden >= 7) {
      http.post('/user/login', {
        authId: '2508568765',
        nickname: '최윤영',
      })
        .then(res => {
          console.log(res.data)
          AsyncStorage.setItem('token', res.data.accessToken)
          AsyncStorage.setItem('refresh', res.data.refreshToken)
          AsyncStorage.setItem('userId', res.data.userId)

          AsyncStorage.getItem('password', (err, result) => {
            const pw = result;
            console.log(pw)
            if (pw == null) {
              navigation.replace('Main')
            }
            else {
              navigation.replace('Password')
            }
          })
        })
        .catch(err => {
          console.log('로그인 오류')
          Promise.reject(err)
          navigation.replace('Test')
        })
    }
  }

  useEffect(() => {
    hiddenLogin()
  }, [hidden])

  // // 카카오 소셜 로그인
  // const signInWithKakao = async (): Promise<void> => {
  //   const token: KakaoOAuthToken = await login()
  // };

  // // const signOutWithKakao = async (): Promise<void> => {
  // //   const message = await logout();
  // // };

  // // 카카오 프로필 가져오기
  // const getKakaoProfile = async (): Promise<void> => {
  //   const profile: KakaoProfile = await getProfile()
  //   setResult(profile)
  // }

  // useEffect(() => {
  //   log_in()
  // }, [result])

  // const log_in = () => {
  //   // 카카오 로그인 성공하면(실패 시 로그인 안되는 건 카카오가 해줌)
  //   // 받아온 카카오프로필 id, nickname으로 요청 보냄(카카오 로그인 성공 시 무조건 성공)
  //   // storage에 access토큰, refresh토큰, userId, 기존회원 set
  //   if (result) {
  //     http.post('/user/login', {
  //       authId: result.id,
  //       nickname: result.nickname,
  //     })
  //       .then(res => {
  //         console.log(res.data)
  //         AsyncStorage.setItem('token', res.data.accessToken)
  //         AsyncStorage.setItem('refresh', res.data.refreshToken)
  //         AsyncStorage.setItem('userId', res.data.userId)

  //         // pw 있으면 pw, 없으면 main으로
  //         AsyncStorage.getItem('password', (err, result) => {
  //           const pw = result;
  //           console.log(pw)
  //           if (pw == null) {
  //             navigation.replace('Main')
  //           }
  //           else {
  //             navigation.replace('Password')
  //           }
  //         })
  //       })
  //       .catch(err => {
  //         console.log('로그인 오류')
  //         navigation.replace('Test2')
  //       })
  //   }
  // };


  // const unlinkKakao = async (): Promise<void> => {
  //   const message = await unlink();
  //   setResult(message);
  // };

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 0.85 }}>
        <TouchableOpacity onPress={increase}>
          <Image source={logo} style={{ width: 150, height: 150, marginTop: '40%' }} />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 30, fontFamily: 'GangwonEduAllBold' }}>마시멜로일기</Text>
        </View>
      </View>

      {/* <Pressable style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }} onPressIn={signInWithKakao} onPressOut={getKakaoProfile}>
        <Image source={kakao} />
      </Pressable> */}
    </View>
  )
};

export default Login;
