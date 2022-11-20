import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Image, Modal, Pressable} from 'react-native';
import Footer from '../../components/component/Footer';
import {Icon} from '@rneui/themed';
import {Chip} from '@react-native-material/core';
import PieChart from 'react-native-pie-chart';
import mm_positive from '../../../assets/images/mm/mm_positive.png';
import mm_neutral from '../../../assets/images/mm/mm_neutral.png';
import mm_negative from '../../../assets/images/mm/mm_negative.png';
import ch_neutral from '../../../assets/images/character/neutral.png';
import {http} from '../../../api/http';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Analysis = ({navigation}) => {
  // 이번 달 기본으로 세팅
  var today = new Date();
  const utc = today.getTime() + today.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_today = new Date(utc + KR_TIME_DIFF);

  var year = kr_today.getFullYear();
  var month = Number(('0' + (kr_today.getMonth() + 1)).slice(-2));

  // 캡처 및 공유
  const captureRef = useRef();

  const getPhotoUri = async (): Promise<string> => {
    const uri = await captureRef.current.capture();
    console.log(uri);
    return uri;
  };

  const onCapture = async () => {
    try {
      const uri = await getPhotoUri();

      const options = {
        title: 'title',
        message: 'message',
        url: uri,
        type: 'image/jpeg',
        failOnCancel: false,
      };

      const result = await Share.open(options);
    } catch (err) {
      console.log('failed', err);
    }
  };

  // axios 변수
  const [targetYear, setTargetYear] = useState(year);
  const [targetMonth, setTargetMonth] = useState(month);

  // response 세팅
  // const [data, setData] = useState()
  const [positive, setPositive] = useState();
  const [neutral, setNeutral] = useState();
  const [negative, setNegative] = useState();
  const [pcnt, setPcnt] = useState();
  const [ncnt, setNcnt] = useState();
  const [ngcnt, setNgcnt] = useState();
  const [best, setBest] = useState();

  // target년월 데이터 요청
  const getMonth = () => {
    http
      .post('/analysis/month', {
        month: targetMonth,
        year: targetYear,
      })
      .then(res => {
        // target 년월 data 0이면 pie 그래프 에러
        // setData(res.data)
        if (res.data.positive == 0) {
          setPositive(3200);
        } else {
          setPositive(res.data.positive);
        }
        if (res.data.neutral == 0) {
          setNeutral(3200);
        } else {
          setNeutral(res.data.neutral);
        }
        if (res.data.negative == 0) {
          setNegative(3200);
        } else {
          setNegative(res.data.negative);
        }
        setPcnt(res.data.positiveCnt);
        setNcnt(res.data.neutralCnt);
        setNgcnt(res.data.negativeCnt);
        setBest(res.data.bestPositiveDate);
      })
      .catch(err => {
        navigation.navigate('LoginCheck');
      });
  };

  useEffect(() => {
    getMonth();
  }, [targetMonth, targetYear]);

  // pie 그래프 설정
  const widthAndHeight = 200;
  var series = [60, 25, 15];
  series = [Math.round(positive), Math.round(neutral), Math.round(negative)];

  const sliceColor = ['#91C788', '#FBC687', '#F38181'];

  // 전체 기간 데이터 요청
  const getAll = () => {
    http
      .get('/analysis/all')
      .then(res => {
        // setData(res.data)
        setPositive(res.data.positive);
        setNeutral(res.data.neutral);
        setNegative(res.data.negative);
        setPcnt(res.data.positiveCnt);
        setNcnt(res.data.neutralCnt);
        setNgcnt(res.data.negativeCnt);
        setBest(res.data.bestPositiveDate);
      })
      .catch(err => {
        navigation.navigate('LoginCheck');
      });
  };

  // 전체 / target년월
  const [isAll, setIsAll] = useState(false);
  const selectAll = () => {
    setIsAll(true);
  };

  const selectMonth = () => {
    setIsAll(false);
  };

  // 모달
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  const [visible2, setVisible2] = useState(false);
  const openModal2 = () => {
    setVisible2(true);
  };
  const closeModal2 = () => {
    setVisible2(false);
  };

  const [visible3, setVisible3] = useState(false);
  const openModal3 = () => {
    setVisible3(true);
  };

  const closeModal3 = async () => {
    setVisible3(false);
  };

  const year1 = [year - 6, year - 5, year - 4, year - 3];
  const year2 = [year - 2, year - 1, year, year + 1];
  const year3 = [year + 2, year + 3, year + 4, year + 5];

  const month1 = [1, 2, 3, 4];
  const month2 = [5, 6, 7, 8];
  const month3 = [9, 10, 11, 12];

  return (
    <View style={{flex: 1, backgroundColor: '#FFF9F8'}}>
      <ViewShot
        style={{flex: 1, backgroundColor: '#FFF9F8'}}
        ref={captureRef}
        options={{fileName: 'MarshmallowDiary', format: 'jpg', quality: 0.9}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '15%',
          }}>
          <Text style={{fontSize: 25, fontFamily: 'GangwonEduAllBold'}}>
            마로의 감정 분석 레포트
          </Text>
        </View>

        <View style={{flex: 1.2, flexDirection: 'row'}}>
          <View style={{marginLeft: '8%', justifyContent: 'center', flex: 0.7}}>
            {pcnt + ncnt + ngcnt == 0 ||
            pcnt == undefined ||
            ncnt == undefined ||
            ngcnt == undefined ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={ch_neutral} style={{width: 100, height: 100}} />
                <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                  이 달엔 일기를 쓰지 않았어요
                </Text>
              </View>
            ) : (
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
              />
            )}
          </View>

          <View
            style={{
              marginTop: '15%',
              alignItems: 'center',
              flex: 0.3,
              marginRight: '3%',
            }}>
            {isAll == true ? (
              <Chip style={{backgroundColor: '#FFEBA5'}} onPress={openModal}>
                <Text style={{fontFamily: 'GangwonEduAllBold'}}>전체</Text>
              </Chip>
            ) : (
              <Chip style={{backgroundColor: '#FFEBA5'}} onPress={openModal}>
                <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                  {targetYear}년 {targetMonth}월
                </Text>
              </Chip>
            )}

            <Modal
              visible={visible}
              setVisible={setVisible}
              transparent={true}
              animationType={'fade'}>
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={closeModal}>
                <View
                  style={{
                    flex: 0.3,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80%',
                    borderRadius: 30,
                  }}>
                  <Chip
                    style={{
                      backgroundColor: '#FFEBA5',
                      width: 75,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      selectMonth();
                      closeModal();
                      openModal2();
                    }}>
                    <Text style={{fontFamily: 'GangwonEduAllBold'}}>월별</Text>
                  </Chip>

                  <View style={{height: 15}} />
                  <Chip
                    style={{
                      backgroundColor: '#FFEBA5',
                      width: 75,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      selectAll();
                      closeModal();
                      getAll();
                    }}>
                    <Text style={{fontFamily: 'GangwonEduAllBold'}}>전체</Text>
                  </Chip>
                </View>
              </Pressable>
            </Modal>

            <Modal
              visible={visible2}
              setVisible={setVisible2}
              transparent={true}
              animationType={'fade'}>
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 0.5,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                    borderRadius: 30,
                  }}>
                  <View style={{flex: 0.0625}} />
                  <View style={{flex: 0.25, flexDirection: 'row'}}>
                    {year1.map((data, i) => (
                      <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.2}} />
                        <Pressable
                          style={{
                            flex: 0.8,
                            backgroundColor: '#FFEBA5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}
                          onPress={() => {
                            closeModal2();
                            openModal3();
                            setTargetYear(data);
                          }}>
                          <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                            {data}년
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                    <View style={{flex: 0.2}} />
                  </View>

                  <View style={{flex: 0.0625}} />
                  <View style={{flex: 0.25, flexDirection: 'row'}}>
                    {year2.map((data, i) => (
                      <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.2}} />
                        <Pressable
                          style={{
                            flex: 0.8,
                            backgroundColor: '#FFEBA5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}
                          onPress={() => {
                            closeModal2();
                            openModal3();
                            setTargetYear(data);
                          }}>
                          <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                            {data}년
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                    <View style={{flex: 0.2}} />
                  </View>

                  <View style={{flex: 0.0625}} />
                  <View style={{flex: 0.25, flexDirection: 'row'}}>
                    {year3.map((data, i) => (
                      <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.2}} />
                        <Pressable
                          style={{
                            flex: 0.8,
                            backgroundColor: '#FFEBA5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}
                          onPress={() => {
                            closeModal2();
                            openModal3();
                            setTargetYear(data);
                          }}>
                          <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                            {data}년
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                    <View style={{flex: 0.2}} />
                  </View>

                  <View style={{flex: 0.0625}} />
                </View>
              </Pressable>
            </Modal>

            <Modal
              visible={visible3}
              setVisible={setVisible3}
              transparent={true}
              animationType={'fade'}>
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 0.5,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                    borderRadius: 30,
                  }}>
                  <View style={{flex: 0.0625}} />

                  <View style={{flex: 0.25, flexDirection: 'row'}}>
                    {month1.map((data, i) => (
                      <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.2}} />
                        <Pressable
                          style={{
                            flex: 0.8,
                            backgroundColor: '#FFEBA5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}
                          onPress={() => {
                            closeModal3();
                            setTargetMonth(data);
                          }}>
                          <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                            {data}월
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                    <View style={{flex: 0.2}} />
                  </View>

                  <View style={{flex: 0.0625}} />

                  <View style={{flex: 0.25, flexDirection: 'row'}}>
                    {month2.map((data, i) => (
                      <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.2}} />
                        <Pressable
                          style={{
                            flex: 0.8,
                            backgroundColor: '#FFEBA5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}
                          onPress={() => {
                            closeModal3();
                            setTargetMonth(data);
                          }}>
                          <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                            {data}월
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                    <View style={{flex: 0.2}} />
                  </View>

                  <View style={{flex: 0.0625}} />

                  <View style={{flex: 0.25, flexDirection: 'row'}}>
                    {month3.map((data, i) => (
                      <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.2}} />
                        <Pressable
                          style={{
                            flex: 0.8,
                            backgroundColor: '#FFEBA5',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                          }}
                          onPress={() => {
                            closeModal3();
                            setTargetMonth(data);
                          }}>
                          <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                            {data}월
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                    <View style={{flex: 0.2}} />
                  </View>

                  <View style={{flex: 0.0625}} />
                </View>
              </Pressable>
            </Modal>

            <View
              style={{
                flexDirection: 'row',
                marginTop: '25%',
                marginRight: '10%',
              }}>
              <Image source={mm_positive} style={{width: 23, height: 23}} />
              {positive != 3200 ? (
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: '3%',
                    fontFamily: 'GangwonEduAllBold',
                  }}>
                  긍정 {Math.round(series[0] / (pcnt + ncnt + ngcnt))}%
                </Text>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '15%',
                marginRight: '10%',
              }}>
              <Image source={mm_neutral} style={{width: 23, height: 23}} />
              {neutral != 3200 ? (
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: '3%',
                    fontFamily: 'GangwonEduAllBold',
                  }}>
                  중립 {Math.round(series[1] / (pcnt + ncnt + ngcnt))}%
                </Text>
              ) : null}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '15%',
                marginRight: '10%',
              }}>
              <Image source={mm_negative} style={{width: 23, height: 23}} />
              {negative != 3200 ? (
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: '3%',
                    fontFamily: 'GangwonEduAllBold',
                  }}>
                  부정 {Math.round(series[2] / (pcnt + ncnt + ngcnt))}%
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 0.8,
            backgroundColor: 'rgba(217,217,217,0.3)',
            borderRadius: 20,
            marginLeft: '5%',
            marginRight: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{fontSize: 15}}>
            <View
              style={{
                flex: 0.5,
                paddingTop: '3%',
                paddingBottom: '18%',
                paddingHorizontal: '5%',
              }}>
              <View style={{flex: 0.2}} />
              <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                이 기간동안에는 {pcnt} 일간 즐거운 일이 있으셨군요!
              </Text>
              <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                부디 모두 좋은 날이었기를 바라요 :)
              </Text>
              <View style={{flex: 0.2, marginVertical: '2%'}} />
              <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                평범했던 날은 {ncnt} 일 정도 있었어요!
              </Text>
              <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                늘 반복되는 일상이 지루하다 느껴질 수도 있지만 그만큼 안정적이란
                뜻이니까요☺️
              </Text>
              <View style={{flex: 0.2, marginVertical: '2%'}} />
              <Text style={{fontFamily: 'GangwonEduAllBold'}}>
                힘들었던 {ngcnt} 일은 모두 잊고, 다음달에는 더 많은 긍정 일기를
                모아보아요😆
              </Text>
            </View>
            <View style={{flex: 0.2, marginVertical: '2%'}} />
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {best != -1 ? (
                <TouchableOpacity>
                  <Text
                    style={{fontFamily: 'GangwonEduAllBold'}}
                    onPress={() =>
                      navigation.navigate('Detail', {targetDate: best})
                    }>
                    ✨ 추천 긍정일기 보러가기 ✨
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </ViewShot>

      <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
        <Chip
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFEBA5',
            width: '30%',
          }}
          onPress={onCapture}>
          <Icon name="share" type="fontisto" />
          <Text style={{fontSize: 17, fontFamily: 'GangwonEduAllBold'}}>
            {' '}
            공유하기{' '}
          </Text>
        </Chip>
      </View>
      <Footer />
    </View>
  );
};

export default Analysis;
