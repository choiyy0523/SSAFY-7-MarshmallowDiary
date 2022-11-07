import React from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import DiaryPictureCarousel from './DiaryPictureCarousel'
import Footer from '../../components/component/Footer';

function Detail() {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* 날짜, 날씨, 등록버튼 - 일기장 헤더 */}
        <View style={styles.block}>
          {/* 날짜 */}
          <Text style={styles.dateStyle}> 2022년 10월 31일 </Text>
          {/* 날씨 */}
          <Image
            source={require('../../../assets/images/weather/1_sunny.png')}
            style={styles.weatherButton}
          />
        </View>

        {/* 제목 */}
        <Text style={styles.titleInput}>
          오늘은 10월 31일입니다.
        </Text>

        {/* 사진 */}
        <DiaryPictureCarousel />

        {/* 일기 작성 */}
        <Text
          multiline={true}
          style={styles.diaryInput}>
          오늘은 10월 31일 입니다. 자율 프로젝트 4주차 입니다. 오늘 점심은 해물잡탕밥이었습니다. 맛있었습니다. 후식은 아메리카노였습니다.
        </Text>
      </View>
      <Footer />
    </View>
  )
};


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