# Frontend Developer Test

Aplikasi form test untuk frontend developer yang dibuat menggunakan Next.js dan Tailwind CSS.

## Fitur

- Form dengan dropdown auto-complete untuk Negara, Pelabuhan, dan Barang
- Description box yang otomatis terisi ketika memilih barang (read-only)
- Kalkulasi otomatis untuk field Total berdasarkan Harga dan Discount
- Format angka yang sesuai dengan standar Indonesia
- UI/UX yang responsif dan menarik

## Teknologi yang Digunakan

- Next.js 15.3.5
- React 19.1.0
- TypeScript
- Tailwind CSS
- Radix UI (untuk komponen dropdown)
- Lucide React (untuk icons)

## Cara Install dan Menjalankan

### Prerequisites

Pastikan Anda sudah menginstall:
- Node.js (versi 18 atau lebih baru)
- pnpm (package manager)

### Langkah-langkah

1. Clone repository ini:
   ```bash
   git clone <repository-url>
   cd frontend-developer-test-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Buka browser dan akses:
   ```
   http://localhost:3000
   ```

### Build untuk Production

Untuk membuat build production:
```bash
npm run build
npm start
```

File hasil build akan tersimpan di folder `.next/`.

## Struktur Proyek

```
frontend-developer-test-nextjs/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router (page.tsx, layout.tsx, globals.css)
│   ├── components/         # Komponen UI (dari Shadcn/UI)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── services/           # Logika untuk panggilan API
├── .gitignore
├── components.json         # Konfigurasi Shadcn/UI
├── eslint.config.mjs       # Konfigurasi ESLint
├── next-env.d.ts           # Deklarasi tipe Next.js
├── next.config.ts          # Konfigurasi Next.js
├── package.json            # Daftar dependensi dan script
├── package-lock.json
├── postcss.config.mjs      # Konfigurasi PostCSS
└── tsconfig.json           # Konfigurasi TypeScript
```

## Fungsionalitas Form

### Field yang Tersedia:

1. **NEGARA**: Dropdown dengan auto-complete
   - Data diambil dari API: `http://202.157.176.100:3001/nagaras`

2. **PELABUHAN**: Dropdown dengan auto-complete
   - Data diambil dari API: `http://202.157.176.100:3001/pelabuhans?filter={"where" : {"id_negara":"1"}}`
   - Data ditampilkan sesuai dengan Negara yang dipilih

3. **BARANG**: Dropdown dengan auto-complete
   - Data diambil dari API: `http://202.157.176.100:3001/barangs?filter={"where" : {"id_pelabuhan":"1"}}`
   - Memiliki description box yang otomatis terisi (read-only)

4. **DISCOUNT**: Input field dengan validasi persentase
   - Data diambil dari barang pada field diskon

5. **HARGA**: Input field untuk harga
   - Data diambil dari barang pada field harga

6. **TOTAL**: Field kalkulasi otomatis (read-only)
   - Formula: Total = Harga × (1 - Discount/100)
   - Format angka sesuai standar Indonesia (contoh: 900.000)

## Catatan Pengembangan

- Aplikasi ini dibuat sesuai dengan spesifikasi yang diberikan dalam soal test
- UI/UX dibuat semenarik mungkin dengan menggunakan Tailwind CSS
- Semua komponen dibuat responsive untuk berbagai ukuran layar
- Kode ditulis dengan clean code principles dan mudah di-maintain

## Author

Frontend Developer Test Application

