import React from 'react';
import { SafeAreaView, Text, View } from 'react-native'; 
import ChipYellow from '../../components/component/ChipYellow'
import ChipRed from '../../components/component/ChipRed';
import Footer from '../../components/component/Footer';

const Search = () => {
    return (
        <SafeAreaView>
          <Text>Search</Text>
          <ChipYellow label='등록'/>
          <Text></Text>
          <ChipRed label='탈퇴'/>
          <Footer />
        </SafeAreaView>
    )
};

export default Search;