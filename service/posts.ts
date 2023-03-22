import path from 'path';
import { promises as fs } from 'fs';
import { Categories } from '@/components/home/categorized-posts';

export interface Post {
  id: string;
  title: string;
  date: string;
  contents: string;
  category: Categories;
}

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

// 📍 서버 컴포넌트 관련 에러 문제로 아래 함수를 사용하지 않고 클라이언트에서 처리함. 해결하기
export async function getPostsByCategory(
  category: string
): Promise<Post[] | undefined> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}
