import React from 'react'
import { View, Button } from 'react-native'
import { http } from '../../../api/http'

const LogOut = ({navigation}) => {
  const log_out = () => {
    http.post('/user/logout')
    .then(res => {
      console.log(res)
      navigation.navigate('LocalLogin')
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <View>
      <Button title='๋ก๊ทธ์์' onPress={log_out}/>
    </View>
  )
}

export default LogOut