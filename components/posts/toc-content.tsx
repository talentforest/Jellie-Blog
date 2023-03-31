interface Props {
  headingEls: Element[];
}

export default function TocContent({ headingEls }: Props) {
  return (
    <>
      <h1 className='mb-2 text-lg'># TOC</h1>
      <ul className='flex flex-col space-y-2'>
        {headingEls.map((el, index) => (
          <li
            key={index}
            style={{
              paddingLeft: `${(+el.attributes[1].value - 1) * 1.2}rem`,
              cursor: 'pointer',
            }}
            className={`${
              el.nodeName === 'H2' ? 'text-yellow text-sm' : 'text-text text-xs'
            } hover:text-slate`}
          >
            <a href={`#${el.id}`} className='block py-1'>
              {el.innerHTML}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
