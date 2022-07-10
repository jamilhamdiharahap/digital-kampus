import AsyncStorage from '@react-native-async-storage/async-storage';

import {ScrollView} from '@react-navigation/native';

import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

import {color} from 'react-native-reanimated';

import {tinggi} from '../../../assets/styles/style';
import Header from '../../../components/molecules/Header';
import {constant} from '../../../utils/constant/constant';
import GarisAbuHitam from '../../../components/atoms/GarisAbu/garisabuhitam';
import MainButton from '../../../components/atoms/MainButton/main-button';
export default class InfoPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      nama: '',
      email: '',
      tanggal_lahir: '',
      no_hp: '',
      agama: '',
      jenis_kelamin: '',
      tempat_lahir: '',
      jurusan: '',
      kelas: '',
      tahun_angkatan: '',
      nik: '',
      alamat: '',
      nama_ibu_kandung: '',
      fakultas: '',
      modalVisible: false,
    };

    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        this.setState({
          nim: data.nim,
          nama: data.nama_mhs,
          email: data.email,
          no_hp: data.no_handphone,
          agama: data.agama,
          jenis_kelamin: data.jenis_kelamin,
          tanggal_lahir: data.tanggal_lahir,
          tempat_lahir: data.tempat_lahir,
          jurusan: data.jurusan.nama_jurusan,
          kelas: data.kelas.nama_kelas,
          tahun_angkatan: data.tahun_angkatan,
          nik: data.nik,
          alamat: data.alamat,
          nama_ibu_kandung: data.ibu_kandung,
          fakultas: data.jurusan.fakultas.nama_fakultas,
        });
      }
    });
  }
  render() {
    const Popup = () => {
      return (
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType="slide">
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({modalVisible: !this.state.modalVisible});
              }}>
              <View
                style={{
                  height: tinggi / 1.27,
                }}></View>
            </TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({modalVisible: !this.state.modalVisible});
                }}>
                <View
                  style={{
                    backgroundColor: '#041562',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Update Profil
                  </Text>
                </View>
              </TouchableHighlight>
              <View
                style={{
                  height: tinggi / 5,
                  padding: 12,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <MainButton
                  teks="Update Password"
                  width={250}
                  link={() => {
                    this.props.navigation.navigate('KartuRencanaStudi');
                  }}
                />
                <MainButton
                  teks="Update Foto"
                  width={250}
                  link={() => {
                    this.setState({modalVisible: !this.state.modalVisible});
                    this.props.navigation.navigate('UpdatePhoto');
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      );
    };
    return (
      <>
        <Header />
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#EEEEEE',
          }}>
          <View style={{marginLeft: 10, marginBottom: 10, paddingBottom: 10}}>
            <Text style={{fontSize: 25}}>Info Personal</Text>
          </View>
          <ScrollView>
            <View style={{marginLeft: 10, marginRight: 10}}>
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Nim"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.nim}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Nama Lengkap"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.nama}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Tempat Tanggal Lahir"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>
                  {this.state.tempat_lahir},{' '}
                  {this.state.tanggal_lahir.substring(0, 10)}
                </Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Jurusan"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.jurusan}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Kelas"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.kelas}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Tahun Angkatan"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.tahun_angkatan}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Email"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.email}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Nik"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.nik}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Agama"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.agama}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Alamat"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.alamat}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="No.Handpone"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.no_hp}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Jenis Kelamin"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.jenis_kelamin}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Ibu Kandung"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.nama_ibu_kandung}</Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Fakultas"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.fakultas}</Text>
              </View>
              <GarisAbuHitam />
            </View>
          </ScrollView>
          <View
            style={{
              height: '15%',
              paddingTop: 16,
            }}>
            <TouchableOpacity
              style={{
                elevation: 8,
                backgroundColor: constant.warnaBackground,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: -8,
                width: '80%',
                alignSelf: 'center',
              }}
              onPress={() => {
                this.setState({modalVisible: !this.state.modalVisible});
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  borderTopRightRadius: 80,
                }}>
                Update Profil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Popup />
      </>
    );
  }
}
