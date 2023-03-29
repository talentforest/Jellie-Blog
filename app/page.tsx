import Introduction from '@/components/home/introduction';
import CarouselBox from '@/components/common/carousel-box';
import PostBox from '@/components/common/post-box';
import CategorizedPostsSection from '@/components/home/categorized-posts-section';
import { getAllPosts, getFeaturedPosts } from '@/service/posts';

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPost = await getFeaturedPosts();

  return (
    <>
      <Introduction />
      <section className='mb-12'>
        <h2 className='px-4'>Featured Post</h2>
        <CarouselBox config={{ centerMode: true, showDots: true }}>
          {featuredPost.map((post) => (
            <PostBox key={post.path} post={post} />
          ))}
        </CarouselBox>
      </section>
      <CategorizedPostsSection allPosts={allPosts} />
    </>
  );
}
