import Image from 'next/image';
import DateItem from '../common/date-item';
import TimeToReadItem from '../common/time-to-read-item';
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
  const { category, date, title, thumbnail, readingTime } = contents;

  return (
    <>
      <header className='w-full sticky top-16 md:top-[78px] rounded-b-[30px] mb-5'>
        {thumbnail && title && category ? (
          <div className='absolute w-full h-full'>
            <Image
              src={`/images/${category}/${thumbnail}`}
              alt={`${title} Post Thumbnail`}
              priority
              width={500}
              height={300}
              className='object-cover w-full h-full brightness-70 opacity-20 rounded-b-[30px]'
            />
          </div>
        ) : (
          <></>
        )}

        <div className='flex flex-col items-start px-5 md:px-8 py-8 md:pt-20 md:pb-14'>
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
        </div>
      </header>
    </>
  );
}
