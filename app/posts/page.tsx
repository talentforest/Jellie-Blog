import CategorizedPostsSection from '@/components/template/categorized-posts-section';
import { getAllPosts } from '@/service/posts';

export default async function PostPage() {
  const allPosts = await getAllPosts();

  return <CategorizedPostsSection allPosts={allPosts} />;
}
