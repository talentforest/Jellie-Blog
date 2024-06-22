import { getAllProjects, getPersonalDataList } from '@/service/about';
import ProjectItem from '@/components/about/project-item';
import Introduction from '@/components/home/introduction';
import PersonalDataItem from '@/components/about/personal-data-item';

export const metadata = {
  title: 'About',
  description: 'Jellie의 기술 블로그입니다.',
};

const HEADING_STYLE = 'text-lg flex items-center text-gray';

export default async function AboutPage() {
  const projectList = await getAllProjects();
  const personalDataList = await getPersonalDataList();

  return (
    <>
      <Introduction />

      <ul className='relative flex flex-col items-center justify-center gap-2 pl-1 mt-4'>
        {personalDataList.map(({ type, title, link }) => (
          <PersonalDataItem key={type} type={type} title={title} link={link} />
        ))}
      </ul>

      <section className='mx-4 mt-14 mb-8 md:mx-0'>
        <header className='flex mb-2 px-2 justify-between items-center'>
          <h3 className={HEADING_STYLE}>사이드 프로젝트들</h3>
          <span className={HEADING_STYLE}>총 {projectList.length}개</span>
        </header>

        <ul className='flex flex-col space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-3'>
          {projectList.map((project) => (
            <ProjectItem key={project.name} project={project} />
          ))}
        </ul>
      </section>
    </>
  );
}
