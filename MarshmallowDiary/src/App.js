import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { ThemeProvider } from "styled-components"
// import SplashScreen from 'react-native-splash-screen';
// import { lightTheme, darkTheme } from "./theme/theme";


const fontConfig = {
  android: {
    regular: {
      fontFamily: 'GangwonEduAllBold',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'GangwonEduAllBold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'GangwonEduAllBold',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'GangwonEduAllBold',
      fontWeight: 'normal',
    },
  },
};


const darkTheme = {
  dark: true,
  fonts: configureFonts(fontConfig),
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
  fonts: configureFonts(fontConfig),
  myOwnProperty: true,
  colors: {
    background: '#fff9f8',
    surface: '#999696',
    text: '#525252',
    placeholder: '#525252',
    footBackColor: 'rgba(251, 198, 135, 0.3)',
    iconColor: '#525252'
  }
}



const App = () => {
  // useEffect(() => {
  //   try {
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 2000);
  //   } catch(e) {
  //     console.warn('에러발생');
  //     console.warn(e);
  //   }
  // });

  return (
    <PaperProvider theme={darkTheme}>
      <NavigationContainer theme={darkTheme} >
        <StackNavigation theme={darkTheme} />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App;


const styles = StyleSheet.create({

});