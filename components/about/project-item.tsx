'use client';

import { Project } from '@/service/about';
import { FaGithub, FaSearch } from 'react-icons/fa';
import { RiArticleFill, RiLink } from 'react-icons/ri';
import { Post } from '@/service/posts';
import { getTimeTaken } from '@/util/getTimeTaken';
import { AiFillCalendar } from 'react-icons/ai';
import { useState } from 'react';
import Modal from '../common/modal';
import Image from 'next/image';
import StackBox from '../common/stack-box';
import LinkItem from './link-item';
import ProjectPeriodItem from './project-period-item';
import CarouselBox from '../common/carousel-box';

interface Props {
  relatedProjectPosts: Post[];
  project: Project;
}

export default function ProjectItem({
  relatedProjectPosts,
  project: {
    group,
    name,
    path,
    status,
    description,
    stacks,
    link,
    github,
    relatedPostPaths,
    startDate,
    endDate,
  },
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal((prev) => !prev);

  const shortcut = [
    { href: link, title: name, name: '바로가기' },
    { href: github, title: name, name: 'GitHub' },
  ];

  const findPostTitle = (path: string) => {
    return relatedProjectPosts.find((post) => post.path === path)?.title;
  };

  return (
    <>
      <li className='hover:-translate-y-0.5 group transition flex flex-col'>
        <Image
          src={`/images/about/${path}`}
          alt='프로젝트: 냉장고에 뭐가 있지 썸네일'
          width={400}
          height={400}
          priority
          className='w-full h-48 object-cover mb-1.5 rounded-lg shadow-lg transition'
        />
        <div className=' transition rounded-lg p-3 shadow-lg flex-1 bg-box relative flex flex-col'>
          <header>
            <h5 className='inline group-hover:text-indigo font-bold text-[17px] mr-1.5'>
              {name}
            </h5>
            <div
              className={`inline-block border px-2 pt-1 pb-0.5 text-gray text-xs rounded-full ${
                status === '서비스 운영중'
                  ? 'text-teal bg-light-teal'
                  : 'text-yellow bg-lightest-yellow'
              }`}
            >
              {status}
            </div>
          </header>

          <p className='text-sm leading-6 mt-3 mb-5 flex-1'>{description}</p>

          <div className='flex items-center justify-between'>
            <div className='flex gap-x-4 flex-wrap items-start'>
              {shortcut.map(({ href, title, name }) => (
                <LinkItem
                  key={href}
                  href={href}
                  linkTitle={`${title} 페이지`}
                  name={name}
                />
              ))}
            </div>

            <button
              type='button'
              className='flex items-center gap-1 self-end px-3 py-2 rounded-lg bg-bg'
              onClick={toggleModal}
            >
              <FaSearch className='text-medium-gray text-[13px]' />
              <span className='text-xs'>상세보기</span>
            </button>
          </div>
        </div>
      </li>

      {openModal && (
        <Modal openModal={openModal} toggleModal={toggleModal}>
          <div className='rounded-lg w-[90vw] md:w-[60vw] lg:w-[72vw] flex flex-col lg:flex-row gap-3 lg:gap-2 relative'>
            <div className='h-fit flex flex-col gap-2 md:min-w-[200px]'>
              {/* 모바일, 태블릿 이미지 */}
              <div className='lg:hidden'>
                <CarouselBox
                  config={{
                    centerMode: false,
                    showDots: false,
                    swipeable: false,
                    infinite: false,
                    autoPlay: false,
                    arrows: true,
                  }}
                  itemClass='px-1'
                >
                  {[1, 2, 3].map((image) => (
                    <Image
                      key={image}
                      src={`/images/about/${path}`}
                      alt='프로젝트: 냉장고에 뭐가 있지 썸네일'
                      width={400}
                      height={300}
                      priority
                      className='w-full rounded-md object-cover transition'
                    />
                  ))}
                </CarouselBox>
              </div>

              {/* 데스크탑 이미지 */}
              {[1, 2, 3].map((image) => (
                <div key={image} className='relative hidden lg:block'>
                  <Image
                    src={`/images/about/${path}`}
                    alt='프로젝트: 냉장고에 뭐가 있지 썸네일'
                    width={500}
                    height={400}
                    priority
                    className='max-w-[400px] max-h-[170px] md:rounded-md w-full object-cover transition shadow-md shadow-light-gray'
                  />
                </div>
              ))}
            </div>

            <div className='mx-1 px-4 pt-5 pb-8 flex flex-col  bg-box rounded-md'>
              <header
                className={`z-10 overflow-scroll scrollbar-hide transition h-fit rounded-xl max-h-[90vh]`}
              >
                <h5 className='inline group-hover:text-indigo font-bold text-[17px] mr-1.5'>
                  {name}
                </h5>
                <div
                  className={`inline-block border px-2 pt-1 pb-0.5 text-gray text-xs rounded-full ${
                    status === '서비스 운영중'
                      ? 'text-teal bg-light-teal'
                      : 'text-yellow bg-lightest-yellow'
                  }`}
                >
                  {status}
                </div>
              </header>

              <p className='text-sm leading-6 mt-3 mb-5 flex-1'>
                {description}
              </p>

              <div className='flex gap-x-4 flex-wrap items-start mb-4'>
                {shortcut.map(({ href, title, name }) => (
                  <LinkItem
                    key={href}
                    href={href}
                    linkTitle={`${title} 페이지`}
                    name={name}
                  />
                ))}
              </div>

              <DetailTitle title='프로젝트 인원' isFirst />
              <ul className='flex flex-wrap items-center gap-1'>
                {group.map((item) => (
                  <li
                    key={item}
                    className={`bg-hoverbox border-light-gray inline-block border px-2 pt-1 pb-0.5 text-[13px] rounded-md`}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <DetailTitle title='사용한 스택' />
              <ul className='flex flex-wrap gap-1.5'>
                {stacks.map((stack) => (
                  <StackBox key={stack} stack={stack} />
                ))}
              </ul>

              <DetailTitle title='프로젝트 진행 기간' />
              <ProjectPeriodItem startDate={startDate} endDate={endDate} />

              {relatedPostPaths.length !== 0 && (
                <>
                  <DetailTitle title='관련 포스트' />
                  {relatedPostPaths.map((path) => (
                    <LinkItem
                      key={path}
                      path={path}
                      linkTitle='사이드 프로젝트 관련 포스트'
                      name={findPostTitle(path) || '포스트'}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function DetailTitle({ title, isFirst }: { title: string; isFirst?: boolean }) {
  return (
    <h6
      className={`${
        isFirst ? 'mt-3' : 'mt-8'
      }  text-xs text-medium-gray mb-1.5`}
    >
      {title}
    </h6>
  );
}
