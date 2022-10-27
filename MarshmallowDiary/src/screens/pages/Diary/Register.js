import React from 'react';
import { StyleSheet, TextInput, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ShowPicker = () => {
  //launchImageLibrary : 사용자 앨범 접근
  launchImageLibrary({}, (res) => {
    alert(res.assets[0].uri)
    const formdata = new FormData()
    formdata.append('file', res.assets[0].uri);
    console.log(res);
  })
}

// const SelectWeather = () => { 날짜 선택 모달 띄우는 창 구현 필요

// }

function Register() {
  return (
    <View style={{ marginLeft: 15, marginRight: 15 }}>
      <View style={styles.diaryHeader}>
        <Text style={{ fontSize: 18 }}>22.10.27  </Text>
        <Image
          source={require('../../../assets/images/weather/1_sunny.png')}
          style={{ width: 25, height: 25 }}
        />
      </View>
      {/* <Text>{`\n`}</Text> */}
      <TextInput placeholder="제목을 입력하세요." style={styles.titleInput} />
      {/* <Text>{`\n`}</Text> */}
      <View style={styles.imagePlace}>
        <TouchableOpacity
          onPress={ShowPicker}
          style={styles.imageInputButton}>
          <Image
            style={{
              width: 42,
              height: 42,
            }}
            source={require('../../../assets/images/etc/photo.png')}
          />
        </TouchableOpacity>
      </View>
      {/* <Text>{`\n`}</Text> */}

      <TextInput placeholder="오늘의 기록을 남겨보세요." style={styles.diaryInput} multiline={true} />
    </View>
  );
}

/* option 사용법
launchCamera({saveToPhotos:true}, response=>{
  this.setState({
    avatar: response.uri
  })
})
*/


const styles = StyleSheet.create({
  diaryHeader: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 5,
    fontFamily: 'GangwonEduAllBold',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  block: {
    height: 64,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
  },
  titleInput: {
    marginTop: 20,
    fontSize: 15,
    paddingVertical: 8,
    fontFamily: 'GangwonEduAllBold',
    height: 50,
    paddingHorizontal: 16,
    borderColor: 'rgba(217,217,217,0.3)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(217,217,217,0.3)',
    borderRadius: 18,
  },
  diaryInput: {
    textAlignVertical: "top",
    marginTop: 20,
    fontSize: 15,
    paddingVertical: 20,
    fontFamily: 'GangwonEduAllBold',
    height: 300,
    paddingHorizontal: 16,
    borderColor: 'rgba(217,217,217,0.3)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(217,217,217,0.3)',
    borderRadius: 18,
    multiline: true
  },
  imageInputButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imagePlace: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(217,217,217,0.3)',
    height: 200,
    borderRadius: 20,
  },
})

export default Register;
