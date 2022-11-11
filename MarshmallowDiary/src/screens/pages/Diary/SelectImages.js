import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, FlatList } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SelectImages = () => {
  const [images, setImages] = useState('');

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        maxSelectedAssets: 10,
        selectedAssets: images,
        isPreview: true,
        isExportThumbnail: true,
        maxVideo: 1,
        usedCameraButton: false,
        isCrop: true,
        isCropCircle: true,
        maximumMessage: '사진은 10장까지 첨부 가능합니다. ',
        selectedColor: '#91C788'
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onDelete = (value) => {
    const data = images.filter(
      (item) =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier
    );
    setImages(data);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          width={IMAGE_WIDTH}
          source={{
            uri:
              item?.type === 'video'
                ? item?.thumbnail ?? ''
                : 'file://' + (item?.crop?.cropPath ?? item.path),
          }}
          style={style.media}
        />
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={style.buttonDelete}
        >
          <Text style={style.titleDelete}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        style={[
          style.container,
          {
            paddingTop: 6,
          },
        ]}
        data={images}
        keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
        renderItem={renderItem}
        numColumns={3}
      />
      {/*
        <View style={style.bottom}>
          <TouchableOpacity style={style.openPicker} onPress={openPicker}>
            <Text style={style.openText}>open</Text>
          </TouchableOpacity>
        </View> */}


      <View style={style.imageInput}>
        <TouchableOpacity onPress={openPicker}>
          <Image
            source={require('../../../assets/images/etc/photo.png')}
            style={style.imageButton}
          />
        </TouchableOpacity>
      </View >
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const IMAGE_WIDTH = (width - 24) / 3;


export default SelectImages

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageInput: {
    paddingVertical: 8,
    height: 100,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    borderRadius: 18,
    marginBottom: 20,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageButton: {
    width: 45,
    height: 45,
    opacity: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 24,
  },
  media: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  bottom: {
    padding: 24,
  },
  openText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ffffff92',
    borderRadius: 4,
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
});