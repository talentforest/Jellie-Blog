'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MdContentPaste } from 'react-icons/md';
import { RiLink } from 'react-icons/ri';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import rehypeCodeTitles from 'rehype-code-titles';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  const copyCodeBlock = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {
        alert('복사를 다시 시도해주세요.');
      });
    }
  };

  return (
    <ReactMarkdown
      className='[&>*:first-child]:mt-0 prose overscroll-auto w-full md:w-[72%] shadow-3xl bg-bg max-w-none text-text relative px-5 md:px-0 pb-20 flex flex-col'
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeCodeTitles]}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <>
              <button
                onClick={() => {
                  copyCodeBlock(String(children).replace(/\n$/, ''));
                }}
                className='z-10 absolute right-2 bottom-2 text-slate hover:text-white transition'
              >
                <MdContentPaste className='h-5 w-5' />
              </button>

              <SyntaxHighlighter
                language={match[1]}
                PreTag='div'
                style={oneDark}
                customStyle={{
                  margin: 0,
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderRadius: 0,
                  borderWidth: 0,
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </>
          ) : (
            <code
              className={`${className} before:hidden after:hidden py-1 px-1.5 border border-box bg-gray text-[13px] text-[#ff5b5b] rounded-md`}
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <table className='break-all font-king font-[400] mt-2 mb-4 text-text bg-box rounded-md px-10'>
            {children}
          </table>
        ),
        th: ({ children }) => (
          <th className='text-blue px-3 py-2'>{children}</th>
        ),
        tr: ({ children }) => <tr className=''>{children}</tr>,
        td: ({ children }) => {
          return (
            <td
              className='px-3 py-2 leading-7 text-[15px] [&>ul]:my-0 [&>ul]:pl-4 [&>ul>li]:my-1.5 [&>ul>li]:pl-1'
              dangerouslySetInnerHTML={{ __html: children?.join('') }}
            />
          );
        },
        pre: ({ children }) => (
          <pre className='relative p-0 m-0 mb-2 z-0'>{children}</pre>
        ),
        strong: ({ children }) => (
          <strong className='text-indigo font-bold'>{children}</strong>
        ),
        img: (image) => (
          <Image
            className='max-h-80 w-auto object-cover mt-1 mb-4 rounded-md'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
          />
        ),
        h2: ({ children }) => (
          <h2
            className='[&:first-child]:border-indigo font-king text-yellow mt-16 mb-1 text-[28px]'
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            className='font-king text-slate text-[22px] mt-6 mb-2'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h3>
        ),
        h4: ({ node, children, ...props }) => (
          <h4
            className='font-king text-slate mb-2 text-xl'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h4>
        ),
        p: ({ node, className, ...props }) => (
          <p {...props} className='mt-3 mb-5 tracking-[0.02em] ' />
        ),
        blockquote: ({ node, className, children, ...props }) => (
          <blockquote
            {...props}
            className='text-text bg-box mt-2 px-4 py-3 mb-3 border-0 rounded-xl [&>ol]:my-0 [&>ul]:my-0 [&>ol>li:last-child]:mb-0 [&>ul>li:last-child]:mb-0 [&>p::before]:hidden [&>p]:my-0 [&>p]:py-0.5 not-italic'
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
            className={`${className} w-fit inline-block font-mono tracking-tighter font-thin text-slate`}
            target='_blank'
            {...props}
          >
            <RiLink className='text-slate mt-1.5 mr-0.5 float-left' />
            {children}
          </a>
        ),
        del: ({ node, className, ...props }) => (
          <del className={`${className} text-slate`} {...props} />
        ),
        li: ({ children }) => (
          <li className='marker:text-text marker:font-bold my-1.5 [&>a]:my-0 [&>p]:my-1.5'>
            {children}
          </li>
        ),
        ol: ({ children, ordered, ...props }) => (
          <ol
            className='marker:text-text marker:font-bold mt-1 mb-4'
            {...props}
          >
            {children}
          </ol>
        ),
        ul: ({ children }) => (
          <ul className='marker:text-text marker:font-bold mt-1 mb-4 pl-5'>
            {children}
          </ul>
        ),
        hr: ({ children }) => <hr className='my-3 border-gray'>{children}</hr>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
