// 부모
import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import Footer from '../../components/component/Footer';
import DayPicker from './DatePicker';
import WeatherPicker from './WeatherPicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker from './ImagePicker';
import ButtonRegister from '../../components/component/ButtonRegister'
import axios from 'axios'
// import CancleDialogs from '../../components/modal/Diary/Cancel'


function ImagePicker() {
  state = {
    path: ''
  }

  const addImage = () => {
    launchImageLibrary({}, response => {
      this.setState({
        path: response.uri
      })
    })
  }


  return (
    <View>
      <Image source={{ uri: this.state.path }} />
      <View style={styles.imageInput}>
        <TouchableOpacity onPress={addImage}>
          <Image
            source={require('../../../assets/images/etc/photo.png')}
            style={styles.imageButton}
          />
        </TouchableOpacity>
      </View >
    </View>
  )
}


// // 일기 등록
// const DiaryRegister = async () => {
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [weather, setWeather] = useState('')
//   const [date, setDate] = useState('')

//   const formData = new FormData()

//   formData.append("file", files[0]) //files[0] === upload file

//   const diary = [{
//     title: title,
//     content: content,
//     weather: weather,
//     date: date
//   }]

//   const blob = new Blob([JSON.stringify(diary)], { type: "application/json" })

//   formData.append("data", blob) // 또는  formData.append("data", JSON.stringify(value)); // JSON 형식으로 파싱
//   await axios({
//     method: "POST",
//     url: `https://marshmallowdiary.com/api/diary/regist`,
//     // mode: "cors",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
//   })



return (
  <ScrollView >
    {/* <CancleDialogs /> */}
    <View style={styles.block2}>
      {/* 날짜, 날씨, 등록버튼 - 일기장 헤더 */}
      <View style={styles.block}>
        {/* 날짜 선택 */}
        <DayPicker setDate={setDate} />

        {/* 날씨 선택 */}
        <TouchableOpacity setWeather={setWeather} onPress={WeatherPicker} >
          <Image
            source={require('../../../assets/images/weather/1_sunny.png')}
            style={styles.weatherButton}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.block3}>
        {/* 글 등록 버튼 */}
        < ButtonRegister onPress={DiaryRegister}>
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
      {/* <Image source={{ uri: photo }}></Image>
        < View style={styles.imageInput} >
          <TouchableOpacity onPress={showPicker}>
            <Image
              source={require('../../../assets/images/etc/photo.png')}
              style={styles.imageButton}
            />
          </TouchableOpacity>
        </View > */}
      <ImagePicker />

      {/* 일기 작성 */}
      <TextInput
        placeholder="오늘의 기록을 남겨보세요."
        multiline={true}
        style={styles.diaryInput}
        value={content}
        onChangeText={content => setContent(content)}
      />

    </View>
    <Footer />

  </ScrollView >
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
