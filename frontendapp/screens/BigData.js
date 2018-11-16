import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import ApiFacade from './../facade/apiFacade';
import Styles from './../styles/Styles';

export default class BigData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bigData: [],
            start: 0,
            end: 10,
            amount: 10,
        };
    }

    componentDidMount() {
        this.getData(this.state.start, this.state.end);
    }

    getData = async (start, end) => {
        this.setState({start, end});
        console.log(`Start: ${start} End: ${end}`);
        const bigData = await ApiFacade.getDummyData(start, end);
        this.setState({ bigData });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={localStyles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.bigData}
                        style={{ flex: 1 }}
                        renderItem={({ item }) => {
                            return (
                                <View style={localStyles.flatview}>
                                    <Text style={localStyles.name}>Name: {`${item.fName} ${item.lName}`}</Text>
                                    <Text>ID: {item.id}</Text>
                                    <Text>Gender: {item.gender}</Text>
                                    <Text>Age: {item.age}</Text>
                                    <Text>Height: {item.height}</Text>
                                    <Text>IQ: {item.IQ}</Text>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => `listItem${index}`}
                    />
                </View>
                <View style={{ flexDirection: "row", flex: 1, backgroundColor: "orange" }}>
                    <TouchableHighlight onPress={() => {
                        const amount = this.state.amount;
                        const start = this.state.start - amount;
                        const end = this.state.end - amount;
                        this.getData(start, end);
                    }}
                    style={{flex: 1}}
                    >
                        <View style={localStyles.backButton}>
                            <Text>
                                Back
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        const amount = this.state.amount;
                        const start = this.state.start + amount;
                        const end = this.state.end + amount;
                        this.getData(start, end);
                    }}
                    style={{flex: 1}}
                    >
                        <View style={localStyles.nextButton}>
                            <Text>
                                Next
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

}

const localStyles = StyleSheet.create({
    nextButton: {
        width: 100,
        alignItems: 'center',
        borderColor: "black",
        margin: 10,
        alignSelf: "flex-end",
        backgroundColor: '#ffffff'
    }, backButton: {
        width: 100,
        alignItems: 'center',
        borderColor: "black",
        margin: 10,
        alignSelf: "flex-start",
        backgroundColor: '#ffffff'
    }, flatview: {
        justifyContent: 'center',
        paddingTop: 30,

    }, name: {
        fontSize: 24,
        fontWeight: "bold"
    }, container: {
        flex: 13,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});