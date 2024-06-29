import path from 'path';
import { promises as fs } from 'fs';

export interface Project {
  group: string[];
  name: string;
  path: string;
  status: '배포 완료' | '서비스 운영중';
  description: string;
  stacks: string[];
  link: string;
  github: string;
  relatedPostPaths: string[];
  startDate: string;
  endDate: string;
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
