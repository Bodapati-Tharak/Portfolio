import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const education = await prisma.education.findMany({ orderBy: { displayOrder: 'asc' } });
    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const edu = await prisma.education.create({
      data: {
        ...body,
        coursework: body.coursework || [],
        achievements: body.achievements || [],
      },
    });
    return NextResponse.json({ success: true, data: edu }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create education' }, { status: 500 });
  }
}
