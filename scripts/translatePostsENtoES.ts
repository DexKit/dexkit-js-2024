import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { translate } from '@vitalets/google-translate-api';
import slugify from 'slugify';

const sourceDir = path.join(process.cwd(), 'content', 'blog');
const targetDir = path.join(process.cwd(), 'content', 'blog-es');

async function translateAndSlugify(text: string): Promise<string> {
  const translated = await translate(text, { to: 'es' });
  return slugify(translated.text, { lower: true, strict: true });
}

async function translateDate(dateString: string): Promise<string> {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
}

async function translatePost(fileName: string) {
  const sourcePath = path.join(sourceDir, fileName);
  const fileContents = fs.readFileSync(sourcePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Verify if the post date is after January 28, 2025
  const postDate = new Date(data.date);
  const cutoffDate = new Date('2025-01-28');
  if (postDate < cutoffDate) {
    console.log(`Skipping ${fileName} - date is before 2025-01-28`);
    return;
  }

  // Verify if the file already exists in the target directory
  const spanishSlug = await translateAndSlugify(path.parse(fileName).name);
  const targetPath = path.join(targetDir, `${spanishSlug}.md`);
  if (fs.existsSync(targetPath)) {
    console.log(`Skipping ${fileName} - already translated`);
    return;
  }

  const translatedContent = await translate(content, { to: 'es' });
  const translatedTitle = await translate(data.title, { to: 'es' });
  const translatedExcerpt = data.excerpt ? await translate(data.excerpt, { to: 'es' }) : undefined;
  const translatedDate = await translateDate(data.date);

  const translatedData = {
    ...data,
    title: translatedTitle.text,
    excerpt: translatedExcerpt ? translatedExcerpt.text : undefined,
    date: translatedDate,
    slug: spanishSlug,
  };

  const translatedFileContents = matter.stringify(translatedContent.text, translatedData);
  fs.writeFileSync(targetPath, translatedFileContents);

  console.log(`Translated and renamed: ${fileName} -> ${spanishSlug}.md`);
}

async function translateAllPosts() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    if (path.extname(file) === '.md') {
      await translatePost(file);
    }
  }

  console.log('All posts translated and renamed successfully!');
}

translateAllPosts().catch(console.error);