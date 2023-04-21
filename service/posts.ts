import path from 'path';
import { promises as fs } from 'fs';
import { Categories } from '@/components/template/categorized-posts-section';
import { readFile } from 'fs/promises';
import { cache } from 'react';

export interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  category: Categories;
  path: string;
  featured: boolean;
  thumbnail?: string;
}

export interface PostData extends Post {
  content: string;
  next?: Post | null;
  prev?: Post | null;
  readingTime?: number;
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
});

async function flatAllPosts() {
  const allPosts = await getAllPosts();
  return allPosts.map((obj) => Object.values(obj)[0]).flat();
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const allPosts = await flatAllPosts();
  return allPosts.filter((post: Post) => post.featured === true);
}

export async function getPost(fileName: string): Promise<PostData> {
  const allPosts = await flatAllPosts();
  const post = allPosts.find((post) => post.path === fileName);
  const filePath = path.join(
    process.cwd(),
    'posts',
    `${post.category}`,
    `${fileName}.md`
  );

  if (!post)
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없습니다.`);
  const index = allPosts.indexOf(post);
  const prev = index > 0 ? allPosts[index - 1] : null;
  const next = index < allPosts.length ? allPosts[index + 1] : null;
  const content = await readFile(filePath, 'utf-8');
  const readingTime = calcReadingTime(content);
  return { ...post, content, next, prev, readingTime };
}

const calcReadingTime = (content: string) => {
  const contentWordsLength = content
    .replace(/#|##|###|####|#####|######|\*|_|`|>|:|---|---|\|/g, '') //
    .split(' ')
    .filter((word) => word !== '').length;

  const wordsPerMinute = 200;
  return contentWordsLength / wordsPerMinute;
};
