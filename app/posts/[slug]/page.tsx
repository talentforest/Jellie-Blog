import {
  getFeaturedPosts,
  getPost,
  getPrevNextPost,
  getRelatedPosts,
} from '@/service/posts';
import { Metadata } from 'next';
import PostBox from '@/components/common/post-box';
import Toc from '@/components/posts/toc';
import PostHeader from '@/components/posts/post-header';
import MarkdownViewer from '@/components/posts/markdown-viewer';
import GiscusComments from '@/components/posts/giscus-comments';
import CarouselBox from '@/components/common/carousel-box';
import PostPrevNextBox from '@/components/common/post-prev-next-box';

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

const swiperResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 0 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 1,
  },
};

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
          <PostHeader
            contents={{ path, title, date, category, thumbnail, readingTime }}
          />
          <div className='mt-16 flex relative justify-between'>
            <MarkdownViewer content={content} />
            <Toc />
          </div>
        </article>
      </section>

      <section className='px-4 md:px-0'>
        <GiscusComments />
      </section>

      {/* 지금 읽은 포스트와 비슷한 포스트 */}
      {relatedPosts.length !== 0 && (
        <section className='mt-12 px-4 md:px-0 flex flex-col text-lg bg-bg -mx-1'>
          <h4 className='font-king font-bold text-slate ml-1'>관련 포스트</h4>
          <CarouselBox
            responsive={swiperResponsive}
            config={{ centerMode: false, arrowColor: 'light-yellow' }}
          >
            {relatedPosts.map((post) => (
              <PostBox key={post.id} post={post} imgHeight={36} />
            ))}
          </CarouselBox>
        </section>
      )}

      {/* 이전 다음 포스트 */}
      <section className='mt-12 px-4 md:px-0 flex flex-col space-y-3 text-lg bg-bg'>
        <h4 className='font-king font-bold text-slate'>다른 포스트</h4>
        {prev && <PostPrevNextBox post={prev} direction='prev' />}
        {next && <PostPrevNextBox post={next} direction='next' />}
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
