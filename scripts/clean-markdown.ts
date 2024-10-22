/* import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import unorm from 'unorm';

const contentDir = path.join(process.cwd(), 'content');

function cleanText(text: string): string {
  return unorm.nfc(text)
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Elimina caracteres de control
    .replace(/\u00A0/g, ' ') // Reemplaza espacios no rompibles por espacios normales
    .replace(/["]/g, '"') // Reemplaza comillas tipográficas por comillas rectas
    .replace(/[']/g, "'") // Reemplaza comillas simples tipográficas por comillas simples rectas
    .replace(/…/g, '...') // Reemplaza puntos suspensivos tipográficos por tres puntos
    .trim(); // Elimina espacios en blanco al inicio y al final
}

function cleanMarkdownFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Limpia el contenido del frontmatter
  const cleanedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === 'string' ? cleanText(value) : value
    ])
  );

  // Limpia el contenido principal del markdown, preservando la estructura
  const cleanedContent = content.split('\n').map(line => cleanText(line)).join('\n');

  // Reconstruye el archivo con el contenido limpio
  const cleanedFileContents = matter.stringify(cleanedContent, cleanedData);

  // Sobrescribe el archivo original con el contenido limpio
  fs.writeFileSync(filePath, cleanedFileContents);

  console.log(`Cleaned: ${filePath}`);
}

function cleanAllMarkdownFiles(dir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      cleanAllMarkdownFiles(filePath); // Recursivamente limpia archivos en subdirectorios
    } else if (path.extname(file) === '.md') {
      cleanMarkdownFile(filePath);
    }
  }
}

cleanAllMarkdownFiles(contentDir);
console.log('All Markdown files have been cleaned!');
 */