import React, { useState } from 'react';
import { Switch } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangeDarkModeSwitch = () => {
  var nowTheme = lightTheme
  const [isDark, setIsDark] = useState(false);
  console.log("캐모마일릴렉서")
  console.log(isDark)

  const darkSwitch = () => {
    setIsDark(previousState => !previousState)
    console.log(isDark)
    if (isDark === false) {
      nowTheme = lightTheme
    } else {
      nowTheme = darkTheme
    }
    console.log("밀크티")
    console.log(nowTheme)
  }

  const save = async () => {
    try {
      await AsyncStorage.setItem('nowTheme', JSON.stringify(nowTheme))
    } catch (e) {
      console.log("자바칩프라푸치노")
      console.log(e)
    }
  }

  return (
    <View style={styles.view}>
      <Switch
        color="#91C788"
        value={isDark}
        onValueChange={darkSwitch}
      />
    </View>
  );

}

const darkTheme = {
  dark: true,
  myOwnProperty: true,
  colors: {
    background: '#525252',
    surface: '#525252',
    text: '#fff9f8',
    placeholder: '#fff9f8',
    footBackColor: 'rgba(150, 150, 150, 0.3)',
    iconColor: '#fff9f8'
  }
}

const lightTheme = {
  dark: false,
  myOwnProperty: true,
  colors: {
    background: '#fff9f8',
    surface: '#D9D9D9',
    text: '#525252',
    placeholder: '#525252',
    footBackColor: 'rgba(251, 198, 135, 0.3)',
    iconColor: '#525252'
  }
}





const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

export default ChangeDarkModeSwitch;