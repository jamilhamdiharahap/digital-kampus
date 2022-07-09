import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {Component} from 'react';

import {View, Image, Text} from 'react-native';

import {withNavigation} from 'react-navigation';

import PerpusFeature from './../../../components/molecules/PerpusFeature';
import {constant} from '../../../utils/constant/constant';

export const daftarPerpus = [
    [
      {onPress:  'KHS',title : "Sks Selesai"}
    ],
    [
      {onPress: 'KHS',title : "IPK Saat Ini"}
    ],
    [
      {onPress:  'KHS',title : "Total SKS"}
    ],
    [
      {onPress:  'KHS',title : "Sisa SKS"}
    ],
    [
      {onPress:  'KHS', title : "Mata Kuliah Selesai"}    
    ],
    [
      {onPress:  'KHS', title : "Semester"}    
    ]
]


class HomePerpus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      nama: '',
      sksSelesai:'',
      ipk :'',
      totalSks:'',
      sisaSks : '',
      mataKuliahSelesai : '',
      semester : ''
    };

    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result)
        this.setState({
          nim: data.nim,
          nama:data.nama_mhs,
          sksSelesai:data.sks_selesai,
          ipk:data.ipk,
          totalSks:data.total_sks,
          sisaSks:data.sisa_sks,
          mataKuliahSelesai:data.mata_kuliah_selesai,
          semester:data.semester
        });
      }
    });
    
  }

  render() {
    return (
      <View style={{marginHorizontal: 17, marginVertical: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: constant.warnaBackground,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            marginTop: 10,
            padding: 14,
          }}>
          <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
            ({this.state.nim}) - {this.state.nama}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 14,
            backgroundColor: '#EEEEEE',
            // borderBottomRightRadius: 8,
            // borderBottomLeftRadius: 8,
          }}>
            {daftarPerpus[0].map((item)=>(
                 <PerpusFeature
                 key={item.title}
                 onPress={() => this.props.navigation.navigate(item.onPress)}
                 title={item.title}
                 textAngka={this.state.sksSelesai}
               /> 
            ))}
            {daftarPerpus[1].map((item)=>(
                 <PerpusFeature
                 key={item.title}
                 onPress={() => this.props.navigation.navigate(item.onPress)}
                 title={item.title}
                 textAngka={this.state.ipk.toString().substring(0,4)}
               /> 
            ))}
            {daftarPerpus[2].map((item)=>(
                 <PerpusFeature
                 key={item.title}
                 onPress={() => this.props.navigation.navigate(item.onPress)}
                 title={item.title}
                 textAngka={this.state.totalSks}
               /> 
            ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 14,
            backgroundColor: '#EEEEEE',
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
          }}>
           {daftarPerpus[3].map((item)=>(
                 <PerpusFeature
                 key={item.title}
                 onPress={() => this.props.navigation.navigate(item.onPress)}
                 title={item.title}
                 textAngka={this.state.sisaSks}
               /> 
            ))}
           {daftarPerpus[4].map((item)=>(
                 <PerpusFeature
                 key={item.title}
                 onPress={() => this.props.navigation.navigate(item.onPress)}
                 title={item.title}
                 textAngka={this.state.mataKuliahSelesai}
               /> 
            ))}
           {daftarPerpus[5].map((item)=>(
                 <PerpusFeature
                 key={item.title}
                 onPress={() => this.props.navigation.navigate(item.onPress)}
                 title={item.title}
                 textAngka={this.state.semester}
               /> 
            ))}
        </View>
      </View>
    );
  }
}

export default withNavigation(HomePerpus);
