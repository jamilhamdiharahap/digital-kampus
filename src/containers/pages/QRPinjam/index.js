import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './../../../components/molecules/Header';
import {notifikasi} from '../../../components/molecules/LocalNotification/Notifikasi';
import n from 'react-native-normalize';
import GarisKecil from './../../../components/atoms/GarisKecil';

class QRPinjam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      idBuku: '',
      namaBuku: '',
    };

    AsyncStorage.getItem('@nim', (error, result) => {
      if (result) {
        this.setState({
          nim: result,
        });
      } else {
        alert('NIM tidak ditemukan, silahkan untuk Login ulang');
        this.setState({
          nim: '',
        });
        this.props.navigation.navigate('Home');
      }
    });

    AsyncStorage.getItem('@idBuku', (error, result) => {
      if (result) {
        this.setState({
          idBuku: result,
        });
      } else {
        alert('idBuku tidak ditemukan, silahkan untuk pilih ulang');
        this.setState({
          idBuku: '',
        });
        this.props.navigation.navigate('Home');
      }
    });

    AsyncStorage.getItem('@namaBuku', (error, result) => {
      if (result) {
        this.setState({
          namaBuku: result,
        });
      } else {
        alert('namaBuku tidak ditemukan, silahkan untuk pilih ulang');
        this.setState({
          namaBuku: '',
        });
        this.props.navigation.navigate('Home');
      }
    });
  }

  pushNotif = (kapan, channel, judul, pesan) => {
    // const empatHari = 345600* 1000;
    // const tujuhHari = 518400* 1000;

    const empatHari = 18000 * 1000; //  5 jam
    const tujuhHari = 36000 * 1000; // 10 jam
    notifikasi.configure();
    notifikasi.buatChannel(channel);
    if (kapan === 1) notifikasi.kirimNotifikasi(channel, judul, pesan);
    else if (kapan === 2)
      notifikasi.kirimNotifikasiJadwal(channel, judul, pesan, empatHari);
    else if (kapan === 3)
      notifikasi.kirimNotifikasiJadwal(channel, judul, pesan, tujuhHari);
  };

  cancel = channel => notifikasi.cancelNotifikasi(channel);

  render() {
    let logoFromFile = require('./../../../assets/images/logo/pasim.png');
    let url =
      this.state.nim + ',' + this.state.idBuku + ',' + this.state.namaBuku;

    const cek = () => {
      // cek ke api peminjaman, if true, redirect ke riwayat.
      push();
      AsyncStorage.setItem('@ac', 'Riwayat');
      this.props.navigation.navigate('Riwayat');
    };

    const push = () => {
      this.pushNotif(
        1,
        '1',
        'Peminjaman buku berhasil',
        `Selamat membaca buku ${this.state.namaBuku}, dan jangan lupa untuk mengembalikannya tepat waktu!`,
      );
      this.pushNotif(
        2,
        '2',
        'Pengembalian Buku',
        `Tak terasa 3 hari lagi buku ${this.state.namaBuku} harus di kembalikan, jangan lupa untuk mengembalikannya tepat waktu ya!`,
      );
      this.pushNotif(
        3,
        '3',
        'Pengembalian Buku',
        `Tak terasa sudah 7 hari kamu meminjam buku ${this.state.namaBuku}, segera kembalikan buku hari ini ya, untuk menghindari denda!`,
      );
    };

    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.titleTop}>Silahkan Scan QR Dibawah ini !</Text>
        <View style={styles.qr}>
          <QRCode
            value={url}
            quietZone={n(5)}
            size={n(300)}
            enableLinearGradient={true}
            linearGradient={['red', 'black']}
          />
        </View>
        <Text style={styles.namaBuku}>
          {this.state.namaBuku.substring(0, 40)}
        </Text>
        <TouchableOpacity onPress={cek} style={styles.button}>
          <Text style={styles.btnText}>Lanjutkan</Text>
        </TouchableOpacity>
        <GarisKecil />
        <Text style={styles.bagaimana}>Bagaimana caranya ?</Text>
        <GarisKecil />
        <ScrollView style={styles.scroll}>
          <View style={styles.list}>
            <Text>1. </Text>
            <Text style={styles.desc}>
              Datanglah ke perpustakaan Universitas Nasional PASIM.
            </Text>
          </View>
          <View style={styles.list}>
            <Text>2. </Text>
            <Text style={styles.desc}>
              Scan QR Code kamu dengan Scanner yang disediakan oleh petugas.
            </Text>
          </View>
          <View style={styles.list}>
            <Text>3. </Text>
            <Text style={styles.desc}>
              Klik lanjutkan setelah petugas selesai melakukan scan.
            </Text>
          </View>
          <View style={styles.list}>
            <Text>4. </Text>
            <Text style={styles.desc}>
              Waktu peminjaman adalah 7 hari sejak buku di pinjam. Diharapkan
              untuk tidak telat dalam pengembalian buku.
            </Text>
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
    marginBottom: n(20),
    textAlign: 'center',
    margin: n(16),
  },
  qr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namaBuku: {
    marginTop: n(16),
    textAlign: 'center',
  },
  button: {
    height: n(30),
    width: n(150),
    backgroundColor: 'maroon',
    justifyContent: 'center',
    alignItems: 'center',
    margin: n(16),
    alignSelf: 'center',
    borderRadius: 15,
  },
  btnText: {
    color: 'white',
  },
  bagaimana: {
    fontSize: n(20),
    fontWeight: 'bold',
    marginLeft: n(16),
    marginVertical: n(6),
  },
  scroll: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: n(16),
    marginVertical: n(10),
  },
  desc: {
    marginLeft: n(10),
  },
});

export default QRPinjam;
