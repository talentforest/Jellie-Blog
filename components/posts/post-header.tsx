import Image from 'next/image';
import DateBox from '../common/date-box';
import TimeToReadBox from '../common/time-to-read-box';
import CategoryBox from '../common/category-box';
import ProgressBar from './progress-bar';

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
  const { category, date, title, thumbnail, readingTime } = contents;

  return (
    <>
      {thumbnail && title && category ? (
        <Image
          src={`/images/${category}/${thumbnail}`}
          alt={`${title} Post Thumbnail`}
          width={500}
          height={500}
          priority
          className='w-full h-80 lg:h-80 object-cover self-center'
        />
      ) : (
        <></>
      )}

      <ProgressBar />

      <header className='w-full bg-box rounded-b-3xl mb-3 px-4 py-8 relative flex flex-col items-start'>
        <div className='flex flex-wrap gap-3 mb-4'>
          <DateBox date={date} />
          <TimeToReadBox readingTime={readingTime || 0} />
        </div>

        <CategoryBox category={category} />
        <h1 className='text-3xl font-king font-bold leading-10 mb-6 mt-2'>
          {title}
        </h1>

        <span className='text-sm text-slate leading-6 tracking-wide'>
          저의 글을 읽어주셔서 감사합니다.
          <br />
          피드백은 언제나 감사합니다! 언제든지 코멘트 남겨주세요.😊
        </span>
      </header>
    </>
  );
}
