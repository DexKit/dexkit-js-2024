# Creating New Posts

For creating new blog posts, use the `createPost.ts` script.

1. Run the script:

   ```
   npx ts-node scripts/createPost.ts
   ```

2. Follow the prompts to enter post details.

This will create a new Markdown file for your post in the `content/blog` directory.

## Notes

- Ensure you have Node.js and TypeScript installed on your system.
- The `fromWpToJson.js` script assumes your WordPress site uses the WP REST API.
- Adjust the scripts as needed to fit your specific WordPress setup and desired output format.
- Always backup your data before running migration scripts.
