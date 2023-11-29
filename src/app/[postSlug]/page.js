import React from 'react';
import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { headers } from 'next/headers';
import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import CodeSnippet from '@/components/CodeSnippet';

const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo')
);

const getBlogPost = React.cache(async (slug) => {
  return await loadBlogPost(slug);
});

export const generateMetadata = async ({ params }) => {
  const {
    frontmatter: { title, abstract },
  } = await getBlogPost(params.postSlug);
  return {
    title: title,
    description: abstract,
  };
};

async function BlogPost() {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path').slice(1) || '';
  const {
    frontmatter: { title, publishedOn },
    content,
  } = await getBlogPost(pathname);

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
