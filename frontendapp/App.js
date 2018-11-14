import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import CreateUser from './screens/CreateUser';
import MainMenu from './screens/MainMenu';
import SWAPI from './screens/SWAPI';

import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Login: LoginScreen,
  CreateUser: CreateUser,
  MainMenu: MainMenu,
  SWAPI: SWAPI,
});

export default App;

