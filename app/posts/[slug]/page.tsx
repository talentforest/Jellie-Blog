import PostBox from '@/components/common/post-box';
import Image from 'next/image';
import MarkdownViewer from '@/components/posts/markdown-viewer';
import { getPost } from '@/service/posts';

interface Props {
  params: {
    slug: string;
  };
}

export default async function PostDetailPage({ params: { slug } }: Props) {
  const post = await getPost(slug);
  const { title, date, category, content, path, next, prev } = post;

  return (
    <main className='px-4 md:px-20 pb-12 flex flex-col'>
      <article className='flex flex-col relative pt-4 pb-10'>
        <Image
          src={`/posts/images/${path}.png`}
          alt='Post Thumbnail'
          width={500}
          height={500}
          className='w-full self-center mb-10'
        />
        <header className='relative mb-4'>
          <h2 className='py-1 px-3 mb-4 rounded-full bg-indigo-500 text-white text-xs w-fit'>
            {category}
          </h2>
          <h3 className='font-sans absolute top-0 right-0 text-slate-600 text-sm'>
            {new Date(date).toLocaleDateString()}
          </h3>
          <h1 className='text-2xl font-bold'>{title}</h1>
        </header>
        <MarkdownViewer content={content} />
      </article>
      <button className='py-2 text-sm w-fit self-end mt-10 text-gray-500 hover:text-blue-500 hover:font-extrabold'>
        맨위로 가기
      </button>
      <section className='text-lg'>
        <h4 className='mb-3'>다른 포스트 보기</h4>
        <div className='flex h-40 space-x-2'>
          {prev && <PostBox post={prev} />}
          {next && <PostBox post={next} />}
        </div>
      </section>
    </main>
  );
}
