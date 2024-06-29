import Image from 'next/image';
import { ReactNode } from 'react';
import { FaCode, FaFire } from 'react-icons/fa6';
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
      className={`self-start max-w-full max-h-8 overflow-hidden ${
        selected ? 'bg-indigo font-bold' : 'bg-box'
      } group-hover:opacity-100 border border-light-gray rounded-full text-sm items-center flex gap-1 px-2 pb-1 pt-1.5 md:pb-1 md:pt-1.5`}
    >
      {category === 'All' ? (
        ''
      ) : (
        <div className='min-h-4 min-w-4 flex items-center justify-center'>
          {category === 'side-projects' ? (
            <FaFire className='text-[#ff5d5d]' />
          ) : category === 'library' ? (
            <AiFillTool className='text-[#468f68]' />
          ) : category === 'developments' ? (
            <FaCode className='text-[#e3674b]' />
          ) : category === 'web' ? (
            <MdOutlineWeb className='text-[#6c92f2]' />
          ) : (
            <StackIcon stack={category} />
          )}
        </div>
      )}

      <span
        className={`text-sm whitespace-nowrap ${
          selected ? 'text-yellow' : 'text-gray group-hover:text-indigo'
        } items-center flex gap-1`}
      >
        {category}
      </span>

      {children}
    </div>
  );
}
