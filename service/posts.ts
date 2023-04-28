import path from 'path';
import { promises as fs } from 'fs';
import { readFile } from 'fs/promises';
import { cache } from 'react';
import { CategoryType } from '@/components/common/categories-box';

export interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  category: CategoryType;
  path: string;
  featured: boolean;
  thumbnail?: string;
  content: string;
  readingTime: number;
}

export interface PostData extends Post {
  next?: Post | null;
  prev?: Post | null;
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  const flattedAllData = data.map((obj: Post) => Object.values(obj)[0]).flat();
  const allPosts = await Promise.all(
    flattedAllData.map(async (post: Post) => {
      const filePath = path.join(
        process.cwd(),
        'posts',
        `${post.category}`,
        `${post.path}.md`
      );
      const content = await readFile(filePath, 'utf-8');
      const readingTime = calcReadingTime(content);
      return { ...post, content, readingTime };
    })
  );
  return allPosts;
});

export async function getFeaturedPosts(): Promise<Post[]> {
  const allPosts = await getAllPosts();
  const featuredPost = allPosts.filter((post: Post) => post.featured === true);
  return featuredPost;
}

export async function getPost(fileName: string): Promise<PostData> {
  const allPosts = await getAllPosts();
  const post = allPosts.find((post) => post.path === fileName);
  if (!post)
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없습니다.`);
  const index = allPosts.indexOf(post);
  const prev = index > 0 ? allPosts[index - 1] : null;
  const next = index < allPosts.length ? allPosts[index + 1] : null;
  return { ...post, next, prev };
}

const calcReadingTime = (content: string) => {
  const contentWordsLength = content
    .replace(/#|##|###|####|#####|######|\*|_|`|>|:|---|---|\|/g, '')
    .split(' ')
    .filter((word) => word !== '').length;
  const wordsPerMinute = 200;
  return contentWordsLength / wordsPerMinute;
};
