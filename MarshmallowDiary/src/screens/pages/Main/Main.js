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
          <Text>Main</Text>
          <Button title='go to the home screen' onPress = {() => navigation.navigate('Home')} />
          <Button title='go to the search screen' onPress = {() => navigation.navigate('Search')} />
          <Button title='go to the password screen' onPress = {() => navigation.navigate('Password')} />
          <Text>{"\n"}</Text>
          <Footer />
        </SafeAreaView>
    )
};

export default Main;