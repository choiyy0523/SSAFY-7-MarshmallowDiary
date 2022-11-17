import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../../assets/logo.png'

const SignUp = ({ navigation }) => {


  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 0.85 }}>
        <TouchableOpacity >
          <Image source={logo} style={{ width: 150, height: 150, marginTop: '20%' }} />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 30, fontFamily: 'GangwonEduAllBold' }}>마시멜로일기</Text>
        </View>
      </View>
      <Text>SignUp</Text>
    </View>
  )
}

export default SignUp;