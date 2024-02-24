import { AiOutlineClockCircle } from 'react-icons/ai';

interface Props {
  readingTime: number;
}

export default function TimeToReadBox({ readingTime }: Props) {
  return (
    <span className='flex items-center gap-x-1 text-sm text-slate group-hover:text-text'>
      <AiOutlineClockCircle className='h-4 w-4 mb-0.5' />
      {Math.ceil(readingTime)} min to read
    </span>
  );
}
