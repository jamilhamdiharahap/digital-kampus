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


export default class KHS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      matkul2:[],
      row:[],
      selected: false,
    };
    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        this.setState({
          nim: data.nim,
          nama: data.fullname,
          jurusan: data.jurusan,
          totalSks: data.total_sks,
          kelas: data.kelas,
          tempatLahir: data.tempat_lahir,
          tanggalLahir: data.tanggal_lahir,
          ipk: data.ipk,
        });
      }

      const cekBobot = a =>{
        if (a == "A") return 4
        else if(a =="B")return 3
        else if(a =="C")return 2
        else if(a =="D")return 1
        else return 0
      }
  
      const cekTotal=(bobot,sks)=>{
        return cekBobot(bobot) * sks
      }

      // const CONTENT = [
      //   ['1', 'MM', 'APSIT', sks.tiga, '3', 'A', bobot.A, sks.tiga * bobot.A],
      //   ['2', 'MM', 'APSIT', sks.tiga, '3', '0', bobot.E, sks.dua * bobot.E],
      //   ['3', 'MM', 'APSIT', sks.tiga, '3', 'B', bobot.B, sks.tiga * bobot.B],
      //   ['4', 'MM', 'APSIT', sks.tiga, '3', '0', bobot.E, sks.dua * bobot.E],
      // ];

      fetch(Api.host + '/khs/' + this.state.nim)
        .then(response => response.json())
        .then(json => {
          let list = json.data
          let data=[]
          for (let i =0;i<json.data.length;i++){
            data.push(i+1)  
            data.push(list[i].Matkul.kode_matkul)
            data.push(list[i].Matkul.nama)
            data.push(list[i].Matkul.sks)
            data.push(list[i].Matkul.semester)
            data.push(cekBobot(list[i].grade))
            data.push(list[i].grade)
            data.push(cekTotal(list[i].grade,list[i].Matkul.sks))
            this.state.row.push(data)
            data=[]
          }
          console.log(this.state.row)

          this.setState({
            matkul: json.data,
            matkul2:json.data.Matkul,
          });
        })
        .catch(error);
    });
  }

  render() {
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
              <Informasi marginTop={15} teks1="NIM" teks2={this.state.nim} />
              <Informasi teks1="Nama Lengkap" teks2={this.state.nama} />
              <Informasi teks1="Program Studi" teks2={this.state.jurusan} />
              <Informasi teks1="SKS Tempuh" teks2={this.state.totalSks} />
              <Informasi
                teks1="Kelas"
                teks2={this.state.kelas}
                marginTop={30}
              />
              <Informasi teks1="Tempat Lahir" teks2={this.state.tempatLahir} />
              <Informasi
                teks1="Tanggal Lahir"
                teks2={this.state.tanggalLahir}
              />
              <Informasi teks1="IPK" teks2={this.state.ipk.toString().substring(0,4)} marginBottom={40} />
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
                    flexArr={[0.5, 3, 5, 1, 1, 1, 1, 1.1]}
                    style={{width: 700, height: 40, backgroundColor: constant.warnaBackground}}
                    textStyle={{textAlign: 'center', fontSize: 12, color:'white'}}
                  />
                  {this.state.row.map(item=>(
                    <Row
                    data={item}
                    flexArr={[0.5, 3, 5, 1, 1, 1, 1, 1.1]}
                    style={{width: 700, height: 40, backgroundColor:(item[0]%2==0?"white":'#dfe6e9') }}
                    textStyle={{textAlign: 'center', fontSize: 12}}
                  />
                  ))}
                </Table>):<IconLoading/>}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// const Informasi = ({teks1, teks2, ...rest}) => {
//   return (
//     <View style={{flexDirection: 'row', padding: 15, ...rest}}>
//       <View style={{flex: 1}}>
//         <Text>{teks1}</Text>
//       </View>
//       <View style={{flex: 1.5, borderBottomWidth: 1, paddingLeft: 8}}>
//         <Text>{teks2}</Text>
//       </View>
//     </View>
//   );
// };

