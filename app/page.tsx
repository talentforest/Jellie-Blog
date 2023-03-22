import FeaturedPosts from '@/components/home/featured-posts';
import CategorizedPosts from '@/components/home/categorized-posts';
import Introduction from '@/components/home/introduction';
import { getAllPosts } from '@/service/posts';

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <main className='px-4 md:px-20'>
      <Introduction />
      <section className='pt-4 pb-12'>
        <h2>Featured Post</h2>
        <FeaturedPosts allPosts={allPosts} />
      </section>
      <section className='pt-4 pb-12'>
        <h2>Categorized Posts</h2>
        <CategorizedPosts allPosts={allPosts} />
      </section>
    </main>
  );
}
