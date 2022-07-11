import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import {
  Home,
  Riwayat,
  RiwayatSelesai,
  ScanQRCode,
  Login,
  Daftar,
  Auth,
  Account,
  Bantuan,
  QRAnggota,
  CariBuku,
  DetailBuku,
  DetailPinjamBuku,
  QRPinjam,
  QRKembali,
  SplashScreen,
  Intro,
  KHS,
  DetailInformasiAkademi,
  KartuRencanaStudi,
  InfoPersonal,
  UpdatePhoto,
  UpdatePassword,
  UpdateKRS,
  IPSementara,
} from './../../containers/pages';

const HomeStack = createStackNavigator(
  {
    Home,
    ScanQRCode,
    QRAnggota,
    Bantuan,
    CariBuku,
    DetailBuku,
    QRPinjam,
    KHS,
    DetailInformasiAkademi,
    KartuRencanaStudi,
    UpdateKRS,
    IPSementara,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

const LoginStack = createSwitchNavigator(
  {
    SplashScreen,
    Intro,
    Auth,
    Login,
    Daftar,
    Home,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
  },
);

const AccountStack = createStackNavigator(
  {
    Account,
    Bantuan,
    InfoPersonal,
    UpdatePhoto,
    UpdatePassword,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Account',
  },
);

const ScanStack = createStackNavigator(
  {
    ScanQRCode,
    Home,
  },
  {
    headerMode: 'none',
    initialRouteName: 'ScanQRCode',
  },
);

const RiwayatStack = createStackNavigator(
  {
    Riwayat,
    RiwayatSelesai,
    DetailPinjamBuku,
    DetailBuku,
    QRKembali,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Riwayat',
  },
);

const Router = createSwitchNavigator(
  {
    HomeStack,
    RiwayatStack,
    ScanStack,
    LoginStack,
    AccountStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginStack',
  },
);

export default createAppContainer(Router);
