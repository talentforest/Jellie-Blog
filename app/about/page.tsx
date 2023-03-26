import ProjectItem from '@/components/about/project-item';
import { getAllProjects, getContactData } from '@/service/about';

export const metadata = {
  title: 'About | Jellie Blog',
  description: 'Jellie의 기술 블로그입니다.',
};

const HEADING_STYLE = 'mt-4 font-bold mb-2';

export default async function AboutPage() {
  const projectList = await getAllProjects();
  const contactList = await getContactData();

  return (
    <>
      <section className='m-4'>
        <span className='font-sans block text-xl font-bold mb-4'>
          Yerim Jeon (Jellie)
        </span>
        <span className='font-bold text-base'>저는 이런 개발자입니다</span>
        <div className='border bg-white rounded-lg flex flex-col justify-center text-sm p-2 space-y-2 mt-2'>
          <p>#1 제품을 유지보수하며 발전시키는 것을 좋아합니다.</p>
          <p>#2 기록을 중요하게 생각합니다.</p>
          <p>#3 다른 사람과 협업하며 아이디어를 나누는 것을 좋아합니다.</p>
        </div>
      </section>
      <section className='m-4'>
        <h3 className={HEADING_STYLE}>Contact</h3>
        <ul className='border bg-white rounded-lg flex flex-col justify-center text-sm'>
          {contactList.map((contact) => (
            <li key={contact.name} className='flex items-center border-b'>
              <span className='w-16 h-8 border-r flex items-center justify-center text-xs mr-4'>
                {contact.name}
              </span>
              {contact.name === 'EMAIL' ? (
                <span>{contact.item}</span>
              ) : (
                <a
                  className='text-blue-600'
                  target='_blank'
                  title={`Jellie의 ${contact.name.toLowerCase()} 페이지`}
                  href={contact.item}
                >
                  {contact.item}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className='m-4'>
        <h3 className={HEADING_STYLE}>Projects</h3>
        <ul className='flex flex-col space-y-2'>
          {projectList.map((project) => (
            <ProjectItem key={project.name} project={project} />
          ))}
        </ul>
      </section>
    </>
  );
}
