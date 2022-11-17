import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import logo from '../../../assets/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http';
import { Input } from '@rneui/themed';

const SignUp = ({navigation}) => {

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 0.6, justifyContent:'center' }}>
        <Image source={logo} style={{ width: 150, height: 150  }} />
        <View>
          <Text style={{ fontSize: 30, fontFamily:'GangwonEduAllBold' }}>마시멜로일기</Text>
        </View>
      </View>

      <View style={{ flex: 0.4, alignItems:'center'}}>
        <Input placeholder="Id" />
        <Input placeholder="Password" secureTextEntry={true} />
        <TouchableOpacity>
          <Text>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp