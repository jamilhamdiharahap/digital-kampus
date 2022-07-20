import AsyncStorage from '@react-native-async-storage/async-storage';

import {StyleSheet, Text, View, ScrollView} from 'react-native';

import React from 'react';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

import Api from '../../../utils/Api';
import IconLoading from '../../../components/atoms/IconLoading';
import Header from '../../../components/molecules/Header';
import {constant} from '../../../utils/constant/constant';

export default class NilaiUts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idMhs: '',
      nim: '',
      nama: '',
      jurusan: '',
      totalSks: '',
      kelas: '',
      tempatLahir: '',
      tanggalLahir: '',
      tahun_ajar: '',
      keterangan: '',
      ipk: '',
      data: [],
      matkul: [],
      matkul2: [],
      row: [],
      selected: false,
    };
    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        this.setState({
          nim: data.nim,
          idMhs: data.id_mahasiswa,
          nama: data.nama_mhs,
          jurusan: data.jurusan.nama_jurusan,
          totalSks: data.total_sks,
          kelas: data.kelas.nama_kelas,
          tempatLahir: data.tempat_lahir,
          tanggalLahir: data.tanggal_lahir,
        });
      }

      const cekBobot = a => {
        if (a == 'A') return 4;
        else if (a == 'B') return 3;
        else if (a == 'C') return 2;
        else if (a == 'D') return 1;
        else return 0;
      };

      const cekTotal = (bobot, sks) => {
        return cekBobot(bobot) * sks;
      };

      // const CONTENT = [
      //   ['1', 'MM', 'APSIT', sks.tiga, '3', 'A', bobot.A, sks.tiga * bobot.A],
      //   ['2', 'MM', 'APSIT', sks.tiga, '3', '0', bobot.E, sks.dua * bobot.E],
      //   ['3', 'MM', 'APSIT', sks.tiga, '3', 'B', bobot.B, sks.tiga * bobot.B],
      //   ['4', 'MM', 'APSIT', sks.tiga, '3', '0', bobot.E, sks.dua * bobot.E],
      // ];

      fetch(Api.host + '/v2/khs/ips/' + this.state.idMhs)
        .then(response => response.json())
        .then(json => {
          if (json.respon_code == 200) {
            this.setState({ipk: json.data.ip});
            let list = json.data.nilai;
            let data = [];
            for (let i = 0; i < list.length; i++) {
              data.push(i + 1);
              data.push(list[i].Kurikulum.matakuliah.kode_matkul);
              data.push(list[i].Kurikulum.matakuliah.nama_matkul);
              if (list[i].uas != 0) {
                data.push(list[i].absen.toString().substring(0, 5));
                data.push(list[i].tugas.toString().substring(0, 5));
                data.push(list[i].uts.toString().substring(0, 5));
                data.push(list[i].uas.toString().substring(0, 5));
              } else if (list[i].uts == 0) {
                data.push('-');
                data.push('-');
                data.push('-');
                data.push('-');
              } else {
                data.push('-');
                data.push('-');
                data.push(list[i].uts.toString().substring(0, 5));
                data.push('-');
              }
              this.setState({
                tahun_ajar: list[i].Kurikulum.tahun_ajar.tahun_ajar,
                keterangan: list[i].Kurikulum.tahun_ajar.keterangan,
              });
              this.state.row.push(data);
              data = [];
            }
            this.setState({
              // matkul: json.data,
              // matkul2:json.data.Kurikulum.matakuliah,
            });
          } else {
            alert(json.message);
          }
        })
        .catch(err => alert('Terjadi kesalahan pada server'));
    });
  }

  render() {
    const headerKonten = [
      'No',
      'Kode',
      'Mata Kuliah',
      'Absen',
      'Tugas',
      'UTS',
      'UAS',
    ];

    const Informasi = ({teks1, teks2, ...rest}) => {
      return (
        <View style={{flexDirection: 'row', padding: 15, ...rest}}>
          <View style={{flex: 1}}>
            <Text>{teks1}</Text>
          </View>
          <View style={{flex: 1.5, borderBottomWidth: 1, paddingLeft: 8}}>
            <Text>{teks2}</Text>
          </View>
        </View>
      );
    };

    const sks = {
      tiga: 3,
      dua: 2,
    };

    const bobot = {
      A: 4,
      B: 3,
      C: 2,
      D: 1,
      E: 0,
    };

    return (
      <View style={{flex: 1, backgroundColor: '#e6e6e6', paddingBottom: 20}}>
        <Header />
        <ScrollView style={{flex: 1, padding: 20}}>
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              paddingVertical: 25,
              paddingHorizontal: 5,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  backgroundColor: '#e6e6e6',
                  padding: 10,
                  borderRadius: 5,
                  width: '90%',
                  textAlign: 'center',
                }}>
                NILAI MATA KULIAH AKTIF
              </Text>
              <Informasi marginTop={15} teks1="NIM" teks2={this.state.nim} />
              <Informasi teks1="Nama Lengkap" teks2={this.state.nama} />
              <Informasi teks1="Tahun Ajaran" teks2={this.state.tahun_ajar} />
              <Informasi
                teks1="Keterangan Semester"
                teks2={this.state.keterangan}
              />
              <Informasi
                teks1="Program Studi"
                teks2={this.state.jurusan}
                marginBottom={40}
              />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  paddingVertical: 20,
                  borderTopWidth: 2,
                  borderColor: constant.warnaBackground,
                }}>
                {this.state.row.length != 0 ? (
                  <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                    <Row
                      data={headerKonten}
                      flexArr={[0.2, 0.5, 1, 0.5, 0.5, 0.5, 0.5]}
                      style={{
                        width: 350,
                        height: 40,
                        backgroundColor: constant.warnaBackground,
                      }}
                      textStyle={{
                        textAlign: 'center',
                        fontSize: 12,
                        color: 'white',
                      }}
                    />
                    {this.state.row.map(item => (
                      <Row
                        data={item}
                        flexArr={[0.2, 0.5, 1, 0.5, 0.5, 0.5, 0.5]}
                        key={item[0]}
                        style={{
                          width: 350,
                          height: 40,
                          backgroundColor:
                            item[0] % 2 == 0 ? 'white' : '#dfe6e9',
                        }}
                        textStyle={{marginLeft: 5, fontSize: 12}}
                      />
                    ))}
                  </Table>
                ) : (
                  <IconLoading />
                )}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
