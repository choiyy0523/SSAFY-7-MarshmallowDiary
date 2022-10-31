import React from 'react';
<<<<<<< Updated upstream
import { Text, View } from 'react-native';
=======
import { Text, View, Image } from 'react-native';
import Footer from '../../components/component/Footer';
import ChipYellow from '../../components/component/ChipYellow';
import { Icon } from '@rneui/themed'; 
import { Chip } from "@react-native-material/core";
import PieChart from 'react-native-pie-chart';
import mm_positive from '../../../assets/images/mm/mm_positive.png'
import mm_neutral from '../../../assets/images/mm/mm_neutral.png'
import mm_negative from '../../../assets/images/mm/mm_negative.png'
>>>>>>> Stashed changes

import Footer from '../../components/component/Footer';

const Analysis = () => {
  return (
    <View>
      <Text>Analysis</Text>
      <Footer />
    </View>
  )
};

export default Analysis;