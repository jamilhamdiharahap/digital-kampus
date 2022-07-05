let TujuhHari = 604800000;

  var tomorrow = new Date("2021-08-02 01:14:29");
  var kembali = new Date("2021-08-09 02:14:30");

  const today = () => {
    alert(tomorrow);
  };

  const nanti = () => {
    alert(kembali);
  };

  const cek = () => {
    let harga = 10000;
    let beda = kembali.getTime() - tomorrow.getTime();
    let pesan = "";
    let denda = 0;

    if (beda <= 604800000) {
      alert("terima kasih");
    } else {
      beda -= 604800000;
      let hari = Math.floor(beda / (1000 * 60 * 60 * 24));
      beda -= hari * (1000 * 60 * 60 * 24);
      let jam = Math.floor(beda / (1000 * 60 * 60));
      beda -= jam * (1000 * 60 * 60);
      let menit = Math.floor(beda / (1000 * 60));
      beda -= menit * (1000 * 60);
      let detik = Math.floor(beda / 1000);

      if (hari !== 0) {
        pesan = `${hari} Hari, ${jam} Jam, ${menit} Menit, ${detik} Detik`;
        denda = jam * harga * (24 * hari);
      } else if (jam !== 0) {
        pesan = `${jam} Jam, ${menit} Menit, ${detik} Detik`;
        denda = jam * harga;
      } else pesan = `${detik} Detik`;

      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

      denda = formatter.format(denda);
      alert(
        `\n\nKamu telat ${pesan}, Dan kamu harus membayar denda sebesar Rp. ${denda.substring(
          4,
          denda.length - 3
        )}`
      );
    }
  };