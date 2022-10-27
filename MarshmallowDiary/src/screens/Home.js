import React from 'react';
import { Button } from 'react-native';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View>
            <Text>Home</Text>
            <Button title='go to the list screen' onPress={() => navigation.navigate('List')} />
            <Button title='일기 조회' onPress={() => navigation.navigate('Detail')} />
            <Button title='일기 등록' onPress={() => navigation.navigate('Register')} />
            <Button title='go to the list screen' onPress={() => navigation.navigate('List')} />
            <Button title='go to the main screen' onPress={() => navigation.navigate('Main')} />
        </View>

    )
}

// const styles = StyleSheet.create({


// })

export default Home;
