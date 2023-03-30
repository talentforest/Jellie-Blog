import path from 'path';
import { promises as fs } from 'fs';
import { Categories } from '@/components/template/categorized-posts-section';
import { readFile } from 'fs/promises';

export interface MyOwnDoc {
  category: Categories;
  title: string;
}

interface MyOwnDocData extends MyOwnDoc {
  content: string;
}

const MY_OWN_DOCS = 'my-own-docs';

export async function getAllDocs(): Promise<MyOwnDoc[]> {
  const filePath = path.join(process.cwd(), 'data', `${MY_OWN_DOCS}.json`);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function getMyOwnDoc(category: Categories): Promise<MyOwnDocData> {
  const filePath = path.join(
    process.cwd(),
    'data',
    MY_OWN_DOCS,
    `${category}.md`
  );
  const allDocs = await getAllDocs();
  const myOwnDoc = allDocs.find((doc) => doc.category === category);
  if (!myOwnDoc) {
    throw new Error(`${category} 문서가 없습니다.`);
  }
  const content = await readFile(filePath, 'utf-8');
  return { ...myOwnDoc, content };
}
