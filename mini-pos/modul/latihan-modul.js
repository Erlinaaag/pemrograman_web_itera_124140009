'use strict';
/* Latihan Modul - Erlin Agesti Risadi | Kelas RB | 124140009
   - Node:   node modul/latihan-modul.js   (demo A-C di console)
   - Browser: buka modul/latihan-modul.html (semua latihan interaktif) */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ================= A. VARIABEL & KONDISIONAL ================= */
const dataDiri = { nama: 'Erlin Agesti Risadi', umur: 19, kota: 'Isi kota asalmu' };

const cekKelulusan = (nilai) => (nilai >= 70 ? 'LULUS' : 'TIDAK LULUS');

function kategoriUmur(u) {
  if (u < 12) return 'Anak';
  if (u <= 17) return 'Remaja';
  if (u <= 59) return 'Dewasa';
  return 'Lansia';
}

function namaHari(n) {
  switch (n) {
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
    case 7: return 'Sunday';
    default: return 'Invalid day';
  }
}

const hitungGrade = (n) => (n >= 85 ? 'A' : n >= 70 ? 'B' : n >= 55 ? 'C' : n >= 40 ? 'D' : 'E');

/* ================= B. LOOP & FUNGSI ================= */
function tabelPerkalian(angka) {
  const baris = [];
  for (let i = 1; i <= 10; i++) baris.push(`${angka} x ${i} = ${angka * i}`);
  return baris;
}

function faktorial(n) {
  if (!Number.isInteger(n) || n < 0) return NaN;
  let hasil = 1;
  for (let i = 2; i <= n; i++) hasil *= i;
  return hasil;
}

