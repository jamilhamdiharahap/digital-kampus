import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import React from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

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

export default class KHS extends React.Component {
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
          ipk: data.ipk,
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

      fetch(Api.host + '/v2/khs/' + this.state.idMhs)
        .then(response => response.json())
        .then(json => {
          if (json.respon_code == 200) {
            let list = json.data;
            let data = [];
            for (let i = 0; i < json.data.length; i++) {
              data.push(i + 1);
              data.push(list[i].Kurikulum.matakuliah.kode_matkul);
              data.push(list[i].Kurikulum.matakuliah.nama_matkul);
              data.push(list[i].Kurikulum.matakuliah.sks);
              data.push(list[i].Kurikulum.matakuliah.semester);
              data.push(list[i].grade);
              data.push(cekBobot(list[i].grade));
              data.push(
                cekTotal(list[i].grade, list[i].Kurikulum.matakuliah.sks),
              );
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
    let timeSpan = Math.floor(Date.now() / 1000);
    let date = new Date();
    let fullDate =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    let templateHtml = `<html>

<body>
    <table border="1" width="100%" cellspacing="0">
        <tr>
            <td style="border-right-width: 0" width="45%">
                <img width="250" height="35"
                    src="data:image/jpeg;base64,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">
            </td>
            <td style="border-left-width: 0">
                <br>
                <h2>KARTU HASIL STUDI</h2>
            </td>
        </tr>
        <tr>
            <td>
                <table width="100%">
                    <tr>
                        <td width="20%">UNIT KERJA</td>
                        <td>:</td>
                        <td>AKADEMIK</td>
                    </tr>
                </table>
            </td>
            <td>
                <table width="100%">
                    <tr>
                        <td width="20%">NOMOR</td>
                        <td>:</td>
                        <td>1/KHS-MHS/${timeSpan}</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table width="100%">
                    <tr>
                        <td width="20%">JUDUL</td>
                        <td>:</td>
                        <td>KHS MAHASISWA</td>
                    </tr>
                </table>
            </td>
            <td>
                <table width="100%">
                    <tr>
                        <td width="20%">BERLAKU</td>
                        <td>:</td>
                        <td>${fullDate}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <center>
        <h3>DAFTAR NILAI DAN MATA KULIAH KARTU HASIL STUDI MAHASISWA</h3>
        <h3>${this.state.nim}</h3>
        <h3>${this.state.nama.toUpperCase()}</h3>
        <h3>PROGRAM STUDI ${this.state.jurusan.toUpperCase()}</h3>
        <h3>KELAS ${this.state.kelas.toUpperCase()}</h3>
    </center>
    <p style="margin-bottom:4">IPK : ${this.state.ipk}</p>
    <table border="1" width="100%" cellspacing="0">
        <tr align="center">
            <td rowspan="2"><b>NO</b></td>
            <td rowspan="2"><b>KODE MATA KULIAH</b></td>
            <td rowspan="2"><b>MATA KULIAH</b></td>
            <td rowspan="2"><b>SKS</b></td>
            <td rowspan="2"><b>SEMESTER</b></td>
            <td rowspan="2"><b>GRADE</b></td>
            <td rowspan="2"><b>BOBOT</b></td>
            <td rowspan="2"><b>JUMLAH</b></td>
        </tr>
        <tr>
        </tr>
        ${this.state.row.map(
          item =>
            `<tr>
            <td align="center">${item[0]}</td>
            <td>${item[1]}</td>
            <td>${item[2]}</td>
            <td align="center">${item[3]}</td>
            <td align="center">${item[4]}</td>
            <td align="center">${item[5]}</td>
            <td align="center">${item[6]}</td>
            <td align="center">${item[7]}</td>
        </tr>`,
        )}
    </table>
    <p><i>* hanya digunakan untuk keperluan internal Universitas Nasional PASIM</i></p>
</body>
</html>
`;

    const CreatePDF = async () => {
      if (this.state.nim != '') {
        alert('Sedang menbuat pdf, mohon tunggu');
        let options = {
          html: templateHtml,
          fileName: 'KHS-' + this.state.nim + '-' + timeSpan,
          directory: 'docs',
        };
        let file = await RNHTMLtoPDF.convert(options);
        console.log(file.filePath);
        alert('File tersimpan di :' + file.filePath);
      }
    };

    const headerKonten = [
      'No',
      'Kode',
      'Mata Kuliah',
      'Sks',
      'Sms',
      'Grade',
      'Bobot',
      'Jumlah',
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

    const CONTENT = [
      ['1', 'MM', 'APSIT', sks.tiga, '3', 'A', bobot.A, sks.tiga * bobot.A],
      ['2', 'MM', 'APSIT', sks.tiga, '3', '0', bobot.E, sks.dua * bobot.E],
      ['3', 'MM', 'APSIT', sks.tiga, '3', 'B', bobot.B, sks.tiga * bobot.B],
      ['4', 'MM', 'APSIT', sks.tiga, '3', '0', bobot.E, sks.dua * bobot.E],
    ];

    return (
      <View style={{flex: 1, backgroundColor: '#e6e6e6', paddingBottom: 20}}>
        <Header />
        {this.state.row.length != 0 ? (
          <>
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
                    KARTU HASIL STUDI
                  </Text>
                  <Informasi
                    marginTop={15}
                    teks1="NIM"
                    teks2={this.state.nim}
                  />
                  <Informasi teks1="Nama Lengkap" teks2={this.state.nama} />
                  <Informasi teks1="Program Studi" teks2={this.state.jurusan} />
                  <Informasi teks1="SKS Tempuh" teks2={this.state.totalSks} />
                  <Informasi
                    teks1="Kelas"
                    teks2={this.state.kelas}
                    marginTop={30}
                  />
                  <Informasi
                    teks1="Tempat Lahir"
                    teks2={this.state.tempatLahir}
                  />
                  <Informasi
                    teks1="Tanggal Lahir"
                    teks2={this.state.tanggalLahir.substring(0, 10)}
                  />
                  <Informasi
                    teks1="IPK"
                    teks2={this.state.ipk.toString().substring(0, 4)}
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
                    <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                      <Row
                        data={headerKonten}
                        flexArr={[0.2, 0.5, 2, 0.3, 0.3, 0.3, 0.3, 0.3]}
                        style={{
                          width: 700,
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
                          flexArr={[0.2, 0.5, 2, 0.3, 0.3, 0.3, 0.3, 0.3]}
                          key={item[0]}
                          style={{
                            width: 700,
                            height: 40,
                            backgroundColor:
                              item[0] % 2 == 0 ? 'white' : '#dfe6e9',
                          }}
                          textStyle={{marginLeft: 5, fontSize: 12}}
                        />
                      ))}
                    </Table>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
            <View>
              <TouchableOpacity onPress={CreatePDF}>
                <View
                  style={{
                    backgroundColor: '#041562',
                    borderRadius: 20,
                    width: '80%',
                    height: 40,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>UNDUH PDF</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <IconLoading />
        )}
      </View>
    );
  }
}
