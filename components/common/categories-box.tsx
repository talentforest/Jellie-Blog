import { Post } from '@/service/posts';

export type CategoryType =
  | 'All'
  | 'next.js'
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'tailwindcss'
  | 'web'
  | 'developments'
  | 'side-projects'
  | 'library';

const categoryList: CategoryType[] = [
  'All',
  'next.js',
  'react',
  'typescript',
  'javascript',
  'tailwindcss',
  'web',
  'developments',
  'side-projects',
  'library',
];

interface Props {
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
  allPosts: Post[];
}

export default function CategoriesBox({
  category,
  setCategory,
  allPosts,
}: Props) {
  const onCategoryClick = (category: CategoryType) => setCategory(category);

  const numOfCategoryPosts = (category: CategoryType) => {
    if (category === 'All') return allPosts.length;
    return allPosts.filter((post) => post.category === category).length;
  };

  return (
    <ul className='flex flex-wrap gap-1.5 mt-3 mb-8'>
      {categoryList.map((categoryItem) => (
        <li
          key={categoryItem}
          className={`${
            category === categoryItem
              ? 'bg-indigo text-yellow font-extrabold'
              : 'bg-box'
          } border rounded-full hover:bg-yellow hover:text-indigo transition`}
        >
          <button
            onClick={() => onCategoryClick(categoryItem)}
            className='px-3 text-sm transition'
          >
            {categoryItem}{' '}
            <span className='text-slate pl-1 text-xs'>
              {numOfCategoryPosts(categoryItem)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
