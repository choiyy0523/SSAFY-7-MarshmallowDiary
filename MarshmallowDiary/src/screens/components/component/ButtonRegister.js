import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import DiaryRegister from '../../pages/Diary/Register4';

const ButtonRegister = () => {
  return (
    <View>
      <TouchableOpacity onPress={DiaryRegister}>
        {/* 여기서 onPress걸어 DB 보내기 */}
        <View style={styles.buttonRegister}>
          <Text style={styles.buttonText}>등록</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  buttonRegister: {
    borderRadius: 10,
    backgroundColor: '#FFEBA5',
    height: 33,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  buttonText: {
    fontFamily: 'GangwonEduAllBold',
    fontSize: 15,
    fontWeight: 'Bold'
  }
})

export default ButtonRegister;