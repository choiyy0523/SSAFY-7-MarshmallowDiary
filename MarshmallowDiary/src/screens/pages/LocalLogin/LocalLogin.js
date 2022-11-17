import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../../../assets/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http';
import { Input } from '@rneui/themed';

const LocalLogin = ({navigation}) => {
  const [id, setId] = useState()
  const [pass, setPass] = useState()

  const login = () => {
    http.post('/user/signin', {
      accountId: id,
      password: pass
    })
    .then(res => {
      AsyncStorage.setItem('token', res.data.accessToken)
      AsyncStorage.setItem('refresh', res.data.refreshToken)

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

  // useEffect(() => {
  //   console.log(id)
  // }, [id])

  // useEffect(() => {
  //   console.log(pw)
  // }, [pw])

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 0.6, justifyContent:'center' }}>
        <Image source={logo} style={{ width: 150, height: 150  }} />
        <View>
          <Text style={{ fontSize: 30, fontFamily:'GangwonEduAllBold' }}>마시멜로일기</Text>
        </View>
      </View>

  <View style={{ flex: 0.4, justifyContent:'center', alignItems:'center'}}>
    <Input placeholder="Id" onChangeText={text => setId(text)} />
    <Input placeholder="Password" secureTextEntry={true} onChangeText={text => setPass(text)}/>
    <TouchableOpacity onPress={login}>
      <Text>Login</Text>
    </TouchableOpacity>
    <View style={{flex:0.1}}/>
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text>SignUp</Text>
    </TouchableOpacity>
  </View>
</View>
  )
} 

export default LocalLogin