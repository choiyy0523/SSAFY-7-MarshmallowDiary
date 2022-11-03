import React, { useState } from 'react'
import { StyleSheet, Button, TouchableOpacity, Text, View } from 'react-native'
import DatePicker from 'react-native-date-picker'


function DayPicker() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayformatted = `${year}년 ${month}월 ${day}일`;

  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={styles.changeDay}>
          {dayformatted}
          <DatePicker
            modal
            open={open}
            mode="date"
            date={date}
            onConfirm={date => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </Text>
      </TouchableOpacity>

      {/* <Button title="Open"  /> */}

    </View>
  )

}

const styles = StyleSheet.create({
  block: {
    padding: 16,
    // backgroundColor: '#fff9f8',
  },
  changeDay: {
    fontSize: 18,
    color: '#525252',
  },
});


export default DayPicker;
