import React from 'react';
import { Text, View, Image } from 'react-native'; 
import Footer from '../../components/component/Footer';
import ChipYellow from '../../components/component/ChipYellow';
import { Icon } from '@rneui/themed'; 
import { Chip } from "@react-native-material/core";
import PieChart from 'react-native-pie-chart';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png'
import mm_negative from '../../../assets/images/mm/mm_negative.png'


const Analysis = () => {
    const widthAndHeight = 225
    const series = [60, 25, 15]
    const sliceColor = ['#91C788','#FBC687','#F38181']

    return (
        <View style={{ backgroundColor:'#FFF9F8', flex: 1}}>
          <View style={{ alignItems:'center', justifyContent:'center', marginTop:'15%' }} >
            <Text style={{ fontSize:25, fontWeight:'bold' }}>김싸피님의 감정 분석 레포트</Text>
          </View>

          <View style={{flex: 1.2, flexDirection:'row' }}>
            <View style={{ marginLeft:'7.5%', justifyContent:'center'}} >
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
              />
            </View>
            <View style={{ marginTop:'5%', alignItems:'center', flex: 1, marginRight:'3%' }}>
              <ChipYellow label='일주일'/>
              <View style={{ flexDirection:'row', marginTop:'25%' }}>
                <Image source={mm_positive} style={{ width:23, height:23 }} />
                <Text style={{fontSize:15, marginLeft:'3%'}}>긍정</Text>
              </View>
              <View style={{ flexDirection:'row', marginTop:'15%' }}>
                <Image source={mm_neutral} style={{ width:23, height:23 }} />
                <Text style={{fontSize:15, marginLeft:'3%'}}>중립</Text>
              </View>
              <View style={{ flexDirection:'row', marginTop:'15%' }}>
                <Image source={mm_negative} style={{ width:23, height:23 }} />
                <Text style={{fontSize:15, marginLeft:'3%'}}>부정</Text>
              </View>
            </View>
          </View>

          {/* 나중에 ai 응답으로 대체 */}
          <View style={{flex: 0.8, backgroundColor:'rgba(217,217,217,0.3)', borderRadius:20, marginLeft:'5%', marginRight:'5%' }}>
            <View style={{ fontSize:15, marginTop:'5%', marginLeft:'5%'}}>
              <Text>오늘은 즐거운 하루셨군요!</Text>
              <Text>내일도 즐거운 하루 되시기 바랍니다~</Text>
            </View>
          </View>

          <View style={{ flex: 0.3, alignItems:'center', justifyContent:'center' }}>
            <Chip style={{ alignItems:'center', justifyContent:'center', backgroundColor:'#FFEBA5', width:'30%' }}>
              <Icon name='share' type='fontisto' />
              <Text style={{ fontSize:17 }}>  공유하기 </Text>
            </Chip>
          </View>
          <Footer />
        </View>
    )
};

export default Analysis;