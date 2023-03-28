import { IoDocumentAttachOutline } from 'react-icons/io5';
import { Categories } from '../home/categorized-posts-section';
import { MyOwnDoc } from '@/service/my-own-docs';
import EmptyBox from '../common/empty-box';
import Link from 'next/link';

interface Props {
  selectedCategory: Categories;
  myOwnDoc: MyOwnDoc;
}

export default function MyOwnDocBox({ selectedCategory, myOwnDoc }: Props) {
  return (
    <>
      {myOwnDoc ? (
        <Link
          key={myOwnDoc.category}
          href={`/my-own-docs/${myOwnDoc.category}`}
          className='block w-full border border-slate p-3 rounded-lg bg-box'
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
