import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

const DEFAULT_IMAGE = '/imgs/default-blog-image.jpg';

function parseSpanishDate(dateString: string): Date {
  const months: { [key: string]: number } = {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  };
  const parts = dateString.split(' ');
  const day = parseInt(parts[0]);
  const month = parts[2].toLowerCase();
  const year = parseInt(parts[4]);
  return new Date(year, months[month], day);
}

function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog-es');
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames.map((fileName) => {
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
      imageUrl: data.imageUrl || DEFAULT_IMAGE,
    };
  });

  return posts.sort((a, b) => {
    try {
      const dateA = parseSpanishDate(a.date);
      const dateB = parseSpanishDate(b.date);
      return dateB.getTime() - dateA.getTime();
    } catch (error) {
      console.error(`Error parsing dates: ${a.date} or ${b.date}`);
      return 0; 
    }
  });
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 text-white">El Blog de DexKit</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog-es/${post.slug}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image 
                      src={post.imageUrl || DEFAULT_IMAGE}
                      alt={post.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-500">{post.date}</span>
                      <span className="text-xs sm:text-sm bg-orange-400 text-white px-2 py-1 rounded-full">{post.category}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                    <div className="flex items-center">
                      <Image 
                        src="/imgs/dexkit-logo-black-d.svg"
                        alt="Logo de DexKit" 
                        width={24} 
                        height={24} 
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}