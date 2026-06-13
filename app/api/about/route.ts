import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const about = await prisma.aboutSection.findFirst();
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch about' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const existing = await prisma.aboutSection.findFirst();

    let about;
    if (existing) {
      about = await prisma.aboutSection.update({ where: { id: existing.id }, data: body });
    } else {
      about = await prisma.aboutSection.create({ data: body });
    }

    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update about' }, { status: 500 });
  }
}
