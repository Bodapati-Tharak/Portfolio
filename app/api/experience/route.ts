import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: [{ current: 'desc' }, { startDate: 'desc' }],
    });
    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch experience' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const exp = await prisma.experience.create({
      data: {
        ...body,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        responsibilities: body.responsibilities || [],
        technologies: body.technologies || [],
        achievements: body.achievements || [],
      },
    });
    return NextResponse.json({ success: true, data: exp }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create experience' }, { status: 500 });
  }
}
