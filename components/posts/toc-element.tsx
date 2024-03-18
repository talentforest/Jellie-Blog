interface Props {
  element: Element;
  activeId: string;
}

export default function TocElement({ element, activeId }: Props) {
  return (
    <li
      style={{
        paddingLeft: `${(+element.nodeName.slice(-1) - 2) * 1.3}rem`,
      }}
      className={`hover:text-indigo w-fit pr-1 leading-5 ${
        element.nodeName === 'H1'
          ? 'text-sm text-text'
          : element.nodeName === 'H2'
          ? 'text-yellow text-xs'
          : element.nodeName === 'H3'
          ? 'text-slate text-[11px] '
          : 'text-slate text-[11px]'
      }`}
    >
      <a
        href={`#${element.id}`}
        className={`${
          element.id === activeId ? ' px-2 bg-bg' : ''
        } font-king font-bold block w-fit cursor-pointer transition-all duration-75`}
      >
        {element.innerHTML}
      </a>
    </li>
  );
}
