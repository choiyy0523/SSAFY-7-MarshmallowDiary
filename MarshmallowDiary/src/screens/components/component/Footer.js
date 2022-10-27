import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, TouchableOpacity, Pressable } from 'react-native';
import home from '../../../assets/images/footer/home.png'
import analysis from '../../../assets/images/footer/analysis.png'
import positive from '../../../assets/images/character/positive.png'
import neutral from '../../../assets/images/character/neutral.png'
import negative from '../../../assets/images/character/negative.png'
import search from '../../../assets/images/footer/search.png'
import settings from '../../../assets/images/footer/settings.png'
import { useNavigation, useRoute } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <SafeAreaView>
      <View style={{ height: 60, backgroundColor: '#FFF9F8' }}>
        <View style={{ flexDirection: 'row' }}>
          {route.name === 'Main' ?
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1, height: 60, backgroundColor: 'rgba(251, 198, 135, 0.3)' }} onPress={() => navigation.navigate('Main')}>
              <Image source={home} style={{ width: 33, height: 33 }} />
            </TouchableOpacity> :
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Main')}>
              <Image source={home} style={{ width: 33, height: 33 }} />
            </TouchableOpacity>}

          {route.name === 'Analysis' ?
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1, height: 60, backgroundColor: 'rgba(251, 198, 135, 0.3)' }} onPress={() => navigation.navigate('Analysis')}>
              <Image source={analysis} style={{ width: 33, height: 33 }} />
            </TouchableOpacity> :
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Analysis')}>
              <Image source={analysis} style={{ width: 33, height: 33 }} />
            </TouchableOpacity>
          }

          {/* 오늘 detail 없으면 register, 있으면 detail로 보내는 함수 db 적용 후 작성예정 */}
          {route.name === 'Register' || route.name === 'Detail' ?
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1, height: 60, backgroundColor: 'rgba(251, 198, 135, 0.3)' }} onPress={() => navigation.navigate('Register')}>
              <Image source={positive} style={{ width: 33, height: 33 }} />
            </TouchableOpacity> :
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Register')}>
              <Image source={positive} style={{ width: 33, height: 33 }} />
            </TouchableOpacity>
          }

          {route.name === 'Search' || route.name === 'Result' ?
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1, height: 60, backgroundColor: 'rgba(251, 198, 135, 0.3)' }} onPress={() => navigation.navigate('Search')}>
              <Image source={search} style={{ width: 33, height: 33 }} />
            </TouchableOpacity> :
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Search')}>
              <Image source={search} style={{ width: 33, height: 33 }} />
            </TouchableOpacity>
          }

          {route.name === 'Settings' || route.name === 'Push' ?
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1, height: 60, backgroundColor: 'rgba(251, 198, 135, 0.3)' }} onPress={() => navigation.navigate('Settings')}>
              <Image source={settings} style={{ width: 33, height: 33 }} />
            </TouchableOpacity> :
            <TouchableOpacity style={{ width: '20%', alignItems: 'center', justifyContent: 'center', flex: 1 }} onPress={() => navigation.navigate('Settings')}>
              <Image source={settings} style={{ width: 33, height: 33 }} />
            </TouchableOpacity>
          }


        </View>
      </View>
    </SafeAreaView>
  )
};

export default Footer;