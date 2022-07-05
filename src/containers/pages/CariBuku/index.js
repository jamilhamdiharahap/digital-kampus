import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../../components/molecules/Header';
import IconLoading from './../../../components/atoms/IconLoading/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from '../../../utils/Api';

class CariBuku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      alamat: '',
      isLoading: true,
      tidakada: false,
      listData: [],
      idEdit: null,
    };

    this.url = Url.host + 'ApiBuku.php';
  }
  componentDidMount() {
    this.Semua();
  }

  async Semua() {
    await fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.setState({listData: json.data.result});
        this.setState({isLoading: false});
        !this.state.listData
          ? this.setState({tidakada: true})
          : this.setState({tidakada: false});
      })
      .catch(error => {
        alert('Buku tidak ditemukan');
        console.log(error);
      });
  }

  async CariBuku(nama) {
    await fetch(this.url + '?op=search&query=' + nama)
      .then(response => response.json())
      .then(json => {
        this.setState({listData: json.data.result});
        this.setState({isLoading: false});
        !this.state.listData
          ? this.setState({tidakada: true})
          : this.setState({tidakada: false});
      })
      .catch(error => {
        alert('Buku tidak ditemukan');
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <Header />
        <View
          style={{
            marginTop: 16,
            marginLeft: 16,
            marginBottom: 10,
          }}>
          <TextInput
            placeholder="Cari buku apa ?"
            color="black"
            autoFocus={true}
            onChangeText={q => {
              this.setState({isLoading: true});
              this.setState({tidakada: false});
              this.setState({listData: []});
              this.CariBuku(q);
            }}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 25,
              height: 40,
              fontSize: 13,
              paddingLeft: 45,
              paddingRight: 20,
              marginRight: 17,
            }}
          />
          <Image
            source={require('../../../assets/images/icon/find.png')}
            style={{
              position: 'absolute',
              top: 7,
              left: 12,
              height: 22,
              width: 22,
            }}
          />
        </View>
        {this.state.isLoading == true ? <IconLoading /> : null}
        {this.state.tidakada == true ? (
          <View
            style={{
              alignItems: 'center',
              flex: 2,
            }}>
            <Text>Buku tidak ditemukan !</Text>
          </View>
        ) : null}
        {!this.state.listData == [] ? (
          <ScrollView>
            {this.state.listData.map((val, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  AsyncStorage.setItem('@idBuku', val.id);
                  this.props.navigation.navigate('DetailBuku');
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    marginVertical: 16,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 120, width: 120}}
                    source={{
                      uri: val.foto,
                    }}
                  />
                  <View style={{width: '60%', marginLeft: 16}}>
                    <Text>{val.judul}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : null}
      </>
    );
  }
}

export default CariBuku;
