import React, { useState } from 'react';
import { Switch } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

const SwitchComponent = () => {
  const [checked, setChecked] = useState(false);

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