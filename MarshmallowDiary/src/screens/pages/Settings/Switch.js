import React, { useState } from 'react';
import { Switch } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

const SwitchComponent = () => {
  const route = useRoute();

  const [checked, setChecked] = useState();

  // AsyncStorage.getItem('password', (err, result) => {
  //   const pw = result;
  //   if (pw) {
  //     setChecked(true)
  //   }
  //   else {
  //     setChecked(false)
  //   }
  // })

  // if (route.name == 'Settings') {
  //   if (checked == false) {
  //     AsyncStorage.removeItem('password')
  //   }
  // }

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.view}>
      <Switch
        color="#91C788"
        value={checked}
        onValueChange={(value) => setChecked(value)}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

export default SwitchComponent;