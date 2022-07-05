import React from 'react';
import {View, TouchableOpacity, Alert, Image, Linking} from 'react-native';

const linkBukuPop = () => {
  Linking.openURL(
    'mailto:digitalkampuspasim@gmail.com?subject=Bantuan&body=Halo, Saya butuh bantuan !',
  );
};

const askSee = () => {
  Alert.alert('Bantuan', 'Ingin mendapat bantuan lebih lanjut ?', [
    {
      text: 'Tidak',
    },
    {
      text: 'Ya',
      onPress: () => linkBukuPop(),
    },
  ]);
};

const FloatingButton = () => {
  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#041562',
        position: 'absolute',
        bottom: 80,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => askSee()}
        style={{
          width: 55,
          height: 55,
          borderRadius: 55,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/images/icon/headphone.png')}
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            position: 'absolute',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;
