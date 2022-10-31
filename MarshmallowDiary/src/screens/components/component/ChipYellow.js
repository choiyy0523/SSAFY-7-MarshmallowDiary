import React from 'react';
import { Text, View, SafeAreaView } from 'react-native'; 
import { Stack, Chip } from "@react-native-material/core";

const ChipYellow = props => {
    return (
        <View>
          <Chip style={{ backgroundColor:'#FFEBA5', width: props.width , height:30 }}>
            <Text style={{ fontSize:17 }} >{props.label}</Text>
          </Chip>
        </View>
    )
};

export default ChipYellow;