import React, { useEffect, useState } from 'react';
import { Text, View, Image, Modal, Pressable } from 'react-native';
import Footer from '../../components/component/Footer';
import { Icon } from '@rneui/themed';
import { Chip } from "@react-native-material/core";
import PieChart from 'react-native-pie-chart';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png'
import mm_negative from '../../../assets/images/mm/mm_negative.png'
import ch_neutral from '../../../assets/images/character/neutral.png'
import {http} from '../../../api/http'

const Analysis = ({navigation}) => {
  var today = new Date();

  var year = today.getFullYear();
  var month = Number(('0' + (today.getMonth() + 1)).slice(-2));

  const [targetYear, setTargetYear] = useState(year)
  const [targetMonth, setTargetMonth] = useState(month)

  const [positive, setPositive] = useState()
  const [neutral, setNeutral] = useState()
  const [negative, setNegative] = useState()
  const [pcnt, setPcnt] = useState()
  const [ncnt, setNcnt] = useState()
  const [ngcnt, setNgcnt] = useState()
  const [best, setBest] = useState()

  const getMonth = () => {
    http.post('/analysis/month', {
        month: targetMonth,
        year: targetYear
      })
      .then(res => {
        if ( res.data.positive == 0) {
          setPositive(3200)
        }
        else {
          setPositive(res.data.positive)
        }
        if (res.data.neutral == 0) {
          setNeutral(3200)
        }
        else {
          setNeutral(res.data.neutral)
        }
        if (res.data.negative == 0) {
          setNegative(3200)
        }
        else {
          setNegative(res.data.negative)
        }
        setPcnt(res.data.positiveCnt)
        setNcnt(res.data.neutralCnt)
        setNgcnt(res.data.negativeCnt)
        setBest(res.data.bestPositiveDate)
      })
      .catch(err => {
        navigation.navigate('LoginCheck')
      })
    };
  


  const widthAndHeight = 225
  var series = [60, 25, 15]
  series = [Math.round(positive), Math.round(neutral), Math.round(negative)]

  const sliceColor = ['#91C788', '#FBC687', '#F38181']

  useEffect(() => {
    getMonth()
    console.log('p', pcnt, 'n', ncnt, 'ng', ngcnt)
  }, [targetMonth, targetYear])

  const getAll = () => {
      http.get('/analysis/all')
      .then(res => {
        console.log('all', res.data)
        setPositive(res.data.positive)
        setNeutral(res.data.neutral)
        setNegative(res.data.negative)
        setPcnt(res.data.positiveCnt)
        setNcnt(res.data.neutralCnt)
        setNgcnt(res.data.negativeCnt)
        setBest(res.data.bestPositiveDate)
      })
      .catch(err => {
        navigation.navigate('LoginCheck')
      });
    }

  const [isAll, setIsAll] = useState(false)
  const selectAll = () => {
    setIsAll(true)
  }

  const selectMonth = () => {
    setIsAll(false)
  }

  const [visible, setVisible] = useState(false)
  const openModal = () => {
    setVisible(true)
  }
  const closeModal = () => {
    setVisible(false)
  }

  const [visible2, setVisible2] = useState(false)
  const openModal2 = () => {
    setVisible2(true)
  }
  const closeModal2 = () => {
    setVisible2(false)
  }

  const [visible3, setVisible3] = useState(false)
  const openModal3 = () => {
    setVisible3(true)
  }

  const closeModal3 = async() => {
    setVisible3(false)
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '15%' }} >
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>마로의 감정 분석 레포트</Text>
      </View>

      <View style={{ flex: 1.2, flexDirection: 'row' }}>
        <View style={{ marginLeft: '7.5%', justifyContent: 'center', flex: 0.7 }} >
          { pcnt+ncnt+ngcnt == 0 || pcnt == undefined || ncnt == undefined || ngcnt == undefined ?
          <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
            <Image source={ch_neutral} style={{ width:100, height:100 }}/>
            <Text>이 달엔 일기를 쓰지 않았어요</Text>
          </View>
          :
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
          />}
          
        </View>
        <View style={{ marginTop: '5%', alignItems: 'center', flex: 0.3, marginRight: '3%' }}>
          {isAll == true ?
            <Chip style={{ backgroundColor: '#FFEBA5' }} onPress={openModal}><Text>전체</Text></Chip> :
            <Chip style={{ backgroundColor: '#FFEBA5' }} onPress={openModal}><Text>{targetYear}년 {targetMonth}월</Text></Chip>
          }

          <Modal visible={visible} setVisible={setVisible} transparent={true} animationType={'fade'}>
            <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={closeModal}>
              <View style={{ flex: 0.3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 30 }}>
                <Chip style={{ backgroundColor: '#FFEBA5', width: 75, alignItems: 'center' }} onPress={() => { selectMonth(); closeModal(); openModal2(); }}><Text>월별</Text></Chip>

                <View style={{ height: 15 }} />
                <Chip style={{ backgroundColor: '#FFEBA5', width: 75, alignItems: 'center' }} onPress={() => { selectAll(); closeModal(); getAll(); }}><Text>전체</Text></Chip>
              </View>
            </Pressable>
          </Modal>

          <Modal visible={visible2} setVisible={setVisible2} transparent={true} animationType={'fade'}>
            <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flex: 0.5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '90%', borderRadius: 30 }}>
                <View style={{ flex: 0.0625 }} />
                <View style={{ flex: 0.25, flexDirection: 'row' }}>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year - 6); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year - 6}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year - 5); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year - 5}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year - 4); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year - 4}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year - 3); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year - 3}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                </View>
                <View style={{ flex: 0.0625 }} />
                <View style={{ flex: 0.25, flexDirection: 'row' }}>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year - 2); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year - 2}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year - 1); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year - 1}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year + 1); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year + 1}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                </View>
                <View style={{ flex: 0.0625 }} />
                <View style={{ flex: 0.25, flexDirection: 'row' }}>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year + 2); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year + 2}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year + 3); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year + 3}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year + 4); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year + 4}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { closeModal2(); openModal3(); setTargetYear(year + 5); }}>
                    <Text style={{ fontWeight: 'bold' }}>{year + 5}년</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                </View>
                <View style={{ flex: 0.0625 }} />
              </View>
            </Pressable>
          </Modal>

          <Modal visible={visible3} setVisible={setVisible3} transparent={true} animationType={'fade'} >
            <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flex: 0.5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '90%', borderRadius: 30 }}>
                <View style={{ flex: 0.0625 }} />
                <View style={{ flex: 0.25, flexDirection: 'row' }}>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(1); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>1월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(2); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>2월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(3); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>3월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(4); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>4월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                </View>
                <View style={{ flex: 0.0625 }} />
                <View style={{ flex: 0.25, flexDirection: 'row' }}>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(5); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>5월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(6); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>6월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(7); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>7월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(8); closeModal3();  }}>
                    <Text style={{ fontWeight: 'bold' }}>8월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                </View>
                <View style={{ flex: 0.0625 }} />
                <View style={{ flex: 0.25, flexDirection: 'row' }}>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(9); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>9월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(10); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>10월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(11); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>11월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                  <Pressable style={{ flex: 0.2, backgroundColor: '#FFEBA5', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => { setTargetMonth(12); closeModal3(); }}>
                    <Text style={{ fontWeight: 'bold' }}>12월</Text>
                  </Pressable>
                  <View style={{ flex: 0.04 }} />
                </View>
                <View style={{ flex: 0.0625 }} />
              </View>
            </Pressable>
          </Modal>

          <View style={{ flexDirection: 'row', marginTop: '25%' }}>
            <Image source={mm_positive} style={{ width: 23, height: 23 }} />
            {positive != 3200 ? 
              <Text style={{ fontSize: 15, marginLeft: '3%' }}>
                긍정 {Math.round(series[0]/(pcnt+ncnt+ngcnt))}%
              </Text> : null}
          </View>
          <View style={{ flexDirection: 'row', marginTop: '15%' }}>
            <Image source={mm_neutral} style={{ width: 23, height: 23 }} />
            {neutral != 3200 ? 
            <Text style={{ fontSize: 15, marginLeft: '3%' }}>
              중립 {Math.round(series[1]/(pcnt+ncnt+ngcnt))}%
            </Text> : null }
          </View>
          <View style={{ flexDirection: 'row', marginTop: '15%' }}>
            <Image source={mm_negative} style={{ width: 23, height: 23 }} />
            {negative != 3200 ?
            <Text style={{ fontSize: 15, marginLeft: '3%' }}>
              부정 {Math.round(series[2]/(pcnt+ncnt+ngcnt))}%
            </Text> : null }
          </View>
        </View>
      </View>

      <View style={{ flex: 0.8, backgroundColor: 'rgba(217,217,217,0.3)', borderRadius: 20, marginLeft: '5%', marginRight: '5%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ fontSize: 15 }}>
            <View>
              <Text>긍정 : {pcnt} 회</Text>
              <Text>중립 : {ncnt} 회</Text>
              <Text>부정 : {ngcnt} 회</Text>
              {best != -1 ? <Text>추천 긍정일기 : {best}</Text> : null}
            </View>
        </View>
      </View>

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

export default Analysis;
