import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
  direction: 'prev' | 'next';
}

export default function ArrowCircle({ direction }: Props) {
  const circleStyle =
    'opacity-30 bg-box border-2 border-box rounded-full p-3 absolute group-hover:border-light-yellow group-hover:opacity-100';

  const arrowStyle = 'w-7 h-7 text-text group-hover:text-light-yellow';

  return (
    <div
      className={`${circleStyle} ${
        direction === 'prev' ? 'left-3' : 'right-3'
      }`}
    >
      {direction === 'next' && <FaChevronRight className={arrowStyle} />}

      {direction === 'prev' && <FaChevronLeft className={arrowStyle} />}
    </div>
  );
}
