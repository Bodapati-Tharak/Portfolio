import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({ orderBy: { displayOrder: 'asc' } });
    return NextResponse.json({ success: true, data: achievements });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const achievement = await prisma.achievement.create({
      data: { ...body, date: new Date(body.date) },
    });
    return NextResponse.json({ success: true, data: achievement }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create achievement' }, { status: 500 });
  }
}
