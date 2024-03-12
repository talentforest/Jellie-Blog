import { MouseEvent, useState } from 'react';
import { SortBy } from '../template/categorized-posts-section';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface Props {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
}

export default function SortBtn({ sortBy, setSortBy }: Props) {
  const [open, setOpen] = useState(false);

  const onSortByChange = () => setOpen((prev) => !prev);

  const onChangeSortClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    if (name === 'oldest') setSortBy('oldest');
    if (name === 'latest') setSortBy('latest');
    setOpen(false);
  };

  return (
    <>
      <button
        className='flex items-center hover:text-teal'
        onClick={onSortByChange}
      >
        <MdKeyboardArrowDown className='w-5 h-5' />
        <span className='text-[15px]'>
          {sortBy === 'latest' ? '최신순' : '오래된순'}
        </span>
      </button>

      {open && (
        <ul className='py-1.5 z-10 absolute flex flex-col -right-1 top-7 rounded-md border border-slate bg-bg shadow-md'>
          {['latest', 'oldest'].map((name) => (
            <li key={name}>
              <button
                name={name}
                className='w-full flex items-center gap-1 py-1 pl-4 pr-6 hover:text-teal'
                onClick={onChangeSortClick}
              >
                {sortBy === name && (
                  <AiOutlineCheckCircle className='absolute text-teal w-4.5 h-4.5 mb-0.5 mr-0.5' />
                )}
                <span
                  className={`${sortBy === name ? 'text-teal' : ''} w-17 pl-5`}
                >
                  {name === 'latest' ? '최신순' : '오래된 순'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
