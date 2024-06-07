import { AiOutlineCalendar } from 'react-icons/ai';

interface Props {
  date: string;
}

export default function DateItem({ date }: Props) {
  return (
    <li className='flex items-center gap-x-1 text-sm text-text group-hover:text-indigo'>
      <AiOutlineCalendar className='h-4 w-4 mb-0.5' />
      {new Date(date).toLocaleDateString('ko')}
    </li>
  );
}
