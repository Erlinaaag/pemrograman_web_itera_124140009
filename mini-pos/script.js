'use strict';

const STORAGE_KEY = 'miniPosState';
const KODE_PROMO = 'HEMAT10';
const MIN_DISKON = 50000;
const $ = (id) => document.getElementById(id);

const state = { items: [], promo: false, bayar: 0 };

/* ---------- Helper ---------- */
const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- LocalStorage ---------- */
function simpan() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Gagal menyimpan data:', err);
  }
}

function muat() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    state.items = Array.isArray(data.items) ? data.items : [];
    state.promo = data.promo === true;
    state.bayar = Number(data.bayar) || 0;
  } catch (err) {
    console.error('Data tersimpan rusak, direset:', err);
    localStorage.removeItem(STORAGE_KEY);
  }
}

/* ---------- Perhitungan ---------- */
function hitung() {
  const total = state.items.reduce((sum, i) => sum + i.harga * i.qty, 0);
  const diskon = total > 0 && (total >= MIN_DISKON || state.promo) ? Math.round(total * 0.1) : 0;
  const totalBayar = total - diskon;
  return { total, diskon, totalBayar, kembalian: state.bayar - totalBayar };
}

/* ---------- Validasi ---------- */
function validasi(nama, harga, qty) {
  const err = {};
  if (nama.trim().length < 3) err.nama = 'Nama barang minimal 3 karakter.';
  if (!(harga > 500)) err.harga = 'Harga harus lebih dari Rp 500.';
  if (!Number.isInteger(qty) || qty < 1) err.qty = 'Qty minimal 1 (bilangan bulat).';
  return err;
}

function tampilkanError(err) {
  const map = { nama: 'errNama', harga: 'errHarga', qty: 'errQty' };
  Object.keys(map).forEach((k) => {
    $(map[k]).textContent = err[k] || '';
    $(k).classList.toggle('is-invalid-pink', Boolean(err[k]));
  });
}

/* ---------- Render ---------- */
function render() {
  const tbody = $('daftarBarang');
  if (state.items.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="6">Keranjang masih kosong 🌷</td></tr>';
  } else {
    tbody.innerHTML = state.items
      .map(
        (it, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${escapeHtml(it.nama)}</td>
          <td class="text-end">${rupiah(it.harga)}</td>
          <td class="text-center">${it.qty}</td>
          <td class="text-end">${rupiah(it.harga * it.qty)}</td>
          <td class="text-end"><button class="btn btn-sm btn-outline-pink" data-hapus="${idx}">🗑️</button></td>
        </tr>`
      )
      .join('');
  }

  const { total, diskon, totalBayar, kembalian } = hitung();
  $('total').textContent = rupiah(total);
  $('diskon').textContent = '- ' + rupiah(diskon);
  $('totalBayar').textContent = rupiah(totalBayar);

  const box = $('statusBayar');
  box.className = 'status-box';
  if (total === 0 || state.bayar <= 0) {
    $('kembalian').textContent = rupiah(0);
    box.textContent = '';
  } else if (kembalian < 0) {
    $('kembalian').textContent = rupiah(0);
    box.textContent = `⚠️ Uang kurang ${rupiah(Math.abs(kembalian))}`;
    box.classList.add('warn');
  } else {
    $('kembalian').textContent = rupiah(kembalian);
    box.textContent = '✅ Pembayaran cukup. Terima kasih!';
    box.classList.add('ok');
  }
}

/* ---------- Event Handler ---------- */
$('formBarang').addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = $('nama').value;
  const harga = Number($('harga').value);
  const qty = Number($('qty').value);

  const err = validasi(nama, harga, qty);
  tampilkanError(err);
  if (Object.keys(err).length > 0) return;

  state.items.push({ nama: nama.trim(), harga, qty });
  $('formBarang').reset();
  $('qty').value = 1;
  simpan();
  render();
});

$('daftarBarang').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-hapus]');
  if (!btn) return;
  state.items.splice(Number(btn.dataset.hapus), 1);
  simpan();
  render();
});

$('btnPromo').addEventListener('click', () => {
  const kode = $('kodePromo').value.trim().toUpperCase();
  const pesan = $('pesanPromo');
  if (kode === KODE_PROMO) {
    state.promo = true;
    pesan.textContent = '🎉 Kode promo berhasil dipakai (diskon 10%).';
    pesan.className = 'small mt-1 ok';
  } else {
    pesan.textContent = 'Kode promo tidak valid.';
    pesan.className = 'small mt-1 warn';
  }
  simpan();
  render();
});

$('uangBayar').addEventListener('input', (e) => {
  state.bayar = Number(e.target.value) || 0;
  simpan();
  render();
});

$('btnReset').addEventListener('click', () => {
  state.items = [];
  state.promo = false;
  state.bayar = 0;
  localStorage.removeItem(STORAGE_KEY);
  $('uangBayar').value = '';
  $('kodePromo').value = '';
  $('pesanPromo').textContent = '';
  tampilkanError({});
  render();
});

/* ---------- Inisialisasi ---------- */
muat();
if (state.promo) {
  $('pesanPromo').textContent = '🎉 Kode promo aktif (diskon 10%).';
  $('pesanPromo').className = 'small mt-1 ok';
}
if (state.bayar > 0) $('uangBayar').value = state.bayar;
render();
