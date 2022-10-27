import React from 'react';
import { Button } from 'react-native';
import { Text, View } from 'react-native';

const Home = ({navigation}) => {
    return (
        <View>
            <Text>Home</Text>
            <Button title='go to the list screen' onPress = {() => navigation.navigate('List')} />
			<Button title='go to the main screen' onPress = {() => navigation.navigate('Main')} />
        </View>

    )
}

export default Home;
