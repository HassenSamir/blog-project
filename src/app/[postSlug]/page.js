import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import CodeSnippet from '@/components/CodeSnippet';
import { BLOG_TITLE } from '@/constants';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({ params }) => {
  const blogPostData = await loadBlogPost(params.postSlug);

  if (!blogPostData) {
    return null;
  }
  const {
    frontmatter: { title, abstract },
  } = blogPostData;

  return {
    title: `${title} · ${BLOG_TITLE}`,
    description: abstract,
  };
};

async function BlogPost({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);

  if (!blogPostData) {
    notFound();
  }

  const {
    frontmatter: { title, publishedOn },
    content,
  } = blogPostData;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
