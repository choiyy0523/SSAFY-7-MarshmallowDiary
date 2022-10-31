import React from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native'

function Register() {
  return (
    <View>
      <Text>날짜 입력 구현 예정</Text>
      <TextInput placeholder="제목을 입력하세요." style={styles.titleInput} />
      <TextInput placeholder="오늘의 기록을 남겨보세요." style={styles.diaryInput} />
      <Button title='버튼' />
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