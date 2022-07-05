import {Alert, Linking} from 'react-native';

const AskSee = url => {
  const askSee = url => {
    Alert.alert('Kunjungi', 'Ingin mengunjungi website ?', [
      {
        text: 'Tidak',
      },
      {
        text: 'Ya',
        onPress: () => link(url),
      },
    ]);
  };

  const link = url => {
    Linking.openURL(url);
  };

  return askSee(url);
};

export default AskSee;
