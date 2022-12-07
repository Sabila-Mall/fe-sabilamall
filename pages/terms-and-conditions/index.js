import {
  Box,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
  Stack,
} from "@chakra-ui/react";

import Footer from "../../components/Footer";
import { Layout } from "../../components/Layout";
import Navbar from "../../components/Navbar";

const path = [
  {
    name: "Syarat dan Ketentuan",
    link: "/terms-and-conditions",
    isOnPage: true,
  },
];

const TermsAndConditions = () => {
  return (
    <Layout hasNavbar hasPadding breadCrumbItem={path} hasBreadCrumb>
      <Box d="flex" justifyContent="center">
        <Box
          as="main"
          overflow="hidden"
          w="100%"
          maxW="1536px"
          mb="2rem"
          textAlign="justify"
          className="secondaryFont"
          fontSize="0.75rem"
        >
          <Stack direction="column" spacing="24px">
            <Text className="primaryFont" fontWeight="700" fontSize="1.75rem">
              Selamat datang di SabilaMall.co.id
            </Text>
            <Box>
              <Text>
                Syarat &amp; ketentuan yang ditetapkan di bawah ini mengatur
                pemakaian jasa yang ditawarkan oleh PT. SabilaMall Niaga Digital
                terkait penggunaan situs SabilaMall.co.id dan aplikasi
                SabilaMall. Pengguna disarankan membaca dengan seksama karena
                dapat berdampak kepada hak dan kewajiban Pengguna di bawah
                hukum.
              </Text>
              <Text mt="0.8rem">
                Dengan mendaftar dan/atau menggunakan situs SabilaMall.co.id dan
                aplikasi SabilaMall, maka pengguna dianggap telah membaca,
                mengerti, memahami dan menyetujui semua isi dalam Syarat &amp;
                Ketentuan. Syarat &amp; ketentuan ini merupakan bentuk
                kesepakatan yang dituangkan dalam sebuah perjanjian yang sah
                antara Pengguna dengan PT.SabilaMall Niaga Digital. Jika
                pengguna tidak menyetujui salah satu, sebagian, atau seluruh isi
                Syarat &amp; ketentuan, maka pengguna tidak diperkenankan
                menggunakan layanan di SabilaMall.co.id dan aplikasi SabilaMall.
              </Text>
            </Box>
            <Box>
              <Text fontSize="1rem" mb="0.5rem">
                A. Definisi
              </Text>
              <OrderedList>
                <ListItem>
                  PT SabilaMall Niaga Digital adalah suatu perseroan terbatas
                  yang menjalankan kegiatan usaha jasa web portal
                  www.sabilamall.coid, yakni situs pencarian toko dan Barang
                  yang dijual oleh penjual terdaftar. Selanjutnya disebut
                  SabilaMall.
                </ListItem>
                <ListItem>
                  Situs SabilaMall adalah www.sabilamall.co.id.
                </ListItem>
                <ListItem>
                  Syarat &amp; ketentuan adalah perjanjian antara Pengguna dan
                  SabilaMall yang berisikan seperangkat peraturan yang mengatur
                  hak, kewajiban, tanggung jawab pengguna dan SabilaMall, serta
                  tata cara penggunaan sistem layanan SabilaMall.
                </ListItem>
                <ListItem>
                  Pengguna adalah pihak yang menggunakan layanan SabilaMall,
                  termasuk namun tidak terbatas pada pembeli, penjual maupun
                  pihak lain yang sekedar berkunjung ke Situs SabilaMall.
                </ListItem>
                <ListItem>
                  Pembeli adalah Pengguna terdaftar yang melakukan permintaan
                  atas Barang yang dijual oleh Penjual di Situs SabilaMall.
                </ListItem>
                <ListItem>
                  Penjual adalah Pengguna terdaftar yang melakukan tindakan buka
                  toko dan/atau melakukan penawaran atas suatu Barang kepada
                  para Pengguna Situs SabilaMall.
                </ListItem>
                <ListItem>
                  Barang adalah benda yang berwujud / memiliki fisik Barang yang
                  dapat diantar / memenuhi kriteria pengiriman oleh perusahaan
                  jasa pengiriman Barang.
                </ListItem>
              </OrderedList>
            </Box>
            <Box>
              <Text fontSize="1rem" mb="0.5rem">
                B. Transaksi Pembelian
              </Text>
              <OrderedList>
                <ListItem>
                  Pembeli wajib bertransaksi melalui prosedur transaksi yang
                  telah ditetapkan oleh SabilaMall. Pembeli melakukan pembayaran
                  dengan menggunakan metode pembayaran yang sebelumnya telah
                  dipilih oleh Pembeli, dan kemudian SabilaMall akan meneruskan
                  dana ke pihak Penjual apabila tahapan transaksi jual beli pada
                  sistem SabilaMall telah selesai.
                </ListItem>
                <ListItem>
                  Saat melakukan pembelian Barang, Pembeli menyetujui bahwa:
                  <UnorderedList>
                    <ListItem>
                      Pembeli bertanggung jawab untuk membaca, memahami, dan
                      menyetujui informasi/deskripsi keseluruhan Barang
                      (termasuk didalamnya namun tidak terbatas pada warna,
                      kualitas, fungsi, dan lainnya) sebelum membuat tawaran
                      atau komitmen untuk membeli.
                    </ListItem>
                    <ListItem>
                      Pembeli mengakui bahwa warna sebenarnya dari produk
                      sebagaimana terlihat di situs SabilaMall tergantung pada
                      monitor komputer Pembeli. SabilaMall telah melakukan upaya
                      terbaik untuk memastikan warna dalam foto-foto yang
                      ditampilkan di Situs SabilaMall muncul seakurat mungkin,
                      tetapi tidak dapat menjamin bahwa penampilan warna pada
                      Situs SabilaMall akan akurat.
                    </ListItem>
                    <ListItem>
                      Pengguna masuk ke dalam kontrak yang mengikat secara hukum
                      untuk membeli Barang ketika Pengguna membeli suatu barang.
                    </ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  Pembeli memahami dan menyetujui bahwa ketersediaan stok Barang
                  merupakan tanggung jawab Penjual yang menawarkan Barang
                  tersebut. Terkait ketersediaan stok Barang dapat berubah
                  sewaktu-waktu, sehingga dalam keadaan stok Barang kosong, maka
                  penjual akan menolak order, dan pembayaran atas barang yang
                  bersangkutan dikembalikan kepada Pembeli.
                </ListItem>
                <ListItem>
                  Pembeli memahami sepenuhnya dan menyetujui bahwa segala
                  transaksi yang dilakukan antara Pembeli dan Penjual selain
                  melalui Rekening Resmi SabilaMall dan/atau tanpa sepengetahuan
                  SabilaMall (melalui fasilitas/jaringan pribadi, pengiriman
                  pesan, pengaturan transaksi khusus diluar situs SabilaMall
                  atau upaya lainnya) adalah merupakan tanggung jawab pribadi
                  dari Pembeli.
                </ListItem>
                <ListItem>
                  Pembayaran oleh Pembeli wajib dilakukan segera
                  (selambat-lambatnya dalam batas waktu 2 hari) setelah Pembeli
                  melakukan check-out. Jika dalam batas waktu tersebut
                  pembayaran atau konfirmasi pembayaran belum dilakukan oleh
                  pembeli, SabilaMall memiliki kewenangan untuk membatalkan
                  transaksi dimaksud. Pengguna tidak berhak mengajukan klaim
                  atau tuntutan atas pembatalan transaksi tersebut.
                </ListItem>
                <ListItem>
                  Konfirmasi pembayaran dengan setoran tunai wajib disertai
                  dengan berita pada slip setoran berupa nomor invoice dan nama.
                  Konfirmasi pembayaran dengan setoran tunai tanpa keterangan
                  tidak akan diproses oleh SabilaMall.
                </ListItem>
                <ListItem>
                  Pembeli menyetujui untuk tidak memberitahukan atau menyerahkan
                  bukti pembayaran dan/atau data pembayaran kepada pihak lain
                  selain SabilaMall. Dalam hal terjadi kerugian akibat
                  pemberitahuan atau penyerahan bukti pembayaran dan/atau data
                  pembayaran oleh Pembeli kepada pihak lain, maka hal tersebut
                  akan menjadi tanggung jawab Pembeli.
                </ListItem>
                <ListItem>
                  Pembeli memahami dan menyetujui bahwa setiap masalah
                  pengiriman Barang yang disebabkan keterlambatan pembayaran
                  adalah merupakan tanggung jawab dari Pembeli.
                </ListItem>
                <ListItem>
                  Pembeli memahami dan menyetujui bahwa masalah keterlambatan
                  proses pembayaran dan biaya tambahan yang disebabkan oleh
                  perbedaan bank yang Pembeli pergunakan dengan bank Rekening
                  resmi SabilaMall adalah tanggung jawab Pembeli secara pribadi.
                </ListItem>
                <ListItem>
                  Pengembalian dana dari SabilaMall kepada Pembeli hanya dapat
                  dilakukan jika dalam keadaan-keadaan tertentu berikut ini:
                  <UnorderedList>
                    <ListItem>
                      Kelebihan pembayaran dari Pembeli atas harga Barang,
                    </ListItem>
                    <ListItem>
                      Masalah pengiriman Barang telah teridentifikasi secara
                      jelas dari Penjual yang mengakibatkan pesanan Barang tidak
                      sampai,
                    </ListItem>
                    <ListItem>
                      Penjual tidak bisa menyanggupi order karena kehabisan
                      stok, perubahan ongkos kirim, maupun penyebab lainnya,
                    </ListItem>
                    <ListItem>
                      Penjual sudah menyanggupi pengiriman order Barang, tetapi
                      setelah batas waktu yang ditentukan ternyata Penjual tidak
                      mengirimkan Barang hingga batas waktu yang telah
                      ditentukan.
                    </ListItem>
                    <ListItem>
                      Penyelesaian permasalahan melalui Pusat Resolusi berupa
                      keputusan untuk pengembalian dana kepada Pembeli atau
                      hasil keputusan dari pihak SabilaMall.
                    </ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  Apabila terjadi proses pengembalian dana, maka pengembalian
                  akan dilakukan melalui Saldo Deposit milik Pengguna yang akan
                  bertambah sesuai dengan jumlah pengembalian dana.
                </ListItem>
                <ListItem>
                  SabilaMall berwenang mengambil keputusan atas
                  permasalahan-permasalahan transaksi yang belum terselesaikan
                  akibat tidak adanya kesepakatan penyelesaian, baik antara
                  Penjual dan Pembeli, dengan melihat bukti-bukti yang ada.
                  Keputusan SabilaMall adalah keputusan akhir yang tidak dapat
                  diganggu gugat dan mengikat pihak Penjual dan Pembeli untuk
                  mematuhinya.
                </ListItem>
                <ListItem>
                  Pembeli wajib melakukan pembayaran dengan nominal yang sesuai
                  dengan jumlah tagihan beserta kode unik (apabila ada) yang
                  tertera pada halaman pembayaran. SabilaMall tidak
                  bertanggungjawab atas kerugian yang dialami Pembeli apabila
                  melakukan pembayaran yang tidak sesuai dengan jumlah tagihan
                  yang tertera pada halaman pembayaran.
                </ListItem>
                <ListItem>
                  Pembeli memahami sepenuhnya dan menyetujui bahwa invoice yang
                  diterbitkan adalah atas nama Penjual.
                </ListItem>
              </OrderedList>
            </Box>
            <Box>
              <Text fontSize="1rem" mb="0.5rem">
                C. Transaksi Penjualan
              </Text>
              <OrderedList>
                <ListItem>
                  Penjual dilarang memanipulasi harga Barang dengan tujuan
                  apapun.
                </ListItem>
                <ListItem>
                  Penjual wajib memberikan foto dan informasi produk dengan
                  lengkap dan jelas sesuai dengan kondisi dan kualitas produk
                  yang dijualnya. Apabila terdapat ketidaksesuaian antara foto
                  dan informasi produk yang diunggah oleh Penjual dengan produk
                  yang diterima oleh Pembeli, maka SabilaMall berhak
                  membatalkan/menahan dana transaksi.
                </ListItem>
                <ListItem>
                  Dalam menggunakan Fasilitas "Judul Produk", "Foto Produk",
                  "Catatan" dan "Deskripsi Produk", Penjual dilarang membuat
                  peraturan bersifat klausula baku yang tidak memenuhi peraturan
                  perundang-undangan yang berlaku di Indonesia, termasuk namun
                  tidak terbatas pada (i) tidak menerima komplain, (ii) tidak
                  menerima retur (penukaran barang), (iii) tidak menerima refund
                  (pengembalian dana), (iv) barang tidak bergaransi, (v)
                  pengalihan tanggung jawab (termasuk tidak terbatas pada
                  penanggungan ongkos kirim), (vi) penyusutan nilai harga dan
                  (vii) pengiriman barang acak secara sepihak. Jika terdapat
                  pertentangan antara catatan toko dan/atau deskripsi produk
                  dengan Syarat &amp; Ketentuan SabilaMall, maka peraturan yang
                  berlaku adalah Syarat &amp; Ketentuan SabilaMall.
                </ListItem>
                <ListItem>
                  Penjual wajib memproses pesanan Barang pihak Pembeli dalam
                  batas waktu 3 hari terhitung sejak adanya notifikasi
                  pembayaran Barang dari SabilaMall. Jika dalam batas waktu
                  tersebut tidak ada balasan dari Penjual maka secara otomatis
                  pesanan akan dibatalkan.
                </ListItem>
                <ListItem>
                  Demi menjaga kenyamanan Pembeli dalam bertransaksi, Penjual
                  memahami dan menyetujui bahwa SabilaMall berhak melakukan
                  moderasi toko Penjual apabila Penjual melakukan penolakan,
                  pembatalan dan/atau tidak merespon pesanan Barang milik
                  Pembeli dengan dugaan untuk memanipulasi transaksi,
                  pelanggaran atas Syarat dan Ketentuan, dan/atau kecurangan
                  atau penyalahgunaan lainnya.
                </ListItem>
                <ListItem>
                  Penjual diharapkan untuk memasukkan nomor resi pengiriman
                  Barang atau AWB (air way bill) yang valid, yaitu:
                  <UnorderedList>
                    <ListItem>
                      Tanggal pembuatan resi pengiriman Barang tidak lebih dulu
                      dari tanggal transaksi pembelian Barang;
                    </ListItem>
                    <ListItem>
                      Nomor resi pengiriman Barang harus dapat dilacak atau
                      ditemukan pada web situs pelacakan atau sistem jasa
                      ekspedisi rekanan SabilaMall; dan/atau
                    </ListItem>
                    <ListItem>
                      Merupakan resi pengiriman Barang yang memang diperuntukkan
                      untuk pembeli yang akan menerima paket tersebut (detail
                      pengiriman harus sama).
                    </ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  Penjual wajib memasukkan nomor resi pengiriman Barang yang
                  valid dalam batas waktu 2 x 24 jam (tidak termasuk hari
                  Sabtu/Minggu/libur Nasional) terhitung sejak adanya notifikasi
                  pembayaran Barang dari SabilaMall.
                </ListItem>
                <ListItem>
                  Apabila Penjual memasukkan nomor resi pengiriman Barang yang
                  invalid atau tidak dapat terlacak, Penjual wajib memasukkan
                  nomor resi pengiriman Barang yang valid dalam batas waktu 1 x
                  24 jam (tidak termasuk hari Sabtu/Minggu/libur Nasional)
                  terhitung sejak adanya notifikasi nomor resi invalid atau
                  tidak terlacak yang diberikan oleh SabilaMall kepada Penjual.
                </ListItem>
                <ListItem>
                  Jika dalam batas waktu tersebut dalam Syarat &amp; Ketentuan
                  Poin C. 7 dan C. 8 pihak Penjual tidak memasukkan nomor resi
                  pengiriman Barang yang valid, maka secara otomatis pesanan
                  dianggap dibatalkan. Jika Penjual tetap mengirimkan Barang
                  setelah melebihi batas waktu pengiriman sebagaimana dijelaskan
                  diatas, maka Penjual memahami bahwa transaksi akan tetap
                  dibatalkan untuk kemudian Penjual dapat melakukan penarikan
                  Barang pada kurir tempat Barang dikirimkan.
                </ListItem>
                <ListItem>
                  Penjual memahami dan menyetujui bahwa kurir pengiriman tidak
                  dapat diubah oleh Penjual setelah Penjual melakukan konfirmasi
                  pengiriman dan sepenuhnya menjadi tanggung jawab Penjual.
                </ListItem>
                <ListItem>
                  SabilaMall berwenang untuk membatalkan transaksi dan/atau
                  menahan dana transaksi dalam hal: (i) nomor resi kurir
                  pengiriman Barang yang diberikan oleh Penjual tidak sesuai
                  dan/atau diduga tidak sesuai dengan transaksi yang terjadi di
                  Situs SabilaMall; (ii) Penjual mengirimkan Barang melalui jasa
                  kurir/logistik selain dari yang disediakan dan terhubung
                  dengan Situs SabilaMall; (iii) jika nama produk dan deskripsi
                  produk tidak sesuai/tidak jelas dengan produk yang dikirim;
                  (iv) jika ditemukan adanya manipulasi transaksi; dan/atau (v)
                  mencantumkan nomor resi pengiriman Barang yang telah digunakan
                  oleh Penjual lainnya (internal dropshipper)
                </ListItem>
                <ListItem>
                  Penjual memahami dan menyetujui bahwa seluruh Pajak sehubungan
                  dengan transaksi Penjualan (namun tidak terbatas pada
                  perubahan informasi toko dan/atau barang), akan dilaporkan dan
                  diurus sendiri oleh masing-masing Penjual sesuai dengan
                  ketentuan pajak yang berlaku di peraturan perundang-undangan
                  di Indonesia.
                </ListItem>
                <ListItem>
                  SabilaMall berwenang mengambil keputusan atas
                  permasalahan-permasalahan transaksi yang belum terselesaikan
                  akibat tidak adanya kesepakatan penyelesaian, baik antara
                  Penjual dan Pembeli, dengan melihat bukti-bukti yang ada.
                  Keputusan SabilaMall adalah keputusan akhir yang tidak dapat
                  diganggu gugat dan mengikat pihak Penjual dan Pembeli untuk
                  mematuhinya.
                </ListItem>
                <ListItem>
                  Apabila disepakati oleh Penjual dan Pembeli, penggunaan jasa
                  Logistik yang berbeda dari pilihan awal pembeli dapat
                  dilakukan (dengan ketentuan bahwa tarif pengiriman tersebut
                  adalah di bawah tarif pengiriman awal).
                </ListItem>
                <ListItem>
                  Penjual memahami sepenuhnya dan menyetujui bahwa invoice yang
                  diterbitkan adalah atas nama Penjual.
                </ListItem>
              </OrderedList>
            </Box>
            <Box>
              <Text fontSize="1rem" mb="0.5rem">
                D. Harga
              </Text>
              <OrderedList>
                <ListItem>
                  Harga Barang yang terdapat dalam situs SabilaMall adalah harga
                  yang ditetapkan oleh Penjual.
                </ListItem>
                <ListItem>
                  Penjual dilarang memanipulasi harga barang dengan cara apapun.
                </ListItem>
                <ListItem>
                  Penjual dilarang menetapkan harga yang tidak wajar pada Barang
                  yang ditawarkan melalui Situs SabilaMall. SabilaMall berhak
                  untuk melakukan tindakan berupa memindahkan Barang ke gudang,
                  pemeriksaan, penundaan, atau penurunan konten serta tindakan
                  lainnya berdasarkan penilaian sendiri dari SabilaMall atas
                  dasar penetapan harga yang tidak wajar.
                </ListItem>
                <ListItem>
                  Pembeli memahami dan menyetujui bahwa kesalahan keterangan
                  harga dan informasi lainnya yang disebabkan tidak
                  terbaharuinya halaman situs SabilaMall dikarenakan browser/ISP
                  yang dipakai Pembeli adalah tanggung jawab Pembeli.
                </ListItem>
                <ListItem>
                  Penjual memahami dan menyetujui bahwa kesalahan ketik yang
                  menyebabkan keterangan harga atau informasi lain menjadi tidak
                  benar/sesuai adalah tanggung jawab Penjual. Perlu diingat
                  dalam hal ini, apabila terjadi kesalahan pengetikan keterangan
                  harga Barang yang tidak disengaja, Penjual berhak menolak
                  pesanan Barang yang dilakukan oleh pembeli.
                </ListItem>
                <ListItem>
                  Dengan melakukan pemesanan melalui SabilaMall, Pengguna
                  menyetujui untuk membayar total biaya yang harus dibayarkan
                  sebagaimana tertera dalam halaman pembayaran, yang terdiri
                  dari harga barang, ongkos kirim, dan biaya-biaya lain yang
                  mungkin timbul dan akan diuraikan secara tegas dalam halaman
                  pembayaran.
                </ListItem>
                <ListItem>
                  Pengguna setuju untuk melakukan pembayaran melalui metode
                  pembayaran yang telah dipilih sebelumnya oleh Pengguna.
                </ListItem>
                <ListItem>
                  Situs SabilaMall untuk saat ini hanya melayani transaksi jual
                  beli Barang dalam mata uang Rupiah.
                </ListItem>
              </OrderedList>
            </Box>
            <Box>
              <Text fontSize="1rem" mb="0.5rem">
                E. Tarif Pengiriman
              </Text>
              <OrderedList>
                <ListItem>
                  Pembeli memahami dan mengerti bahwa SabilaMall telah melakukan
                  usaha sebaik mungkin dalam memberikan informasi tarif
                  pengiriman kepada Pembeli berdasarkan lokasi secara akurat,
                  namun SabilaMall tidak dapat menjamin keakuratan data tersebut
                  dengan yang ada pada cabang setempat.
                </ListItem>
                <ListItem>
                  Pengguna memahami dan menyetujui bahwa selisih biaya
                  pengiriman Barang adalah di luar tanggung jawab SabilaMall,
                  dan oleh karena itu, adalah kebijakan Penjual sendiri untuk
                  membatalkan atau tetap melakukan pengiriman Barang.
                </ListItem>
                <ListItem>
                  Tarif pengiriman yang ditampilkan pada saat proses pemesanan
                  bersifat final. Jika pengguna meneruskan pemesanan dengan
                  nilai tarif pengiriman sebagaimana ditampilkan, maka dapat
                  diartikan bahwa pengguna setuju dengan tarif pengiriman
                  tersebut. Dengan demikian jika terjadi selisih antara tarif
                  pengiriman pada saat pemesanan dengan tarif pengiriman yang
                  sebenarnya, maka kelebihan tarif pengiriman tidak akan
                  dikembalikan kepada pengguna demikian pula kekurangan tarif
                  pengiriman tidak akan ditagihkan kepada pengguna.
                </ListItem>
                <ListItem>
                  Pengguna memahami dan menyetujui bahwa selisih biaya
                  pengiriman Barang adalah di luar tanggung jawab SabilaMall,
                  dan oleh karena itu, adalah kebijakan Penjual sendiri untuk
                  membatalkan atau tetap melakukan pengiriman Barang.
                </ListItem>
              </OrderedList>
            </Box>
            <Box>
              <Text fontSize="1rem" mb="0.5rem">
                F. Pengembalian Barang
              </Text>
              <OrderedList>
                <ListItem>
                  Barang yang dibeli melalui SabilaMall dapat diretur jika
                  memenuhi syarat dan ketentuan sebagai berikut:
                  <UnorderedList>
                    <ListItem>
                      Spesifikasi barang tidak sesuai dengan deskripsi yang
                      ditulis di website/aplikasi.
                    </ListItem>
                    <ListItem>
                      Jumlah barang diterima tidak sesuai / kurang dari jumlah
                      yang dipesan.
                    </ListItem>
                    <ListItem>
                      Barang yang diterima mengalami kerusakan/cacat.
                    </ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  Komplain karena kerusakan/cacat barang wajib disertai dengan
                  foto/video barang bersama hang tag (banderol).
                </ListItem>
                <ListItem>
                  Komplain karena kurang barang wajib disertai dengan video
                  unboxing (membuka) paket.
                </ListItem>
                <ListItem>
                  Komplain permintaan retur/penggantian barang/pengiriman kurang
                  barang dilakukan paling lambat 1x24 jam sejak barang diterima
                  dengan mengacu pada data tanggal dan jam diterimanya barang
                  dari pihak ekspedisi.
                </ListItem>
              </OrderedList>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

export default TermsAndConditions;
