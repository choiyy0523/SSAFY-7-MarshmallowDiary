import React from 'react';
<<<<<<< HEAD
import { Text, View } from 'react-native'; 
=======
import { Text, View, SafeAreaView } from 'react-native'; 
import Privacy from '../../components/component/Privacy.js'
>>>>>>> 77257a7289abfc0b48850e61a77d951eb4e20f4c

const Password = () => {
    return (
        <SafeAreaView style={{ backgroundColor:'#FFF9F8', flex:1 }}>
          <Privacy />
        </SafeAreaView>
    )
};

export default Password;