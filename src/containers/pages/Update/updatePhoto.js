import React, {useState, useEffect} from 'react';
// Import core components
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Api from '../../../utils/Api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './../../../components/molecules/Header';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
import {constant} from '../../../utils/constant/constant';

const UpdatePhoto = ({navigation}) => {
  const [singleFile, setSingleFile] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('mahasiswa', (error, result) => {
      if (result) {
        let data = JSON.parse(result);
        setUser(data);
      }
    });
  }, []);

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      alert('Sedang mengupload foto, mohon tunggu');
      // If file selected then create FormData
      const fileToUpload = singleFile[0];
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('image', fileToUpload);

      fetch(Api.host + '/assets/upload/' + user.nim, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => response.json())
        .then(json => {
          if (json.respon_code == 200) {
            AsyncStorage.setItem('mahasiswa', JSON.stringify(json.data));
            navigation.navigate('Home');
          }
          alert(json.message);
        })
        .catch(err => alert('gagal mengupload foto'));
    } else {
      alert('Pilih foto terlebih dahulu');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <>
      <Header />
      <View style={styles.mainBody}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>
            Silahkan pilih foto yang ingin diubah
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 20,
              marginBottom: 30,
              textAlign: 'center',
            }}>
            ukuran foto maksimal 1 MB
          </Text>
        </View>
        {/*Showing the data of selected Single file*/}
        {singleFile != null ? (
          <Text style={styles.textStyle}>
            Nama Foto: {singleFile[0].name ? singleFile[0].name : ''}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text style={styles.buttonTextStyle}>Pilih Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={uploadImage}>
          <Text style={styles.buttonTextStyle}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: constant.warnaBackground,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

export default UpdatePhoto;
