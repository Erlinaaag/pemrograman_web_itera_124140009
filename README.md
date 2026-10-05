# 🌸 Mini POS Kasir Pink

Aplikasi kasir sederhana berbasis HTML, CSS, dan JavaScript (vanilla) untuk tugas praktikum.

**Nama:** Erlin Agesti Risadi
**Kelas:** RB
**NIM:** 124140009

## Fitur
- Tambah barang (nama, harga, qty) dengan validasi form
- Subtotal per barang, total keseluruhan, dan kalkulator kembalian
- Diskon otomatis 10% jika total >= Rp 50.000, atau lewat kode promo `HEMAT10`
- Hapus barang per baris dan tombol Transaksi Baru / Reset
- Data tersimpan otomatis di `localStorage` (tidak hilang saat refresh)
- Format mata uang Rupiah memakai `Intl.NumberFormat('id-ID')`

## Aturan Validasi
| Input | Aturan |
|-------|--------|
| Nama Barang | minimal 3 karakter |
| Harga | lebih dari 500 |
| Qty | minimal 1 (bilangan bulat) |

## Cara Menjalankan
1. Simpan semua file sesuai struktur folder.
2. Buka `index.html` di browser (butuh internet untuk CDN Bootstrap & font).
3. Untuk latihan modul: `node modul/latihan-modul.js` (bagian console),
   atau tambahkan `<script src="modul/latihan-modul.js"></script>` di sebuah
   halaman HTML kosong untuk mencoba bagian DOM & API.

## Struktur
- `index.html` : kerangka antarmuka (Bootstrap 5)
- `style.css` : tema pink, animasi, dan gaya pesan error
- `script.js` : logika utama Mini POS
- `modul/latihan-modul.js` : jawaban latihan modul (variabel s.d. DOM & API)
<h2>Screenshot Project</h2>

<h3>1. Tampilan Keranjang</h3>
<img src="assets/gambar1.png" width="700">

<h3>2. Tampilan Invalid Data</h3>
<img src="assets/gambar2.png" width="700">

<h3>3. Tampilan Pembayaran</h3>
<img src="assets/gambar3.png" width="700">
