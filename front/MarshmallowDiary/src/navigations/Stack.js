import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Analysis from '../screens/pages/Analysis/Analysis';
import Detail from '../screens/pages/Diary/Detail';
import Register from '../screens/pages/Diary/Register';
import Today from '../screens/pages/Diary/Today';
import Login from '../screens/pages/Login/Login';
import LoginCheck from '../screens/pages/Login/LoginCheck';
import Password from '../screens/pages/Login/Password';
import Main from '../screens/pages/Main/Main';
import Result from '../screens/pages/Search/Result';
import Search from '../screens/pages/Search/Search';
import FAQ from '../screens/pages/Settings/FAQ';
import PwCheck from '../screens/pages/Settings/PwCheck';
import PwReset from '../screens/pages/Settings/PwReset';
import Settings from '../screens/pages/Settings/Settings';
import ResetCheck from '../screens/pages/Settings/ResetCheck';
import LocalLogin from '../screens/pages/LocalLogin/LocalLogin';
import SignUp from '../screens/pages/LocalLogin/SignUp';
import LogOut from '../screens/pages/Login/LogOut';
import PwSet from '../screens/pages/Settings/PwSet';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginCheck"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Analysis" component={Analysis} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Today" component={Today} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginCheck" component={LoginCheck} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="PwCheck" component={PwCheck} />
      <Stack.Screen name="PwReset" component={PwReset} />
      <Stack.Screen name="ResetCheck" component={ResetCheck} />
      <Stack.Screen name="PwSet" component={PwSet} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="LocalLogin" component={LocalLogin} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LogOut" component={LogOut} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default StackNavigation;
