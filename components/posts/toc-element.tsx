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
      className={`hover:text-indigo w-fit pr-1 ${
        element.nodeName === 'H1'
          ? 'text-sm text-text'
          : element.nodeName === 'H2'
          ? 'text-gray text-xs'
          : element.nodeName === 'H3'
          ? 'text-medium-gray text-[11px] '
          : 'text-slate text-[11px]'
      }`}
    >
      <a
        href={`#${element.id}`}
        className={`${
          element.id === activeId
            ? 'border-l-4 border-light-gray px-2 bg-bg leading-[18px]'
            : 'leading-5'
        } font-bold block w-fit cursor-pointer transition-all duration-75`}
      >
        {element.innerHTML}
      </a>
    </li>
  );
}
