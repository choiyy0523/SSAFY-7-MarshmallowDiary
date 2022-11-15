import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';


const Privacy = () => {
  // input : 사용자 입력값
  const [input, setInput] = useState('')
  const route = useRoute();

  AsyncStorage.getItem('password', (err, result) => {
    const pw = result;
    // password에서 사용자 입력값 4자리와 storage pw 일치시 Main, 틀리면 입력값 초기화 
    if (route.name == 'Password') {
      if (input.length >= 4) {
        if (input.slice(0, 3) == pw) {
          navigation.replace('Main')
        }
        else {
          setInput('')
        }
      }
    }
  }); 

  const row1 = [1, 2, 3]
  const row2 = [4, 5, 6]
  const row3 = [7, 8, 9]
  const row =[row1, row2, row3]

  return (
    <View style={{ backgroundColor:'#FFF9F8', flex:1 }} >
      <Text style={{ marginTop: '25%', textAlign: 'center', fontSize: 18, fontFamily:'GangwonEduAllBold' }}>암호를 입력해 주세요</Text>
      <View style={{ flexDirection: 'row', flex: 0.3 , alignItems: 'center', justifyContent: 'center' }}>
        {input[0] == undefined ? <Image source={mm_neutral} style={{ width: 30, height: 30 }} /> : <Image source={mm_positive} style={{ width: 30, height: 30 }} />}
        {input[1] == undefined ? <Image source={mm_neutral} style={{ width: 30, height: 30 }} /> : <Image source={mm_positive} style={{ width: 30, height: 30 }} />}
        {input[2] == undefined ? <Image source={mm_neutral} style={{ width: 30, height: 30 }} /> : <Image source={mm_positive} style={{ width: 30, height: 30 }} />}
        {input[3] == undefined ? <Image source={mm_neutral} style={{ width: 30, height: 30 }} /> : <Image source={mm_positive} style={{ width: 30, height: 30 }} />}
      </View>

      {row.map((data, i) => (
        <View key={i} style={{ flexDirection: 'row', flex:0.15 }}>
          {data.map((data2, j) => (
            <TouchableOpacity  key={j} style={{ width: '33.3%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+data2)}} >
              <Text style={{ fontSize: 18, fontFamily:'GangwonEduAllBold' }}>{data2}</Text>
            </TouchableOpacity>
          ))}
      </View>
      ))}

      <View style={{ flexDirection: 'row', flex: 0.15  }}>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput('')}}>
          <Text style={{ fontSize: 18, fontFamily:'GangwonEduAllBold' }}>초기화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '34%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'0')}}>
          <Text style={{ fontSize: 18, fontFamily:'GangwonEduAllBold' }}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input.slice(0, -1))}}>
          <Text style={{ fontSize: 18, fontFamily:'GangwonEduAllBold' }}>취소</Text>
        </TouchableOpacity>
      </View> 

      <View style={{ flex:0.05 }}>
        <Text style={{ textAlign: 'center', color: '#D9D9D9', fontFamily:'GangwonEduAllBold' }}>비밀번호 분실 시 앱을 재설치 후 다시 로그인하세요</Text>
      </View>
    </View>
  )
};

export default Privacy;