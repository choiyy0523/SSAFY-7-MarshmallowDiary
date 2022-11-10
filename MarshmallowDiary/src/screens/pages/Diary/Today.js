import React, { useEffect, useState } from 'react';
import { Text, View, Image, Modal, Button, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Icon } from '@rneui/themed';
import { Chip } from "@react-native-material/core";
import Footer from '../../components/component/Footer';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png'
import mm_negative from '../../../assets/images/mm/mm_negative.png'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http'



/// DB에서 해당 일자 일기 분석 결과 받아오는 코드

const Today = ({ route }) => {
  const { targetDiary } = route.params;

  var todayDate = targetDiary
  //2022-11-10
  //0123456789

  const TodayYear = todayDate.substr(0, 4)
  const TodayMonth = todayDate.slice(5, 7)
  const TodayDay = todayDate.substr(8)

  const dayformatted2 = `${TodayYear}년 ${TodayMonth}월 ${TodayDay}일`

  const [todayNegative, setTodayNegative] = useState()
  const [todayNeutral, setTodayNeutral] = useState()
  const [todayPositive, setTodayPositive] = useState()
  const [todaySinger, setTodaySinger] = useState()
  const [todayTitle, setTodayTitle] = useState()
  const [todayUrl, setTodayUrl] = useState()

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      axios.get(`http://k7a303.p.ssafy.io:9090/api/v1/analysis/${targetDiary}`,
        {
          headers: {
            Authorization: `Bearer ${result}`
          }
        })
        .then((res) => {
          console.log('그날 일기 분석결과 조회 성공')
          console.log(res.data)
          setTodayNegative(res.data.negative)
          setTodayNeutral(res.data.neutral)
          setTodayPositive(res.data.positive)
          setTodaySinger(res.data.singer)
          setTodayTitle(res.data.title)
          setTodayUrl(res.data.url)
        })
        .catch(err => {
          console.log('그날 일기 분석결과 조회 실패')
          console.log(err)
        })
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView >
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '15%' }} >
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{dayformatted2}</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>감정 분석 결과</Text>
        </View>

        <View style={styles.vertical}>
          <View style={styles.horizontal}>
            <Image
              source={require('../../../assets/images/mm/mm_positive.png')}
              style={styles.mmSize} />
            <Text style={styles.horizontal}>{todayPositive}%</Text>

          </View>

          <View style={styles.horizontal}>
            <Image
              source={require('../../../assets/images/mm/mm_neutral.png')}
              style={styles.mmSize} />
            <Text style={styles.horizontal}>{todayNeutral}%</Text>

          </View>

          <View style={styles.horizontal}>
            <Image
              source={require('../../../assets/images/mm/mm_negative.png')}
              style={styles.mmSize} />
            <Text style={styles.horizontal}>{todayNegative}%</Text>

          </View>

        </View>

        <View >
          <Text> 오늘의 추천 노래 </Text>
          <Text >{todaySinger}</Text>
          <Text >{todayTitle}</Text>
          <Text >{todayUrl}</Text>
        </View>



      </ScrollView>
      <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
        <Chip style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBA5', width: '30%' }} >
          <Icon name='share' type='fontisto' />
          <Text style={{ fontSize: 17 }}>  공유하기 </Text>
        </Chip>
      </View>
      <Footer />

    </View>

  )
};

export default Today;

const styles = StyleSheet.create(
  {
    vertical: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 25
    },
    horizontal: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 43,
      paddingHorizontal: 13,
      fontSize: 20,
    },
    mmSize: {
      height: 65,
      width: 65,
    },
    block3: {
      height: 40,
      paddingVertical: 15,
      marginTop: 10,
      marginHorizontal: 85,
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
  }
)