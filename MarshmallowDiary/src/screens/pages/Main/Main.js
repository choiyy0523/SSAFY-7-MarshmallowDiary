import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, Image } from 'react-native'; 
import Footer from '../../components/component/Footer';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'
import mm_positive from '../../../assets/images/mm/mm_positive.png'

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
})

const Main = ({navigation}) => {
  const markedDates = {
    '2022-10-26': { selected: true },
    '2022-10-27': { marked: true },
    '2022-10-28': { marked: true }
  }

    return (
        <View style={{ backgroundColor:'#FFF9F8', flex: 1 }}>
          <View style={{flex:1}}>
            <Calendar 
            style={styles.calendar} 
            monthFormat={'yyyy년 MM월'}
            theme={{
              selectedDayBackgroundColor: 'red',
              arrowColor: '#000000',
              dotColor: 'green',
              todayTextColor: 'yellow',
            }}
            />
          </View>
          <Footer />
        </View>
    )
};

export default Main;