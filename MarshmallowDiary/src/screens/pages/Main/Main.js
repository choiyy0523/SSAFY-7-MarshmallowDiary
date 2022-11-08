import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Footer from '../../components/component/Footer';
import Calendar from './Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { http } from '../../../api/http'

const Main = ({ navigation }) => {
  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month + '-' + day;

  AsyncStorage.getItem('token', (err, result) => {
    const token = result;
    console.log(token)
  });

  // AsyncStorage.getItem('password', (err, result) => {
  //   const pw = result;
  //   console.log(pw)
  // });

  const [words, setWords] = useState()

<<<<<<< HEAD

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      const token = result;
      console.log(token)
=======
  // const [test, setTest] = useState()
  // AsyncStorage.getItem('token', (err, result) => {
  //   const token = result;
  //   setTest(token)
  // })  
  // console.log('test',test)
>>>>>>> 91ce75e6769efd7ceebfee5b176a0ba2df259e2e

  useEffect(() => {
    // AsyncStorage.getItem('token', (err, result) => {
    //   const token = result;
    //   console.log(token)

      // axios.get('http://k7a303.p.ssafy.io:9090/api/v1/analysis/loyalty', {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // })
      http.get('/analysis/loyalty')
      .then(res => {
        // console.log(res.data)
        // console.log(typeof(res.data))
        Object.entries(res.data).map(([k, v]) => {
          // console.log('value', v)
          setWords(v)
        })
      })
    // });
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor:'#FFF9F8'  }}>
      <View style={{ flex: 1 }}>
        <Calendar />
        {/* <Calendar
          style={{ marginTop: '5%' }}
          monthFormat={'yyyy년 MM월'}
          renderArrow={(direction) => direction === "left" ? (
            <Icon name="left" type='antdesign' size={20} color="#000000" />
          ) : (
            <Icon name="right" type='antdesign' size={20} color="#000000" />
          )
          }
        /> */}
      </View>
      <View style={{ flex: 0.3, backgroundColor: 'rgba(217,217,217,0.3)', borderRadius: 20, marginLeft: '20%', marginRight: '20%' }}>
        <View style={{ fontSize: 15, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text>{words}</Text>
        </View>
      </View>
      <View style={{ flex: 0.1 }}>
        <Button title='Home' onPress={() => navigation.navigate('Home')} />
      </View>
      <Footer />
    </View>
  )
};

export default Main;