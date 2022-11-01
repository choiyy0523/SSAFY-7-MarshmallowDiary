import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png';
import mm_negative from '../../../assets/images/mm/mm_negative.png';



const Privacy = () => {
  const [input, setInput] = useState('')

  return (
    <View style={{ backgroundColor:'#FFF9F8', flex:1 }} >
      <Text style={{ marginTop: '25%', textAlign: 'center', fontSize: 18 }}>암호를 입력해 주세요</Text>
      <View style={{ flexDirection: 'row', marginTop: '10%', alignItems: 'center', justifyContent: 'center' }}>
        {input[0] == undefined ? <Image source={mm_neutral} style={{ width: 30, height: 30 }} /> : <Image source={mm_positive} style={{ width: 30, height: 30 }} />}
        {input[1] == undefined ? <Image source={mm_neutral} style={{ width: 30, height: 30 }} /> : <Image source={mm_positive} style={{ width: 30, height: 30 }} />}
        {input[2] == undefined ? <Image source={mm_neutral} style={{ width: 30, height: 30 }} /> : <Image source={mm_positive} style={{ width: 30, height: 30 }} />}
        {input[3] == undefined ? <Image source={mm_neutral} style={{ width: 30, height: 30 }} /> : <Image source={mm_positive} style={{ width: 30, height: 30 }} />}
      </View>
      <View style={{ flexDirection: 'row', marginTop: '15%' }}>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'1')}} >
          <Text style={{ fontSize: 18 }}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '34%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'2')}}>
          <Text style={{ fontSize: 18 }}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'3')}}>
          <Text style={{ fontSize: 18 }}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: '15%' }}>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'4')}}>
          <Text style={{ fontSize: 18 }}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '34%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'5')}}>
          <Text style={{ fontSize: 18 }}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'6')}}>
          <Text style={{ fontSize: 18 }}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: '15%' }}>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'7')}}>
          <Text style={{ fontSize: 18 }}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '34%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'8')}}>
          <Text style={{ fontSize: 18 }}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'9')}}>
          <Text style={{ fontSize: 18 }}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: '15%' }}>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput('')}}>
          <Text style={{ fontSize: 18 }}>초기화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '34%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input+'0')}}>
          <Text style={{ fontSize: 18 }}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '33%', justifyContent: 'center', flex: 1, alignItems: 'center' }} onPress={() => {setInput(input.slice(0, -1))}}>
          <Text style={{ fontSize: 18 }}>취소</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ marginTop: '15%', textAlign: 'center', color: '#D9D9D9', fontFamily: 'GangwonEduAllLight' }}>비밀번호 분실 시 앱을 재설치 후 다시 로그인하세요</Text>
      </View>
    </View>
  )
};

export default Privacy;