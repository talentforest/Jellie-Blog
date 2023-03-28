import ScrollToTopBtn from '@/components/common/scroll-to-top-btn';
import MarkdownViewer from '@/components/posts/markdown-viewer';
import ProgressBar from '@/components/posts/progress-bar';
import TableOfContents from '@/components/posts/toc';
import { Categories } from '@/components/home/categorized-posts-section';
import { getMyOwnDoc } from '@/service/my-own-docs';

interface Props {
  params: {
    slug: Categories;
  };
}

export default async function MyOwnDocsPage({ params: { slug } }: Props) {
  const myOwnDoc = await getMyOwnDoc(slug);

  return (
    <>
      <article className='relative'>
        <ProgressBar />
        <section className='px-4 my-3'>
          <h1 className='text-2xl font-bold -mb-8 border-b border-slate py-3'>
            {myOwnDoc.title}
          </h1>
          <MarkdownViewer content={myOwnDoc.content} />
        </section>
      </article>
      <TableOfContents />
      <ScrollToTopBtn />
    </>
  );
}
