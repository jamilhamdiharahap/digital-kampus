import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GarisAbuHitam from '../../../components/atoms/GarisAbu/garisabuhitam';
import {color} from 'react-native-reanimated';
import {constant} from '../../../utils/constant/constant';
import {ScrollView} from '@react-navigation/native';
import Header from '../../../components/molecules/Header';
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
      semester: '',
      jurusan: '',
      kelas: '',
      tahun_angkatan: '',
      nik:'',
      kota:'',
      nama_ibu_kandung:'',
      fakultas:''
    };

    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        this.setState({
          nim: data.nim,
          nama: data.fullname,
          email: data.email,
          no_hp: data.no_hp,
          agama: data.agama,
          jenis_kelamin: data.jenis_kelamin,
          tanggal_lahir: data.tanggal_lahir,
          tempat_lahir: data.tempat_lahir,
          semester: data.semester,
          jurusan: data.jurusan,
          kelas: data.kelas,
          tahun_angkatan: data.tahun_angkatan,
          nik:data.nik,
          kota:data.kota,
          nama_ibu_kandung:data.nama_ibu_kandung,
          fakultas:data.fakultas
        });
      }
    });
  }
  render() {
    return (
      <>
        {/* <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#EEEEEE',
          }}>
          <TouchableOpacity>
            <Image
              style={{
                width: 35,
                height: 20,
              }}
              source={require('../../../assets/images/icon/back.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              color: constant.warnaBackground,
            }}>
            Ajukan Perubahan Data
          </Text>
        </View> */}
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
                  {this.state.tempat_lahir}, {this.state.tanggal_lahir}
                </Text>
              </View>
              <GarisAbuHitam />
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value="Semester"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.semester}</Text>
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
                  value="Kota"
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.kota}</Text>
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
              <View>
                <TextInput
                  style={{fontSize: 10}}
                  value=""
                  editable={false}
                  selectTextOnFocus={false}
                />
                <Text>{this.state.fakultas}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}
