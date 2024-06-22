import path from 'path';
import { promises as fs } from 'fs';

export interface Project {
  name: string;
  path: string;
  description: string;
  stacks: string[];
  link: string;
  github: string;
  relatedPosts: string;
}

export interface PersonalData {
  type: string;
  title: string;
  link: string;
}

export async function getAllProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function getPersonalDataList(): Promise<PersonalData[]> {
  const filePath = path.join(process.cwd(), 'data', 'contact.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}
