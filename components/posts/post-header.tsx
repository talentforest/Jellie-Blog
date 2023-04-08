import Image from 'next/image';

interface Props {
  contents: {
    path?: string;
    date?: string;
    myOwnDoc?: boolean;
    category: string;
    title: string;
  };
}

export default function PostHeader({
  contents: { path, category, date, title, myOwnDoc },
}: Props) {
  return (
    <header className='w-full border-b border-slate relative flex flex-col bg-box h-80'>
      {!myOwnDoc && path && (
        <Image
          src={`/images/${category}/${path}.png`}
          alt='Post Thumbnail'
          width={500}
          height={500}
          priority
          className='w-full h-80 object-cover self-center opacity-50'
        />
      )}
      <div className='absolute h-68 bottom-0'>
        {date && (
          <span className='m-4 block font-sans text-slate text-sm self-end'>
            {new Date(date).toLocaleDateString('ko')}
          </span>
        )}
        <h5 className='mx-4 mt-5 md:mb-2 py-1 px-3 rounded-full bg-indigo border border-slate text-white text-xs w-fit'>
          {category}
        </h5>
        <h1 className='p-4 md:pb-6 text-3xl font-bold'>{title}</h1>
      </div>
    </header>
  );
}
