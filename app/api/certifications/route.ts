import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const certs = await prisma.certification.findMany({ orderBy: { displayOrder: 'asc' } });
    return NextResponse.json({ success: true, data: certs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch certifications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cert = await prisma.certification.create({
      data: {
        ...body,
        date: new Date(body.date),
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
        skills: body.skills || [],
      },
    });
    return NextResponse.json({ success: true, data: cert }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create certification' }, { status: 500 });
  }
}
