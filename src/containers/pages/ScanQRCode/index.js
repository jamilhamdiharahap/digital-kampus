import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IconWithText = props => {
  return (
    <View>
      <View
        style={{
          width: 60,
          height: 60,
          backgroundColor: '#041562',
          borderRadius: 60,
        }}
      />
      <Text style={{maxWidth: 70, textAlign: 'center', marginTop: 10}}>
        {props.title}
      </Text>
    </View>
  );
};

const IconAction = ({onPress}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 40,
          height: 40,
          backgroundColor: 'white',
          borderRadius: 35,
        }}>
        <Image
          source={require('./../../../assets/images/icon/loop.png')}
          style={{
            width: 30,
            height: 30,
            marginVertical: 5,
            marginHorizontal: 5,
          }}></Image>
      </TouchableOpacity>
    </>
  );
};

class ScanQRCode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      pos: 'back',
    };

    AsyncStorage.getItem('@nim', (error, result) => {
      if (result) {
        this.setState({
          nim: result,
        });
      } else {
        alert('NIM tidak ditemukan, silahkan untuk Login ulang');
        this.setState({
          nim: '',
        });
        this.props.navigation.navigate('Home');
      }
    });
  }
  state = {
    barcode: '',
    id: '',
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Header /> */}
        <View style={{flex: 1, backgroundColor: 'gray'}}>
          {/* Start Camera */}
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={
              this.state.pos == 'back'
                ? RNCamera.Constants.Type.back
                : RNCamera.Constants.Type.front
            }
            androidCameraPermissionOptions={{
              title: 'Izinkan kamera ?',
              message: 'Kami membutuhkan izin untuk membuka kamera',
              buttonPositive: 'Ok',
              buttonNegative: 'Tidak',
            }}
            onBarCodeRead={bar => {
              AsyncStorage.setItem('@idBuku', bar.data);
              this.setState({
                barcode: bar.data,
              });
              if (this.state.barcode != '') {
                this.props.navigation.navigate('DetailBuku');
              }
            }}
          />
          {/* End Camera */}
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 16,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 80,
              }}>
              <IconAction
                onPress={() => {
                  this.state.pos == 'back'
                    ? this.setState({pos: 'front'})
                    : this.setState({pos: 'back'});
                }}
              />
              {/* <IconAction /> */}
            </View>
          </View>
        </View>
        <View
          style={{
            height: '40%',
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <View style={{alignItems: 'center', marginTop: 8, marginBottom: 18}}>
            <View
              style={{
                width: 40,
                height: 3,
                backgroundColor: '#e0e0e0',
                marginVertical: 2,
              }}
            />
            <View
              style={{
                width: 40,
                height: 3,
                backgroundColor: '#e0e0e0',
                marginVertical: 2,
              }}
            />
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
              {`${this.state.barcode}`}
            </Text>
          </View> */}
          <View style={{marginVertical: 8, backgroundColor: 'white'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 16,
                marginVertical: 6,
              }}>
              Bagaimana caranya ?
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#ededed',
              height: 5,
              width: '100%',
            }}
          />
          <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
            <View
              style={{flexDirection: 'column', marginLeft: 32, marginTop: 16}}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <Text>1. </Text>
                <Text style={{marginLeft: 10}}>
                  Datanglah ke perpustakaan Universitas Nasional PASIM.
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <Text>2. </Text>
                <Text style={{marginLeft: 10}}>
                  Cari buku yang ingin anda pinjam, Pastikan terdapat Barcode di
                  cover buku.
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <Text>3. </Text>
                <Text style={{marginLeft: 10}}>
                  Scan QR Code pada cover buku, pastikan judul buku sama dengan
                  judul buku hasil Scan.
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}>
                <Text>4. </Text>
                <Text style={{marginLeft: 10}}>
                  Tunggu sampai QR Code muncul di layar aplikasi, kemudian minta
                  petugas untuk melakukan scan pada Barcode di aplikasi anda.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ScanQRCode;
