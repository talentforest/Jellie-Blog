import PostBox from '@/components/common/post-box';
import TableOfContents from '@/components/posts/toc';
import ProgressBar from '@/components/posts/progress-bar';
import PostHeader from '@/components/posts/post-header';
import MarkdownViewer from '@/components/posts/markdown-viewer';
import { getFeaturedPosts, getPost } from '@/service/posts';
import { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title, description } = await getPost(slug);

  return {
    title,
    description,
  };
}

export default async function PostDetailPage({ params: { slug } }: Props) {
  const post = await getPost(slug);

  const {
    title,
    date,
    category,
    content,
    path,
    next,
    prev,
    thumbnail,
    readingTime,
  } = post;

  return (
    <>
      <ProgressBar />

      <section className='flex justify-between'>
        <article className='bg-box flex flex-col w-full md:w-[75%] lg:w-[78%]'>
          <PostHeader
            contents={{ path, title, date, category, thumbnail, readingTime }}
          />
          <MarkdownViewer content={content} />
        </article>

        <TableOfContents />
      </section>

      <section className='mt-14 p-4 md:px-0 flex flex-col space-y-3 text-lg bg-bg'>
        <h4 className='font-king font-bold text-slate'>다른 포스트 보기</h4>
        {prev && <PostBox post={prev} arrowPosition='left' />}
        {next && <PostBox post={next} arrowPosition='right' />}
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getFeaturedPosts();

  return posts.map((post) => ({
    slug: post.path,
  }));
}
