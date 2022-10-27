import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateHead from './DateHead'


function Detail() {

  const today = new Date();
  // console.log(today);

  return (
    <View styles={StyleSheet.block}>
      <DateHead styles={StyleSheet.dateText} date={today} />
      <Text>일기 조회 화면</Text>
    </View>
  )
};


const styles = StyleSheet.create({
  block: {
    padding: 16,
    backgroundColor: '#fff9f8',
  },
  dateText: {
    fontFamily: 'GangwonEduAllBold',
    fontSize: 20,
    color: '#525252',
  },
});

export default Detail;