import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import ApiFacade from './../facade/apiFacade';
import Styles from './../styles/Styles';
import { Dropdown } from 'react-native-material-dropdown';

export default class AdminScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [] }
        this.getUsers();
    }

    render() {
        return (
            <View style={Styles.container}>
                <UserList users={this.state.users} />
            </View>);
    }

    getUsers = async () => {
        const users = await ApiFacade.getUsers();
        this.setState({ users });
    }

}

function UserList({ users }) {
    return (
        <View>
            {
                users.map((user, index) => {
                    let msg = "Make Admin"
                    const dropData = user.roles.map((role) => {
                        if (role.roleName === "admin") msg = "Remove Admin"
                        return { value: role.roleName };
                    })
                    return (
                        <View key={index}>
                            <Text>
                                {user.email}
                            </Text>
                            <Dropdown
                                label='Roles'
                                data={dropData}
                            />
                            <TouchableHighlight onPress={() => editUser(user.email)}>
                                <View style={Styles.button}>
                                    <Text style={Styles.buttonText}>
                                        {msg}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    );
                })
            }
        </View>
    )

    async function editUser(email){
        const res = await ApiFacade.editUser(email);
    }
}