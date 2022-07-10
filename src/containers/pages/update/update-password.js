import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Image} from 'react-native';
import normalize from 'react-native-normalize';
import Header from '../../../components/molecules/Header';
import Api from '../../../utils/Api';

const UpdatePassword = () => {
  let iconStyle = {
    iconMata: {
      height: normalize(20),
      width: normalize(20),
      marginRight: 32,
    },
  };
  const [isShow, setShow] = useState(true);
  const [password, setPassword] = useState('');
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [nim, setNim] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        setPassword(data.password);
        setNim(data.nim);
      }
    });
  }, [password]);

  const update = () => {
    if (newPass == ' ' || newPass < 6) {
      alert('Isi Password Dengan Benar');
    } else if (pass == newPass) {
      alert('Password Telah Digunakan');
    } else {
      fetch(Api.host + '/v2/user/update-password', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nim: nim,
          password: pass,
          new_password:newPass
        }),
      }).
      then(response => response.json()).
      then(json => {
        alert(json.message);
      }).catch(error => alert(error))
    }
  };

  
  return (
    <View>
      <Header />
      <View
        style={{
          padding: 8,
          marginHorizontal: 16,
          marginTop: 156,
        }}>
        <View
          style={{
            marginBottom: 8,
          }}>
          <TextInput
            style={{
              borderColor: pass == '' ? 'gray' : password == pass ? 'gray' : 'red',
              width: '100%',
              borderWidth: 1,
              borderRadius: 10,
              padding: 8,
            }}
            onChangeText={e => setPass(e)}
            placeholder="Password sekarang!"
          />
        </View>
        <View
          style={{
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TextInput
            style={{
              borderColor: 'gray',
              width: '100%',
              borderWidth: 1,
              borderRadius: 10,
              padding: 8,
              marginLeft: 16,
            }}
            secureTextEntry={isShow ? true : false}
            placeholder="Password Baru!"
            onChangeText={e => setNewPass(e)}
          />
          <TouchableOpacity onPress={() => setShow(!isShow)}>
            <Image
              source={
                isShow
                  ? require('./../../../assets/images/icon/private.png')
                  : require('./../../../assets/images/icon/vision.png')
              }
              style={iconStyle.iconMata}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            paddingHorizontal: 24,
            borderRadius: 8,
            elevation: 2,
            paddingVertical: 8,
            backgroundColor: '#041562',
          }}
          onPress={update}
          >
          <Text style={{color: 'white', fontSize: 16}}>Update</Text>
        </TouchableOpacity>
        <Text>{pass}</Text>
        <Text>{newPass}</Text>
      </View>
    </View>
  );
};

export default UpdatePassword;
