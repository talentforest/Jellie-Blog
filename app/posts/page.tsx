import CategorizedPostsSection from '@/components/template/categorized-posts-section';
import { getAllPosts } from '@/service/posts';

export const metadata = {
  title: 'All Posts',
  description: 'Jellie의 기술 블로그입니다.',
};

export default async function PostPage() {
  const allPosts = await getAllPosts();

  return <CategorizedPostsSection allPosts={allPosts} />;
}
