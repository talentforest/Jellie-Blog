interface Props {
  headingEls: Element[];
  activeId: string;
}

export default function TocContent({ headingEls, activeId }: Props) {
  return (
    <>
      <h1 className='mb-4 font-king text-base font-bold text-indigo'>TOC</h1>

      <ul className='flex flex-col space-y-2.5'>
        {headingEls.map((el, index) => (
          <li
            key={index}
            style={{
              paddingLeft: `${(+el.nodeName.slice(-1) - 2) * 1.3}rem`,
            }}
            className={`hover:text-white ${
              el.nodeName === 'H1'
                ? 'text-xl text-text'
                : el.nodeName === 'H2'
                ? 'text-yellow text-sm'
                : el.nodeName === 'H3'
                ? 'text-teal text-sm'
                : 'text-blue text-sm'
            }`}
          >
            <a
              href={`#${el.id}`}
              className={`${
                el.id === activeId ? 'border-l-4 border-indigo px-3 bg-box' : ''
              } block py-1 w-fit cursor-pointer transition-all duration-75`}
            >
              {el.innerHTML}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
