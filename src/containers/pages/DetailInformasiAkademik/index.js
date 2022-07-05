import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import React from 'react';

import {tinggi} from '../../../assets/styles/style';
import back from '../../../assets/images/icon/back.png';

const DetailInformasiAkademi = ({navigation}) => {
  const {data} = navigation.state.params;
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={{
          uri: data.foto,
        }}
        style={styles.imgBckgrnd}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={{
              padding: 15,
              backgroundColor: '#80808066',
              width: 45,
              alignItems: 'center',
              borderRadius: 50,
              marginLeft: 5,
              marginTop: 5,
            }}>
            <Image source={back} style={{height: 15, width: 25}}></Image>
          </View>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.kontenContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data.judul}</Text>
        </View>
        <View style={styles.line}></View>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: '90%'}}>
          <View style={styles.konten}>
            <Text style={styles.teks}>{data.isi}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailInformasiAkademi;

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: 'white', flex: 1},
  imgBckgrnd: {width: '100%', height: 250},
  kontenContainer: {
    backgroundColor: '#dfe4ea',
    width: '100%',
    height: tinggi / 1.38,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    top: tinggi / 3.3,
  },
  titleContainer: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {fontSize: 20, fontWeight: 'bold'},
  line: {
    height: 7,
    width: '90%',
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  konten: {
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 20,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  teks: {textAlign: 'justify'},
});
