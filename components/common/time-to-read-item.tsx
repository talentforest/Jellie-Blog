import { AiOutlineClockCircle } from 'react-icons/ai';

interface Props {
  readingTime: number;
}

export default function TimeToReadItem({ readingTime }: Props) {
  return (
    <li className='flex items-center gap-x-1 text-sm text-text group-hover:text-indigo'>
      <AiOutlineClockCircle className='h-4 w-4 mb-0.5' />
      {Math.ceil(readingTime)} min to read
    </li>
  );
}
