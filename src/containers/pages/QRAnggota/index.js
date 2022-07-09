import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {Component} from 'react';

import {
  View,
  ActivityIndicator,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';

import n from 'react-native-normalize';

import Header from './../../../components/molecules/Header';
import GarisKecil from './../../../components/atoms/GarisKecil/index';

class QRAnggota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      nama: '',
    };

    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result)
        this.setState({
          nim: data.nim,
          nama:data.nama_mhs
        });
      } else {
        alert('NIM tidak ditemukan, silahkan untuk Login ulang');
        this.setState({
          nim: '',
        });
        this.props.navigation.navigate('Home');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.titleTop}>Yuk isi daftar kunjungan !</Text>
        <View style={styles.qr}>
          {this.state.nim != ""?
            <QRCode
              value={this.state.nim}
              quietZone={n(5)}
              size={n(300)}
              enableLinearGradient={true}
              linearGradient={['red', 'black']}
            />
          :null}
        </View>
        <GarisKecil />
        <Text style={styles.bagaimana}>Bagaimana caranya ?</Text>
        <GarisKecil />
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{flexDirection: 'column', marginLeft: 32, marginTop: 16}}>
            <View
              style={{width: '90%', flexDirection: 'row', marginVertical: 10}}>
              <Text>1. </Text>
              <Text style={{marginLeft: 10}}>
                Datanglah ke perpustakaan Universitas Nasional PASIM.
              </Text>
            </View>
            <View
              style={{width: '90%', flexDirection: 'row', marginVertical: 10}}>
              <Text>2. </Text>
              <Text style={{marginLeft: 10}}>
                QR ini berisi NIM anda, anda dapat menggunakannya untuk
                kepentingan di kampus.
              </Text>
            </View>
            {/* <View
              style={{width: '90%', flexDirection: 'row', marginVertical: 10}}>
              <Text>3. </Text>
              <Text style={{marginLeft: 10}}>
                Terima kasih telah mengunjungi perpustakaan.
              </Text>
            </View>
            <View
              style={{width: '90%', flexDirection: 'row', marginVertical: 10}}>
              <Text>4. </Text>
              <Text style={{marginLeft: 10}}>
                Untuk meminjam buku, kamu dapat melihat di halaman utama,
                kemudian klik tombol Pinjam Buku.
              </Text>
            </View> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleTop: {
    fontSize: n(20),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: n(16),
  },
  qr: {
    alignSelf: 'center',
    margin: n(16),
    flex: 1,
  },
  bagaimana: {
    fontSize: n(20),
    fontWeight: 'bold',
    marginLeft: n(16),
    marginVertical: n(6),
  },
});

export default QRAnggota;
