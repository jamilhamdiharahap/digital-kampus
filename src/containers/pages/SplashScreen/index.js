import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

import React, {useEffect} from 'react';

import {tinggi} from '../../../assets/styles/style';
import bg from '../../../assets/images/background/bgSplash.jpg';
import pasim from '../../../assets/images/logo/logoPasim.png';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      //Harusnya 'Intro'
      navigation.navigate('Auth');
    }, 3000);
  });

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={bg} style={{flex: 1}}>
        <View style={styles.container}>
          <Image source={pasim} style={styles.logo} />
          <Text style={{fontSize: 18}}>Universitas Nasional PASIM</Text>
          <Text style={styles.teks1}>Digital Kampus</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {height: 120, width: 120},
  teks1: {
    position: 'absolute',
    bottom: tinggi - (tinggi - 55),
    fontSize: 25,
  },
});
