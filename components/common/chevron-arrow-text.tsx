import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface Props {
  direction: 'prev' | 'next';
  text: string;
}

export default function ChevronArrowText({ direction, text }: Props) {
  return (
    <div className='flex items-center gap-1'>
      {direction === 'prev' && (
        <FaChevronLeft
          fontSize={12}
          className='text-slate group-hover:text-text'
        />
      )}
      <h5
        className={`${
          direction === 'prev' ? '' : 'text-end'
        } text-sm text-slate group-hover:text-text pt-1`}
      >
        {direction === 'prev' ? '이전' : '다음'} {text}
      </h5>
      {direction === 'next' && (
        <FaChevronRight
          fontSize={12}
          className='text-slate group-hover:text-text'
        />
      )}
    </div>
  );
}
