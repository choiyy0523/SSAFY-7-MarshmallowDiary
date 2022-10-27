import React from 'react';
import { Text, View, SafeAreaView } from 'react-native'; 
import { Stack, Chip } from "@react-native-material/core";

const ChipYellow = props => {
    return (
        <SafeAreaView>
          <Chip style={{ backgroundColor:'#FFEBA5', width:50, height:30 }}>
            <Text>{props.label}</Text>
          </Chip>
        </SafeAreaView>
    )
};

export default ChipYellow;