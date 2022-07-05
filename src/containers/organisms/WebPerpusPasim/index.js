import React from 'react';
import GoNews from './../../../components/molecules/GoNews';
import AskSee from './../../../components/atoms/AskSee';

const WebPerpusPasim = () => {
  return (
    <>
      <GoNews
        title="WEB-DIGITALKAMPUS"
        desc="Kunjungi juga web digital kampus universitas nasional pasim untuk
          informasi lebih lanjut."
        onPress={() =>
          AskSee('http://45.118.112.106:8585/digitalcampus2020/index.php')
        }
        image={require('../../../assets/images/dummy/perpusfoto.jpg')}
      />
    </>
  );
};

export default WebPerpusPasim;
