import { useNavigation } from '@react-navigation/native';

import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import React, {useState, useEffect} from 'react';

import Api from '../../../utils/Api';
import {tinggi} from '../../../assets/styles/style';
import IconLoading from '../../../components/atoms/IconLoading';
import Header from '../../../components/molecules/Header';
import GarisAbuTipis from '../../../components/atoms/GarisAbu/garisabutipis';
import MainButton from '../../../components/atoms/MainButton/main-button';

const KartuRencanaStudi = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataku, setDataku] = useState([]);

  // const [select, setSelect] = useState(dataku);
  const [itemSelected, setItemSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(Api.host + '/matkul/0203181044')
      .then(response => response.json())
      .then(json => {
        setData(json.data)
        setIsLoading(false)
      });
  }, []);

  useEffect(() => {
    let tamp;
    if (data != null) {
      tamp = data.map(val => {
        val.isSelected = false;
        return val;
      });
    }
    setDataku(tamp);
  }, [data]);

  const ketikDiKlik = item => {
    if (item.isSelected == false) {
      setItemSelected([...itemSelected, item.kode_matkul]);
      setDataku(current =>
        current.map(data => {
          if (data.kode_matkul == item.kode_matkul) data.isSelected = true;
          return data;
        }),
      );
    } else {
      setItemSelected(current =>
        current.filter(data => {
          return data != item.kode_matkul;
        }),
      );

      setDataku(current =>
        current.map(data => {
          if (data.kode_matkul == item.kode_matkul) data.isSelected = false;
          return data;
        }),
      );
    }
  };

  const postKrs = () => {
    
    setIsLoading(true)

    var payload ={
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kode_matkul: itemSelected
      })
    }

    fetch(Api.host + '/krs/post/0203181044',payload)
          .then(response => response.json())
          .then(json => {
            navigation.navigate("Home")
            alert(json.message)
          })
          .catch(error => {
            alert("Gagal mengisi KRS")
          });
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <Text style={{textAlign: 'center', paddingVertical: 20, fontSize: 20}}>
        Kartu Rencana Studi
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
          {isLoading ? <IconLoading/> : (<>
        <FlatList
          data={dataku}
          keyExtractor={item => item.id}
          key={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => ketikDiKlik(item)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: item.isSelected ? '#2e86de' : 'white',
                    borderRadius: 4,
                    marginBottom: 6,
                    padding: 5,
                  }}>
                  <Text
                    style={{borderRightWidth: 2, width: 80, marginRight: 10}}>
                    {item.kode_matkul}
                  </Text>
                  <Text>{item.nama}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <Text>{itemSelected}</Text>
        <TouchableOpacity onPress={postKrs}>
          <View
              style={{
                    alignItems: 'center',
                    backgroundColor: 'blue',
                    borderRadius: 4,
                    marginBottom: 6,
                    padding: 5,
                  }}>
          <Text>Isi KRS</Text>
      </View>
        </TouchableOpacity>
        </>
        )
}
      </View>
    </View>
  );
};

export default KartuRencanaStudi;
