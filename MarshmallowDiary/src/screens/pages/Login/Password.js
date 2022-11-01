import React from 'react'; 
import { Text, View } from 'react-native';
import Privacy from '../../components/component/Privacy.js'

const Password = ({navigation}) => {
  // if (int(input.slice(0, 3)) == 유저 패스워드 함수) {
  //   navigation.navigate('Main')
  // }
  // else {
  //   setInput('')
  // }


  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <Privacy />
    </View>
  )
};

export default Password;