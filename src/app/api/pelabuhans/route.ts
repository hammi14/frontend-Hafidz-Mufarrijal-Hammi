import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const idNegara = req.nextUrl.searchParams.get('idNegara');
  const filter = JSON.stringify({ where: { id_negara: idNegara } });

  const url = `http://202.157.176.100:3001/pelabuhans?filter=${encodeURIComponent(filter)}`;
  const response = await fetch(url);
  const data = await response.json();
  return NextResponse.json(data);
}
