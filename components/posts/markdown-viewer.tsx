'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import rehypeCodeTitles from 'rehype-code-titles';
import CodeBlock from './code-block';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkdown
      className='[&>*:first-child]:m-0 pt-10 prose overscroll-auto w-full lg:w-[76%] shadow-3xl max-w-none text-text px-5 md:px-0 pb-20 flex flex-col'
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeCodeTitles]}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock language={match[1]}>
              {String(children).replace(/\n$/, '')}
            </CodeBlock>
          ) : (
            <code
              className={`before:hidden after:hidden py-1 px-1.5 mr-0.5 bg-light-gray text-[0.9em] text-[#ff5b5b] rounded-[5px]`}
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className='relative p-0 m-0 mb-4'>{children}</pre>
        ),
        table: ({ children }) => (
          <table className='break-all mt-2 mb-4 text-text bg-lightest-gray rounded-md px-10'>
            {children}
          </table>
        ),
        th: ({ children }) => <th className='text-blue p-2'>{children}</th>,
        tr: ({ children }) => <tr>{children}</tr>,
        td: ({ children }) => {
          return children?.includes('<li>') || children?.includes('<br/>') ? (
            <td
              className='p-2 leading-7 text-[14px] [&>ul]:my-0 [&>ul]:pl-4 [&>ul>li]:my-1.5 [&>ul>li]:pl-1'
              dangerouslySetInnerHTML={{ __html: children.join('') }}
            />
          ) : (
            <td className='p-2 leading-7 text-[14px] [&>ul]:my-0 [&>ul]:pl-4 [&>ul>li]:my-1.5 [&>ul>li]:pl-1'>
              {children}
            </td>
          );
        },
        strong: ({ children }) => (
          <strong className='relative'>
            <span className='relative align-middle text-blue px-0.5 pb-[0.5px] bg-[#489afd1d]'>
              {children}
            </span>
          </strong>
        ),
        img: (image) => (
          <Image
            className='max-h-80 md:max-h-[450px] w-auto object-cover mt-1 mb-4 rounded-md'
            src={(image.src || '').slice(7)}
            alt={image.alt || ''}
            width={500}
            height={500}
          />
        ),
        h2: ({ children }) => (
          <h2
            className='[&+*]:mt-3 text-[30px] text-blue mt-16 mb-0'
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            className='[&+*]:mt-3 text-[23px] text-sky-blue mt-10 mb-0'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h3>
        ),
        h4: ({ node, children, ...props }) => (
          <h4
            className='[&+*]:mt-3 text-[20px] text-light-blue mt-3 mb-0'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h4>
        ),
        p: ({ node, className, ...props }) => (
          <p
            {...props}
            className='mt-3 mb-5 tracking-[0.02em] [&+ul]:mt-0 break-words'
          />
        ),
        blockquote: ({ node, className, children, ...props }) => (
          <blockquote
            {...props}
            className='text-text bg-lightest-gray mt-2 px-4 py-3 mb-3 border-0 rounded-xl [&>ol]:my-0 [&>ul]:my-0 [&>ol>li:last-child]:mb-0 [&>ul>li:last-child]:mb-0 [&>p::before]:hidden [&>p]:my-0 [&>p]:py-0.5 not-italic'
          >
            <span className='float-left mr-2 text-lg mt-0.5'>💡</span>
            {children}
          </blockquote>
        ),
        input: ({ node, className, ...props }) => (
          <input className={`${className} my-0 mr-1 mt-1 w-4 h-4`} {...props} />
        ),
        a: ({ node, className, children, ...props }) => (
          <a
            className={`${className} inline-block font-normal tracking-tight break-words text-medium-gray`}
            target='_blank'
            {...props}
          >
            {children}
          </a>
        ),
        del: ({ node, className, ...props }) => (
          <del className={`${className} text-slate`} {...props} />
        ),
        li: ({ children }) => (
          <li className='marker:text-text mt-1.5 mb-3.5 [&>a]:my-0 [&>p]:my-2 [&>p::before]:hidden [&>p::after]:hidden'>
            {children}
          </li>
        ),
        ol: ({ children, ordered, ...props }) => (
          <ol className='marker:text-text mt-2 mb-0' {...props}>
            {children}
          </ol>
        ),
        ul: ({ children }) => (
          <ul className='marker:text-text mt-2 mb-0 pl-5'>{children}</ul>
        ),
        hr: ({ children }) => (
          <hr className='my-5 border-light-gray'>{children}</hr>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
