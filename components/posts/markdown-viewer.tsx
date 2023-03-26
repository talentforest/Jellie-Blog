'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkdown
      className='prose max-w-none'
      remarkPlugins={[remarkGfm]}
      includeElementIndex={true}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag='div'
              {...props}
              style={coldarkDark}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`${className} before:hidden after:hidden p-1 text-slate-500 rounded-md bg-gray-200`}
              {...props}
            >
              {children}
            </code>
          );
        },
        img: (image) => (
          <Image
            className='w-full max-h-60 object-cover'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
          />
        ),
        h2: ({ node, title, index, siblingCount, ...props }) => (
          <h2
            className='text-blue-600 mt-10 mb-2 text-xl'
            {...props}
            id={`${index}`}
          />
        ),
        h3: ({ node, index, ...props }) => (
          <h3
            className='text-blue-400 mt-5 mb-2 text-base'
            {...props}
            id={`${index}`}
          />
        ),
        h4: ({ node, index, ...props }) => (
          <h4
            className='text-teal-400 mt-5 mb-2 text-base'
            {...props}
            id={`${index}`}
          />
        ),
        p: ({ node, className, ...props }) => (
          <p className={`${className} leading-7`} {...props} />
        ),
        blockquote: ({ node, className, ...props }) => (
          <blockquote
            className={`${className} text-indigo-500 my-2 border-l-[5px] border-indigo-400`}
            {...props}
          />
        ),
        ul: ({ node, className, ...props }) => (
          <ul className={`${className} `} {...props} />
        ),
        li: ({ node, className, ...props }) => (
          <li
            className={`${className} mb-1  ${
              className?.includes('task-list-item')
                ? 'marker:text-yellow-500'
                : 'marker:text-indigo-500'
            }`}
            {...props}
          />
        ),
        input: ({ node, className, ...props }) => (
          <input className={`${className} my-0 mr-1 mt-1 w-4 h-4`} {...props} />
        ),
        a: ({ node, className, ...props }) => (
          <a className={`${className} text-gray-500 font-medium`} {...props} />
        ),
        del: ({ node, className, ...props }) => (
          <del className={`${className} text-gray-700`} {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
