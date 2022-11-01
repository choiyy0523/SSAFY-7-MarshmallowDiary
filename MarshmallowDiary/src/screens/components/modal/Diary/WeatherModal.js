// import React, { useState } from 'react'
// import { StyleSheet, Button, TouchableOpacity, Text, View, Image } from 'react-native'
// import { Button, Dialog, CheckBox, ListItem } from "@rneui/themed";


// const WeatherModal = () => {
//   const [weather, setweather] = useState(false);
//   const [checked, setChecked] = useState(1);


//   const toggleWeather = () => {
//     setweather(!weather);
//   };


//   return (
//     <View>
//       <View style={styles.buttonContainer}>

//         <Button
//           title="날씨 선택"
//           onPress={toggleWeather}
//           buttonStyle={styles.button}
//         />

//       </View>

//       <Dialog
//         isVisible={weather}
//         onBackdropPress={toggleWeather}
//       >
//         <Dialog.Title title="Select Preference" />
//         {['Option 1', 'Option 2', 'Option 3'].map((l, i) => (
//           <CheckBox
//             key={i}
//             title={l}
//             containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
//             checkedIcon="dot-circle-o"
//             uncheckedIcon="circle-o"
//             checked={checked === i + 1}
//             onPress={() => setChecked(i + 1)}
//           />
//         ))}

//         <Dialog.Actions>
//           <Dialog.Button
//             title="CONFIRM"
//             onPress={() => {
//               console.log(`Option ${checked} was selected!`);
//               toggleWeather();
//             }}
//           />
//           <Dialog.Button title="CANCEL" onPress={toggleWeather} />
//         </Dialog.Actions>
//       </Dialog>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 6,
//     width: 220,
//     margin: 20,
//   },
//   buttonContainer: {
//     margin: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default WeatherModal;