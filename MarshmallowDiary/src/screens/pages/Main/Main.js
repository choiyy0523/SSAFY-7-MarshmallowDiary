import React from 'react';
import { Button } from 'react-native';
import { Text, View, SafeAreaView,StyleSheet,TouchableOpacity, Image } from 'react-native'; 
import Footer from '../../components/component/Footer';


const styles = StyleSheet.create({
  view: { flex:1 },
})

const Main = ({navigation}) => {
    return (
        <SafeAreaView>
          <Button title='go to the password screen' onPress = {() => navigation.navigate('Password')} />
          <Button title='go to the login screen' onPress = {() => navigation.navigate('Login')} />
          <Text>{"\n"}</Text>
          <Footer />
        </SafeAreaView>
    )
};

export default Main;