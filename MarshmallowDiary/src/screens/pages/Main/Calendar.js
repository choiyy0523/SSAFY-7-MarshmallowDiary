import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { format, addMonths, subMonths, addDays } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns'
import { Icon } from '@rneui/themed';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png'
import mm_negative from '../../../assets/images/mm/mm_negative.png'
import { http } from '../../../api/http'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const Calendar = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  // 한국 시간 기준 오늘 세팅
  var today = new Date();
  const utc = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_today = new Date(utc + KR_TIME_DIFF);

  var year = kr_today.getFullYear();
  var month = ('0' + (kr_today.getMonth() + 1)).slice(-2);
  var day2 = ('0' + kr_today.getDate()).slice(-2);

  var dateString = year + '-' + month + '-' + day2;

  const [currentMonth, setCurrentMonth] = useState(kr_today);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // 달력 구현
  const week = ['일', '월', '화', '수', '목', '금', '토']

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const rows = []
  let days = []
  let day = startDate
  let formattedDate = ''

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd')
      days.push(formattedDate)
      day = addDays(day, 1)
    }

    rows.push(days)
    days = []
  }

  // 이번 달 아닌 날짜 삭제
  for (let x = 0; x < 7; x++) {
    if (rows[0][x] > 10) {
      rows[0][x] = 100
    }
  }

  for (let y = 0; y < 7; y++) {
    if (rows[4][y] < 10) {
      rows[4][y] = 0
    }
  }

  if (rows[5]) {
    for (let z = 0; z < 7; z++) {
      if (rows[5][z] < 10) {
        rows[5][z] = 0
      }
    }
  }

  const targetYear = format(currentMonth, 'yyyy')
  const targetMonth = format(currentMonth, 'MM')

  const [selectedDate, setSelectedDate] = useState(day2)
  const [monthData, setMonthData] = useState()


  const getMonthData = () => {
    http.get(`diary?month=${targetMonth}&year=${targetYear}`)
      .then(res => {
        setMonthData(res.data.list)
      })
      .catch(err => {
        navigation.navigate('LoginCheck')
      })
  }

  // 해당 날짜의 diary 유무 및 감정 판별
  const emotions = []

  if (rows[5]) {
    for (let i = 0; i < 42; i++) {
      emotions.push(0)
    }
  }
  else {
    for (let i = 0; i < 35; i++) {
      emotions.push(0)
    }
  }

  if (monthData) {
    for (let i = 0; i < monthData.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        for (let k = 0; k < rows[j].length; k++) {
          if (monthData[i].day == targetYear + '-' + targetMonth + '-' + ('0' + rows[j][k]).slice(-2)) {
            emotions[7 * j + k] = monthData[i].emotion
          }
        }
      }
    }
  }

  useEffect(() => {
    getMonthData()
  }, [targetMonth, isFocused])

  const monthDays = []
  if (monthData) {
    for (let i = 0; i < monthData.length; i++) {
      monthDays.push(monthData[i].day)
    }
  }

  const movePage = () => {
    if (monthDays.includes(targetYear + '-' + targetMonth + '-' + selectedDate)) {
      navigation.navigate('Detail', { targetDate: targetYear + '-' + targetMonth + '-' + selectedDate })
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#FFF9F8' }}>
      <View style={{ flexDirection: 'row', flex: 0.2, justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
        <TouchableOpacity style={{ flex: 0.2 }} onPress={prevMonth}>
          <Icon name="left" type='antdesign' size={20} color="#000000" />
        </TouchableOpacity>
        <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontFamily:'GangwonEduAllBold' }}>
            {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
          </Text>
        </View>
        <TouchableOpacity style={{ flex: 0.2 }} onPress={nextMonth}>
          <Icon name="right" type='antdesign' size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flex: 0.1, marginTop: '5%' }}>
        {week.map((data, i) => (
          <View style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }} key={i}>
            <Text style={{ fontSize: 20, fontFamily:'GangwonEduAllBold'}}>{data}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: '3%' }}>
        {rows[0].map((data, i) => (
          <Pressable key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }}
            onPressIn={() => setSelectedDate(('0' + data).slice(-2))} onPress={movePage}>
            {dateString == targetYear + '-' + targetMonth + '-' + ('0' + data).slice(-2) ?
              <View style={{ backgroundColor: '#D9D9D9', borderRadius: 30 }}>
                <Text style={{ fontFamily:'GangwonEduAllBold' }}>  {data}  </Text>
              </View>
              : (data < 20) ?
                <Text style={{ fontFamily:'GangwonEduAllBold' }}>
                  {data}
                </Text> : null}
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flex: 0.1 }}>
        {emotions.slice(0, 7).map((data, i) => (
          <View key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }} >
            {data == 0 ? null :
              (data == 'positive') ?
                <Image source={mm_positive} style={{ width: 15, height: 15 }} />
                :
                (data == 'neutral') ?
                  <Image source={mm_neutral} style={{ width: 15, height: 15 }} />
                  :
                  <Image source={mm_negative} style={{ width: 15, height: 15 }} />
            }
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {rows[1].map((data, i) => (
          <Pressable key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }}
            onPressIn={() => { setSelectedDate(('0' + data).slice(-2)) }} onPress={movePage}>
            {dateString == targetYear + '-' + targetMonth + '-' + ('0' + data).slice(-2) ?
              <View style={{ backgroundColor: '#D9D9D9', borderRadius: 30 }}>
                <Text style={{ fontFamily:'GangwonEduAllBold' }}>  {data}  </Text>
              </View>
              :
              <Text style={{ fontFamily:'GangwonEduAllBold' }}>
                {data}
              </Text>}
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flex: 0.1 }}>
        {emotions.slice(7, 14).map((data, i) => (
          <View key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }} >
            {data == 0 ? null :
              (data == 'positive') ?
                <Image source={mm_positive} style={{ width: 15, height: 15 }} />
                :
                (data == 'neutral') ?
                  <Image source={mm_neutral} style={{ width: 15, height: 15 }} />
                  :
                  <Image source={mm_negative} style={{ width: 15, height: 15 }} />
            }
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {rows[2].map((data, i) => (
          <Pressable key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }}
            onPressIn={() => { setSelectedDate(('0' + data).slice(-2)) }} onPress={movePage}>
            {dateString == targetYear + '-' + targetMonth + '-' + ('0' + data).slice(-2) ?
              <View style={{ backgroundColor: '#D9D9D9', borderRadius: 30 }}>
                <Text style={{ fontFamily:'GangwonEduAllBold' }}>  {data}  </Text>
              </View>
              :
              <Text style={{ fontFamily:'GangwonEduAllBold' }}>
                {data}
              </Text>}
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flex: 0.1 }}>
        {emotions.slice(14, 21).map((data, i) => (
          <View key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }} >
            {data == 0 ? null :
              (data == 'positive') ?
                <Image source={mm_positive} style={{ width: 15, height: 15 }} />
                :
                (data == 'neutral') ?
                  <Image source={mm_neutral} style={{ width: 15, height: 15 }} />
                  :
                  <Image source={mm_negative} style={{ width: 15, height: 15 }} />
            }
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {rows[3].map((data, i) => (
          <Pressable key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }}
            onPressIn={() => { setSelectedDate(('0' + data).slice(-2)) }} onPress={movePage}>
            {dateString == targetYear + '-' + targetMonth + '-' + ('0' + data).slice(-2) ?
              <View style={{ backgroundColor: '#D9D9D9', borderRadius: 30 }}>
                <Text style={{ fontFamily:'GangwonEduAllBold' }}>  {data}  </Text>
              </View>
              :
              <Text style={{ fontFamily:'GangwonEduAllBold' }}>
                {data}
              </Text>}
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flex: 0.1 }}>
        {emotions.slice(21, 28).map((data, i) => (
          <View key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }} >
            {data == 0 ? null :
              (data == 'positive') ?
                <Image source={mm_positive} style={{ width: 15, height: 15 }} />
                :
                (data == 'neutral') ?
                  <Image source={mm_neutral} style={{ width: 15, height: 15 }} />
                  :
                  <Image source={mm_negative} style={{ width: 15, height: 15 }} />
            }
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {rows[4].map((data, i) => (
          <Pressable key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }}
            onPressIn={() => { setSelectedDate(('0' + data).slice(-2)) }} onPress={movePage}>
            {dateString == targetYear + '-' + targetMonth + '-' + ('0' + data).slice(-2) ?
              <View style={{ backgroundColor: '#D9D9D9', borderRadius: 30 }}>
                <Text style={{ fontFamily:'GangwonEduAllBold' }}>  {data}  </Text>
              </View>
              : (data > 20) ?
                <Text style={{ fontFamily:'GangwonEduAllBold' }}>
                  {data}
                </Text> : null}
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flex: 0.1 }}>
        {emotions.slice(28, 35).map((data, i) => (
          <View key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }} >
            {data == 0 ? null :
              (data == 'positive') ?
                <Image source={mm_positive} style={{ width: 15, height: 15 }} />
                :
                (data == 'neutral') ?
                  <Image source={mm_neutral} style={{ width: 15, height: 15 }} />
                  :
                  <Image source={mm_negative} style={{ width: 15, height: 15 }} />
            }
          </View>
        ))}
      </View>

      {rows[5] ?
        <View style={{ flexDirection: 'row' }}>
          {rows[5].map((data, i) => (
            <Pressable key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }}
              onPressIn={() => { setSelectedDate(('0' + data).slice(-2)) }} onPress={movePage}>
              {dateString == targetYear + '-' + targetMonth + '-' + ('0' + data).slice(-2) ?
                <View style={{ backgroundColor: '#D9D9D9', borderRadius: 30 }}>
                  <Text style={{ fontFamily:'GangwonEduAllBold' }}>  {data}  </Text>
                </View>
                : (data > 20) ?
                  <Text style={{ fontFamily:'GangwonEduAllBold' }}>
                    {data}
                  </Text> : null}
            </Pressable>
          ))}
        </View> : null}

      {rows[5] ?
        <View style={{ flexDirection: 'row', flex: 0.1 }}>
          {emotions.slice(35, 42).map((data, i) => (
            <View key={i} style={{ flex: 0.14, justifyContent: 'center', alignItems: 'center' }} >
              {data == 0 ? null :
                (data == 'positive') ?
                  <Image source={mm_positive} style={{ width: 15, height: 15 }} />
                  :
                  (data == 'neutral') ?
                    <Image source={mm_neutral} style={{ width: 15, height: 15 }} />
                    :
                    <Image source={mm_negative} style={{ width: 15, height: 15 }} />
              }
            </View>
          ))}
        </View> : null}
    </View>
  )
}

export default Calendar
