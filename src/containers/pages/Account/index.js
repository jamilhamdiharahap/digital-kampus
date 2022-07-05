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

import {Avatar} from 'react-native-elements';

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
      image: '',
    };
    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        this.setState({
          nama: data.fullname,
          nim: data.nim,
          image: data.foto,
        });
      }
    });
  }

  logout() {
    AsyncStorage.removeItem('nim');
    AsyncStorage.removeItem('nama');
    this.props.navigation.navigate('Login');
  }

  render() {
    const askLogout = () => {
      Alert.alert('Keluar', 'Yakin untuk keluar dari akun ?', [
        {
          text: 'Tidak',
          // onPress: () => AsyncStorage.setItem('@nim', '0203181044'),
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
              <Avatar
                size="large"
                rounded
                source={{
                  uri:
                    this.state.image == ''
                      ? 'https://commons.wikimedia.org/wiki/File:User-avatar.svg'
                      : this.state.image,
                }}
              />
              <Text style={{marginTop: 10}}>{this.state.nim}</Text>
              <Text style={{marginTop: 10}}>{this.state.nama}</Text>
            </View>
            <View
              style={{
                marginTop: 50,
              }}>
              <GarisAbuTipis />
              <TouchableOpacity
                // style={{paddingTop: 16}}
                onPress={() => this.props.navigation.navigate('InfoPersonal')}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20,
                    padding:6
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
                    padding:6
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
                backgroundColor: '#1C2938',
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 12,
                marginTop: 16,
              }}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  textTransform: 'uppercase',
                }}>
                Keluar
              </Text>
            </TouchableOpacity>
          </View>
          {/* <ImageBackground
            source={require('./../../../assets/images/dummy/pasim.jpg')}
            style={{
              width: '100%',
              height: '38%',
              flex: 1,
              backgroundColor: 'white',
            }}>
            <Header /> 
          </ImageBackground>
          <View style={{
            display:'flex'
          }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                }}>
                  <View style={{ backgroundColor: 'white'}}>
                  <View>
                        <Text>
                        <Avatar
                            title="Randi"
                            size="large"
                            rounded
                            source={{
                              uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                          Hello</Text>
                  </View>
                  <View>
                      <DropDown judul="Info Personal" urutan={1} /> 
                      <DropDown judul="Bantuan" urutan={2} />
                  </View>
                      
                  </View>
              </View>
            </View>
            <View style={{flex: 2}}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  flex: 1,
                  borderTopLeftRadius: 80,
                  borderTopRightRadius: 80,
                }}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#1C2938',
                      height: 50,
                      width: '70%',
                      marginTop: 40,
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}
                    
                    onPress={() => askLogout()}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        borderTopRightRadius: 80,
                      }}>
                      KELUAR
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  marginTop: 60,
                  textAlign: 'center',
                  color: '#adadad',
                  backgroundColor: 'white',
                }}>
                ©Copyright Digital Kampus 2022
              </Text>
            </View> */}
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
