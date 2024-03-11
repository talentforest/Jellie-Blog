import { getAllProjects, getContactData } from '@/service/about';
import { MdPermContactCalendar } from 'react-icons/md';
import { MdViewSidebar } from 'react-icons/md';
import { RiLink } from 'react-icons/ri';
import ProjectItem from '@/components/about/project-item';
import Avatar from '@/components/common/avatar';

export const metadata = {
  title: 'About',
  description: 'Jellie의 기술 블로그입니다.',
};

const HEADING_STYLE = 'font-king mt-4 font-bold mb-2 text-xl flex items-center';

export default async function AboutPage() {
  const projectList = await getAllProjects();
  const contactList = await getContactData();

  return (
    <>
      <section className='my-8 flex flex-col items-center'>
        <Avatar />
        <span className='block text-lg font-bold mt-3'>Jellie</span>
      </section>

      <section className='mx-4 mt-8 md:mx-0'>
        <h3 className={HEADING_STYLE}>
          <MdPermContactCalendar className='mr-1 h-5 w-5' />
          Contact
        </h3>

        <ul className='border border-slate bg-box divide-y-[1px] divide-slate rounded-lg flex flex-col justify-center text-sm'>
          {contactList.map((contact) => (
            <li key={contact.name} className='flex items-center'>
              <span className='font-king w-20 h-8 border-r border-slate flex items-center justify-start text-xs mx-2.5 my-0.5'>
                {contact.name}
              </span>

              {contact.name === 'EMAIL' ? (
                <span className='font-king'>{contact.item}</span>
              ) : (
                <a
                  className='font-king text-slate flex items-center gap-1'
                  target='_blank'
                  title={`Jellie의 ${contact.name.toLowerCase()} 페이지`}
                  href={contact.item}
                >
                  {contact.item.slice(8)}
                  <RiLink className='w-3 h-3' />
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className='mx-4 mt-14 mb-8 md:mx-0'>
        <h3 className={HEADING_STYLE}>
          <MdViewSidebar className='mr-1 h-5 w-5' /> Projects
        </h3>

        <ul className='flex flex-col space-y-3 md:grid md:grid-cols-2 md:space-y-0 md:gap-3 lg:grid-cols-3'>
          {projectList.map((project) => (
            <ProjectItem key={project.name} project={project} />
          ))}
        </ul>
      </section>
    </>
  );
}
