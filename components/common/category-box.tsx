import Image from 'next/image';
import { ReactNode } from 'react';

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
      className={`${
        selected ? 'bg-indigo' : 'bg-box'
      } group-hover:bg-light-yellow border border-gray rounded-full text-sm pr-3 items-center flex gap-1 pl-2.5 pb-0.5 pt-1 md:pb-1 md:pt-1.5`}
    >
      <span
        className={`group-hover:text-indigo text-sm ${
          selected ? 'text-yellow' : 'text-slate'
        } items-center flex gap-1`}
      >
        {category === 'All' ? (
          ''
        ) : category === 'web' ? (
          '🌐'
        ) : category === 'side-projects' ? (
          '👀'
        ) : category === 'library' ? (
          '🗂️'
        ) : category === 'developments' ? (
          '💡'
        ) : (
          <Image
            src={`/icon/${category}.svg`}
            alt={`${category} icon`}
            width={14}
            height={14}
            className='rounded-full mb-[3px]'
          />
        )}
        {'  '}
        {category}
      </span>

      {children}
    </div>
  );
}
