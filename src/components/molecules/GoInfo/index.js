import React from 'react';
import AskSee from './../../atoms/AskSee';
import n from 'react-native-normalize';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
} from 'react-native';

const PerpusNasional = 'https://e-resources.perpusnas.go.id/';

const GoInfo = () => {
  return (
    <View style={{padding: 16}}>
      <View
        style={{
          paddingBottom: 20,
          borderBottomColor: '#e8e9ed',
          borderBottomWidth: 1,
        }}>
        <Text style={styles.title}>E-RESOURCES</Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              source={require('./../../../assets/images/dummy/logoperpusonline.png')}
              style={styles.image}
            />
          </View>
          <View style={{marginLeft: 16, flex: 1}}>
            <Text style={styles.titleDesc}>Daftar Perpustakaan Nasional</Text>
            <Text style={styles.desc}>
              perpustakaan digital online seperti jurnal , ebook, dan
              karya-karya referensi online lainnya.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => AskSee(PerpusNasional)}
          style={{
            backgroundColor: '#041562',
            borderRadius: 4,
            alignSelf: 'flex-end',
            marginTop: 16,
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: 'white',
              paddingHorizontal: 12,
              paddingVertical: 11,
              textAlign: 'center',
            }}>
            DAFTAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: n(17),
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginTop: n(15),
    marginBottom: n(20),
  },
  image: {
    width: n(150),
    height: n(100),
  },
  titleDesc: {
    fontSize: n(15),
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  desc: {
    fontSize: n(13),
    fontWeight: 'normal',
    color: '#4a4a4a',
    marginTop: n(10),
  },
});

export default GoInfo;
