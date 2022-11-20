import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, Text, View, StyleSheet, Linking, Button, TouchableOpacity } from 'react-native';
import MD_OS_FE from './MD_OS_FE'
import { MarshmallowDiaryOpenSourceLicenseBE } from './MarshmallowDiaryOpenSourceLicenseBE.json'


const TermsButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      null
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} style={styles.Button} />

};

const styles = StyleSheet.create({
  Button: { width: 150, height: 50, color: "#525252", borderRadius: 10 },
});

export default TermsButton;