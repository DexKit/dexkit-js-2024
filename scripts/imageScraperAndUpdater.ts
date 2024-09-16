import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const IMAGE_DIR = path.join(process.cwd(), 'public', 'blog-images');

async function downloadImage(url: string, filename: string): Promise<void> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  await fs.writeFile(path.join(IMAGE_DIR, filename), response.data);
}

async function processMarkdownFile(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  const imageRegex = /!\[.*?\]\((https:\/\/dexkit\.com\/.*?)\)/g;
  let updatedContent = markdownContent;
  let match: RegExpExecArray | null;

  while ((match = imageRegex.exec(markdownContent)) !== null) {
    const imageUrl = match[1];
    const filename = path.basename(imageUrl);
    
    await downloadImage(imageUrl, filename);
    
    const newImagePath = `/blog-images/${filename}`;
    updatedContent = updatedContent.replace(imageUrl, newImagePath);
  }

  const updatedFileContent = matter.stringify(updatedContent, data);
  await fs.writeFile(filePath, updatedFileContent);
}

async function main() {
  try {
    await fs.mkdir(IMAGE_DIR, { recursive: true });
    const files = await fs.readdir(CONTENT_DIR);
    
    for (const file of files) {
      if (path.extname(file) === '.md') {
        await processMarkdownFile(path.join(CONTENT_DIR, file));
      }
    }
    
    console.log('Image scraping and updating completed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();