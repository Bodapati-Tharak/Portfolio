import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectDetailClient from './ProjectDetailClient';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}



export default async function ProjectPage({ params }: Props) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) notFound();

  // Get related projects
  const related = await prisma.project.findMany({
    where: { category: project.category, slug: { not: project.slug } },
    take: 3,
    orderBy: { displayOrder: 'asc' },
  });

  return <ProjectDetailClient project={project as any} related={related as any} />;
}
