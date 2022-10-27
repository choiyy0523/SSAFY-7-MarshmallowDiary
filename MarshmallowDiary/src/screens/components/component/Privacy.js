import React from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native'; 
import mm_positive from  '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png';
import mm_negative from '../../../assets/images/mm/mm_negative.png';


const Privacy = () => {
    return (
        <SafeAreaView>
          <Text style={{marginTop:'25%', textAlign:'center', fontSize:18, fontFamily:'GangwonEduAllLight'}}>암호를 입력해 주세요</Text>
          <View style={{ flexDirection:'row', marginTop:'5%', alignItems:'center', justifyContent:'center'}}>
            <Image source={mm_positive} style={{ width:30, height:30 }}/>
            <Image source={mm_positive} style={{ width:30, height:30 }}/>
            <Image source={mm_positive} style={{ width:30, height:30 }}/>
            <Image source={mm_negative} style={{ width:30, height:30 }}/>
          </View>
          <View style={{ flexDirection:'row', marginTop:'15%'}}>
            <View style={{ width:'15%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>1</Text>
            </View>
            <View style={{ width:'29%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>2</Text>
            </View>
            <View style={{ width:'29%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>3</Text>
            </View>
            <View style={{ width:'15%' }} />
          </View>
          <View style={{ flexDirection:'row', marginTop:'15%'}}>
            <View style={{ width:'15%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>4</Text>
            </View>
            <View style={{ width:'29%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>5</Text>
            </View>
            <View style={{ width:'29%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>6</Text>
            </View>
            <View style={{ width:'15%' }} />
          </View>
          <View style={{ flexDirection:'row', marginTop:'15%'}}>
            <View style={{ width:'15%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>7</Text>
            </View>
            <View style={{ width:'29%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>8</Text>
            </View>
            <View style={{ width:'29%' }} />
            <View style={{ width:'4%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>9</Text>
            </View>
            <View style={{ width:'15%' }} />
          </View>
          <View style={{ flexDirection:'row', marginTop:'15%' }}>
            <View style={{ width:'9.5%' }} />
            <View style={{ width:'15%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>지우기</Text>
            </View>
            <View style={{ width:'18%' }} />
            <View style={{ width:'15%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>0</Text>
            </View>
            <View style={{ width:'18%' }} />
            <View style={{ width:'15%', justifyContent:'center', flex:1, alignItems:'center' }}>
              <Text style={{fontSize:18}}>취소</Text>
            </View>
            <View style={{ width:'9.5%' }} />
          </View>
          <Text style={{marginTop:'7.5%', textAlign:'center', color:'#D9D9D9'}}>비밀번호 분실 시 앱을 재설치 후 다시 로그인하세요</Text>
        </SafeAreaView>
    )
};

export default Privacy;