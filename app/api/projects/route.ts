import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects - Get all projects (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const projects = await prisma.project.findMany({
      where: {
        ...(featured === 'true' ? { featured: true } : {}),
        ...(category ? { category } : {}),
        status: { not: 'ARCHIVED' },
      },
      orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { createdAt: 'desc' }],
      ...(limit ? { take: parseInt(limit) } : {}),
    });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST /api/projects - Create project (admin only - handled by middleware)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, longDescription, category, techStack, githubUrl, liveUrl,
      thumbnail, images, featured, displayOrder, status, completedAt, features, challenges,
      solutions, lessonsLearned } = body;

    if (!title || !slug || !description || !category) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title, slug, description, longDescription, category,
        techStack: techStack || [],
        githubUrl, liveUrl, thumbnail,
        images: images || [],
        featured: featured || false,
        displayOrder: displayOrder || 0,
        status: status || 'COMPLETED',
        completedAt: completedAt ? new Date(completedAt) : null,
        features: features || [],
        challenges, solutions, lessonsLearned,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 409 });
    }
    console.error('Error creating project:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
  }
}