function isPrima(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

function hitungBMI(beratKg, tinggiCm) {
  if (!(beratKg > 0) || !(tinggiCm > 0)) return null;
  const m = tinggiCm / 100;
  const bmi = beratKg / (m * m);
  const kategori = bmi < 18.5 ? 'Kurus' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Gemuk' : 'Obesitas';
  return { bmi: Number(bmi.toFixed(1)), kategori };
}

function fizzBuzz() {
  const hasil = [];
  for (let i = 1; i <= 100; i++) {
    hasil.push(i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : i);
  }
  return hasil;
}

/* ================= C. ARRAY & OBJEK ================= */
let mahasiswa = [
  { id: 1, nama: 'Erlin', nim: '124140009', nilai: 90 },
  { id: 2, nama: 'Bunga', nim: '124140010', nilai: 78 },
  { id: 3, nama: 'Citra', nim: '124140011', nilai: 65 },
  { id: 4, nama: 'Dewi', nim: '124140012', nilai: 85 },
  { id: 5, nama: 'Ayu', nim: '124140013', nilai: 72 },
];
let nextId = 6;

const cariTertinggi = (arr) => arr.reduce((max, m) => (m.nilai > max.nilai ? m : max), arr[0]);
const rataRata = (arr) => (arr.length ? arr.reduce((s, m) => s + m.nilai, 0) / arr.length : 0);
const diAtasRata = (arr) => arr.filter((m) => m.nilai > rataRata(arr));
const urutkanNama = (arr, arah = 'asc') =>
  [...arr].sort((a, b) => (arah === 'asc' ? a.nama.localeCompare(b.nama) : b.nama.localeCompare(a.nama)));

const tambahMhs = (d) => { mahasiswa.push({ id: nextId++, ...d }); };
const ubahMhs = (id, d) => { mahasiswa = mahasiswa.map((m) => (m.id === id ? { ...m, ...d } : m)); };
const hapusMhs = (id) => { mahasiswa = mahasiswa.filter((m) => m.id !== id); };

function validasiMhs(nama, nim, nilai) {
  const e = [];
  if (nama.trim().length < 3) e.push('Nama minimal 3 karakter.');
  if (!/^\d{9}$/.test(nim.trim())) e.push('NIM harus 9 digit angka.');
  if (!(nilai >= 0 && nilai <= 100)) e.push('Nilai harus 0-100.');
  return e;
}

/* ================= DEMO CONSOLE (Node) ================= */
if (typeof document === 'undefined') {
  console.log(dataDiri, cekKelulusan(75), kategoriUmur(dataDiri.umur), namaHari(3), hitungGrade(88));
  console.log(tabelPerkalian(7).join('\n'));
  console.log('5! =', faktorial(5), '| 17 prima?', isPrima(17), '| BMI:', hitungBMI(55, 160));
  console.log(fizzBuzz().join(' '));
  console.table(mahasiswa);
  console.log('Tertinggi:', cariTertinggi(mahasiswa));
  console.log('Di atas rata-rata:', diAtasRata(mahasiswa));
  console.table(urutkanNama(mahasiswa, 'desc'));
  tambahMhs({ nama: 'Fira', nim: '124140014', nilai: 80 });
  ubahMhs(1, { nilai: 95 });
  hapusMhs(3);
  console.table(mahasiswa);
}

/* ================= UI BROWSER (A-D) ================= */
function initUI() {
  const $ = (id) => document.getElementById(id);
  const baca = (k) => { try { return JSON.parse(localStorage.getItem(k)) ?? []; } catch { return []; } };
  const tulis = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const tabelHtml = (rows, aksi) => `<table><thead><tr><th>#</th><th>Nama</th><th>NIM</th><th>Nilai</th>${aksi ? '<th>Aksi</th>' : ''}</tr></thead><tbody>${
    rows.length ? rows.map((m, i) => `<tr><td>${i + 1}</td><td>${esc(m.nama)}</td><td>${esc(m.nim)}</td><td>${m.nilai}</td>${
      aksi ? `<td><button data-edit="${m.id}">Edit</button><button data-hapus="${m.id}">Hapus</button></td>` : ''}</tr>`).join('')
      : `<tr><td colspan="5">Belum ada data 🌷</td></tr>`}</tbody></table>`;

  /* Dark mode (toggle class CSS) */
  if (baca('darkMode') === true) document.body.classList.add('dark');
  $('btnDark').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    tulis('darkMode', document.body.classList.contains('dark'));
  });

  /* A */
  $('btnA').addEventListener('click', () => {
    const nama = $('aNama').value.trim() || dataDiri.nama;
    const umur = Number($('aUmur').value);
    const kota = $('aKota').value.trim() || dataDiri.kota;
    const nilai = Number($('aNilai').value);
    const hari = Number($('aHari').value);
    $('outA').textContent = [
      `Nama: ${nama} | Umur: ${umur} | Kota: ${kota}`,
      `Kelulusan (nilai ${nilai}): ${cekKelulusan(nilai)}`,
      `Kategori umur: ${kategoriUmur(umur)}`,
      `Hari ke-${hari}: ${namaHari(hari)}`,
      `Grade (ternary): ${hitungGrade(nilai)}`,
    ].join('\n');
  });

  /* B */
  $('btnKali').addEventListener('click', () => {
    const n = Number($('bKali').value);
    $('outKali').textContent = tabelPerkalian(n).join('\n');
  });
  $('btnFak').addEventListener('click', () => {
    const n = Number($('bFak').value);
    $('outFak').textContent = Number.isNaN(faktorial(n)) ? 'Masukkan bilangan bulat >= 0' : `${n}! = ${faktorial(n)}`;
  });
  $('btnPrima').addEventListener('click', () => {
    const n = Number($('bPrima').value);
    $('outFak').textContent = `${n} ${isPrima(n) ? 'adalah' : 'bukan'} bilangan prima`;
  });
  $('btnBmi').addEventListener('click', () => {
    const r = hitungBMI(Number($('bmiBerat').value), Number($('bmiTinggi').value));
    $('outBmi').textContent = r ? `BMI: ${r.bmi} (${r.kategori})` : 'Input berat/tinggi tidak valid';
  });
  $('btnFizz').addEventListener('click', () => { $('outFizz').textContent = fizzBuzz().join(', '); });

  /* C */
  const renderC = (rows = mahasiswa) => { $('tabelC').innerHTML = tabelHtml(rows, true); };
  const resetFormC = () => {
    ['cId', 'cNama', 'cNim', 'cNilai'].forEach((id) => { $(id).value = ''; });
    $('judulForm').textContent = 'Tambah Mahasiswa';
    $('errC').textContent = '';
  };
  $('btnSemua').addEventListener('click', () => { $('outC').textContent = ''; renderC(); });
  $('btnTertinggi').addEventListener('click', () => {
    const t = cariTertinggi(mahasiswa);
    $('outC').textContent = t ? `Nilai tertinggi: ${t.nama} (${t.nilai})` : 'Data kosong';
  });
  $('btnAtas').addEventListener('click', () => {
    $('outC').textContent = `Rata-rata: ${rataRata(mahasiswa).toFixed(2)}`;
    renderC(diAtasRata(mahasiswa));
  });
  $('btnAsc').addEventListener('click', () => renderC(urutkanNama(mahasiswa, 'asc')));
  $('btnDesc').addEventListener('click', () => renderC(urutkanNama(mahasiswa, 'desc')));
  $('btnSimpanC').addEventListener('click', () => {
    const nama = $('cNama').value, nim = $('cNim').value, nilai = Number($('cNilai').value);
    const err = validasiMhs(nama, nim, nilai);
    $('errC').textContent = err.join(' ');
    if (err.length) return;
    const data = { nama: nama.trim(), nim: nim.trim(), nilai };
    if ($('cId').value) ubahMhs(Number($('cId').value), data); else tambahMhs(data);
    resetFormC();
    renderC();
  });
  $('btnBatalC').addEventListener('click', resetFormC);
  $('tabelC').addEventListener('click', (e) => {
    const { edit, hapus } = e.target.dataset;
    if (hapus !== undefined) { hapusMhs(Number(hapus)); renderC(); }
    if (edit !== undefined) {
      const m = mahasiswa.find((x) => x.id === Number(edit));
      if (!m) return;
      $('cId').value = m.id; $('cNama').value = m.nama; $('cNim').value = m.nim; $('cNilai').value = m.nilai;
      $('judulForm').textContent = 'Edit Mahasiswa';
    }
  });
  renderC();

  /* D1: Form mahasiswa baru + validasi + localStorage */
  let dataD = baca('latihanMhsBaru');
  const renderD = () => { $('tabelD').innerHTML = tabelHtml(dataD, true); };
  $('btnD').addEventListener('click', () => {
    const nama = $('dNama').value, nim = $('dNim').value, nilai = Number($('dNilai').value);
    const err = validasiMhs(nama, nim, nilai);
    $('errD').textContent = err.join(' ');
    if (err.length) return;
    dataD.push({ id: Date.now(), nama: nama.trim(), nim: nim.trim(), nilai });
    tulis('latihanMhsBaru', dataD);
    ['dNama', 'dNim', 'dNilai'].forEach((id) => { $(id).value = ''; });
    renderD();
  });
  $('tabelD').addEventListener('click', (e) => {
    if (e.target.dataset.hapus === undefined) return;
    dataD = dataD.filter((m) => m.id !== Number(e.target.dataset.hapus));
    tulis('latihanMhsBaru', dataD);
    renderD();
  });
  renderD();

  /* D2: API JSONPlaceholder - search + pagination */
  let posts = [], hal = 1;
  const PER = 10;
  const renderPost = () => {
    const q = $('cariPost').value.trim().toLowerCase();
    const hasil = posts.filter((p) => p.title.toLowerCase().includes(q));
    const maks = Math.max(1, Math.ceil(hasil.length / PER));
    hal = Math.min(Math.max(hal, 1), maks);
    $('listPost').innerHTML = hasil.slice((hal - 1) * PER, hal * PER).map((p) => `<li>${esc(p.title)}</li>`).join('')
      || '<li>Tidak ada post yang cocok.</li>';
    $('halaman').textContent = ` Hal ${hal} / ${maks} `;
    $('prev').disabled = hal <= 1;
    $('next').disabled = hal >= maks;
  };
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
    .then((d) => { posts = d; renderPost(); })
    .catch((e) => { $('listPost').innerHTML = `<li class="err">Gagal memuat API: ${esc(e.message)}</li>`; });
  $('cariPost').addEventListener('input', () => { hal = 1; renderPost(); });
  $('prev').addEventListener('click', () => { hal--; renderPost(); });
  $('next').addEventListener('click', () => { hal++; renderPost(); });

  /* D3: Todo list */
  let todos = baca('latihanTodo');
  const renderTodo = () => {
    $('listTodo').innerHTML = todos.map((t, i) =>
      `<li><input type="checkbox" data-cek="${i}" ${t.selesai ? 'checked' : ''}>
       <span class="${t.selesai ? 'done' : ''}">${esc(t.teks)}</span>
       <button data-hps="${i}">Hapus</button></li>`).join('') || '<li>Belum ada tugas ✨</li>';
  };
  $('btnTodo').addEventListener('click', () => {
    const teks = $('todoInput').value.trim();
    $('errTodo').textContent = teks ? '' : 'Tugas tidak boleh kosong.';
    if (!teks) return;
    todos.push({ teks, selesai: false });
    $('todoInput').value = '';
    tulis('latihanTodo', todos);
    renderTodo();
  });
  $('listTodo').addEventListener('click', (e) => {
    const { cek, hps } = e.target.dataset;
    if (cek !== undefined) todos[Number(cek)].selesai = e.target.checked;
    else if (hps !== undefined) todos.splice(Number(hps), 1);
    else return;
    tulis('latihanTodo', todos);
    renderTodo();
  });
  renderTodo();
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', initUI);
