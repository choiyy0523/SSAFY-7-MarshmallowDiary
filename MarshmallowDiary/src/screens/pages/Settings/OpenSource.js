import React from 'react';
import { FlatList, ListRenderItem, Text, View, StyleSheet } from 'react-native';
import MD_OS_FE from './MD_OS_FE'
import { MarshmallowDiaryOpenSourceLicenseBE } from './MarshmallowDiaryOpenSourceLicenseBE.json'
// import Hyperlink from 'react-native-hyperlink'
// import openURL from '../../components/component/openUrl';

// const renderItem = ({ item }) => {
//   return (
//     <>
//       <View>
//         <Text>{item.libraryName}</Text>
//         <Text>{item.version}</Text>
//         <Text>{item._license}</Text>
//         <Text>{item._description}</Text>
//       </View>
//     </>
//   );
// }

// const OpenSource = () => {
//   return (
//     <View>
//       <FlatList
//         data={MD_OS_FE}
//         renderItem={renderItem}
//         keyExtractor={(item) => String(item.libraryName)}
//       />
//     </View>
//   )
// };


// function OpenSource() {
//   const contents = '오픈소스 라이센스 : https://marshmallowdiary.notion.site/1a6a1966970742c7bc1940d7db4144d5'
//   return (
//     <Hyperlink
//       linkStyle={styles.hyperlinkStyle}
//       onPress={(url) => openURL(url)}
//     >
//       <Text style={styles.contentStyle}>{contents}</Text>
//     </Hyperlink>
//   )
// }

// const styles = StyleSheet.create({
//   hyperlinkStyle: {
//     fontSize: 16,
//     color: '#505050'
//   },
//   contentStyle: {
//     fontSize: 18,
//     color: '#111111'
//   }
// })


const OpenSource = () => {
  return (
    <View>
      <Text> 오픈소스 라이센스 : https://marshmallowdiary.notion.site/1a6a1966970742c7bc1940d7db4144d5 </Text>
    </View>
  )
};
export default OpenSource