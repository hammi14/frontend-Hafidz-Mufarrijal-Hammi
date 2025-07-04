import { Negara, Pelabuhan, Barang } from "@/types/api";

// Tidak perlu pakai BASE_URL langsung ke IP karena akan melalui API route Next.js
const API_BASE_URL = '/api';

// Fungsi untuk mengambil data negara
export const fetchNegaras = async (): Promise<Negara[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/negaras`);
    if (!response.ok) {
      throw new Error('Failed to fetch negaras');
    }
    const data: Negara[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching negaras:', error);
    throw error;
  }
};

// Fungsi untuk mengambil data pelabuhan berdasarkan negara
export const fetchPelabuhans = async (idNegara: string): Promise<Pelabuhan[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pelabuhans?idNegara=${idNegara}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pelabuhans');
    }
    const data: Pelabuhan[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pelabuhans:', error);
    throw error;
  }
};

// Fungsi untuk mengambil data barang berdasarkan pelabuhan
export const fetchBarangs = async (idPelabuhan: string): Promise<Barang[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/barangs?idPelabuhan=${idPelabuhan}`);
    if (!response.ok) {
      throw new Error('Failed to fetch barangs');
    }
    const data: Barang[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching barangs:', error);
    throw error;
  }
};
