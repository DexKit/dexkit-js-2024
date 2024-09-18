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

  const translatedContent = await translate(content, { to: 'es' });

  const translatedTitle = await translate(data.title, { to: 'es' });
  const translatedExcerpt = data.excerpt ? await translate(data.excerpt, { to: 'es' }) : undefined;
  const translatedDate = await translateDate(data.date);

  const spanishSlug = await translateAndSlugify(path.parse(fileName).name);

  const translatedData = {
    ...data,
    title: translatedTitle.text,
    excerpt: translatedExcerpt ? translatedExcerpt.text : undefined,
    date: translatedDate,
    slug: spanishSlug,
  };

  const translatedFileContents = matter.stringify(translatedContent.text, translatedData);

  const targetPath = path.join(targetDir, `${spanishSlug}.md`);
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