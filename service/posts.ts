import path from 'path';
import { promises as fs } from 'fs';
import { readFile } from 'fs/promises';
import { cache } from 'react';
import { Category } from '@/components/common/categories-box';

export interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  category: Category;
  path: string;
  featured: boolean;
  content: string;
  readingTime: number;
  related: string[];
  thumbnail?: string;
}

export interface PostData {
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
  const featuredPost = allPosts
    .filter((post: Post) => post.featured === true)
    .reverse();
  return featuredPost;
}

export async function getPost(fileName: string): Promise<Post> {
  const allPosts = await getAllPosts();
  const post = allPosts.find((post) => post.path === fileName);

  if (!post)
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없습니다.`);

  return { ...post };
}

export async function getRelatedPosts(fileName: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  const currPost = await getPost(fileName);
  const relatedPosts = allPosts.filter((post) =>
    currPost.related.includes(post.path)
  );
  return relatedPosts;
}

export async function getPrevNextPost(fileName: string): Promise<PostData> {
  const allPosts = await getAllPosts();
  const currPost = await getPost(fileName);

  const filterRelatedPosts = allPosts.filter(
    (post) => !currPost.related.includes(post.path)
  );

  const currIndex = filterRelatedPosts.findIndex(
    (post) => post.path === currPost.path
  );

  const prevIndex = currIndex - 1;
  const nextIndex = currIndex + 1;
  const postLength = filterRelatedPosts.length;

  const prev = prevIndex >= 0 ? filterRelatedPosts[prevIndex] : null;
  const next = nextIndex < postLength ? filterRelatedPosts[nextIndex] : null;

  return { next, prev };
}

const calcReadingTime = (content: string) => {
  const contentWordsLength = content
    .replace(/#|##|###|####|#####|######|\*|_|`|>|:|---|---|\|/g, '')
    .split(' ')
    .filter((word) => word !== '').length;
  const wordsPerMinute = 200;
  return contentWordsLength / wordsPerMinute;
};
