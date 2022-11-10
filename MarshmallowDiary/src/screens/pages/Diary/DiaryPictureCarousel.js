import React from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';

const pictureUri = 'https://images.unsplash.com/photo-1665686310429-ee43624978fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'

const DiaryPictureCarousel = () => {

  return (
    <View>
      {/* <Image source={require('../../../assets/images/etc/dummypic.jpg')} style={styles.pictureStyle} /> */}
      {/* <Image source={{ uri: { pictureUri } } style={styles.pictureStyle}} /> */}
    </View>

  );
}

const styles = StyleSheet.create({
  pictureStyle: {
    borderRadius: 18,
    marginHorizontal: 15,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
});

export default DiaryPictureCarousel;