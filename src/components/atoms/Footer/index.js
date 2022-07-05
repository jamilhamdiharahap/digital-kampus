import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';

const Footer = () => {
  return <Text style={styles.text}>©Copyright Digital Kampus 2022</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginBottom: normalize(16),
    textAlign: 'center',
    color: '#adadad',
    backgroundColor: 'white',
  },
});

export default Footer;
