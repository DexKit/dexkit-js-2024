import fs from 'fs'
import path from 'path'

interface BlogPost {
  id: string
  title: string
  date: string
  content: string
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blogPosts: BlogPost[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src', 'public', 'blog-posts.json'), 'utf-8')
  )

  const post = blogPosts.find(p => p.id === params.slug)

  if (!post) {
    return <div>Article not found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{post.date}</p>
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}

export async function generateStaticParams() {
  const blogPosts: BlogPost[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src', 'public', 'blog-posts.json'), 'utf-8')
  )

  return blogPosts.map((post) => ({
    slug: post.id,
  }))
}