import CategorizedPostsSection from '@/components/home/categorized-posts-section';
import { getAllDocs } from '@/service/my-own-docs';
import { getAllPosts } from '@/service/posts';

export default async function PostPage() {
  const allPosts = await getAllPosts();
  const myOwnDocs = await getAllDocs();

  return <CategorizedPostsSection allPosts={allPosts} myOwnDocs={myOwnDocs} />;
}
