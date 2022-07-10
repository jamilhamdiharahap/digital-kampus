import React from 'react';

import {View, Image, Platform, TouchableOpacity, Text} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Api from '../../../utils/Api';
import Header from '../../../components/molecules/Header';

const createFormData = photo => {
  const formData = new FormData();
  formData.append('image', photo);
  return formData;
};

const UpdateFoto = () => {
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    const body = new FormData();
    body.append('image', {
      type: photo.type,
      uri: photo.uri,
      name: photo.fileName,
    });
    
    const headers = {
      'content-type': 'multipart/form-data',
      accept: 'application/json',
    };

    fetch(Api.host + '/assets/upload/0407181005', {
      method: 'POST',
      headers,
      body:JSON.stringify(body),
    })
      .then(response => response.json())
      .then(response => {
        alert(response.message);
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {photo && (
        <>
          <Image source={{uri: photo.uri}} style={{width: 500, height: 500}} />
          <TouchableOpacity title="Upload Photo" onPress={handleUploadPhoto}>
            <Text>Upload</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity title="Choose Photo" onPress={handleChoosePhoto}>
        <Text>Pilih</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateFoto;
