import React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

class main extends React.Component{
    static navigationOptions ={
        title: 'Amebo',
    };

    state = {
        name: ''
    }

    onPress = () => 
        this.props.navigation.navigate('chat', { name: this.state.name });

    onChangeText = name => this.setState({ name });

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter your name</Text>
            <TextInput
                style={styles.input}
                placeHolder="Not me"
                onChangeText={this.onChangeText}
                value={this.state.name}
                clearButtonMode = "always"
                autocorrect="false"
            />
            <TouchableOpacity style={{ borderRadius: 5, height: 30, width: 100, backgroundColor: '#fff', margin: 25}} onPress={this.onPress}>
                <Text style={styles.buttonText}>JOIN</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const offset = 24;
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#000',
    },

    title: {
        color: '#fff',
        marginTop: offset,
        marginLeft: offset,
        fontSize: offset,
    },

    input: {
        color: '#fff',
        height: offset * 2,
        margin: offset,
        paddingHorizontal: offset,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
    },
    
    buttonText: {
        color: '#000',
        marginLeft: offset,
        fontSize: offset,
    },
});

export default main;