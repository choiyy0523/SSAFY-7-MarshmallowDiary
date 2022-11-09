import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import DiaryPictureCarousel from './DiaryPictureCarousel';
import Footer from '../../components/component/Footer';
import WeatherPicker from './WeatherPicker';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonRegister from '../../components/component/ButtonRegister'
import SelectImages from './SelectImages';
import axios from 'axios'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from '../../../api/http'

const Detail = () => {
  // { route, navigation })
  // const { diaryDate } = route.params;
  // const { diaryDetail, setDiaryDetail } = useState()

  // const params = {}

  useEffect(() => {
    http.get('diary/detail', { params: { date: date } })
  })
    .then(res => {
      console.log(res)
      console.log(res.title)
      console.log(res.content)
    })
    .catch(err => {
      console.log(err)
    })

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* 날짜, 날씨, 등록버튼 - 일기장 헤더 */}
        <View style={styles.block}>
          {/* 날짜 */}
          <Text style={styles.dateStyle}> {res.date} </Text>
          {/* 날씨 */}
          <Image
            source={require('../../../assets/images/weather/1.png')}
            style={styles.weatherButton}
          />
        </View>

        {/* 제목 */}
        <Text style={styles.titleInput}>
          {res.title}
        </Text>

        {/* 사진 */}
        {/* <DiaryPictureCarousel /> */}

        {/* 일기 작성 */}
        <Text
          multiline={true}
          style={styles.diaryInput}>
          {res.content}
        </Text>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    height: 64,
    paddingVertical: 20,
    marginTop: 10,
    marginHorizontal: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  dateStyle: {
  },
  weatherButton: {
    marginHorizontal: 15,
    width: 40,
    height: 40,
  },
  submitButton: {
    borderRadius: 18,
    color: 'FFEBA5',
    height: 50,
    fontSize: 15,
    justifyContent: 'flex-end'
  },
  titleInput: {
    fontSize: 15,
    paddingVertical: 8,
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginBottom: 20,
    marginHorizontal: 15,
  },
  imageInput: {
    marginHorizontal: 15,
    paddingVertical: 8,
    height: 100,
    width: 250,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  diaryInput: {
    fontSize: 15,
    paddingVertical: 15,
    height: 250,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginHorizontal: 15,
    textAlignVertical: 'top',
  }
});

export default Detail;