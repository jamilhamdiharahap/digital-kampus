import {ScrollView, useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import React, {useState, useEffect} from 'react';

import Api from '../../../utils/Api';
import {tinggi} from '../../../assets/styles/style';
import IconLoading from '../../../components/atoms/IconLoading';
import Header from '../../../components/molecules/Header';
import {constant} from '../../../utils/constant/constant';
import GarisAbuTipis from '../../../components/atoms/GarisAbu/garisabutipis';
import MainButton from '../../../components/atoms/MainButton/main-button';
import {notifikasi} from '../../../components/molecules/LocalNotification/Notifikasi';

const UpdateKRS = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataku, setDataku] = useState([]);

  // const [select, setSelect] = useState(dataku);
  const [itemSelected, setItemSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [length, setLength] = useState(0);

  const [nim, setNim] = useState('');
  const [idMhs, setIdMhs] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        setNim(data.nim);
        setIdMhs(data.id_mahasiswa);
        if (nim != '') {
          fetch(Api.host + '/v2/krs/' + data.id_mahasiswa)
            .then(response => response.json())
            .then(json => {
              setData(json.data);
              setIsLoading(false);
              if (json.data == null) alert(json.message);
            })
            .catch(err => alert('gagal mendapatkan data mata kuliah'));
        }
      }
    });
  }, [nim]);

  useEffect(() => {
    let tamp;
    if (data != null) {
      tamp = data.map(val => {
        val.isSelected = true;
        return val;
      });

      setLength(tamp.length);
    }
    setDataku(tamp);
  }, [data]);

  const ketikDiKlik = item => {
    if (item.isSelected == true) {
      setItemSelected([...itemSelected, item.id_kurikulum]);
      setDataku(current =>
        current.map(data => {
          if (data.id_kurikulum == item.id_kurikulum) data.isSelected = false;
          return data;
        }),
      );
    } else {
      setItemSelected(current =>
        current.filter(data => {
          return data != item.id_kurikulum;
        }),
      );

      setDataku(current =>
        current.map(data => {
          if (data.id_kurikulum == item.id_kurikulum) data.isSelected = true;
          return data;
        }),
      );
    }
  };

  const postKrs = () => {
    setIsLoading(true);

    var payload = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_kurikulum: itemSelected,
      }),
    };

    alert('sedang melakukan perubahan KRS, mohon tunggu');
    fetch(Api.host + '/v2/krs/' + idMhs, payload)
      .then(response => response.json())
      .then(json => {
        if (respon_code == 200) {
          notifikasi.configure();
          notifikasi.buatChannel('1');
          notifikasi.kirimNotifikasi(
            '1',
            'Selamat anda telah berhasil mengubah KRS',
            'Anda telah berhasil melakukan perubahan KRS',
          );
        }
        alert(json.message);
        navigation.navigate('Home');
      })
      .catch(error => {
        alert('Gagal mengubah KRS');
      });
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <Text style={{textAlign: 'center', paddingVertical: 17, fontSize: 20}}>
        Perubahan Kartu Rencana Studi
      </Text>
      <Text style={{textAlign: 'center', marginBottom: 15}}>
        Silahkan pilih mata kuliah yang ingin dihapus dari KRS
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: '#a4b0be',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingHorizontal: 20,
          paddingVertical: 40,
        }}>
        {isLoading ? (
          <IconLoading />
        ) : (
          <>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                flex: 1,
                width: '100%',
              }}>
              <FlatList
                data={dataku}
                keyExtractor={item => item.id_kurikulum}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity onPress={() => ketikDiKlik(item)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: item.isSelected
                            ? '#2e86de'
                            : 'white',
                          borderRadius: 4,
                          marginBottom: 6,
                          padding: 5,
                          width: 500,
                        }}>
                        <Text
                          style={{
                            borderRightWidth: 2,
                            width: 130,
                            marginRight: 5,
                          }}>
                          Semester {item.kurikulum.mata_kuliah.semester} -{' '}
                          {item.kurikulum.mata_kuliah.kode_matkul}
                        </Text>
                        <Text style={{fontWeight: 'bold', marginLeft: 5}}>
                          {item.kurikulum.mata_kuliah.nama_matkul}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </ScrollView>
            {itemSelected.length > 0 ? (
              <TouchableOpacity onPress={postKrs}>
                <View
                  style={{
                    alignItems: 'center',
                    backgroundColor: constant.warnaBackground,
                    borderRadius: 4,
                    padding: 8,
                    marginTop: 15,
                  }}>
                  <Text style={{color: 'white'}}>Lakukan perubahan KRS</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
};

export default UpdateKRS;
