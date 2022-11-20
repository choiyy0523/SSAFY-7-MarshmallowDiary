import React from 'react';
import {Text, View} from 'react-native';

const FAQ = () => {
  return (
    <View style={{marginHorizontal: 20, marginVertical: 20}}>
      <Text
        style={{
          fontsize: 30,
          fontFamily: 'GangwonEduAllBold',
          marginVertical: 10,
        }}>
        FAQ
      </Text>
      <Text style={{fontFamily: 'GangwonEduAllBold', marginVertical: 10}}>
        Q. 계정을 삭제하고 싶어요!
      </Text>
      <Text style={{fontFamily: 'GangwonEduAllBold', marginVertical: 10}}>
        A. 아래의 이메일로 문의 주시면 본인확인 후 도와드리겠습니다!
      </Text>
      <Text style={{fontFamily: 'GangwonEduAllBold', marginVertical: 10}}>
        Q. 데이터를 초기화하고 싶어요
      </Text>
      <Text style={{fontFamily: 'GangwonEduAllBold', marginVertical: 10}}>
        A. 아래의 이메일로 문의 주시면 본인확인 후 도와드리겠습니다!
      </Text>
      <Text style={{fontFamily: 'GangwonEduAllBold', marginVertical: 10}}>
        📧 a303ssafy7@gmail.com
      </Text>
    </View>
  );
};

export default FAQ;
