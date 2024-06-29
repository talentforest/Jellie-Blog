import { getTimeTaken } from '@/util/getTimeTaken';
import { AiFillCalendar } from 'react-icons/ai';

interface Props {
  startDate: string;
  endDate: string;
}

export default function ProjectPeriodItem({ startDate, endDate }: Props) {
  return (
    <div
      className={`self-start bg-hoverbox border-light-gray border px-2 pt-1 pb-0.5 text-sm rounded-md`}
    >
      <AiFillCalendar className='inline mr-0.5 mb-1' />
      <span>
        {new Date(startDate).toLocaleDateString()} ~{' '}
        {endDate ? (
          <>
            <AiFillCalendar className='inline mr-0.5 mb-1' />
            {new Date(endDate).toLocaleDateString()}
          </>
        ) : (
          '업데이트 중'
        )}
      </span>
      {endDate && (
        <span className='ml-1.5 text-[13px] mb-0.5 inline text-gray'>
          ({getTimeTaken(startDate, endDate)})
        </span>
      )}
    </div>
  );
}
