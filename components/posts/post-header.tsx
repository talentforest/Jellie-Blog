import Image from 'next/image';
import DateItem from '../common/date-item';
import TimeToReadItem from '../common/time-to-read-item';
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
      <header className='w-full sticky top-0 rounded-b-[30px] mb-5 px-5 md:px-8 py-8 md:pt-20 md:pb-14 flex flex-col items-start'>
        {thumbnail && title && category ? (
          <Image
            src={`/images/${category}/${thumbnail}`}
            alt={`${title} Post Thumbnail`}
            layout='fill' // fill layout to cover the header
            objectFit='cover'
            priority
            className='brightness-100 opacity-20 rounded-b-[30px] -z-10'
          />
        ) : (
          <></>
        )}

        <CategoryBox category={category} />
        <h1 className='text-3xl font-bold leading-10 mb-10 mt-3'>{title}</h1>

        <div className='flex flex-wrap gap-3 mb-8'>
          <DateItem date={date} />
          <TimeToReadItem readingTime={readingTime || 0} />
        </div>

        <span className='text-sm text-text leading-6 tracking-wide'>
          저의 글을 읽어주셔서 감사합니다.
          <br />
          피드백은 언제나 감사합니다! 언제든지 코멘트 남겨주세요.😊
        </span>
      </header>
    </>
  );
}
