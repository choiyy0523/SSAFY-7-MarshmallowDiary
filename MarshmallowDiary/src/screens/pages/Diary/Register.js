import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native'
import DayPicker from './DatePicker';
import WeatherPicker from './WeatherPicker';

function Register() {

  return (
    <View>
      <View>
        <DayPicker />
        {/* <WeatherPicker /> */}
      </View>

      <TextInput placeholder="제목을 입력하세요." style={styles.titleInput} />
      <View style={styles.titleInput}>

      </View>
      <TextInput
        placeholder="오늘의 기록을 남겨보세요."
        multiline={true}
        style={styles.diaryInput}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 64,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
  },
  titleInput: {
    fontSize: 15,
    paddingVertical: 8,
    fontFamily: 'GangwonEduAllBold',
    height: 50,
    paddingHorizontal: 16,
    borderColor: '#D9D9D9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
  },
  Diaryinput2: {
    fontSize: 15,
    paddingVertical: 8,
    fontFamily: 'GangwonEduAllLight',
    height: 50,
    paddingHorizontal: 16,
    borderColor: '#D9D9D9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
  }
});



export default Register;
// function Register() {
//   return (
//     // <SafeAreaView style={styles.block} />
//   )

//   // const styles = StyleSheet.create({
//   //   block: {

//   //   }
//   // })
// }

// export default Register;