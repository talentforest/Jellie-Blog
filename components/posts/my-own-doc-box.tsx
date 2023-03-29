import { IoDocumentAttachOutline } from 'react-icons/io5';
import { Categories } from '../home/categorized-posts-section';
import EmptyBox from '../common/empty-box';
import Link from 'next/link';
import { Post } from '@/service/posts';

interface Props {
  selectedCategory: Categories;
  myOwnDoc: Post;
}

export default function MyOwnDocBox({ selectedCategory, myOwnDoc }: Props) {
  return (
    <>
      {myOwnDoc ? (
        <Link
          key={myOwnDoc.category}
          href={`/posts/${myOwnDoc.category}`}
          className='transition hover:border-yellow hover:-translate-y-0.5 block w-full border border-slate p-3 rounded-lg bg-box'
        >
          <h2 className='flex items-center'>
            <IoDocumentAttachOutline className='mr-1 w-5 h-5 text-yellow' />
            {myOwnDoc.title}
          </h2>
        </Link>
      ) : (
        selectedCategory !== 'All' && <EmptyBox content='문서' />
      )}
    </>
  );
}
