import { Categories } from '../template/categorized-posts-section';

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
        category === selectedCategory
          ? 'bg-yellow text-blue font-bold'
          : 'bg-box'
      } border rounded-full hover:bg-yellow hover:text-blue transition hover:animate-pulse`}
    >
      <button
        onClick={() => onCategoryClick(category)}
        className='px-3 text-sm transition'
      >
        {category}
      </button>
    </li>
  );
}
