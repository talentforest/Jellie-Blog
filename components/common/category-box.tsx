import Image from 'next/image';
import { ReactNode } from 'react';
import { FaCode } from 'react-icons/fa6';
import { AiFillTool } from 'react-icons/ai';
import { MdOutlineWeb } from 'react-icons/md';

interface Props {
  selected?: boolean;
  category: string;
  children?: ReactNode;
}

export default function CategoryBox({
  category,
  children,
  selected = false,
}: Props) {
  return (
    <div
      className={`categorybox ${
        selected ? 'bg-indigo' : 'bg-hoverbox'
      } group-hover:opacity-100 border border-gray rounded-full text-sm pr-3 items-center flex gap-1 pl-2.5 pb-1 pt-1.5 md:pb-1 md:pt-1.5`}
    >
      <span
        className={`group-hover:text-indigo text-sm ${
          selected ? 'text-yellow' : 'text-text'
        } items-center flex gap-1`}
      >
        {category === 'All' ? (
          ''
        ) : category === 'side-projects' ? (
          <MdOutlineWeb />
        ) : category === 'library' ? (
          <AiFillTool />
        ) : category === 'developments' ? (
          <FaCode />
        ) : (
          <Image
            src={`/icon/${category}.svg`}
            alt={`${category} icon`}
            width={0}
            height={0}
            className='rounded-full mb-[2px] w-3.5 h-auto'
          />
        )}
        {'  '}
        {category}
      </span>

      {children}
    </div>
  );
}
