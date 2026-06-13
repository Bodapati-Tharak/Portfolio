import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const skills = await prisma.skill.findMany({
      where: category ? { category: category as any } : {},
      orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }],
    });

    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, icon, level, displayOrder } = body;

    if (!name || !category) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const skill = await prisma.skill.create({
      data: { name, category, icon, level: level || 80, displayOrder: displayOrder || 0 },
    });

    return NextResponse.json({ success: true, data: skill }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create skill' }, { status: 500 });
  }
}
