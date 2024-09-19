import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') || 'blog';

  if (!slug) {
    return NextResponse.json({ error: 'Slug no proporcionado' }, { status: 400 });
  }

  const postsDirectory = path.join(process.cwd(), 'content', locale);
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Procesar el contenido Markdown a HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    const post = {
      slug,
      title: data.title || 'Sin título',
      date: data.date || 'Fecha no disponible',
      author: data.author && data.author !== 'Equipo DexKit' ? data.author : '',
      category: data.category || 'Sin categoría',
      imageUrl: data.imageUrl || '/imgs/dexkit_og.png',
      excerpt: data.excerpt || '',
      contentHtml,
    };

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error al leer el post del blog:', error);
    return NextResponse.json({ error: 'Error al obtener el post' }, { status: 500 });
  }
}