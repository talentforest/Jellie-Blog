import { getAllProjects, getPersonalDataList } from '@/service/about';
import { AiFillTag } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';
import ProjectItem from '@/components/about/project-item';
import Introduction from '@/components/home/introduction';
import PersonalDataItem from '@/components/about/personal-data-item';
import { getAllPosts } from '@/service/posts';

export const metadata = {
  title: 'About',
  description: 'Jellie의 기술 블로그입니다.',
};

export default async function AboutPage() {
  const projectList = await getAllProjects();
  const personalDataList = await getPersonalDataList();
  const posts = await getAllPosts();

  const relatedProjectPosts = posts.filter((post) =>
    projectList.find((project) => project.relatedPostPaths.includes(post.path))
  );

  return (
    <>
      <Introduction>
        <ul className='relative flex flex-col items-center justify-center gap-2'>
          {personalDataList.map(({ type, title, link }) => (
            <PersonalDataItem
              key={type}
              type={type}
              title={title}
              link={link}
            />
          ))}
        </ul>
      </Introduction>

      <section className='mx-4 mt-20 mb-8 md:mx-0'>
        <header className='relative mt-14 mb-4 pr-2 pl-1 flex flex-wrap leading-7 items-center justify-between gap-1'>
          <AiFillTag className='text-yellow w-5 h-5 mb-0.5' />
          <h3 className='flex items-center gap-1'>사이드 프로젝트</h3>
          <MdKeyboardArrowRight className='h-5 w-5' />
          <span className='flex-1'>{projectList.length}개</span>
          <span className='text-gray text-end'>최종 업데이트: 2024. 6. 24</span>
        </header>

        <ul className='flex flex-col space-y-5 md:grid md:grid-cols-2 md:gap-x-3 md:gap-y-5 md:space-y-0'>
          {projectList.map((project) => (
            <ProjectItem
              key={project.name}
              project={project}
              relatedProjectPosts={relatedProjectPosts}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
