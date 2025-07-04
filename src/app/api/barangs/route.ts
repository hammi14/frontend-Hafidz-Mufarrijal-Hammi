import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const idPelabuhan = req.nextUrl.searchParams.get('idPelabuhan');
  const filter = JSON.stringify({ where: { id_pelabuhan: idPelabuhan } });

  const url = `http://202.157.176.100:3001/barangs?filter=${encodeURIComponent(filter)}`;
  const response = await fetch(url);
  const data = await response.json();
  return NextResponse.json(data);
}
