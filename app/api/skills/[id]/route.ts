import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const skill = await prisma.skill.update({ where: { id: params.id }, data: body });
    return NextResponse.json({ success: true, data: skill });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ success: false, error: 'Skill not found' }, { status: 404 });
    return NextResponse.json({ success: false, error: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.skill.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Skill deleted' });
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ success: false, error: 'Skill not found' }, { status: 404 });
    return NextResponse.json({ success: false, error: 'Failed to delete skill' }, { status: 500 });
  }
}
