import Image from 'next/image';
import DateBox from '../common/date-box';
import TimeToReadBox from '../common/time-to-read-box';
import CategoryBox from '../common/category-box';

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

export default function PostHeader({ contents }: Props) {
  const { path, category, date, title, thumbnail, readingTime } = contents;

  return (
    <header className='w-full mb-5 bg-box border-gray relative flex flex-col items-start'>
      {path && (
        <Image
          src={`/images/${category}/${thumbnail}`}
          alt={`${title} Post Thumbnail'`}
          width={500}
          height={500}
          priority
          className='w-full h-80 lg:h-80 object-cover self-center opacity-75'
        />
      )}

      <ul className='flex space-x-3 m-4 mt-10'>
        <CategoryBox category={category} />
        <DateBox date={date} />
        <TimeToReadBox readingTime={readingTime || 0} />
      </ul>

      <h1 className='text-3xl font-king font-bold ml-4'>{title}</h1>

      <span className='p-4 text-sm text-slate leading-6 tracking-wide'>
        저의 글을 읽어주셔서 감사합니다.
        <br />
        피드백은 언제나 감사합니다. 혹시 잘못된 부분을 발견하셨다면 언제든지
        이야기해주세요 😊
      </span>
    </header>
  );
}
