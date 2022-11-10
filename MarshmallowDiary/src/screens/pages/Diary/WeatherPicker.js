import React, { useEffect, useState } from 'react';
import { Text, View, Image, Modal, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { weatherIconPath } from './WeatherIcon';

const WeatherPicker = ({ weather, getWeather }) => {

  // const [weather, setWeather] = useState(0)

  const [visible, setVisible] = useState(false)

  const openModal = () => {
    setVisible(true)
  }
  const closeModal = () => {
    setVisible(false)
  }


  return (
    <View>
      <TouchableOpacity TouchableOpacity onPress={openModal} >
        <Image
          source={weatherIconPath.weather2}
          style={styles.weatherPicker}
        />
      </TouchableOpacity>
      <Modal visible={visible} setVisible={setVisible} transparent={true} animationType={'fade'}>
        <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 0.4, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '70%', borderRadius: 30 }}>
            <View style={{ flex: 0.4, flexDirection: 'row' }}>

              {/* 1개 단위 */}
              <View style={{ flex: 0.04 }} />
              <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => { getWeather(1); closeModal(); }} >
                <Image source={require('../../../assets/images/weather/1.png')} style={styles.weatherButton} />
              </TouchableOpacity>

              <View style={{ flex: 0.04 }} />
              <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => { getWeather(2); closeModal(); }} >
                <Image source={require('../../../assets/images/weather/2.png')} style={styles.weatherButton} />
              </TouchableOpacity>

              <View style={{ flex: 0.04 }} />
              <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => { getWeather(3); closeModal(); }} >
                <Image source={require('../../../assets/images/weather/3.png')} style={styles.weatherButton} />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <View style={{ flex: 0.04 }} />
              <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => { getWeather(4); closeModal(); }} >
                <Image source={require('../../../assets/images/weather/4.png')} style={styles.weatherButton} />
              </TouchableOpacity>

              <View style={{ flex: 0.04 }} />
              <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => { getWeather(5); closeModal(); }} >
                <Image source={require('../../../assets/images/weather/5.png')} style={styles.weatherButton} />
              </TouchableOpacity>

              <View style={{ flex: 0.04 }} />
              <TouchableOpacity style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} onPress={() => { getWeather(6); closeModal(); }} >
                <Image source={require('../../../assets/images/weather/6.png')} style={styles.weatherButton} />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default WeatherPicker;

const styles = StyleSheet.create({
  weatherPicker: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    marginVertical: -10,
  },
  weatherButton: {
    width: 40,
    height: 40,
  },
})