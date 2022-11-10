import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';

import { Provider as PaperProvider } from 'react-native-paper';
import { Text } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { ThemeProvider } from "styled-components"

// import SplashScreen from 'react-native-splash-screen';

// import { lightTheme, darkTheme } from "./theme/theme";

// import { setCustomText } from 'react-native-global-props'

// const customTextProps = {
//   style: {
//     fontFamily: 'GangwonEduAllBold'
//   }
// }

// setCustomText(customTextProps)

// const fontConfig = {
//   default: {
//     regular: {
//       fontFamily: 'GangwonEduAllBold',
//       fontWeight: 'normal',
//     },
//     medium: {
//       fontFamily: 'GangwonEduAllBold',
//       fontWeight: 'normal',
//     },
//     light: {
//       fontFamily: 'GangwonEduAllBold',
//       fontWeight: 'normal',
//     },
//     thin: {
//       fontFamily: 'GangwonEduAllBold',
//       fontWeight: 'normal',
//     },
//   },

// };

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
// import { lightTheme, darkTheme } from "./theme/theme";
import SplashScreen from "react-native-splash-screen";



const App = () => {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 1500);
    }
    catch (e) {
      console.log(e.message);
    }
  });



  // AsyncStorage.setItem(theme, lightTheme)
  //   .then(() => console.log('테마 변경 성공'))
  //   .catch(e => console.log('테마 변경 실패', e.message))

  return (

    <PaperProvider theme={lightTheme}>
      <NavigationContainer theme={lightTheme} >
        <StackNavigation theme={lightTheme} />
      </NavigationContainer>
    </PaperProvider>

  )
}

export default App;


const styles = StyleSheet.create({

});