import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TextInput, Alert, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import Footer from '../../components/component/Footer';
import DayPicker from './DatePicker';
import WeatherPicker from './WeatherPicker';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonRegister from '../../components/component/ButtonRegister'
import SelectImages from './SelectImages';
import axios from '../../../axios.Config'
import { connect } from 'react-redux'

// const mapStateToProps = (state) => ({
//   token: state
// })

// const mapDispatchToProps = (dispatch) => ({
//   requestLogout: () => dispatch(requestLogout())
// })

var date = new Date().getDate()
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

class DiaryRegister extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      diaryTitle: '',
      diaryContent: '',
      diaryWeather: '1',
    }
  }

  submission = async () => {
    const diary = {
      title: this.state.diaryTitle,
      content: this.state.diaryContent,
      weather: this.state.diaryWeather
    }

    await axios.post('/diary/regist/diary/', diary,
      // {
      //   headers: {
      //     'Authorizaion': `Token ${this.props.token.auth.token}`
      //   }
      // }
    )
      .then((res) => {
        this.state.diaryTitle = ''
        this.state.diaryConnent = ''
        alert("등록 완료 되었습니다.")
        this.props.navigation.navigate('Today')
      })
      .catch(err => {
        if (err.response.status === 405) {
          alert("오늘 일기를 이미 작성했습니다.")
          this.props.navigation.navigate('Today')
        }
      })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.block2}>
            {/* 날짜, 날씨, 등록버튼 - 일기장 헤더 */}
            <View style={styles.block}>
              {/* 날짜 */}
              <Text>{year}년  {month}월  {date}일</Text>

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
              < ButtonRegister onPress={() => {
                this.submission();
              }}>
                <Text style={styles.buttonText}>등록</Text>
              </ ButtonRegister>
            </View>

            <View>
              {/* 제목 */}
              <TextInput
                placeholder="제목을 입력하세요."
                style={styles.titleInput}
                value={this.state.diaryTitle}
                onChangeText={text => {
                  this.setState({ diaryTitle: text });
                }} />

              {/* 사진 첨부 */}
              {/* < View style={styles.imageInput} >
                <TouchableOpacity onPress={SelectImages}>
                  <Image
                    source={require('../../../assets/images/etc/photo.png')}
                    style={styles.imageButton}
                  />
                </TouchableOpacity>
              </View > */}
              {/* <SelectImages />

              {/* 일기 작성 */}
              <TextInput
                placeholder="오늘의 기록을 남겨보세요."
                multiline={true}
                style={styles.diaryInput}
                value={this.state.diaryContent}
                onChangeText={(text) => {
                  this.setState({ diaryContent: text })
                }}
              />
            </View>
          </View>
        </ScrollView>
        <Footer />
      </View>

    )
  }
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


// export default connect(mapStateToProps, mapDispatchToProps)(DiaryRegister)
export default DiaryRegister