import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'blog';

  const postsDirectory = path.join(process.cwd(), 'content', locale);
  
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Directory not found: ${postsDirectory}`);
      return NextResponse.json([]);
    }

    const fileNames = fs.readdirSync(postsDirectory);
  
    const posts = fileNames.filter(fileName => fileName.endsWith('.md')).map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Sin título',
        date: data.date || 'Fecha no disponible',
        author: data.author || 'Equipo DexKit',
        category: data.category || 'Sin categoría',
        imageUrl: data.imageUrl || '/imgs/dexkit_og.png',
        excerpt: data.excerpt || '',
      };
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error al leer los posts del blog:', error);
    return NextResponse.json([]);
  }
}