import React from 'react';
import { FlatList, ListRenderItem, Text, View, StyleSheet, Linking, Button } from 'react-native';
import TermsButton from './OpenSourceButton';


const OPENSOURCE_WEB_LINK = "https://www.notion.so/marshmallowdiary/bbb8d3a9a67a4c81b26ba7e224b172c9"


const Terms = () => {
  return (
    <View style={styles.container}>
      <TermsButton url={OPENSOURCE_WEB_LINK}>개인정보 처리방침</TermsButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff9f8" },
});

export default Terms;