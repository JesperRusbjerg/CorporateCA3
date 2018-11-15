import React from 'react';
import {Text, View} from 'react-native';

export default class BigData extends React.Component {

    constructor(props){
        super(props);
        this.state = {bigData: []};
    }



    render(){
        return(
            <View>
                <Text>
                    Big Data Test
                </Text>
            </View>
        );
    }

}