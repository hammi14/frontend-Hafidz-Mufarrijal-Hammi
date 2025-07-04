import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('http://202.157.176.100:3001/negaras');
  const data = await response.json();
  return NextResponse.json(data);
}
