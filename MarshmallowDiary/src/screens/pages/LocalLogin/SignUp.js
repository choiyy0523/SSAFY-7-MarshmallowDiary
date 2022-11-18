import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import logo from '../../../assets/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http';
import { Input } from '@rneui/themed';



const SignUp = ({ navigation }) => {

  const [id, setId] = useState()
  const [nick, setNick] = useState()
  const [pass, setPass] = useState()
  console.log('제크')
  console.log(id)

  const idcheck = () => {
    console.log('레몬사탕')
    console.log(id) // 

    http.get(`/user/idcheck?id=${id}`, {
      id: id
    })
      .then(res => {
        console.log(res)
        console.log(res.data.result)
        console.log('사용가능 아이디')
        console.log(id)
        if (res.data.message == "사용할 수 있는 ID 입니다.") {
          alert('사용할 수 있는 아이디 입니다.')
        }
        else {
          console.log(res.data.message == "이미 존재하는 ID 입니다.")
          console.log('중복 아이디')
          console.log(id)
          alert('이미 존재하는 아이디 입니다.')
          console.log(id)
          setId(null)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  const signup = () => {
    if (id != null || pass != null) {
      http.post('/user/signup', {
        accountId: id,
        nickname: nick,
        password: pass
      })
        .then(res => {
          AsyncStorage.setItem('token', res.data.accessToken)
          AsyncStorage.setItem('refresh', res.data.refreshToken)

          AsyncStorage.getItem('password', (err, result) => {
            const pw = result;
            console.log(pw)
            if (pw == null) {
              navigation.replace('LocalLogin')
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
    } else {
      alert('아이디와 비밀번호는 비워둘 수 없습니다!')
    }
  }



  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 0.6, justifyContent: 'center' }}>
        <Image source={logo} style={{ width: 150, height: 150 }} />
        <View>
          <Text style={{ fontSize: 30, fontFamily: 'GangwonEduAllBold' }}>마시멜로일기</Text>
        </View>
      </View>

      <View style={{ flex: 0.4, alignItems: 'center' }}>
        <Input placeholder="Id" onChangeText={text => setId(text)} />
        <TouchableOpacity onPress={idcheck}>
          <Text>중복확인</Text>
        </TouchableOpacity>

        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPass(text)}
        />
        <TouchableOpacity onPress={signup}>
          <Text>가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp