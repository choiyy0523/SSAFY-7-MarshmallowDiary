import React from 'react';
import {Button} from 'react-native';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title="일기 조회" onPress={() => navigation.navigate('Detail')} />
      <Button
        title="일기 등록"
        onPress={() => navigation.navigate('Register')}
      />
      <Button title="결과 조회" onPress={() => navigation.navigate('Today')} />
      <Button
        title="환경설정"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="메인"
        onPress={() => navigation.navigate('Main')}
      />
      <Button title="로그인" onPress={() => navigation.navigate('Login')} />
      <Button
        title="로컬로그인"
        onPress={() => navigation.navigate('LocalLogin')}
      />
      <Button
        title="패스워드"
        onPress={() => navigation.navigate('Password')}
      />
      <Button
        title="로그인체크"
        onPress={() => navigation.navigate('LoginCheck')}
      />
      <Button title="로그아웃" onPress={() => navigation.navigate('LogOut')} />
    </View>
  );
};


export default Home;
