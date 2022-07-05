import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {merahAti} from '../../../assets/styles/style';

const MainButton = ({link, teks, ...rest}) => {
  return (
    <TouchableOpacity onPress={link}>
      <View
        style={{
          ...rest,
          height: 35,
          backgroundColor: merahAti,
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>{teks}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({});
