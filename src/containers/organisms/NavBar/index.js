import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import NavBarIcon from '../../../components/molecules/NavBarIcon';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {constant} from '../../../utils/constant/constant';

class NavBar extends Component {
  state = {
    ac: 'Home',
  };

  constructor(props) {
    super(props);
    AsyncStorage.getItem('@ac', (error, result) =>
      result ? this.setState({ac: result}) : null,
    );
  }

  render() {
    const rute = './../../../assets/images/icon/';
    const state = this.state.ac;
    const setAsync = AsyncStorage.setItem;
    const navigate = this.props.navigation.navigate;

    const Menu = () => {
      return (
        <NavBarIcon
          onPress={() => {
            setAsync('@ac', 'Menu');
            navigate('Riwayat');
          }}
          title="Menu"
          img={require(rute + 'book.png')}
          active={state == 'Menu' ? true : false}
        />
      );
    };

    const Home = () => {
      return (
        <NavBarIcon
          onPress={() => {
            setAsync('@ac', 'Home');
            navigate('Home');
          }}
          title="Home"
          img={require(rute + 'homee.png')}
          active={state == 'Home' ? true : false}
        />
      );
    };

    const Account = () => {
      return (
        <NavBarIcon
          onPress={() => {
            setAsync('@ac', 'Account');
            navigate('Account');
          }}
          title="Account"
          img={require(rute + 'user.png')}
          active={state == 'Account' ? true : false}
        />
      );
    };

    return (
      <View style={styles.container}>
        <Home />
        <Account />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopColor: constant.warnaPutih,
    borderTopWidth: 1,
  },
});

export default withNavigation(NavBar);
