interface Props {
  category: string;
}

export default function CategoryBox({ category }: Props) {
  return (
    <h5 className='group-hover:text-indigo group-hover:border-indigo text-sm text-slate border border-slate px-2 py-0.5 bg-box rounded-full'>
      {category}
    </h5>
  );
}
