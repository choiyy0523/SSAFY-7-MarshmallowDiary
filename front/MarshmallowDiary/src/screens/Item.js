import React from 'react';
import { Text, View } from 'react-native';

const Item = ({route}) => {
  return (
      <View>
          <Text>Item</Text>
          <Text>ID: {route.params.id}</Text>
          <Text>Name: {route.params.name}</Text>
      </View>
  )
};

export default Item;