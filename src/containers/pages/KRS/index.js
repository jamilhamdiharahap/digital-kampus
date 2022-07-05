
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import React, {useState, useEffect} from 'react';

import Api from '../../../utils/Api';
import {tinggi} from '../../../assets/styles/style';
import Header from '../../../components/molecules/Header';
import GarisAbuTipis from '../../../components/atoms/GarisAbu/garisabutipis';
import MainButton from '../../../components/atoms/MainButton/main-button';

const KartuRencanaStudi = () => {   
  const [data,setData] = useState([])
  const [dataku,setDataku] = useState([])
  
  const [select, setSelect] = useState(dataku);
  const [itemSelected, setItemSelected] = useState([]);

  useEffect(()=>{
    fetch(Api.host +'/matkul/0203181044').
    then(response => response.json()).
    then(json => setData(json.data));
  },[]);

  useEffect(()=>{
    const tamp = data.map((val)=>{
      val.isSelected = false;
      return val;
    })
    setDataku(tamp)
  },[data])
 



    const ketikDiKlik = item => {
    if (item.isSelected === false) {
      setItemSelected([...itemSelected, item.kode_matkul]);
    } else {
      dataku.map((value, index) => {
        if (value === item) {
          setItemSelected([
            ...itemSelected.slice(0, index),
            ...itemSelected.slice(index + 1, itemSelected.length),
          ]);
        }
      });
    }
    // const newItem = select.map(val => {
    //   if (val.kode_matkul === item.kode_matkul) {
    //     return {...val, item.isSelected: !val.isSelected};
    //   } else {
    //     return val;
    //   }
    // });
    // setSelect(newItem);
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
                    backgroundColor: item.isSelected ?'#2e86de':'white',
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
        <MainButton teks="Simpan" />
      </View>
    </View>
  );
};

export default KartuRencanaStudi;