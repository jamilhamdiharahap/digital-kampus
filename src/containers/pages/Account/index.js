import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';

import {Avatar, Badge} from 'react-native-elements';

import GarisAbu from './../../../components/atoms/GarisAbu';
import Header from './../../../components/molecules/Header';
import Navbar from './../../../containers/organisms/NavBar';
import {constant} from '../../../utils/constant/constant';
import GarisAbuTipis from '../../../components/atoms/GarisAbu/garisabutipis';
import MainButton from '../../../components/atoms/MainButton/main-button';
export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      nama: '',
      image: null,
    };
    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        this.setState({
          nama: data.nama_mhs,
          nim: data.nim,
          image: data.foto,
        });
      }
    });
  }

  logout() {
    AsyncStorage.removeItem('mahasiswa');
    this.props.navigation.navigate('Login');
  }

  render() {
    const askLogout = () => {
      Alert.alert('Keluar', 'Yakin untuk keluar dari akun ?', [
        {
          text: 'Tidak',
        },
        {
          text: 'Ya',
          onPress: () => this.logout(),
        },
      ]);
    };
    const DropDown = props => {
      return (
        <View
          style={{
            justifyContent: 'space-between',
            height: 50,
            borderTopWidth: 1,
            borderColor: '#ededed',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              this.state.show == props.urutan
                ? this.setState({show: 0})
                : this.setState({show: props.urutan})
            }>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                width: '90%',
                marginTop: 10,
                textAlign: 'left',
              }}>
              {props.judul}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
        }}>
        <ScrollView style={styles.container}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
            }}>
            <Header />
            <View
              style={{
                marginVertical: 20,
                flex: 1,
                alignItems: 'center',
              }}>
              <View>
                <Avatar
                  rounded
                  size="xlarge"
                  source={{
                    uri: this.state.image,
                  }}
                />
                <Badge
                  status="success"
                  value="Online"
                  containerStyle={{
                    position: 'absolute',
                    top: -0.1,
                    right: -0.1,
                  }}
                />
              </View>
              <Text style={{marginTop: 10}}>{this.state.nim}</Text>
              <Text style={{marginTop: 4, fontWeight: 'bold'}}>
                {this.state.nama}
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
              }}>
              <GarisAbuTipis />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('InfoPersonal')}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20,
                    padding: 6,
                  }}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    source={require('../../../assets/images/icon/icons8-info-50.png')}
                  />
                  <Text style={{marginLeft: 10}}>Info Personal</Text>
                </View>
              </TouchableOpacity>
              <GarisAbuTipis />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Bantuan')}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20,
                    padding: 6,
                  }}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    source={require('../../../assets/images/icon/icons8-help-50.png')}
                  />
                  <Text style={{marginLeft: 10}}>Bantuan</Text>
                </View>
              </TouchableOpacity>
              <GarisAbuTipis />
            </View>
            <TouchableOpacity
              style={{
                elevation: 8,
                backgroundColor: constant.warnaBackground,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: -8,
                marginTop: 40,
                width: '80%',
                alignSelf: 'center',
              }}
              onPress={() => askLogout()}>
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
                Keluar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Navbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
