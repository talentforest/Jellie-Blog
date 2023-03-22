import { convertChar } from '@/util';

interface Props {
  params: {
    slug: string;
  };
}

export default function PostDetailPage({ params: { slug } }: Props) {
  return (
    <main className='px-4 md:px-20'>
      {convertChar(decodeURI(slug), '-', ' ')}
    </main>
  );
}
