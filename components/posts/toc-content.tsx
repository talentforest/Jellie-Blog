interface Props {
  headingEls: Element[];
  activeId: string;
}

export default function TocContent({ headingEls, activeId }: Props) {
  return (
    <nav className='border border-box p-4 rounded-lg bg-hoverbox w-full md:w-[25%] h-fit top-10 right-0 sticky'>
      <h1 className='font-king text-base font-bold text-indigo'>TOC</h1>

      <ul className='mt-3 flex flex-col space-y-2.5'>
        {headingEls.map((el, index) => (
          <li
            key={index}
            style={{
              paddingLeft: `${(+el.nodeName.slice(-1) - 2) * 1.3}rem`,
            }}
            className={`hover:text-gray text-xs ${
              el.nodeName === 'H1'
                ? 'text-sm text-text'
                : el.nodeName === 'H2'
                ? 'text-yellow'
                : el.nodeName === 'H3'
                ? 'text-teal'
                : 'text-blue'
            }`}
          >
            <a
              href={`#${el.id}`}
              className={`${
                el.id === activeId ? 'border-l-4 border-indigo px-3 bg-box' : ''
              } block py-0.5 w-fit cursor-pointer transition-all duration-75`}
            >
              {el.innerHTML}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
