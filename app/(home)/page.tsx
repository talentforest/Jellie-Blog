import Introduction from '@/components/home/introduction';
import CarouselBox from '@/components/common/carousel-box';
import PostBox from '@/components/common/post-box';
import CategorizedPostsSection from '@/components/template/categorized-posts-section';
import { getAllPosts, getFeaturedPosts } from '@/service/posts';

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPost = await getFeaturedPosts();

  return (
    <>
      <Introduction
        introduction='이 블로그에서는 개발에 대해 공부한 것들과, 사이드 프로젝트를 개발하면서
          느꼈던 점들에 대해 작성하고 있습니다.'
      />

      <section className='mb-16 min-h-[300px]'>
        <h2 className='mx-4 md:mx-0'>Featured Post</h2>

        <CarouselBox config={{ centerMode: true }}>
          {featuredPost.map((post) => (
            <PostBox key={post.path} post={post} />
          ))}
        </CarouselBox>
      </section>

      <CategorizedPostsSection allPosts={allPosts} />
    </>
  );
}
