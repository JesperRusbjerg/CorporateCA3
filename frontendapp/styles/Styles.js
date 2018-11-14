import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    }, button: {
        width: 260,
        alignItems: 'center',
        borderColor: "black",
        margin: 10,
        backgroundColor: '#2196F3'
    },buttonText: {
        padding: 20,
        fontSize: 24,
        color: 'white'
    }

});

export default Styles;