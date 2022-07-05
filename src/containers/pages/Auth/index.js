import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useEffect, Component} from 'react';

import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

export default class Auth extends Component {
  render() {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('mahasiswa');
        if (value !== null) {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Intro');
        }
      } catch (e) {
        alert('Server sibuk');
      }
    };
    getData();
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
}
