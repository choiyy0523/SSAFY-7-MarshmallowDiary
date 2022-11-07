import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import Footer from '../../components/component/Footer';
import DayPicker from './DatePicker';
import WeatherPicker from './WeatherPicker';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonRegister from '../../components/component/ButtonRegister'
import SelectImages from './SelectImages';
import axios from 'axios'
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
// import CancleDialogs from '../../components/modal/Diary/Cancel'


// 다이어리 먼저 등록
function DiaryRegister() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [weather, setWeather] = useState('')
  const [date, setDate] = useState('')

  // function DiaryRegister() {
  axios.post('https://marshmallowdiary.com/api/diary/regist',
    { title: title, content: content, weather: weather, date: date },
    {
      headers: {
        'Content-Type': 'application/json',
        // authorization: accessToken,
      },
    },

  )
    .then((response) => {
      console.log(response.data);
      const diarydate = data.date
      console.log(diarydate)
    })
    ;

  // // 파일 이름
  // const imgName = ref < string > ('');

  // 파일 데이터
  // const formData = new FormData();

  // // 파일 변경 이벤트
  // const changeImg = async (e) => {
  //   imgName.value = e.target.files[0].name;
  //   formData.append('file', e.target.files[0], imgName.value);
  //   previewImg.value = window.URL.createObjectUrl(e.target.files[0])
  // }

  // 다이어리 등록 후 사진 등록
  // async function uploadImage() {
  //   await DiaryRegisterAsync(2000);
  //   formData.append('date', diary.date.toString());

  //   const result = await imgUpload(formData)

  //   const headers = {
  //     'Content-Type': 'multipart / form - data; boundary=someArbitraryUniqueString'
  //   };

  //   console.log(result);


  //   axios.post('https://marshmallowdiary.com/api/diary/regist/photo/{``}', formdata, { headers: headers })
  //     .then(response => {
  //       if (response) {
  //         console.log(response.data)
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         // 업로드 성공시 200 반환
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log('Error', error.message);
  //       }
  //     })
  // }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView  >
        {/* <CancleDialogs /> */}
        <View style={styles.block2}>
          {/* 날짜, 날씨, 등록버튼 - 일기장 헤더 */}
          <View style={styles.block}>
            {/* 날짜 선택 */}
            <DayPicker />

            {/* 날씨 선택 */}
            < TouchableOpacity onPress={WeatherPicker} >
              <Image
                source={require('../../../assets/images/weather/1_sunny.png')}
                style={styles.weatherButton}
              />
            </ TouchableOpacity>
          </View>

          <View style={styles.block3}>
            {/* 글 등록 버튼 */}
            < ButtonRegister onPress={() => DiaryRegister(this)}>
              <Text style={styles.buttonText}>등록</Text>
            </ ButtonRegister>
          </View>
        </View >


        <View>
          {/* 제목 */}
          < TextInput
            placeholder="제목을 입력하세요."
            style={styles.titleInput}
            value={title}
            onChangeText={title => setTitle(title)} />

          {/* 사진 첨부 */}
          {/* < View style={styles.imageInput} >
            <TouchableOpacity onPress={SelectImages}>
              <Image
                source={require('../../../assets/images/etc/photo.png')}
                style={styles.imageButton}
              />
            </TouchableOpacity>
          </View > */}
          {/* <SelectImages /> */}

          {/* 일기 작성 */}
          <TextInput
            placeholder="오늘의 기록을 남겨보세요."
            multiline={true}
            style={styles.diaryInput}
            value={content}
            onChangeText={content => setContent(content)}
          />

        </View>
      </ScrollView >
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    height: 64,
    paddingVertical: 20,
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  block2: {
    height: 64,
    marginHorizontal: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  block3: {
    height: 64,
    paddingVertical: 15,
    marginTop: 10,
    marginHorizontal: 85,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  weatherButton: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    marginVertical: -10,
  },
  buttonText: {
    // fontFamily: 'GangwonEduAllBold',
    fontSize: 15,
    fontWeight: 'Bold'
  },
  titleInput: {
    fontSize: 15,
    paddingVertical: 8,
    // fontFamily: 'GangwonEduAllBold',
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 15,
  },
  imageInput: {
    paddingVertical: 8,
    height: 100,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginBottom: 20,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageButton: {
    width: 45,
    height: 45,
    opacity: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  diaryInput: {
    fontSize: 15,
    paddingVertical: 15,
    // fontFamily: 'GangwonEduAllLight',
    height: 250,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginHorizontal: 15,
    textAlignVertical: 'top',
  }
});

export default DiaryRegister;
