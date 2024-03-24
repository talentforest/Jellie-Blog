import Image from 'next/image';
import { ReactNode } from 'react';
import { FaCode } from 'react-icons/fa6';
import { AiFillTool } from 'react-icons/ai';
import { MdOutlineWeb } from 'react-icons/md';
import StackIcon from './stack-icon';

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
      className={`self-start max-w-full max-h-8 ${
        selected ? 'bg-indigo' : 'bg-hoverbox'
      } group-hover:opacity-100 border border-light-gray rounded-full text-sm pr-3 items-center flex gap-1 pl-2.5 pb-1 pt-1.5 md:pb-1 md:pt-1.5`}
    >
      {category === 'All' ? (
        ''
      ) : category === 'side-projects' ? (
        <MdOutlineWeb className='text-[#c59562]' />
      ) : category === 'library' ? (
        <AiFillTool className='text-[#c0ffdd]' />
      ) : category === 'developments' ? (
        <FaCode className='text-[#ff4d4d]' />
      ) : (
        <StackIcon stack={category} />
      )}

      <span
        className={`text-sm ml-0.5 ${
          selected ? 'text-yellow' : 'text-gray group-hover:text-indigo'
        } items-center flex gap-1`}
      >
        {category}
      </span>

      {children}
    </div>
  );
}
