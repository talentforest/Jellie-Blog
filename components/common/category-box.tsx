import { Categories } from '../home/categorized-posts-section';

interface Props {
  category: Categories;
  selectedCategory: Categories;
  onCategoryClick: (category: Categories) => void;
}

export default function CategoryBox({
  category,
  selectedCategory,
  onCategoryClick,
}: Props) {
  return (
    <li
      className={`${
        category === selectedCategory ? 'bg-yellow-300' : 'bg-white'
      } border bg-white rounded-full  hover:bg-blue-500 transition hover:animate-pulse`}
    >
      <button
        onClick={() => onCategoryClick(category)}
        className='px-3 text-sm text-blue-700 hover:text-blue-50 transition'
      >
        {category}
      </button>
    </li>
  );
}
