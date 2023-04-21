import Image from 'next/image';
import { AiFillTags, AiFillClockCircle, AiFillCalendar } from 'react-icons/ai';

interface Props {
  contents: {
    path: string;
    date: string;
    category: string;
    title: string;
    thumbnail?: string;
    readingTime?: number;
  };
}

export default function PostHeader({
  contents: { path, category, date, title, thumbnail, readingTime },
}: Props) {
  const iconClass = 'mr-1 w-4 h-4';
  const infoClass = 'text-sm flex items-center';

  return (
    <header className='w-full border-b border-slate relative flex flex-col bg-box h-80'>
      {path && (
        <Image
          src={`/images/${category}/${thumbnail}`}
          alt='Post Thumbnail'
          width={500}
          height={500}
          priority
          className='w-full h-80 object-cover self-center opacity-20'
        />
      )}
      <div className='absolute bottom-4 inset-x-4'>
        <div className='flex space-x-3'>
          <span className={infoClass}>
            <AiFillTags className={iconClass} />
            {category}
          </span>
          <span className={infoClass}>
            <AiFillCalendar className={iconClass} />
            {new Date(date).toLocaleDateString('ko')}
          </span>
          <span className={infoClass}>
            <AiFillClockCircle className={iconClass} />
            {readingTime?.toFixed(0)} min to read
          </span>
        </div>
        <h1 className='md:pb-6 mt-4 text-3xl font-bold'>{title}</h1>
      </div>
    </header>
  );
}
