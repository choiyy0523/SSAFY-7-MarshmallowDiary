import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
// import SplashScreen from 'react-native-splash-screen'; 

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
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
    )
}

export default App;