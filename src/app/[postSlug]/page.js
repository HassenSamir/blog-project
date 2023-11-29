import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { headers } from 'next/headers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';

async function BlogPost() {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const {
    frontmatter: { title, publishedOn },
    content,
  } = await loadBlogPost(pathname);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
