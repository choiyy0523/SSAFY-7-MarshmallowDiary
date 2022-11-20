import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";


const darkTheme = {
  dark: true,
  // fonts: configureFonts(),
  myOwnProperty: true,
  colors: {
    background: '#525252',
    surface: '#525252',
    text: '#fff9f8',
    placeholder: '#fff9f8',
    footBackColor: 'rgba(150, 150, 150, 0.3)',
    iconColor: '#fff9f8'
  }
}

const lightTheme = {
  dark: false,
  // fonts: configureFonts(),
  myOwnProperty: true,
  colors: {
    background: '#fff9f8',
    surface: '#D9D9D9',
    text: '#525252',
    placeholder: '#525252',
    footBackColor: 'rgba(251, 198, 135, 0.3)',
    iconColor: '#525252'
  }
}


// 테마 변경 - AsyncStorage에 데이터 저장 
export default function ChangeTheme() {
  const [theme, setTheme] = useState("")

  // 선택된 값을 value에 저장
  const storeTheme = async (value) => {
    try {
      await AsyncStorage.setItem('selectedTheme', value)
      console.log("테마 변경 완료")
    } catch (error) {
      console.log(error)
    }
  }


  const onChangeInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(e.nativeEvent.text)
  }


  return (
    <View>
      <Storage onPress={storeTheme}><Text>스토리지 저장</Text></Storage>
    </View>
  );


}