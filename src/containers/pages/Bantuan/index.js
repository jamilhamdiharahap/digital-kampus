import React from 'react';
import {Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import Navbar from './../../../containers/organisms/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingButton from '../../../components/molecules/FloatingButton';
import Header from '../../../components/molecules/Header';

export default class Bantuan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      show: 0,
    };

    AsyncStorage.getItem('@nama', (error, result) => {
      if (result) {
        this.setState({
          nama: result,
        });
      }
    });
  }

  render() {
    const SapaNama = () => {
      return (
        <View
          style={{
            backgroundColor: 'white',
            flex: 0.7,
            justifyContent: 'center',
            marginVertical: 16,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Butuh Bantuan, {this.state.nama} ?
          </Text>
        </View>
      );
    };

    const DropDown = props => {
      return (
        <View
          style={{
            justifyContent: 'space-between',
            height: 50,
            borderTopWidth: 1,
            borderColor: '#ededed',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              this.state.show == props.urutan
                ? this.setState({show: 0})
                : this.setState({show: props.urutan})
            }>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                width: '90%',
                marginTop: 10,
                textAlign: 'left',
              }}>
              {props.judul}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    const ListItem = props => {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text>{props.no}</Text>
          <Text style={{marginLeft: 16, marginBottom: 10}}>{props.isi}</Text>
        </View>
      );
    };

    const CaraKunjungan = () => {
      return (
        <>
          <ListItem
            no="1."
            isi="Datanglah ke perpustakaan Universitas Nasional PASIM atau menggunakan aplikasi ini."
          />
          <ListItem
            no="2."
            isi="Jika kamu datang ke kampus, maka datanglah ke bagian Front Office untuk meminta KRS."
          />
          <ListItem
            no="3."
            isi="Jika kamu menggunakan aplikasi ini, pilih menu KRS, lalu isi mata kuliah yang akan kalian tempuh."
          />
          <ListItem
            no="3."
            isi="Setelah itu, kamu akan mendapatkan KRS yang dapat kamu isi dan berikan ke bagian akademik."
          />
        </>
      );
    };

    const CaraPinjamBuku = () => {
      return (
        <>
          <ListItem
            no="1."
            isi="KRS adalah singkatan dari Kartu rencana studi."
          />
          <ListItem
            no="2."
            isi="Itu adalah kontrak kamu untuk mengikuti mata kuliah yang kamu pilih atau tulis selama satu semester kedepan."
          />
        </>
      );
    };

    const BukuTidakAdaQR = () => {
      return (
        <>
          <ListItem
            no="1."
            isi="KHS merupakan kepanjangan dari kartu hasil studi."
          />
          <ListItem
            no="2."
            isi="Itu adalah hasil kuliah atau belajar kamu yang berupa kumpulan nilai akademik."
          />
        </>
      );
    };

    const TelatMengembalikan = () => {
      return (
        <>
          <ListItem no="1." isi="KRS hanya dibuka selama periode tertentu." />
          <ListItem
            no="2."
            isi="Mungkin saja saat ini bukan waktunya untuk pengisian KRS."
          />
          <ListItem
            no="3."
            isi="Untuk mengetahui periode pengisian KRS silahkan hubungi bantuan atau datang ke kampus Universitas Nasinal PASIM."
          />
        </>
      );
    };

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* Logo */}
        <Header />
        {/* Figura */}
        <View
          style={{
            marginHorizontal: 16,
            backgroundColor: 'transparent',
            flex: 10,
          }}>
          {/* nama */}
          <SapaNama />
          {/* Bantuan     */}
          <View style={{flex: 10}}>
            {/* menu1 */}
            <View style={{backgroundColor: 'white'}}>
              {/* judul + tombol */}
              <DropDown judul="Bagaimana cara mengisi KRS ?" urutan={1} />
              {this.state.show == 1 ? <CaraKunjungan /> : null}
              <DropDown judul="Apa itu KRS ?" urutan={2} />
              {this.state.show == 2 ? <CaraPinjamBuku /> : null}
              <DropDown judul="Apa itu KHS ?" urutan={3} />
              {this.state.show == 3 ? <BukuTidakAdaQR /> : null}
              <DropDown
                judul="Kenapa saya tidak bisa mengisi KRS sekarang ?"
                urutan={4}
              />
              {this.state.show == 4 ? <TelatMengembalikan /> : null}
            </View>
          </View>
        </View>
        <FloatingButton />
      </View>
    );
  }
}
