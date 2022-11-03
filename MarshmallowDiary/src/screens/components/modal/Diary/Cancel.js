import React, { useEffect, useState, useRoute } from 'react';
import { Button, Dialog } from '@rneui/themed';
import { View, Text, StyleSheet, BackHandler } from 'react-native';

// 특정 페이지에서 기기 뒤로가기를 감지했을 때 dialog가 나오도록 한다. 
// alert의 경우 원하는 디자인으로 커스텀이 어려워 dialog를 커스텀
// 해당 dialog는 2가지 옵션을 갖는다
// 글작성 취소시 메인화면(혹은 직전화면) 으로 리턴
// 계속 작성을 원할 경우 null 리턴 후 모달창 닫기


const CancleDialogs = () => {
  // const route = useRoute()

  // state = {
  //   cancleOption: false
  // }

  // useEffect(() => {
  //   const backAction = () => {
  //     if (this.state.cancleOption === true) {
  //       navigation.pop()
  //       console.log('일기 작성 취소')
  //       this.setState({
  //         cancleOption: false
  //       })
  //     }
  //     // 취소 선택시 이전 스택으로 돌아감
  //     else {
  //       console.log('일기 계속 작성')
  //     }
  //     return true;
  //   }

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );
  //   return () => backHandler.remove()
  // }, [])


  // const [cancle, setCancle] = useState(false);

  // const changeCancleOption = () => {
  //   if (this.state.cancleOption === false) {
  //     // 만약 cancleOption이 false라면
  //     this.setState({
  //       cancleOption: true
  //     })
  //   } else {
  //     null;
  //   }
  // }

  return (
    <View>
      <Dialog isVisible={cancle} onBackdropPress={() => this.closeDialog}>
        {/* onBackdropPress = 모달 바깥부분 클릭시 일어나는 동작 지정 */}

        <Dialog.Title title="일기 작성을 취소하시겠어요?" />
        <Text>작성하던 일기는 저장되지 않습니다.</Text>
        <Dialog.Actions>
          <Dialog.Button title="확인" onPress={this.changeCancleOption} />
          <Dialog.Button title="취소" onPress={this.changeCancleOption} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

// const styles = StyleSheet.create({

// });

export default CancleDialogs;