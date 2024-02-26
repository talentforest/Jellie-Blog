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
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import rehypeCodeTitles from 'rehype-code-titles';
import { RiLink } from 'react-icons/ri';

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
      className='prose overscroll-auto w-full md:w-[72%] shadow-3xl bg-bg rounded-t-[40px] max-w-none text-text relative px-5 md:px-2 pb-20 flex flex-col'
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
          <table className='break-all font-king font-[400] mt-0 text-text bg-box rounded-md px-10'>
            {children}
          </table>
        ),
        th: ({ children }) => (
          <th className='text-blue px-3 py-2'>{children}</th>
        ),
        tr: ({ children }) => <tr className='border-gray'>{children}</tr>,
        td: ({ children }) => <td className='px-3 pt-2 pb-3'>{children}</td>,
        pre: ({ children }) => (
          <pre className='relative p-0 m-0 mb-2 z-0'>{children}</pre>
        ),
        strong: ({ children }) => (
          <strong className='text-indigo font-bold'>{children}</strong>
        ),
        img: (image) => (
          <Image
            className='max-h-80 w-auto object-cover mt-1 mb-2 rounded-md'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
          />
        ),
        h2: ({ children }) => (
          <h2
            className='font-king text-yellow mb-3 text-[26px] pb-2'
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            className='font-king text-teal text-[22px] mb-2'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h3>
        ),
        h4: ({ node, children, ...props }) => (
          <h4
            className='font-king text-slate mb-2 text-lg'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h4>
        ),
        p: ({ node, className, ...props }) => (
          <p {...props} className='mt-1 mb-3 tracking-[0.02em]' />
        ),
        blockquote: ({ node, className, children, ...props }) => (
          <blockquote
            {...props}
            className='text-text bg-box mt-1 mb-3 pt-4 pb-3 px-4 border-l-0 rounded-xl [&>p::before]:hidden [&>p]:my-0 not-italic'
          >
            <span className='float-left not-italic mr-2 text-lg'>💡</span>{' '}
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
          <li className='marker:text-text marker:font-bold my-1.5 [&>p]:my-1.5'>
            {children}
          </li>
        ),
        ol: ({ children, ordered, ...props }) => (
          <ol
            className='marker:text-text marker:font-bold mt-2 mb-4'
            {...props}
          >
            {children}
          </ol>
        ),
        ul: ({ children }) => <ul className='mt-0 mb-1.5 pl-5'>{children}</ul>,
        hr: ({ children }) => <hr className='my-3 border-gray'>{children}</hr>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
