import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Button } from 'react-native';
import logo from '../../../assets/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http';
import { Input } from '@rneui/themed';

const LocalLogin = ({ navigation }) => {
  const [id, setId] = useState()
  const [pass, setPass] = useState()

  const login = () => {
    if (id && pass) {
      http.post('/user/signin', {
        accountId: id,
        password: pass
      })
        .then(res => {
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
          Promise.reject(err)
          navigation.navigate('LoginCheck')
        })
      }
    }

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ flex:0.2 }} />
      <View style={{ alignItems: 'center', flex: 0.4, justifyContent: 'center' }}>
        <Image source={logo} style={{ width: 150, height: 150 }} />
        <View>
          <Text style={{ fontSize: 30, fontFamily: 'GangwonEduAllBold' }}>마시멜로일기</Text>
        </View>
        {/* <Button title='로그인체크' onPress={() => navigation.navigate('LoginCheck')} /> */}
      </View>

      <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center', marginLeft: '10%', marginRight: '10%' }}>
        <Input placeholder="Id" onChangeText={text => setId(text)} />
        <Input placeholder="Password" secureTextEntry={true} onChangeText={text => setPass(text)} />
        <View style={{flexDirection:'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ fontFamily:'GangwonEduAllBold'}}>회원가입</Text>
          </TouchableOpacity>
          <View style={{ flex:0.8 }} />
          <TouchableOpacity onPress={login}>
            <Text style={{ fontFamily:'GangwonEduAllBold'}}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LocalLogin
