'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MdContentPaste } from 'react-icons/md';
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
                style={vscDarkPlus}
                customStyle={{ margin: 0, paddingTop: 20, paddingBottom: 20 }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </>
          ) : (
            <code
              className={`${className} break-all before:hidden after:hidden p-1 border border-slate bg-bg text-text rounded-md`}
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <table className='break-all mt-0'>{children}</table>
        ),
        th: ({ children }) => <th className='text-indigo'>{children}</th>,
        pre: ({ children, ...props }) => (
          <pre className='relative p-0 m-0 mb-2 z-0' {...props}>
            {children}
          </pre>
        ),
        strong: ({ children }) => (
          <strong className='text-teal font-bold'>{children}</strong>
        ),
        img: (image) => (
          <Image
            className='max-h-72 w-auto object-cover my-2'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
          />
        ),
        h2: ({ children }) => (
          <h2
            className='text-yellow mt-8 mb-2 text-[28px]'
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            className='text-blue mt-5 mb-2 text-[24px]'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h3>
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
            className='text-indigo mt-1 border-l-[5px] border-teal [&>p::before]:hidden'
            {...props}
          />
        ),
        input: ({ node, className, ...props }) => (
          <input className={`${className} my-0 mr-1 mt-1 w-4 h-4`} {...props} />
        ),
        a: ({ node, className, ...props }) => (
          <a
            className={`${className} text-slate font-medium`}
            {...props}
            target='_blank'
          />
        ),
        del: ({ node, className, ...props }) => (
          <del className={`${className} text-slate`} {...props} />
        ),
        li: ({ children }) => (
          <li className='marker:text-indigo text-indigo marker:font-bold mt-2 mb-1'>
            {children}
          </li>
        ),
        ol: ({ children, ordered, ...props }) => (
          <ol
            className='marker:text-indigo text-indigo marker:font-bold mt-2 mb-1'
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
