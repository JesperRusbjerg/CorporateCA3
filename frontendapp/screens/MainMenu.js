import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import ApiFacade from './../facade/apiFacade';
import Styles from './../styles/Styles';




export default class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = { token: {} }
    }

    async componentDidMount() {
        const token = await ApiFacade.getTokenObject();
        console.log(token);
        this.setState({ token });
    }

    render() {
        if (this.state.token.roles === "admin") {
            return (
                <View style={Styles.container}>
                    <DefaultMenu navigate={this.props.navigation.navigate} email={this.state.token.email} />
                    <AdminMenu navigate={this.props.navigation.navigate} email={this.state.token.email} />
                </View>
            );
        }
        return (
            <View style={Styles.container}>
                <DefaultMenu navigate={this.props.navigation.navigate} email={this.state.token.email} />
            </View>
        );
    }
}

function DefaultMenu({email, navigate}) {
    console.log(email);
    return (
        <View>
            <Text style={{fontSize: 24, fontWeight: "bold"}}>
                Hallo {email}
            </Text>
            <MenuButton title="SWAPI" navigateTo="SWAPI" navigate={navigate} />
            <MenuButton title="Big Data" navigateTo="BigDataScreen" navigate={navigate} />
        </View>
    );
}

function AdminMenu({ navigate }) {
    return (
        <View>
            <MenuButton title="Admin Page" navigateTo="AdminScreen" navigate={navigate} />
        </View>
    );
}

function MenuButton({ title, navigateTo, navigate }) {
    return (
        <TouchableHighlight onPress={() => navigate(navigateTo)}>
            <View style={Styles.button}>
                <Text style={Styles.buttonText}>
                    {title}
                </Text>
            </View>
        </TouchableHighlight>
    );
}