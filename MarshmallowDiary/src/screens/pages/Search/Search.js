import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Footer from '../../components/component/Footer';
import positive from '../../../assets/images/character/positive.png'
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Search = ({ navigation }) => {
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

  };

  const onReset = () => {
    setInputs({
      keyword: '',
    })
  };

  const search = () => {
    if (inputs.keyword) {
      navigation.navigate('Result', { searchWord: keyword })
    }
  }

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ backgroundColor: '#D9D9D9', height: 60 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', height: 40, borderRadius: 30, flexDirection: 'row', flex: 0.8 }}>
            <TextInput
              style={{ width: '85%', marginLeft: '5%' }}
              onChange={(e) => onChange("keyword", e)}
              value={keyword}
            >
            </TextInput>

            {keyword === null || keyword === '' || keyword === undefined ? null :
              <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => onReset()} >
                <Icon name='highlight-off' type='maeterialicons' />
              </TouchableOpacity>
            }
          </View>

          <TouchableOpacity style={{ fontWeight: 'bold', marginLeft: '3%' }} onPress={search}>
            <Icon name='search' type='fontawesome' />
          </TouchableOpacity>
        </View>
      </View>


      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
        <Image source={positive} style={{ width: '25%', height: 90 }} />
        <Text style={{ fontSize: 17, marginTop: '5%' }}>다시 보고 싶은 일기가 있으신가요?</Text>
      </View>
      <Footer />
    </View>
  )
};

export default Search;