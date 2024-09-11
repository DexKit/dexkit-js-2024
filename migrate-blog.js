const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  await fs.writeFile(filepath, buffer);
}

function normalizeHeaders(content) {
  const $ = cheerio.load(content);
  
  $('form').remove();


  $(':contains("Share with your friends")').closest('div').remove();
  $(':contains("Your Name")').closest('div').remove();
  $(':contains("Your Email")').closest('div').remove();
  $(':contains("Recipient Email")').closest('div').remove();
  $(':contains("Enter a Message")').closest('div').remove();
  $(':contains("Captcha")').closest('div').remove();
  $(':contains("Submit")').closest('div').remove();

  $('script').remove();
  $('style').remove();
  $('[style]').removeAttr('style');

  $('img').each((i, elem) => {
    const $img = $(elem);
    if (!$img.parent().is('figure')) {
      $img.wrap('<figure style="text-align: center;"></figure>');
    } else {
      $img.parent().css('text-align', 'center');
    }
  });

  $('figure').css('text-align', 'center');

  return $.html();
}

async function fetchPosts() {
  const response = await fetch('https://dexkit.com/wp-json/wp/v2/posts?_embed&per_page=100');
  const posts = await response.json();
  return Promise.all(posts.map(async post => {
    let imageUrl = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : null;
    if (imageUrl) {
      const filename = path.basename(imageUrl);
      const filepath = path.join(process.cwd(), 'public', 'blog-images', filename);
      await downloadImage(imageUrl, filepath);
      imageUrl = `/blog-images/${filename}`;
    }
    return {
      id: post.id,
      title: post.title.rendered,
      date: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: normalizeHeaders(post.content.rendered),
      excerpt: post.excerpt.rendered,
      slug: post.slug,
      category: post._embedded['wp:term'][0][0].name,
      imageUrl: imageUrl
    };
  }));
}

async function savePosts(posts) {
  await fs.writeFile('public/blog-posts.json', JSON.stringify(posts, null, 2));
}

async function migrate() {
  await fs.mkdir(path.join(process.cwd(), 'public', 'blog-images'), { recursive: true });
  const posts = await fetchPosts();
  await savePosts(posts);
  console.log('Migration completed successfully!');
}

migrate().catch(console.error);