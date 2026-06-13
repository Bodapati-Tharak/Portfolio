import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects/[slug]
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
    });

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT /api/projects/[slug]
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await request.json();

    const project = await prisma.project.update({
      where: { slug: params.slug },
      data: {
        ...body,
        completedAt: body.completedAt ? new Date(body.completedAt) : null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE /api/projects/[slug]
export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await prisma.project.delete({ where: { slug: params.slug } });
    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
  }
}
