import React from 'react';
import { Text, View, SafeAreaView } from 'react-native'; 
import { Stack, Chip } from "@react-native-material/core";

const ChipRed = props => {
    return (
        <SafeAreaView>
          <Chip style={{ backgroundColor:'#F0A3A3', width:50, height:30 }}>
            <Text>{props.label}</Text>
          </Chip>
        </SafeAreaView>
    )
};

export default ChipRed;