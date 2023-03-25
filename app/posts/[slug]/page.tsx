import Image from 'next/image';
import PostBox from '@/components/common/post-box';
import PostContents from '@/components/posts/post-contents';
import { getPost } from '@/service/posts';
import ScrollToTopBtn from '@/components/common/scroll-to-top-btn';

interface Props {
  params: {
    slug: string;
  };
}

export default async function PostDetailPage({ params: { slug } }: Props) {
  const post = await getPost(slug);
  const { title, date, category, content, path, next, prev } = post;

  return (
    <main className='pb-4 flex flex-col'>
      <article className='flex flex-col relative'>
        <Image
          src={`/posts/images/${path}.png`}
          alt='Post Thumbnail'
          width={500}
          height={500}
          priority
          className='fixed -z-10 w-full h-60 object-cover md:w-auto self-center md:h-60'
        />
        <PostContents contents={{ title, date, category, content }} />
      </article>
      <section className='flex flex-col space-y-3 text-lg px-4 bg-slate-100 pt-14'>
        <h4>다른 포스트 보기</h4>
        <div className='flex h-40 space-x-2'>
          {prev && <PostBox post={prev} />}
          {next && <PostBox post={next} />}
        </div>
        <ScrollToTopBtn />
      </section>
    </main>
  );
}
