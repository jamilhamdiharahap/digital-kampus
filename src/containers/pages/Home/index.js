import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {Component} from 'react';

import {ScrollView, View, StyleSheet} from 'react-native';

import HomePerpus from './../../organisms/HomePerpus';
import ListWebsites from './../../organisms/ListWebsites';
import NavBar from './../../organisms/NavBar';
import ScrollableBooks from './../../organisms/ScrollableBooks';
import WebPerpusPasim from './../../organisms/WebPerpusPasim';
import GarisAbu from './../../../components/atoms/GarisAbu';
import GoInfo from './../../../components/molecules/GoInfo';
import Header from './../../../components/molecules/Header';
import SearchFeature from './../../../components/molecules/SearchFeature';

class Home extends Component {
  constructor(props) {
    super(props);

    //Active Color Navigation
    AsyncStorage.setItem('@ac', 'Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.scroll}>
          {/* <SearchFeature /> */}
          <HomePerpus />
          <GarisAbu />
          <ScrollableBooks />
          <GarisAbu />
          <WebPerpusPasim />
          {/* <GoInfo /> */}
          <ListWebsites />
        </ScrollView>
        <NavBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    flex: 1,
  },
});

export default Home;
