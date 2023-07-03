interface Props {
  headingEls: Element[];
  activeId: string;
}

export default function TocContent({ headingEls, activeId }: Props) {
  return (
    <>
      <h1 className='mb-2 text-sm font-bold text-indigo'>TOC</h1>
      <ul className='flex flex-col space-y-2'>
        {headingEls.map((el, index) => (
          <li
            key={index}
            style={{
              paddingLeft: `${(+el.attributes[1].value - 1) * 1.2}rem`,
            }}
            className={`${
              el.nodeName === 'H2' ? 'text-yellow text-xs' : 'text-text text-xs'
            } hover:text-slate`}
          >
            <a
              href={`#${el.id}`}
              className={`${
                el.id === activeId ? 'border-l-4 border-indigo px-4 bg-box' : ''
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
