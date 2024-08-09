import { RiArticleFill, RiLink } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa6';
import Link from 'next/link';
import React from 'react';

interface Props {
  path?: string;
  href?: string;
  linkTitle: string;
  name: string;
}

export default function LinkItem({ href, path, linkTitle, name }: Props) {
  return (
    <>
      {path && (
        <Link
          href={`/posts/${path}`}
          target='_blank'
          title={linkTitle}
          className='leading-3 text-gray hover:text-medium-gray underline'
        >
          <RiArticleFill
            fontSize={14}
            className='inline w-4 h-4 mb-0.5 mr-0.5'
          />
          <Name name={name} />
        </Link>
      )}

      {href && (
        <a
          key={href}
          href={href}
          target='_blank'
          title={`${linkTitle} 페이지`}
          className='text-medium-gray group-hover:text-gray flex items-center w-fit text-sm'
        >
          {name === '바로가기' ? (
            <RiLink className='text-medium-gray group-hover:text-gray w-4 h-4 mr-0.5' />
          ) : (
            <FaGithub className='text-medium-gray group-hover:text-gray w-4 h-4 mr-0.5 mb-0.5' />
          )}
          <span className='underline tracking-tighter'>{name}</span>
        </a>
      )}
    </>
  );
}

const Name = ({ name }: { name: string }) => {
  return <span className='text-sm'>{name}</span>;
};
