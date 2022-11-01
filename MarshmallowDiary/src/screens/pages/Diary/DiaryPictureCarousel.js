import React from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';

const DATA = [
  {
    id: '1',
    title: '../../../assets/images/etc/dummypic.jpg'
  },
  // {
  //   id: '2',
  //   title: '../../../assets/images/etc/dummypic.jpg',
  // },
  // {
  //   id: '3',
  //   title: '../../../assets/images/etc/dummypic.jpg',
  // },
  // {
  //   id: '4',
  //   title: '../../../assets/images/etc/dummypic.jpg',
  // },
  // {
  //   id: '5',
  //   title: '../../../assets/images/etc/dummypic.jpg',
  // },
];

// const pictureUri = 'https://images.unsplash.com/photo-1665686310429-ee43624978fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'

console.log(DATA[0].title)
// ../../../assets/images/etc/dummypic.jpg

const pictureUri = `'` + DATA[0].title + `'`

console.log(pictureUri)
// '../../../assets/images/etc/dummypic.jpg' 따옴표 붙음

// const src = require(`${pictureUri}`)
// console.log(src)
// error 발생(require 안에 변수 자체를 넣는건 안되는 것 같습니다 ㅠㅠ)

const src2 = require('../../../assets/images/etc/dummypic.jpg')


const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
    <Image source={src2} style={styles.pictureStyle} />
  </View>
);

const DiaryPictureCarousel = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Image source={require('../../../assets/images/etc/dummypic.jpg')} style={styles.pictureStyle} />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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