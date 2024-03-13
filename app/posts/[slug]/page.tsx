import PostBox from '@/components/common/post-box';
import Toc from '@/components/posts/toc';
import ProgressBar from '@/components/posts/progress-bar';
import PostHeader from '@/components/posts/post-header';
import MarkdownViewer from '@/components/posts/markdown-viewer';
import GiscusComments from '@/components/posts/giscus-comments';
import {
  getFeaturedPosts,
  getPost,
  getPrevNextPost,
  getRelatedPosts,
} from '@/service/posts';
import { Metadata } from 'next';
import CarouselBox from '@/components/common/carousel-box';

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
  const relatedPosts = await getRelatedPosts(slug);
  const prevNextPosts = await getPrevNextPost(slug);

  const { prev, next } = prevNextPosts;

  const { title, date, category, content, path, thumbnail, readingTime } = post;

  return (
    <>
      <section>
        <article>
          <ProgressBar />
          <PostHeader
            contents={{ path, title, date, category, thumbnail, readingTime }}
          />
          <div className='mt-16 flex relative'>
            <MarkdownViewer content={content} />
            <Toc />
          </div>
        </article>
      </section>

      <section className='px-4 md:px-0'>
        <GiscusComments />
      </section>

      {/* 지금 읽은 포스트와 비슷한 포스트 */}
      <section className='mt-12 p-4 md:px-0 flex flex-col space-y-3 text-lg bg-bg -mx-1'>
        <h4 className='font-king font-bold text-slate'>관련 포스트</h4>
        <CarouselBox
          config={{ centerMode: false, showDots: true, arrows: false }}
        >
          {relatedPosts.map((post) => (
            <PostBox key={post.id} post={post} />
          ))}
        </CarouselBox>
      </section>

      <section className='mt-12 p-4 md:px-0 flex flex-col space-y-3 text-lg bg-bg'>
        <h4 className='font-king font-bold text-slate'>다른 포스트</h4>
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
