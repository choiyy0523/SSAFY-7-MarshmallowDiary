import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../../components/component/Footer';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import negative from '../../../assets/images/character/negative.png'

const Result = () => {
  const [inputs, setInputs] = useState({
    name: '',
  });

  const { keyword } = inputs;

  const onChange = (keyvalue, e) => {
      const { text } = e.nativeEvent
      setInputs({
        ...inputs,
        [keyvalue]: text
      });

    const onReset = () => {
      setInputs({
        keyword: '',
      })
    };
    
    return (
        <View style={{ backgroundColor:'#FFF9F8', flex:1 }}>
          <View style={{ backgroundColor:'#D9D9D9', height:60 }}>
            <View style={{ alignItems:'center', justifyContent:'center' , flex:1, flexDirection:'row' }}>
              <View style={{ backgroundColor:'rgba(255,255,255,0.9)', height:40 , borderRadius:30, 
                  flexDirection:'row', flex:0.8 }}>
                <TextInput 
                  style={{width:'85%', marginLeft:'5%'}}

                  onChange={(e) => onChange("keyword", e)}
                  value={keyword}
                  >
                </TextInput>    
                {keyword === null || keyword === ''|| keyword === undefined ? null : 
                    <TouchableOpacity style={{justifyContent:'center'}} onPress = {() => onReset() } >
                      <Icon name='highlight-off' type='maeterialicons' />
                    </TouchableOpacity>
                }
                
              </View>
              <TouchableOpacity style={{ fontWeight:'bold', marginLeft:'3%' }} onPress = {() => navigation.navigate('Result')}>
                <Icon name='search' type='fontawesome' />
              </TouchableOpacity>
            

          </View>
          <TouchableOpacity style={{ fontWeight: 'bold', marginLeft: '3%' }} onPress={() => navigation.navigate('Result')}>
            <Icon name='search' type='fontawesome' />
          </TouchableOpacity>
        </View>

      {/* 추후 db 데이터 추가 되면 삼항연산자로 분리 */}
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Image source={negative} style={{ width: '25%', height: 90 }} />
        <Text style={{ fontSize: 17, marginTop: '5%' }}>검색 결과가 없습니다</Text>
      </View>
      <Footer />
    </View>
  )
};

export default Result;