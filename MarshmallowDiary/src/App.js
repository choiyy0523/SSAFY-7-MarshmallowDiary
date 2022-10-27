import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
// import Theme from './theme/theme';

const { width, height } = Dimensions.get('window');

const LightTheme = {
  dark: false,
  colors: {
    background: '#fff9f8',
    card: '#D9D9D9',
    text: '#525252',
  },
};

const DarkTheme = {
  dark: false,
  colors: {
    background: '#525252',
    card: '#999696',
    text: '#fff9f8',
  },
}

export default function App() {

  return (
    <NavigationContainer style={styles.container} theme={LightTheme}>
      {/* 여기에다가 유저 선택 따라 light/dark/ 수정되도록 하면 될 듯 */}
      <StackNavigation />
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  defaultDisplaySettings: {
    width: width,
    height: height,
  },
});