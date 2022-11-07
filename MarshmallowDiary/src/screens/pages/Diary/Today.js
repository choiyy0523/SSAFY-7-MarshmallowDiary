import React from 'react';
import { Text, View, Image, Modal, Button, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Icon } from '@rneui/themed';
import { Chip } from "@react-native-material/core";
import Footer from '../../components/component/Footer';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png'
import mm_negative from '../../../assets/images/mm/mm_negative.png'

const Today = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView >
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '15%' }} >
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>몇월 몇일</Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>김싸피님의 감정</Text>
        </View>

        <View style={styles.vertical}>
          <View style={styles.horizontal}>
            <Image
              source={require('../../../assets/images/mm/mm_positive.png')}
              style={styles.mmSize} />
            <Text style={styles.horizontal}>50%</Text>

          </View>

          <View style={styles.horizontal}>
            <Image
              source={require('../../../assets/images/mm/mm_neutral.png')}
              style={styles.mmSize} />
            <Text style={styles.horizontal}>30%</Text>

          </View>

          <View style={styles.horizontal}>
            <Image
              source={require('../../../assets/images/mm/mm_negative.png')}
              style={styles.mmSize} />
            <Text style={styles.horizontal}>20%</Text>

          </View>

        </View>

        <View >
          <Text >추천 필요</Text>
        </View>



      </ScrollView>
      <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
        <Chip style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBA5', width: '30%' }} >
          <Icon name='share' type='fontisto' />
          <Text style={{ fontSize: 17 }}>  공유하기 </Text>
        </Chip>
      </View>
      <Footer />

    </View>

  )
};

export default Today;

const styles = StyleSheet.create(
  {
    vertical: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 25
    },
    horizontal: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 43,
      paddingHorizontal: 13,
      fontSize: 20,
    },
    mmSize: {
      height: 65,
      width: 65,
    },
    block3: {
      height: 40,
      paddingVertical: 15,
      marginTop: 10,
      marginHorizontal: 85,
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
  }
)