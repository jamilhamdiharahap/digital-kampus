import React from 'react';
import {Text, View, Button, TouchableOpacity, StyleSheet} from 'react-native';
import Navbar from './../../../containers/organisms/NavBar';
import Header from './../../../components/molecules/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GarisKecil from './../../../components/atoms/GarisKecil/index';
import IconLoading from './../../../components/atoms/IconLoading/index';
import {constant} from '../../../utils/constant/constant';

export default class Riwayat extends React.Component {
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isLoading: true,
      namaBuku: '',
    };

    this.url =
      'https://perpuspasim.000webhostapp.com/ApiPinjamBuku.php?op=aktif&id=';
  }

  componentDidMount() {
    AsyncStorage.getItem('@nim', (error, result) => {
      if (result) {
        this.GetDetail(result);
      }
    });
  }

  async GetDetail(param) {
    this.setState({isLoading: false});
    // await fetch(this.url + param)
    //   .then(response => response.json())
    //   .then(json => {
    //     this.setState({listData: json.data.result});
    //     this.setState({isLoading: false});
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
  }

  render() {
    return (
      <>
        <View
          style={{
            height: 54,
            flexDirection: 'column',
            backgroundColor: 'white',
            borderTopColor: '#e8e9ed',
            // borderTopWidth: 1,
            flex: 1,
          }}>
          <Header />
          <View
            style={{
              backgroundColor: constant.warnaPutih,
              flexDirection: 'row',
              width: '100%',
              borderColor: constant.warnaPutih,
              borderBottomWidth: 1,
            }}>
            <View
              // onPress={props.onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                height: 60,
                borderBottomWidth: 2,
                borderColor: '#041562',
                backgroundColor: 'white',
                // backgroundColor: props.active ? '#ebebeb' : 'white',
              }}>
              <View
                style={{
                  height: 2,
                  backgroundColor: '#041562',
                  borderRadius: 26,
                }}></View>
              {/* <Image style={{height: 26, width: 26}} source={props.img}></Image> */}
              <Text
                style={{
                  fontSize: 10,
                  // color: props.active ? '#041562' : '#545454',
                  marginTop: 4,
                }}>
                Main Menu
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            {this.state.isLoading == true ? <IconLoading /> : null}
            {this.state.listData.length == 0 &&
            this.state.isLoading == false ? (
              <Text>Belum ada data</Text>
            ) : null}
            {/* {this.state.listData.map((val, index) => (
              <View style={styles.box} key={index}>
                <TouchableOpacity
                  style={styles.touch}
                  onPress={() => {
                    AsyncStorage.setItem('@idBuku', val.idBuku);
                    AsyncStorage.setItem('@idPinjam', val.id);
                    this.props.navigation.navigate('DetailPinjamBuku');
                  }}>
                  <Text style={styles.judul}>{val.judul}</Text>
                  <Text style={styles.waktu}>
                    Batas Peminjaman : {val.batas}
                  </Text>
                </TouchableOpacity>
                <GarisKecil />
              </View>
            ))} */}
          </View>
        </View>
        <Navbar />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  box: {
    width: '100%',
  },
  touch: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  judul: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
