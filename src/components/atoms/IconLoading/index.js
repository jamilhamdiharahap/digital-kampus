import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

const IconLoading = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        marginVertical: 80,
      }}>
      <ActivityIndicator size="large" color="#041562" />
    </View>
  );
};

export default IconLoading;
