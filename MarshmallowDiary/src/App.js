import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
import { RecoilRoot } from 'recoil'; 

import { Provider as PaperProvider } from 'react-native-paper';
import { Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import ChangeDarkModeSwitch from "./screens/pages/Settings/darkSwitch";




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



const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const load = async () => {
    try {
      const nowThemeStirng = await AsyncStorage.getItem('nowTheme');
      const nowTheme = JSON.parse(nowThemeStirng); // 저장된 객체 변환
    } catch (e) {
      console.log("아이스티")
      console.log(e)
      console.log(nowTheme)
    }
  }

  // AsyncStorage.setItem(theme, lightTheme)
  //   .then(() => console.log('테마 변경 성공'))
  //   .catch(e => console.log('테마 변경 실패', e.message))

  return (
    <RecoilRoot>
      <PaperProvider theme={lightTheme}>
        <NavigationContainer theme={lightTheme} >
          <StackNavigation theme={lightTheme} />
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  )
}

export default App;


const styles = StyleSheet.create({

});