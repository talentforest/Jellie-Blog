interface Props {
  headingEls: Element[];
  activeId: string;
}

export default function TocContent({ headingEls, activeId }: Props) {
  return (
    <>
      <h1 className='mb-2 text-lg'># TOC</h1>
      <ul className='flex flex-col space-y-3'>
        {headingEls.map((el, index) => (
          <li
            key={index}
            style={{
              paddingLeft: `${(+el.attributes[1].value - 1) * 1.2}rem`,
            }}
            className={`${
              el.nodeName === 'H2' ? 'text-yellow text-sm' : 'text-text text-xs'
            } hover:text-slate`}
          >
            <a
              href={`#${el.id}`}
              className={`${
                el.id === activeId ? 'border-l-4 border-indigo px-4 bg-box' : ''
              } block py-1 w-fit cursor-pointer`}
            >
              {el.innerHTML}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
