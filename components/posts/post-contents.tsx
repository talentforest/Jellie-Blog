import MarkdownViewer from './markdown-viewer';

interface Props {
  contents: {
    category: string;
    date: string;
    content: string;
    title: string;
  };
}

export default function PostContents({
  contents: { category, title, date, content },
}: Props) {
  return (
    <section className='relative px-4 py-4 bg-box flex flex-col'>
      <span className='block font-sans text-text text-sm self-end mb-6'>
        {new Date(date).toLocaleDateString('ko')}
      </span>
      <h6 className='py-1 px-3 mb-4 rounded-full bg-indigo border border-slate text-white text-xs w-fit'>
        {category}
      </h6>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <MarkdownViewer content={content} />
    </section>
  );
}
