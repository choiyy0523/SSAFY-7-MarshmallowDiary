import React from 'react';
import { Button } from 'react-native';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Footer from '../../components/component/Footer';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import { Icon } from '@rneui/themed';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const Main = ({ navigation }) => {
  var today = new Date();

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month + '-' + day;


  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Calendar
          style={{ marginTop: '5%' }}
          monthFormat={'yyyy년 MM월'}
          // markedDates={{
          //   '2022-10-25': { marked: true, dotcolor: '#91C788' },
          //   '2022-10-26': { marked: true, dotColor: '#FBC687' },
          //   '2022-10-27': { marked: true, dotColor: '#F38181' },
          //   // '2022-10-28': {selected:true, selectedColor:'#D9D9D9', color:'black'},
          //   dateString: { selected: true, selectedColor: '#D9D9D9', color: 'black' }
          // }}
          // markingType={'custom'}
          // markedDates={{
          //   '2022-10-28' : {
          //     customStyles: {
          //       container: {
          //         backgroundColor: '#D9D9D9'
          //       },
          //       text: {
          //         color: 'black',
          //       }
          //     }
          //   },
          //   '2022-10-27' : {
          //     customStyles: {
          //       marked: {
          //         color: 'green',
          //       }
          //     }
          //   },
          // }}
          renderArrow={(direction) => direction === "left" ? (
            <Icon name="left" type='antdesign' size={20} color="#000000" />
          ) : (
            <Icon name="right" type='antdesign' size={20} color="#000000" />
          )
          }
        />
      </View>
      <View style={{ flex: 0.3, backgroundColor: 'rgba(217,217,217,0.3)', borderRadius: 20, marginLeft: '20%', marginRight: '20%' }}>
        <View style={{ fontSize: 15, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text>요즘 기분이 좋으신가봐요</Text>
          <Text>오늘도 좋은 하루였길 바라요</Text>
        </View>
      </View>
      <View style={{ flex: 0.1 }}>
        
      </View>
      <Footer />
    </View>
  )
};

export default Main;