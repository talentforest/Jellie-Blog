import { Post } from '@/service/posts';

export const sortByDate = (posts: Post[], sortBy: 'latest' | 'oldest') => {
  const sortedPosts = posts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  if (sortBy === 'latest') return sortedPosts.reverse();
  if (sortBy === 'oldest') return sortedPosts;
};
