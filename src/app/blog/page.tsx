import fs from 'fs'
import path from 'path'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  date: string
}

export default function Blog() {
  const blogPosts: BlogPost[] = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'src', 'public', 'blog-posts.json'), 'utf-8')
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}