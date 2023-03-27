import Image from 'next/image';
import PostBox from '@/components/common/post-box';
import PostContents from '@/components/posts/post-contents';
import ScrollToTopBtn from '@/components/common/scroll-to-top-btn';
import TableOfContents from '@/components/posts/toc';
import { getPost } from '@/service/posts';
import ProgressBar from '@/components/posts/progress-bar';

interface Props {
  params: {
    slug: string;
  };
}

export default async function PostDetailPage({ params: { slug } }: Props) {
  const post = await getPost(slug);
  const { title, date, category, content, path, next, prev } = post;

  return (
    <>
      <article className='flex flex-col relative'>
        <Image
          src={`/images/posts/${path}.png`}
          alt='Post Thumbnail'
          width={500}
          height={500}
          priority
          className='sticky top-14 -z-10 w-full h-60 object-cover md:w-auto self-center md:h-60'
        />
        <ProgressBar />
        <PostContents contents={{ title, date, category, content }} />
      </article>
      <section className='px-4 pt-14 pb-4 flex flex-col space-y-3 text-lg bg-slate-100 dark:bg-slate-900'>
        <h4>다른 포스트 보기</h4>
        {prev && <PostBox post={prev} />}
        {next && <PostBox post={next} />}
      </section>
      <TableOfContents />
      <ScrollToTopBtn />
    </>
  );
}
