import React, { useState } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { isSameMonth, isSameDay, addDays, parse} from 'date-fns'
import { Icon } from '@rneui/themed';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthStart)

  const rows = []
  let days = []
  let day = startDate
  let formattedDate = ''

  while( day <= endDate ) {
    for (let i=0; i<7; i++) {
      formattedDate = format(day, 'd')
      const cloneDay = day
      days.push(
        <TouchableOpacity key={day} onPress={() => onDateClick(parse(cloneDay))}>
          <Text>
            {formattedDate}
          </Text>
        </TouchableOpacity>
      )
      console.log(formattedDate)
      console.log(day)
      console.log(endDate)
      day = addDays(day, 1)
    }

    rows.push(
      <View key={day}>
        <Text>
          {days}
        </Text>
      </View>
    )
    days = []
  }

  return (
    <View style={{ flex:1 , backgroundColor:'#FFF9F8'}}>
      <View style={{ flexDirection:'row', flex: 0.1, justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity style={{ flex: 0.2 }} onPress={prevMonth}>
          <Icon name="left" type='antdesign' size={20} color="#000000" />
        </TouchableOpacity>
        <View style={{ flex: 0.6, justifyContent:'center', alignItems:'center' }}>
          <Text>
            {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
          </Text>
        </View>
        <TouchableOpacity style={{ flex: 0.2 }} onPress={nextMonth}>
          <Icon name="right" type='antdesign' size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection:'row', flex: 0.1}}>
        <View style={{ flex: 0.15, justifyContent:'center', alignItems:'center' }}>
          <Text>일</Text>
        </View>
        <View style={{ flex: 0.14, justifyContent:'center', alignItems:'center' }}>
          <Text>월</Text>
        </View>
        <View style={{ flex: 0.14, justifyContent:'center', alignItems:'center'}}>
          <Text>화</Text>
        </View>
        <View style={{ flex: 0.14, justifyContent:'center', alignItems:'center' }}>
          <Text>수</Text>
        </View>
        <View style={{ flex: 0.14, justifyContent:'center', alignItems:'center' }}>
          <Text>목</Text>
        </View>
        <View style={{ flex: 0.14, justifyContent:'center', alignItems:'center' }}>
          <Text>금</Text>
        </View>
        <View style={{ flex: 0.14, justifyContent:'center', alignItems:'center' }}>
          <Text>토</Text>
        </View>
      </View>

      <View>
        <Text>
          {rows}
        </Text>
      </View>
      
    </View>
  )
}

export default Calendar