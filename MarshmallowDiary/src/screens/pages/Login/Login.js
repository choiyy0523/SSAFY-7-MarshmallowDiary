import React from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native'; 
import logo from '../../../assets/logo.png'
import kakao from '../../../assets/kakao.png'

const Login = () => {
    return (
        <View style={{ backgroundColor:'#FFF9F8', flex:1 }}>
          <View style={{ alignItems:'center' }}>
            <View>
              <Image source={logo} style={{ width:150, height:150, marginTop:'40%' }} />
            </View>
            <View>
              <Text style={{ fontSize:30 }}>마시멜로일기</Text>
            </View>
            <View>
              <Image source={kakao} style={{ marginTop:'40%' }} />
            </View>
          </View>
        </View>
    )
};

export default Login;