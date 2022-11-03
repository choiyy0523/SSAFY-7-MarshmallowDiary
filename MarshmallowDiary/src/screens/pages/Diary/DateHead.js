import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

function DateHead({ date }) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formatted = `${year}년 ${month}월 ${day}일`;

  return (
    <>
      <StatusBar backgroundColor='#fff9f8' barStyle="dark-content" />
      <View style={styles.block}>
        <Text style={styles.dateText}>{formatted}</Text>
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  block: {
    padding: 16,
    // backgroundColor: '#fff9f8',
  },
  dateText: {
    fontSize: 20,
  },
});

export default DateHead;