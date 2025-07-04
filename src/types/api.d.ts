export interface Negara {
  id_negara: number;
  kode_negara: string;
  nama_negara: string;
}

export interface Pelabuhan {
  id_pelabuhan: number;
  nama_pelabuhan: string;
  id_negara: number;
}

export interface Barang {
  id_barang: number;
  nama_barang: string;
  description: string;
  harga: number;
  diskon: number;
  id_pelabuhan: number;
}


