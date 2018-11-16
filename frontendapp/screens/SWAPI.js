import React from 'react';
import { View, Text, FlatList, StyleSheet, input } from 'react-native';
import Styles from './../styles/Styles';
import ApiFacade from './../facade/apiFacade';
import NumericInput from 'react-native-numeric-input';


export default class SWAPI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            swPersons: [],
            amount: 5
        }
    }

    async componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <NumericInput
                    initValue={this.state.amount}
                    minValue={1}
                    maxValue={12}
                    onChange={amount => {
                        this.setState({ amount })
                        this.getData();
                    }}
                />
                <View style={Styles.container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.swPersons}
                        style={{ flex: 1 }}
                        renderItem={({ item }) =>
                            <View style={LocalStyles.flatview}>
                                <Text style={LocalStyles.name}>Name: {item.name}</Text>
                                <Text>Gender: {item.gender}</Text>
                                <Text>Birth Year: {item.birth_year}</Text>
                                <Text>Eye Color: {item.eye_color}</Text>
                                <Text>Hair Color: {item.hair_color}</Text>
                                <Text>Height: {item.height}</Text>
                                <Text>Mass: {item.mass}</Text>
                                <Text>Skin Color: {item.skin_color}</Text>
                            </View>
                        }
                        keyExtractor={item => item.name}
                    />
                </View>
            </View>
        );
    }
    getData = async () => {
        const swPersons = await ApiFacade.starWarsFetch(this.state.amount);
        this.setState({ swPersons }); 
    }
}

const LocalStyles = StyleSheet.create({
    h2text: {
        marginTop: 10,
        fontFamily: 'Helvetica',
        fontSize: 36,
        fontWeight: 'bold',
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 30,

    },
    name: {
        fontSize: 24,
        fontWeight: "bold"
    },
});