import React from 'react';
import { View, Text, TouchableHighlight, TextInput, Alert } from 'react-native';
import Styles from './../styles/Styles';
import ApiFacade from './../facade/apiFacade';

export default class CreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.navigation.getParam("email", ""),
            password: this.props.navigation.getParam("password", ""),
            rePassword: "",
        }
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
                <TextInput
                    onChangeText={(rePassword) => this.setState({ rePassword })}
                    value={this.state.rePassword}
                    placeholder="Repeat Password"
                    secureTextEntry
                    style={Styles.input}
                />
                <TouchableHighlight onPress={this.createUser}>
                    <View style={Styles.button}>
                        <Text style={Styles.buttonText}>
                            Create User
                    </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    createUser = async () => {
        const { email, password, rePassword } = this.state;
        if (!email || !password || !rePassword) {
            Alert.alert("Please fill out all forms");
            return;
        }
        if (password !== rePassword) {
            Alert.alert("Passwords do not match");
            this.setState({ password: "", rePassword: "" });
            return;
        }

        const res = await ApiFacade.signUp(email, password);
        if(res.status !== 200){
            console.log(res);
            Alert.alert("Could not create user");
            return;
        }
        this.props.navigation.navigate("MainMenu");
    }
}