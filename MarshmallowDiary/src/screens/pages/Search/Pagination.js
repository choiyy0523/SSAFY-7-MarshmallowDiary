import React, { useState } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

function Pagination({ total, limit, page, setPage }) {
  const numPages = [];
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    numPages.push(i);
  }

  const [limit2, setLimit2] = useState(10);
  const offset = Math.floor((page - 1) / 10) * limit2;

  const toLeft = () => {
    if ( page > 5 ) {
      setPage(Math.floor((page - 11) / 10) * 10 + 1)
    }
  }

  const toRight = () => {
    if (Math.floor((Math.ceil(total / limit) - 1) / 10) * 10 + 1 <= page && page <= Math.ceil(total / limit)) {
      setPage(Math.floor((page + 9) / 10) * 10 + 1)
    }
    else {}
  }

  console.log(page)

  return (
    <View style={{ flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center'}}>
      <TouchableOpacity onPress={toLeft} style={{ flexDirection:'row', flex:0.2, justifyContent:'center', alignItems:'center'}}>
        <Icon name='left' type='antdesign'/>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection:'row', flex:0.6, justifyContent:'center', alignItems:'center' }}>
        {numPages.slice(offset, offset + limit2).map(function (number) {
            return (
              <Text key={number} onPress={() => setPage(number)}>
                {number}
              </Text>
            );
          })}
      </TouchableOpacity>

      <TouchableOpacity onPress={toRight} style={{ flexDirection:'row', flex:0.2, justifyContent:'center', alignItems:'center' }}>
        <Icon name='right' type='antdesign'/>
      </TouchableOpacity>
    </View>
  )

}

export default Pagination