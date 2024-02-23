import Introduction from '@/components/home/introduction';
import CarouselBox from '@/components/common/carousel-box';
import PostBox from '@/components/common/post-box';
import CategorizedPostsSection from '@/components/template/categorized-posts-section';
import CookieBanner from '@/components/common/cookie-banner';
import { getAllPosts, getFeaturedPosts } from '@/service/posts';

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPost = await getFeaturedPosts();

  return (
    <>
      <Introduction />
      <section className='mb-12 min-h-[250px]'>
        <h2 className='mx-4 md:mx-0'>Featured Post</h2>
        <CarouselBox config={{ centerMode: true, showDots: true }}>
          {featuredPost.map((post) => (
            <PostBox key={post.path} post={post} sm />
          ))}
        </CarouselBox>
      </section>
      <CookieBanner />
      <CategorizedPostsSection allPosts={allPosts} />
    </>
  );
}
