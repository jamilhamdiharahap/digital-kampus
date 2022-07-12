import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {Component, useState} from 'react';

import {withNavigation} from 'react-navigation';

import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import Api from '../../../utils/Api';
import {tinggi} from '../../../assets/styles/style';
import GarisAbu from './../../../components/atoms/GarisAbu';
import IconLoading from './../../../components/atoms/IconLoading';
import ScrollableItem from './../../../components/molecules/ScrollableItem';
import MainButton from '../../../components/atoms/MainButton/main-button';

const informasiAkademik = [
  {
    id: 1,
    judul: 'UTS Periode November 2019 Kelas Pagi Universitas Nasional Pasim',
    foto: 'https://ppdb.pasimcreativeschool.com/wp-content/uploads/2020/04/Pasim-Aplikasi-Bck-1024x936-1.png',
    desc: 'informasi yang disampaikan 1).Soal ujian diserahkan ke Bagian Akademik selambat-lambatnya tanggal 01 November 2019 2).jumlah minimal perkuliahan (tatap muka) sebelum uts 4 kali pertemuan dan 8 kali pertemuan sebelum UAS.apabila tidak memenuhi persyaratan bisa diadakan kuliah tambahan/pengganti. 3).Soal ujian diperbanyak oleh panitia UTS dan UAS Universitas Nasional Pasim. 4).Pada saat pelaksanaan ujian UTS dan UAS dosen pembina mata kuliah wajib hadir untuk mengawas ujian. 5).Berkas Soal telah di perbanyak oleh akademik jadi tinggal di akademik. 6).daftar hadir nilai UTS dan UAS,Berita acara UTS dan UAS (dibuat rangkap dua) di ambil dibagian akademik dan selesai ujian Berita Acara diserahkan ke bagian akademik sebanyak 1 (satu) lembar. 7).kami mohon bapak/ibu tidak memindahkan jadwal UTS dan UAS yang telah dibuat. 8).Nilai hasil ujian diserahkan ke bagian akademik selambat-lambatnya 7 hari setelah tanggal pelaksanaan ujian 9).Nilai Ujian di serahkan ke bagian akademik sesuai dengan surat edaran No.548/UNP-REK/SP/R/IV/2016.',
  },
  {
    id: 2,
    judul: 'Tata tertib bagi peserta UAS Universitas Nasional Pasim',
    foto: 'https://3.bp.blogspot.com/-lv1B_gz4Oww/WE7WGAM9bZI/AAAAAAAACnc/7B6UA-MQkhwUmTU6h_tEEFNRILBKCbUEgCLcB/s1600/STMIK%2BPasim%2BSukabumi.jpg',
    desc: '1. Peserta ujian adalah mahasiswa/i yang telah memenuhi persyaratan administratif dan keuangan yang telah di tetapkan. \n\n2. Peserta ujin wajib membawa kartu ujian selama ujian belangsung. jika waktu ujian hilang atau tidak dapat menunjukan kartu ujian pada saat ujian berlangsung akan dikenakan denda Rp. 5000',
  },
  {
    id: 3,
    judul: 'penandatanganan mou unas pasim dan uin sunan gunung djati',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGRx3LefJAyAqVxVJfsbRs5ilSaOo3VQDC5PJ_8O9fLQBcCvHZgh5J-bQ8RZL5quv9Wzc&usqp=CAU',
    desc: 'Sinergitas serta kebersamaan perguruan tinggi, baik yang negeri maupun swasta adalah salah satu kekuatan dari bangsa untuk membentuk sumber daya manusia yang mumpuni serta bisa berkiprah di tingkat dunia. Perguruan Tinggi Negeri (PTN) dengan segala fasilitas serta sarana prasarana yang memadai dan jajaran pengajar (Dosen) yang mempunyai jabatan akademis sesuai dengan keilmuannya. Perguruan Tinggi Swasta (PTS) lebih mudah pergerakannya karena regulasi yang lebih sedikit, Dosen yang profesional dibidangnya, kelincahan dalam menjalin hubungan dengan dunia industri. Kedua institusi tersebut diatas merupakan ?duet maut? ujung tombak bangsa Indonesia untuk bisa sejajar dengan bangsa-bangsa besar lainnya di dunia. Berpijak dari pikiran serta visi dan misi yang sama, maka Universitas Nasional PASIM (UNAS PASIM) memenuhi undangan Rektor, berkunjung ke Kampus Universitas Islam Negeri Sunan Gunung Djati (UIN SGD) di jalan A.H. Nasution No.105, Cibiru Dipimpin lansung oleh rektor UNAS PASIM, Bapak Eko Travada serta Wakil Rektor II Bapak Desfitriady, Kabag CRM dan SC Bapak Endri Hendrayana dan Sekretaris Rektorat Ibu Sri Lestari, disambut dengan hangat oleh Rektor UIN SGD Bapak Mahmud, Wakil Rektor I Bapak Asep, Karo A2KK Bapak Habudin serta Bagian kerjasama Bapak Zahrudin. Pembicaraan yang mengalir penuh kekeluargaan lebih menekankan kepada memperkenalkan masing-masing institusi dengan keunikannya, serta secara umum hal-hal yang harus dilakukan untuk menindak lanjuti kerjasama yang akan ditandatangani. Harapan yang digantungkan sangatlah tinggi dalam kerjasama tersebut, maka harus di pilah-pilah yang mana yang akan menjadi skala prioritas terlebih dahulu. UNAS PASIM sangat tertarik dengan UIN SGD yang bermaksud mencetak Sarjana yang berbasiskan agama Islam tapi dengan kemampuan IT yang bisa diandalkan, jadi tidak ada lagi sekularisme dalam ilmu, karena ilmu itu kalau dirunut maka akan selalu bermuara kepada Allah SWT. Sementara UIN SGD lebih tertarik kepada program PUB (Pemberdayaan Umat Berkelanjutan), program yang sudah digulirkan UNAS PASIM semenjak 2002 ini mereka harapkan nantinya bisa di aplikasikan juga di Kampus UIN SGD. Akhirnya tepat pada pukul 10.30 WIB, Hari Rabu tanggal 24 Agustus 2016 ditanda tangani MOU antara UIN SGD dengan UNAS PASIM, teriring doa bahwa MOU yang ditandatangani Insyaallah akan membawa ke maslahatan bagi umat manusia...Amin..',
  },
  {
    id: 4,
    judul: 'Pengumuman kegiatan perkuliahan Universitas Nasional Pasim',
    foto: 'https://pgsd.unimudasorong.ac.id/app/upload/artikel/pengumuman-uas-semester-genap-20182019.jpeg',
    desc: 'Kegiatan perkuliahan besok diliburkan',
  },
];