// const KHS = () => {
//   const sks = {
//     tiga: 3,
//     dua: 2,
//   };
//   const bobot = {
//     A: 4,
//     B: 3,
//     C: 2,
//     D: 1,
//     E: 0,
//   };
//   const CONTENT = [
//     ['1', 'MM', 'APSIT', sks.tiga, '3', 'A', bobot.A, sks.tiga * bobot.A],
//     ['2', 'MM', 'APSIT', sks.tiga, '3', '0', bobot.E, sks.dua * bobot.E],
//     ['3', 'MM', 'APSIT', sks.tiga, '3', 'B', bobot.B, sks.tiga * bobot.B],
//     ['4', 'MM', 'APSIT', sks.tiga, '3', '0', bobot.E, sks.dua * bobot.E],
//   ];
//   const headerKonten = [
//     '#',
//     'KODE',
//     'MATA KULIAH',
//     'SKS',
//     'SMS',
//     'GRADE',
//     'BOBOT',
//     'JUMLAH',
//   ];
//   return (
//     <View style={{flex: 1, backgroundColor: '#e6e6e6', paddingBottom: 20}}>
//       <Header />
//       <ScrollView style={{flex: 1, padding: 20}}>
//         <View
//           style={{
//             width: '100%',
//             backgroundColor: 'white',
//             paddingVertical: 25,
//             paddingHorizontal: 5,
//           }}>
//           <View style={{alignItems: 'center'}}>
//             <Text
//               style={{
//                 backgroundColor: '#e6e6e6',
//                 padding: 10,
//                 borderRadius: 5,
//                 width: '90%',
//                 textAlign: 'center',
//               }}>
//               KARTU HASIL STUDI
//             </Text>
//             <Informasi marginTop={15} teks1="NIM" teks2="0203181044" />
//             <Informasi teks1="Nama Lengkap" teks2="Randi Firmansyah" />
//             <Informasi teks1="Program Studi" teks2="S1 Teknik Informatika" />
//             <Informasi teks1="SKS Tempuh" teks2="151" />
//             <Informasi teks1="Kelas" teks2="Pagi" marginTop={30} />
//             <Informasi teks1="Tempat Lahir" teks2="Bandung" />
//             <Informasi teks1="Tanggal Lahir" teks2="1999-01-01" />
//             <Informasi teks1="IPK" teks2="3.50" marginBottom={40} />
//             <ScrollView
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//               style={{
//                 paddingVertical: 20,
//                 borderTopWidth: 2,
//                 borderColor: '#dfe6e9',
//               }}>
//               <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
//                 <Row
//                   data={headerKonten}
//                   flexArr={[0.5, 3, 5, 1, 1, 1, 1, 1.1]}
//                   style={{width: 700, height: 40, backgroundColor: '#b2bec3'}}
//                   textStyle={{textAlign: 'center', fontSize: 12}}
//                 />
//                 {CONTENT.map(item => {
//                   const tabel =
//                     item[5] !== '0' ? (
//                       <Row
//                         data={item}
//                         flexArr={[0.5, 3, 5, 1, 1, 1, 1, 1.1]}
//                         style={{
//                           width: 700,
//                           height: 40,
//                           backgroundColor: 'white',
//                         }}
//                         textStyle={{fontSize: 12, textAlign: 'center'}}
//                       />
//                     ) : (
//                       <Row
//                         data={item}
//                         flexArr={[0.5, 3, 5, 1, 1, 1, 1, 1.1]}
//                         style={{
//                           width: 700,
//                           height: 40,
//                           backgroundColor: '#ff6b6b',
//                         }}
//                         textStyle={{textAlign: 'center', fontSize: 12}}
//                       />
//                     );
//                   return tabel;
//                 })}
//               </Table>
//             </ScrollView>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default KHS;

// const styles = StyleSheet.create({});