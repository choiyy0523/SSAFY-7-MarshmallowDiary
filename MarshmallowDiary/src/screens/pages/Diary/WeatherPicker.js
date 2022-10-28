// // 1) register 화면에 띄울 `<WeatherPicker />`
// // 2) WeatherPicker.js -> touchable opacity 선택시 rn element dialog에서 날씨 선택 가능 + 선택한 날씨 이미지를 버튼으로 설정
// // 3) element로 꼭 써야하려나 그냥 있는 모달 커스텀 안되려나ㅏㅏㅏㅏㅏ

// import React, { useState } from 'react'
// import { StyleSheet, Button, TouchableOpacity, Text, View, Image, Modal } from 'react-native'

// function WeatherPicker() {

//   const [weather, setWeather] = useState(new Weather());
//   const [open, setOpen] = useState(false);

//   const weatherUri = `${weather}`;

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => setOpen(true)}
//         style={styles.changeWeather}>
//         {/* <Image source={require(weatherUri + '.png')} />
//         <Modal>

//         </Modal> */}
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   changeWeather: {
//     width: 20,
//     height: 20,
//   }
// })