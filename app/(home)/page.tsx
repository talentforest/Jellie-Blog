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
      <Introduction />

      <section className='mb-16 min-h-[300px]'>
        <h2 className='mx-4 md:mx-0'>포스트 골라보기</h2>

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
