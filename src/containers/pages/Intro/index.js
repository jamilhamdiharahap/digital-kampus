import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Header from './../../../components/molecules/Header';
import normalize from 'react-native-normalize';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

//TODO intro normalized

const warna = '#041562';
const warnaDots = '#DDD';

export default class Intro extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <AppIntroSlider
          data={slides}
          slides={slides}
          renderItem={items}
          showPrevButton
          hideNextButton
          dotStyle={{backgroundColor: warnaDots}}
          activeDotStyle={{backgroundColor: warna}}
          renderNextButton={() => {
            return <Text style={styles.nextButton}>Lanjut</Text>;
          }}
          renderPrevButton={() => {
            return <Text style={styles.prevButton}>Kembali</Text>;
          }}
          renderDoneButton={() => {
            return <Text style={styles.doneButton}>Selesai</Text>;
          }}
          onDone={() => this.props.navigation.navigate('Login')}
        />
        <View style={styles.space} />
      </View>
    );
  }
}

const slides = [
  {
    key: '1',
    title: 'Absen kehadiran menjadi lebih mudah!',
    text: 'Mengisi absensi kelas atau kehadiran bisa lebih mudah dan tanpa ribet hanya dengan Scan QR',
    image: require('../../../assets/images/dummy/scananggota.jpg'),
    colors: ['#fff'],
  },
  {
    key: '2',
    title: 'Melihat KHS atau mengisi KRS dengan cepat!',
    text: 'keperluan dengan akademik sekarang bisa dengan mudah dilakukan tanpa ribet!',
    image: require('../../../assets/images/dummy/handbook.jpg'),
    colors: ['#fff'],
  },
  {
    key: '3',
    title: 'Mencari Informasi Kampus dan Mahasiswa?',
    text: 'Dengan adanya aplikasi ini mencari informasi kampus dan mahasiswa bisa didapatkan dengan mudah dan gampang!',
    image: require('../../../assets/images/dummy/caribuku.jpg'),
    colors: ['#fff'],
  },
  {
    key: '4',
    title: 'Siap melayani kebutuhan mahasiswa!',
    text: 'Tunggu apa lagi? ayo ajak teman teman mahasiswa Universitas Nasional PASIM untuk mendapatkan fasilitas luar biasa yang terdapat di mobile aplikasi ini!',
    image: require('../../../assets/images/logo/pasim.png'),
    colors: ['#fff'],
  },
];

const items = ({item, dimensions}) => (
  <View
    style={[
      styles.mainContent,
      {
        flex: 1,
        paddingTop: normalize(10),
        paddingBottom: normalize(10),
        width: '100%',
        backgroundColor: 'white',
      },
    ]}
    colors={item.color}>
    <Text style={styles.title}>{item.title}</Text>
    <Image source={item.image} style={styles.image} resizeMode="contain" />
    <View>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: normalize(200),
    height: normalize(200),
    borderRadius: normalize(100),
  },
  text: {
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: normalize(16),
    marginBottom: normalize(80),
  },
  title: {
    fontSize: normalize(22),
    color: warna,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: normalize(20),
    backgroundColor: '#e8e8e8',
    borderRadius: normalize(10),
  },
  nextButton: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: warna,
    marginRight: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(10),
  },
  prevButton: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: warna,
    marginLeft: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(10),
  },
  doneButton: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: 'white',
    marginRight: normalize(10),
    padding: normalize(10),
    borderRadius: normalize(10),
    backgroundColor: warna,
  },
  space: {
    paddingTop: normalize(30),
    backgroundColor: 'white',
  },
});
