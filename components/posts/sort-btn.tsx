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
  const onSortByChange = () => {
    setOpen((prev) => !prev);
  };

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
        <span>{sortBy === 'latest' ? '최신순' : '오래된순'}</span>
      </button>
      {open && (
        <ul className='z-10 absolute flex flex-col -right-1 top-7 rounded-md border border-slate bg-bg shadow-md'>
          <li>
            <button
              name='latest'
              className='w-24 flex items-center gap-1 pl-2.5 py-1.5 hover:text-teal'
              onClick={onChangeSortClick}
            >
              {sortBy === 'latest' && (
                <AiOutlineCheckCircle className='text-teal' />
              )}
              <span>최신순</span>
            </button>
          </li>
          <li>
            <button
              name='oldest'
              className='w-24 flex items-center gap-1 pl-2.5 py-1.5 hover:text-teal'
              onClick={onChangeSortClick}
            >
              {sortBy === 'oldest' && (
                <AiOutlineCheckCircle className='text-teal' />
              )}
              <span>오래된순</span>
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
