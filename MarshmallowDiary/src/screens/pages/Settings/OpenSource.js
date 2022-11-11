import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import MD_OS_FE from './MD_OS_FE'
import { MarshmallowDiaryOpenSourceLicenseBE } from './MarshmallowDiaryOpenSourceLicenseBE.json'

const renderItem = ({ item }) => {
  return (
    <>
      <View>
        <Text>{item.libraryName}</Text>
        <Text>{item.version}</Text>
        <Text>{item._license}</Text>
        <Text>{item._description}</Text>
      </View>
    </>
  );
}

const OpenSource = () => {
  return (
    <View>
      <FlatList
        data={MD_OS_FE}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.libraryName)}
      />
    </View>
  )
};
export default OpenSource;