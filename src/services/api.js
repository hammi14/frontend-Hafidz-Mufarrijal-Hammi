const API_BASE_URL = 'http://202.157.176.100:3001';

// Fungsi untuk mengambil data negara
export const fetchNegaras = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/negaras`);
    if (!response.ok) {
      throw new Error('Failed to fetch negaras');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching negaras:', error);
    throw error;
  }
};

// Fungsi untuk mengambil data pelabuhan berdasarkan negara
export const fetchPelabuhans = async (idNegara) => {
  try {
    const filter = JSON.stringify({ where: { id_negara: idNegara } });
    const response = await fetch(`${API_BASE_URL}/pelabuhans?filter=${encodeURIComponent(filter)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pelabuhans');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pelabuhans:', error);
    throw error;
  }
};

// Fungsi untuk mengambil data barang berdasarkan pelabuhan
export const fetchBarangs = async (idPelabuhan) => {
  try {
    const filter = JSON.stringify({ where: { id_pelabuhan: idPelabuhan } });
    const response = await fetch(`${API_BASE_URL}/barangs?filter=${encodeURIComponent(filter)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch barangs');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching barangs:', error);
    throw error;
  }
};
