import CategorizedPosts from '@/components/home/categorized-posts';
import Introduction from '@/components/home/introduction';
import CarouselBox from '@/components/common/carousel-box';
import PostBox from '@/components/common/post-box';
import { getAllPosts, getFeaturedPosts } from '@/service/posts';

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPost = await getFeaturedPosts();

  return (
    <main className='px-4 md:px-20'>
      <Introduction />
      <section className='pt-4 pb-12'>
        <h2>Featured Post</h2>
        <CarouselBox config={{ centerMode: true, showDots: true }}>
          {featuredPost.map((post) => (
            <PostBox key={post.path} post={post} />
          ))}
        </CarouselBox>
      </section>
      <section className='pt-4 pb-12'>
        <h2>Categorized Posts</h2>
        <CategorizedPosts allPosts={allPosts} />
      </section>
    </main>
  );
}
