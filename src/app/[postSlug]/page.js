import React from 'react';
import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import CodeSnippet from '@/components/CodeSnippet';
import { BLOG_TITLE } from '@/constants';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';

export const generateMetadata = async ({ params }) => {
  const {
    frontmatter: { title, abstract },
  } = await loadBlogPost(params.postSlug);
  return {
    title: `${title} · ${BLOG_TITLE}`,
    description: abstract,
  };
};

async function BlogPost({ params }) {
  const {
    frontmatter: { title, publishedOn },
    content,
  } = await loadBlogPost(params.postSlug);

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
