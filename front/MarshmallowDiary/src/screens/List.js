import React from 'react';
import { Button, Text, View } from 'react-native';


const items = [
    { _id: 1, name: 'React Native' },
    { _id: 2, name: 'React Navigation' },
    { _id: 3, name: 'Eunbin' },

];

const List = ({navigation}) => {
    const _onPress = item => {
        navigation.navigate('Item', {id: item._id, name: item.name})
    };

    return (
        <View>
            <Text>List</Text>
            {items.map(item => (
                <Button
                    key = {item.id}
                    title = {item.name}
                    onPress = {() => _onPress(item)}
                />
            ))}
        </View>
    );
};

export default List;