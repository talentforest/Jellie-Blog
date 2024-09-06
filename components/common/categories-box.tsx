import { Post } from '@/service/posts';
import CategoryBox from './category-box';

export type Category =
  | 'All'
  | 'next.js'
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'tailwindcss'
  | 'developments'
  | 'web'
  | 'side-projects'
  | 'library'
  | 'css';

const categoryList: Category[] = [
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
  'css',
];

interface Props {
  currCategory: Category;
  setCurrCategory: (category: Category) => void;
  allPosts: Post[];
}

export default function CategoriesBox({
  currCategory,
  setCurrCategory,
  allPosts,
}: Props) {
  const onCategoryClick = (category: Category) => setCurrCategory(category);

  const numOfCategoryPosts = (currCategory: Category) => {
    if (currCategory === 'All') return allPosts.length;
    return allPosts.filter((post) => post.category === currCategory).length;
  };

  return (
    <ul className='flex flex-wrap gap-2 mt-3 mb-8'>
      {categoryList.map((category) => (
        <li key={category} className='group'>
          <button onClick={() => onCategoryClick(category)}>
            <CategoryBox
              selected={currCategory === category}
              category={category}
            >
              <span
                className={`${
                  currCategory === category ? 'text-white' : 'text-slate'
                } pl-1.5 text-[13px]`}
              >
                {numOfCategoryPosts(category)}
              </span>
            </CategoryBox>
          </button>
        </li>
      ))}
    </ul>
  );
}
