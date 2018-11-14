import React from 'react';
import { View, Text, TouchableHighlight, TextInput, Alert } from 'react-native';
import Styles from './../styles/Styles';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
    }


    render() {
        return (
            <View style={Styles.container}>
                <TextInput
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    placeholder="Email"
                    style={Styles.input}
                />
                <TextInput
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    placeholder="Password"
                    secureTextEntry
                    style={Styles.input}
                />
                <TouchableHighlight onPress={this.login}>
                    <View style={Styles.button}>
                        <Text style={Styles.buttonText}>
                            Login
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    login = () => {
        const email = this.state.email;
        const password = this.state.password;
        if(!email || !password){
            Alert.alert("Fill out all forms");
        }
        
    }
}