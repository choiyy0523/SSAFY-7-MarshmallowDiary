import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../../components/component/Footer';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import negative from '../../../assets/images/character/negative.png'
import Pagination from './Pagination';
import positive from '../../../assets/images/character/positive.png'
import { http } from '../../../api/http'

const Result = ({ route, navigation }) => {
  const { searchWord } = route.params;
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    http.post('/diary/search', {
      keyword: searchWord
    })
      .then(res => {
        setSearchResult(res.data.list)
      })
      .catch(err => {
        navigation.navigate('LoginCheck')
      })
  }, [])

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
      navigation.reset({ routes: [{ name: "Result", params: { searchWord: keyword } }] })
    }
  }

  const [limit, setLimit] = useState(2); // 한 페이지 당 갯수
  const [page, setPage] = useState(1); // 현재 페이지 deafult = 1
  const offset = (page - 1) * limit; // 현재 페이지 첫 index

  // 페이지 변경
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ backgroundColor: '#D9D9D9', height: 60 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.9)', height: 40, borderRadius: 30,
            flexDirection: 'row', flex: 0.8
          }}>
            <TextInput
              style={{ width: '85%', marginLeft: '5%', fontFamily:'GangwonEduAllBold' }}
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


      {searchResult == undefined || (searchResult != undefined && searchResult.length == 0) ?
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image source={negative} style={{ width: '25%', height: 90 }} />
          <Text style={{ fontSize: 17, marginTop: '5%', fontFamily:'GangwonEduAllBold' }}>검색 결과가 없습니다</Text>
        </View>
        :
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.1, fontSize: 15 }}>
            <Text style={{ fontFamily:'GangwonEduAllBold' }}>검색 결과</Text>
          </View>

          {searchResult.slice(offset, offset + limit).map((data, i) => (
            <TouchableOpacity key={i} style={{ flex: 0.4, backgroundColor: 'rgba(217, 217, 217, 0.3)', borderRadius: 30, marginLeft: '5%', marginRight: '5%', flexDirection: 'row', marginBottom: '5%' }}
            onPress={() => {navigation.navigate('Detail', {targetDate: data.date} )}}>
              <View style={{ flex: 0.4 }}>
                <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily:'GangwonEduAllBold' }}>{data.date}</Text>
                </View>
                {!data.header_img ?
                  <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={positive} style={{ width: 70, height: 70 }} />
                  </View> :
                  <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: `https://marshmallow-bucket.s3.ap-northeast-2.amazonaws.com/${data.header_img}` }} style={{ width: 60, height: 60 }} />
                  </View>}
                <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily:'GangwonEduAllBold' }}>{data.title}</Text>
                </View>
              </View>
              <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily:'GangwonEduAllBold' }}>
                  {data.sub_content}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {searchResult.length % 2 && page == (searchResult.length + 1) / 2 ? <View style={{ flex: 0.4 }} /> : null}

          <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
            <Pagination
              total={searchResult.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </View>
        </View>
      }
      <Footer />
    </View>
  )
};

export default Result;
