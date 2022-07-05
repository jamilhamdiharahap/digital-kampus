import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconLoading from './../../../components/atoms/IconLoading/index';
import Header from './../../../components/molecules/Header';

export default class DetailPinjamBuku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isLoading: true,
    };

    this.url =
      'https://perpuspasim.000webhostapp.com/ApiPinjamBuku.php?op=detail&id=';
  }

  componentDidMount() {
    AsyncStorage.getItem('@idPinjam', (error, result) => {
      if (result) {
        this.GetDetail(result);
      }
    });
  }

  async GetDetail(param) {
    await fetch(this.url + param)
      .then(response => response.json())
      .then(json => {
        this.setState({listData: json.data.result});
        this.setState({isLoading: false});
      })
      .catch(error => {
        alert(error);
      });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const Detail = props => {
      return (
        <View style={styles.detail}>
          <Text style={styles.jarak}>{props.title}</Text>
          <Text>:</Text>
          <Text style={styles.jarak2}>{props.id}</Text>
        </View>
      );
    };

    const Tampil = () => {
      return (
        <View style={{backgroundColor: 'white', flex: 1, width: '100%'}}>
          <Header />
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              <View style={styles.content}>
                {this.state.listData.map((val, index) => (
                  <View key={index}>
                    <View style={styles.bingkaiFoto}>
                      <Image
                        source={{uri: val.foto}}
                        style={styles.ukuranFoto}
                      />
                    </View>
                    <Text style={styles.judul}>{val.judul}</Text>
                    <Detail title="Waktu peminjaman" id={val.waktu} />
                    <Detail title="Batas peminjaman" id={val.batas} />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        AsyncStorage.setItem('@namaBuku', val.judul);
                        AsyncStorage.setItem('@idPinjam', val.id);
                        this.props.navigation.navigate('QRKembali');
                      }}>
                      <Text style={styles.textButton}>Kembalikan Buku</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      );
    };

    const Main = () => {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          {this.state.isLoading == true ? <IconLoading /> : <Tampil />}
        </View>
      );
    };

    // Main menu
    return <Main />;
  }
}

const lebar = Dimensions.get('window').width;
const tinggi = Dimensions.get('window').height;
let bagianFoto = tinggi / 2;
let jarak = lebar / 4;
let jarak2 = lebar - jarak;
let space = 10;
let doubleSpace = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scroll: {
    backgroundColor: 'white',
  },
  content: {
    width: lebar,
    backgroundColor: 'white',
  },
  bingkaiFoto: {
    height: bagianFoto,
    width: lebar,
    alignItems: 'center',
    marginVertical: doubleSpace,
  },
  ukuranFoto: {
    height: '100%',
    width: '75%',
    borderRadius: 30,
  },
  judul: {
    fontSize: 20,
    marginHorizontal: space,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  detail: {
    flexDirection: 'row',
    marginHorizontal: space,
    marginVertical: 5,
  },
  jarak: {
    width: 150,
  },
  jarak2: {
    width: jarak2,
    paddingLeft: space,
    paddingRight: doubleSpace,
  },
  button: {
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#1C2938',
    marginBottom: 100,
    marginTop: doubleSpace,
    borderRadius: 10,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
  },
});
