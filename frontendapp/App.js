import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';

import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Login: LoginScreen,

});

export default App;

