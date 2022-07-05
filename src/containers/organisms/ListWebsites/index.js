import React from 'react';
import GoNews from './../../../components/molecules/GoNews';
import AskSee from './../../../components/atoms/AskSee';

const ListWebsites = () => {
  // Link
  const pasim = 'http://pasim.ac.id/';
  const pub = 'https://pubpasim.org/';
  const garuda = 'https://garuda.ristekbrin.go.id/journal';
  const sinta = 'https://sinta.ristekbrin.go.id/journals';
  const upi = 'http://perpustakaan.upi.edu/e-journal-dan-e-book/';
  const perpus = 'http://pustaka.pasim.ac.id/';

  // Rute Foto
  const rute = '../../../assets/images/dummy/';

  return (
    <>
      <GoNews
        title="WEB-PERPUS"
        desc="Kunjungi juga web resmi universitas nasional pasim untuk informasi
          tentang perpustakaan."
        onPress={() => AskSee(perpus)}
        image={require(rute + 'webpasim.jpg')}
      />
      <GoNews
        title="WEB-PUB"
        desc="Kunjungi juga web resmi beasiswa pemberdayaan umat berkelanjutan (PUB)
          universitas nasional pasim untuk informasi tentang beasiswa, kuliah
          gratis, syarat dan ketentuan pendaftaran."
        onPress={() => AskSee(pub)}
        image={require(rute + 'webpub.jpg')}
      />
      {/* <GoNews
        title="WEB-PORTAL-GARUDA"
        desc="Kunjungi juga web resmi Portal Garuda untuk mencari penemuan referensi ilmiah Indonesia yang merupakan titik akses terhadap karya ilmiah yang dihasilkan oleh akademisi dan peneliti Indonesia"
        onPress={() => AskSee(garuda)}
        image={require(rute + 'portalgaruda.jpg')}
      />
      <GoNews
        title="WEB-SINTA-INDONESIA"
        desc="Kunjungi juga web SINTA alias Science and Technology Index. Aplikasi ini berupa portal yang berisi pengukuran kinerja Ilmu Pengetahuan dan Teknologi (IPTEK) antara lain kinerja peneliti, kinerja jurnal, kinerja institusi IPTEK, dan author atau penulis jurnal."
        onPress={() => AskSee(sinta)}
        image={require(rute + 'sinta.jpg')}
      />
      <GoNews
        title="WEB-PERPUSTAKAAN-UPI"
        desc="Kunjungi juga web Perpustakaan Universitas Pendidikan Indonesia untuk mencari referensi e-book, e-journal dan referensi lainnya."
        onPress={() => AskSee(upi)}
        image={require(rute + 'upi.jpg')}
      /> */}
    </>
  );
};

export default ListWebsites;
