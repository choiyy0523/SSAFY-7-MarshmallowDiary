import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import home from '../../../assets/images/footer/home.png';
import analysis from '../../../assets/images/footer/analysis.png';
import positive from '../../../assets/images/character/positive.png';
import neutral from '../../../assets/images/character/neutral.png';
import negative from '../../../assets/images/character/negative.png';
import search from '../../../assets/images/footer/search.png';
import settings from '../../../assets/images/footer/settings.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import {http} from '../../../api/http';
import {useIsFocused} from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  // register / detail 캐릭터 구분용
  const [loyalty, setLoyalty] = useState();

  var today = new Date();
  const utc = today.getTime() + today.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_today = new Date(utc + KR_TIME_DIFF);

  var year = kr_today.getFullYear();
  var month = ('0' + (kr_today.getMonth() + 1)).slice(-2);
  var day2 = ('0' + kr_today.getDate()).slice(-2);

  var dateString = year + '-' + month + '-' + day2;

  // 오늘 diary 유무 확인
  const [written, setWritten] = useState();

  useEffect(() => {
    http
      .get('/analysis/loyalty')
      .then(res => {
        setLoyalty(Object.keys(res.data)[0]);
      })
      .catch(err => {
        navigation.navigate('LoginCheck');
      });

    // detail 삭제시 register로
    http
      .get(`/diary/detail/${dateString}`)
      .then(res => {
        setWritten(true);
      })
      .catch(err => {
        setWritten(false);
      });
  }, [isFocused]);

  return (
    <View>
      <View style={{height: 60, backgroundColor: '#FFF9F8'}}>
        <View style={{flexDirection: 'row'}}>
          {route.name === 'Main' ? (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                height: 60,
                backgroundColor: 'rgba(251, 198, 135, 0.3)',
              }}>
              <Image source={home} style={{width: 33, height: 33}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => navigation.navigate('Main')}>
              <Image source={home} style={{width: 33, height: 33}} />
            </TouchableOpacity>
          )}

          {route.name === 'Analysis' ? (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                height: 60,
                backgroundColor: 'rgba(251, 198, 135, 0.3)',
              }}>
              <Image source={analysis} style={{width: 33, height: 33}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => navigation.navigate('Analysis')}>
              <Image source={analysis} style={{width: 33, height: 33}} />
            </TouchableOpacity>
          )}

          {/* 오늘 detail 없으면 register, 있으면 detail로 보내는 함수 db 적용 후 작성예정 */}
          {route.name === 'Register' || route.name === 'Today' ? (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                height: 60,
                backgroundColor: 'rgba(251, 198, 135, 0.3)',
              }}>
              {loyalty == '0' ? (
                <Image source={positive} style={{width: 33, height: 33}} />
              ) : loyalty == '1' ? (
                <Image source={neutral} style={{width: 33, height: 33}} />
              ) : (
                <Image source={negative} style={{width: 33, height: 33}} />
              )}
            </TouchableOpacity>
          ) : written ? (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() =>
                navigation.navigate('Detail', {targetDate: dateString})
              }>
              {loyalty == '0' || loyalty == undefined ? (
                <Image source={positive} style={{width: 33, height: 33}} />
              ) : loyalty == '1' ? (
                <Image source={neutral} style={{width: 33, height: 33}} />
              ) : (
                <Image source={negative} style={{width: 33, height: 33}} />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => navigation.navigate('Register')}>
              {loyalty == '0' || loyalty == undefined ? (
                <Image source={positive} style={{width: 33, height: 33}} />
              ) : loyalty == '1' ? (
                <Image source={neutral} style={{width: 33, height: 33}} />
              ) : (
                <Image source={negative} style={{width: 33, height: 33}} />
              )}
            </TouchableOpacity>
          )}

          {route.name === 'Search' || route.name === 'Result' ? (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                height: 60,
                backgroundColor: 'rgba(251, 198, 135, 0.3)',
              }}>
              <Image source={search} style={{width: 33, height: 33}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => navigation.navigate('Search')}>
              <Image source={search} style={{width: 33, height: 33}} />
            </TouchableOpacity>
          )}

          {route.name === 'Settings' || route.name === 'Push' ? (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                height: 60,
                backgroundColor: 'rgba(251, 198, 135, 0.3)',
              }}>
              <Image source={settings} style={{width: 33, height: 33}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              onPress={() => navigation.navigate('Settings')}>
              <Image source={settings} style={{width: 33, height: 33}} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Footer;
