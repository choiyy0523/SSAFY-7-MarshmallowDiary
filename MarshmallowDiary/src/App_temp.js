// // react-native-global-props 구현 확인용 임시 App.js 파일
// // 이게 잘 먹히면 App.js 이름 변경 예정
// // 라이브러리 깃헙의 examples/Main.js 변형

// import React, { useState, useEffect } from "react";
// import { StyleSheet, Platform } from 'react-native';
// import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// import StackNavigation from './navigations/Stack';
// // import SplashScreen from 'react-native-splash-screen';
// // import Theme from './theme/theme';

// import { setCustomView } from './theme/CustomFunctions/setCustomView';
// import { setCustomTextInput } from './theme/CustomFunctions/setCustomTextInput';
// import { setCustomText } from './theme/CustomFunctions/setCustomText'
// import { setCustomImage } from './theme/CustomFunctions/setCustomImage'

// // Creating the custom props that I want that will be plugged into each function
// const customViewProps = {
//   style: {
//     backgroundColor: '#FFF9F8'
//   }
// };

// const customTextInputProps = {
//   style: {
//     backgroundColor: 'rgba(217, 217, 217, 0.3)',
//     fontFamily: 'GangwonEduAllBold',
//   }
// };

// const customTextProps = {
//   style: {
//     fontFamily: 'GangwonEduAllBold',
//     color: '#525252'
//   }
// };

// const customImageProps = {
//   resizeMode: 'cover'
// };

// // const customTouchableOpacityProps = {
// //   hitSlop: { top: 15, right: 15, left: 15, bottom: 15 }
// // };

// // Calling the functions and passing the custom props into their respective params
// setCustomView(customViewProps);
// setCustomTextInput(customTextInputProps);
// setCustomText(customTextProps);
// setCustomImage(customImageProps);
// // setCustomTouchableOpacity(customTouchableOpacityProps);

// const App = () => {
//   // useEffect(() => {
//   //   try {
//   //     setTimeout(() => {
//   //       SplashScreen.hide();
//   //     }, 2000);
//   //   } catch(e) {
//   //     console.warn('에러발생');
//   //     console.warn(e);
//   //   }
//   // });

//   return (
//     <NavigationContainer>
//       <StackNavigation />
//     </NavigationContainer>
//   )
// }

// export default App;


// const styles = StyleSheet.create({

// });