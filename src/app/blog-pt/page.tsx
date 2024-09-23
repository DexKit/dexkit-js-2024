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

const DEFAULT_IMAGE = '/imgs/dexkit_og.png';

function parsePortugueseDate(dateString: string): Date {
  const months: { [key: string]: number } = {
    'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3, 'maio': 4, 'junho': 5,
    'julho': 6, 'agosto': 7, 'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
  };
  const parts = dateString.split(' ');
  const day = parseInt(parts[0]);
  const month = parts[2].toLowerCase();
  const year = parseInt(parts[4]);
  return new Date(year, months[month], day);
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog-pt');
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames.map((fileName): BlogPost | null => {
    try {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);  

      return {
        slug,
        title: typeof data.title === 'string' ? data.title : 'Sem título',
        date: typeof data.date === 'string' ? data.date : 'Data não disponível',
        author: typeof data.author === 'string' ? data.author : 'Equipe DexKit',
        category: typeof data.category === 'string' ? data.category : 'Sem categoria',
        imageUrl: typeof data.imageUrl === 'string' ? data.imageUrl : DEFAULT_IMAGE,
      };
    } catch (error) {
      console.error(`Error ao processar o arquivo ${fileName}:`, error);
      return null;
    }
  }).filter((post): post is BlogPost => post !== null);

  return posts.sort((a, b) => {
    try {
      const dateA = parsePortugueseDate(a.date);
      const dateB = parsePortugueseDate(b.date);
      return dateB.getTime() - dateA.getTime();
    } catch (error) {
      console.error(`Erro ao analisar datas: ${a.date} ou ${b.date}`);
      return 0; 
    }
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 text-white">O Blog da DexKit</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog-pt/${post.slug}`}>
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
                        alt="Logo da DexKit" 
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