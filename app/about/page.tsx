import { getAllProjects, getContactData } from '@/service/about';
import { MdPermContactCalendar } from 'react-icons/md';
import { MdViewSidebar } from 'react-icons/md';
import Image from 'next/image';
import ProjectItem from '@/components/about/project-item';

export const metadata = {
  title: 'About',
  description: 'Jellie의 기술 블로그입니다.',
};

const HEADING_STYLE = 'mt-4 font-bold mb-2 text-xl flex items-center';

export default async function AboutPage() {
  const projectList = await getAllProjects();
  const contactList = await getContactData();

  return (
    <>
      <section className='my-8 flex flex-col items-center'>
        <Image
          src='/images/about/avatar.png'
          alt='avatar'
          width={200}
          height={200}
          priority
          className='w-32 h-32 mb-4 rounded-full shadow-sm shadow-slate flex justify-center items-center'
        />
        <span className='block text-xl font-bold'>Jellie</span>
      </section>
      <section className='m-4 md:mx-0'>
        <h1 className='font-bold text-xl'>저는 이런 개발자입니다</h1>
        <div className='border border-slate bg-box rounded-lg flex flex-col justify-center text-sm p-2 space-y-2 mt-2'>
          <p>#1 | 기획한 제품을 발전시켜나가는 것을 좋아합니다.</p>
          <p>#2 | 한눈에 파악할 수 있는 코드를 중요하게 생각합니다.</p>
          <p>#3 | 기록을 중요하게 생각합니다.</p>
        </div>
      </section>
      <section className='mx-4 my-8 md:mx-0'>
        <h3 className={HEADING_STYLE}>
          <MdPermContactCalendar className='mr-1 h-6 w-6' />
          Contact
        </h3>
        <ul className='border border-slate bg-box divide-y-[1px] divide-slate rounded-lg flex flex-col justify-center text-sm'>
          {contactList.map((contact) => (
            <li key={contact.name} className='flex items-center'>
              <span className='w-20 h-8 border-r border-slate flex items-center justify-center text-xs mr-4'>
                {contact.name}
              </span>
              {contact.name === 'EMAIL' ? (
                <span>{contact.item}</span>
              ) : (
                <a
                  className='text-blue'
                  target='_blank'
                  title={`Jellie의 ${contact.name.toLowerCase()} 페이지`}
                  href={contact.item}
                >
                  {contact.item.slice(8)}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className='mx-4 my-8 md:mx-0'>
        <h3 className={HEADING_STYLE}>
          <MdViewSidebar className='mr-1 h-6 w-6' /> Projects 프로젝트들
        </h3>
        <ul className='flex flex-col space-y-2 md:grid md:grid-cols-2 md:space-y-0 md:gap-3 lg:grid-cols-3'>
          {projectList.map((project) => (
            <ProjectItem key={project.name} project={project} />
          ))}
        </ul>
      </section>
    </>
  );
}
