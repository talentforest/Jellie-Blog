'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import {
  oneLight,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { MdContentPaste } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import rehypeCodeTitles from 'rehype-code-titles';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  const { theme } = useTheme();

  const copyCodeBlock = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {
        alert('복사를 다시 시도해주세요.');
      });
    }
  };

  return (
    <ReactMarkdown
      className='prose max-w-none text-text relative px-4 pt-4 pb-20 bg-box md:rounded-b-xl flex flex-col'
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
                style={theme === 'light' ? oneLight : vscDarkPlus}
                customStyle={{
                  margin: 0,
                  paddingTop: 25,
                  paddingBottom: 25,
                  borderRadius: 0,
                  borderWidth: 0,
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </>
          ) : (
            <code
              className={`${className} before:hidden after:hidden py-1.5 px-2 border border-gray bg-bg text-[13px] text-slate rounded-md`}
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <table className='break-all mt-0 bg-bg rounded-md px-10'>
            {children}
          </table>
        ),
        th: ({ children }) => <th className='text-indigo p-2'>{children}</th>,
        tr: ({ children }) => <tr className='border-gray'>{children}</tr>,
        td: ({ children }) => <td className='p-2'>{children}</td>,
        pre: ({ children }) => (
          <pre className='relative p-0 m-0 mb-2 z-0'>{children}</pre>
        ),
        strong: ({ children }) => (
          <strong className='text-teal font-bold'>{children}</strong>
        ),
        img: (image) => (
          <Image
            className='max-h-80 w-auto object-cover my-1'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
          />
        ),
        h2: ({ children }) => (
          <>
            <BsStars className='w-4 h-4 mt-12 mb-1 text-light-yellow' />
            <h2
              className='text-yellow mt-0 mb-2 text-[28px] border-b border-b-light-yellow pb-3'
              id={String(children).replaceAll(' ', '-')}
            >
              {children}
            </h2>
          </>
        ),
        h3: ({ node, children, ...props }) => (
          <>
            <BsStars className='w-3 h-3 mt-12 text-blue' />
            <h3
              className='text-blue mt-0 mb-3 text-[22px] border-b border-b-blue pb-2'
              {...props}
              id={String(children).replaceAll(' ', '-')}
            >
              {children}
            </h3>
          </>
        ),
        h4: ({ node, children, ...props }) => (
          <h4
            className='text-indigo mt-5 mb-0 text-base'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h4>
        ),
        p: ({ node, className, ...props }) => (
          <p {...props} className='mt-1 mb-5' />
        ),
        blockquote: ({ node, className, ...props }) => (
          <blockquote
            {...props}
            className='text-text bg-bg mt-1 py-3 border-l-4 rounded-r-md border-slate [&>p::before]:hidden [&>p]:my-0 [&>p]:not-italic'
          />
        ),
        input: ({ node, className, ...props }) => (
          <input className={`${className} my-0 mr-1 mt-1 w-4 h-4`} {...props} />
        ),
        a: ({ node, className, ...props }) => (
          <a
            className={`${className} text-slate font-light`}
            {...props}
            target='_blank'
          />
        ),
        del: ({ node, className, ...props }) => (
          <del className={`${className} text-slate`} {...props} />
        ),
        li: ({ children }) => (
          <li className='marker:text-indigo marker:font-bold my-3 [&>p]:my-0'>
            {children}
          </li>
        ),
        ol: ({ children, ordered, ...props }) => (
          <ol
            className='marker:text-indigo marker:font-bold mt-2 mb-4'
            {...props}
          >
            {children}
          </ol>
        ),
        ul: ({ children }) => <ul className='my-0 pl-5'>{children}</ul>,
        hr: ({ children }) => <hr className='my-3 border-gray'>{children}</hr>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
