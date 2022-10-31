import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import List from '../screens/List';
import Item from '../screens/Item';
import Analysis from '../screens/pages/Analysis/Analysis'
import Detail from '../screens/pages/Diary/Detail';
import Register from '../screens/pages/Diary/Register'
import Remind from '../screens/pages/Diary/Remind'
import Today from '../screens/pages/Diary/Today';
import Login from '../screens/pages/Login/Login';
import Password from '../screens/pages/Login/Password';
import Main from '../screens/pages/Main/Main';
import Result from '../screens/pages/Search/Result';
import Search from '../screens/pages/Search/Search';
import FAQ from '../screens/pages/Settings/FAQ';
import OpenSource from '../screens/pages/Settings/OpenSource';
import Push from '../screens/pages/Settings/Push';
import PwCheck from '../screens/pages/Settings/PwCheck';
import PwReset from '../screens/pages/Settings/PwReset';
import Settings from '../screens/pages/Settings/Settings';
import Terms from '../screens/pages/Settings/Terms';
import ResetCheck from '../screens/pages/Settings/ResetCheck';

const Stack = createStackNavigator();

const StackNavigation = () => {

  return (
    <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='List' component={List} />
      <Stack.Screen name='Item' component={Item} />
      <Stack.Screen name='Analysis' component={Analysis} />
      <Stack.Screen name='Detail' component={Detail} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Remind' component={Remind} />
      <Stack.Screen name='Today' component={Today} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Password' component={Password} />
      <Stack.Screen name='Main' component={Main} />
      <Stack.Screen name='Result' component={Result} />
      <Stack.Screen name='Search' component={Search} />
      <Stack.Screen name='FAQ' component={FAQ} />
      <Stack.Screen name='OpenSource' component={OpenSource} />
      <Stack.Screen name='Push' component={Push} />
      <Stack.Screen name='PwCheck' component={PwCheck} />
      <Stack.Screen name='PwReset' component={PwReset} />
      <Stack.Screen name='ResetCheck' component={ResetCheck} />
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Terms' component={Terms} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#fff9f8',
  }
});

export default StackNavigation;