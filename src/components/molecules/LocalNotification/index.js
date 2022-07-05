import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {notifikasi} from './Notifikasi';

export default class LocalNotification extends Component {
  pushNotif = (kapan, channel, judul, pesan) => {
    // const empatHari = 345600;
    // const tujuhHari = 604800;

    const empatHari = 18000; //  5 jam
    const tujuhHari = 36000; // 10 jam

    notifikasi.configure();
    notifikasi.buatChannel(channel);
    kapan === 'sekarang'
      ? notifikasi.kirimNotifikasi(channel, judul, pesan)
      : notifikasi.kirimNotifikasiJadwal(channel, judul, pesan, empatHari);
  };

  cancel = channel => notifikasi.cancelNotifikasi(channel);

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Halaman localpushnotification</Text>
        <TouchableOpacity
          onPress={() => {
            this.pushNotif(
              'sekarang',
              '123',
              'Peminjaman buku berhasil',
              'Selamat membaca buku ini, dan jangan lupa untuk mengembalikannya tepat waktu!',
            );
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 50,
            borderRadius: 20,
            backgroundColor: 'green',
            marginTop: 30,
          }}>
          <Text style={{color: 'white'}}>Klik</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.pushNotif(
              'nanti',
              '123',
              'Pengembalian buku',
              'Tidak terasa 3 hari lagi buku ini harus dikembalikan ke perpustakaan, jangan sampai telat ya!',
            );
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 50,
            borderRadius: 20,
            backgroundColor: 'green',
            marginTop: 30,
          }}>
          <Text style={{color: 'white'}}>Nanti</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.cancel('123')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 50,
            borderRadius: 20,
            backgroundColor: 'green',
            marginTop: 30,
          }}>
          <Text style={{color: 'white'}}>Kill</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