function GagalMemuat(props) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 80,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Gagal memuat konten,
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Mohon periksa jaringan anda
      </Text>
      <TouchableOpacity
        onPress={() => props.navigate('Auth')}
        style={{
          height: 25,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#041562',
          marginVertical: 10,
        }}>
        <Text style={{color: 'white'}}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

function TombolLihatSemua(props) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
      }}
      onPress={() => props.navigate('CariBuku')}>
      <Text
        style={{
          marginTop: 12,
          fontSize: 17,
          fontWeight: 'bold',
          color: '#041562',
          alignSelf: 'flex-end',
        }}>
        Lihat Semua
      </Text>
    </TouchableOpacity>
  );
}

function IconBukuTerbaru() {
  return (
    <>
      <Image
        source={require('../../../assets/images/icon/his.png')}
        style={{
          height: 30,
          width: 30,
          marginRight: 10,
          marginLeft: 8,
          marginTop: 5,
        }}
      />
      <Text
        style={{
          fontSize: 17,
          fontWeight: 'bold',
          color: '#1c1c1c',
        }}>
        Informasi Akademik
      </Text>
    </>
  );
}

function TampilSemuaBuku(props) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        flexDirection: 'row',
      }}>
      {props.listData.map((val, index) => (
        <ScrollableItem
          onPress={() => {
            props.navigate('DetailInformasiAkademi', {data: val});
          }}
          key={index}
          title={val.judul.substring(0, 40) + '...'}
          img={val.foto}
        />
      ))}
      <View style={{width: 16}} />
    </ScrollView>
  );
}

class ScrollableBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      idBuku: '',
      isLoading: true,
      tidakada: false,
      listData: [],
      kelas: '',
      modalKRSVisible: false,
      modalNilaiVisible: false,
    };

    // hoting webhost
    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        this.setState({
          kelas: data.kelas,
        });
      }
    });
    this.url = Api.host + '/pengumuman';
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  componentDidMount() {
    this.Semua();
  }

  async Semua() {
    this.setState({isLoading: true});
    this.setState({tidakada: false});

    await fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.setState({listData: json.data});
        this.setState({isLoading: false});
        !this.state.listData
          ? this.setState({tidakada: true})
          : this.setState({tidakada: false});
      })
      .catch(error => {
        this.setState({isLoading: false});
        this.setState({tidakada: true});
      });
  }

  render() {
    const PopupKRS = () => {
      return (
        <Modal
          visible={this.state.modalKRSVisible}
          transparent={true}
          animationType="slide">
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({modalKRSVisible: !this.state.modalKRSVisible});
              }}>
              <View
                style={{
                  height: tinggi / 1.27,
                }}></View>
            </TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({modalKRSVisible: !this.state.modalKRSVisible});
                }}>
                <View
                  style={{
                    backgroundColor: '#041562',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Kartu Rencana Studi
                  </Text>
                </View>
              </TouchableHighlight>
              <View
                style={{
                  height: tinggi / 5,
                  padding: 12,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <MainButton
                  teks="Pengisian KRS"
                  width={250}
                  link={() => {
                    this.props.navigation.navigate('KartuRencanaStudi');
                  }}
                />
                <MainButton
                  teks="Perubahkan KRS"
                  width={250}
                  link={() => {
                    this.setState({
                      modalKRSVisible: !this.state.modalKRSVisible,
                    });
                    this.props.navigation.navigate('UpdateKRS');
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      );
    };

    const PopUpNilai = () => {
      return (
        <Modal
          visible={this.state.modalNilaiVisible}
          transparent={true}
          animationType="slide">
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  modalNilaiVisible: !this.state.modalNilaiVisible,
                });
              }}>
              <View
                style={{
                  height: tinggi / 1.27,
                }}></View>
            </TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    modalNilaiVisible: !this.state.modalNilaiVisible,
                  });
                }}>
                <View
                  style={{
                    backgroundColor: '#041562',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    Kartu Hasil Studi
                  </Text>
                </View>
              </TouchableHighlight>
              <View
                style={{
                  height: tinggi / 5,
                  padding: 12,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <MainButton
                  teks="Kartu Hasil Studi"
                  width={250}
                  link={() => {
                    this.setState({
                      modalNilaiVisible: !this.state.modalNilaiVisible,
                    });
                    this.props.navigation.navigate('KHS');
                  }}
                />
                <MainButton
                  teks="IP Sementara"
                  width={250}
                  link={() => {
                    this.props.navigation.navigate('IPSementara');
                  }}
                />
                <MainButton
                  teks="Nilai Mata Kuliah Aktif"
                  width={250}
                  link={() => {
                    this.setState({
                      modalNilaiVisible: !this.state.modalNilaiVisible,
                    });
                    this.props.navigation.navigate('NilaiUts');
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <View
        style={{
          borderBottomColor: '#e8e9ed',
          paddingBottom: 16,
        }}>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <MainButton
            teks="KRS"
            link={() => {
              this.setState({modalKRSVisible: true});
            }}
            width={80}
          />
          <MainButton
            teks="Nilai & KHS"
            link={() => {
              this.setState({modalNilaiVisible: true});
            }}
            width={80}
          />
          <MainButton
            teks="QR Code"
            link={() => {
              this.props.navigation.navigate('QRAnggota');
            }}
            width={80}
          />
          <MainButton
            teks="Unduh Jadwal"
            width={80}
            link={() => {
              Alert.alert(
                'Unduh Jadwal',
                'Apakah anda ingin mengunduh jadwal?',
                [
                  {text: 'Tidak'},
                  {
                    text: 'Ya',
                    onPress: () => {
                      Linking.openURL(
                        'https://drive.google.com/drive/folders/1FfrtYTPOK76-Mg4GhHSQu3LNZoMcBGgW?usp=sharing',
                      );
                    },
                  },
                ],
              );
            }}
          />
        </View>
        <View style={{marginTop: 15}} />
        <GarisAbu />
        <View style={{padding: 16, flexDirection: 'row', alignItems: 'center'}}>
          <IconBukuTerbaru />
          {/* <TombolLihatSemua navigate={this.props.navigation.navigate} /> */}
        </View>
        {this.state.tidakada == true ? (
          <GagalMemuat navigate={this.props.navigation.navigate} />
        ) : null}
        {this.state.isLoading == true ? <IconLoading /> : null}
        <TampilSemuaBuku
          navigate={this.props.navigation.navigate}
          listData={this.state.listData}
        />
        <PopupKRS />
        <PopUpNilai />
      </View>
    );
  }
}

export default withNavigation(ScrollableBooks);
