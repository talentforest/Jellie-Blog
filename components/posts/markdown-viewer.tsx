'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkdown
      className='prose max-w-none text-text'
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag='div'
              {...props}
              style={oneDark}
              className='rounded-md'
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`${className} before:hidden after:hidden p-1 text-text border bg-box rounded-md`}
              {...props}
            >
              {children}
            </code>
          );
        },
        th: ({ children }) => <th className='text-indigo'>{children}</th>,
        div: ({ children, ...props }) => (
          <div {...props} style={{ padding: '0', margin: '0' }} />
        ),
        pre: ({ children, ...props }) => (
          <pre className='p-0 my-2' {...props}>
            {children}
          </pre>
        ),
        strong: ({ children }) => (
          <strong className='text-indigo'>{children}</strong>
        ),
        img: (image) => (
          <Image
            className='w-full max-h-60 object-cover my-2'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
          />
        ),
        h2: ({ node, children, title, ...props }) => (
          <h2
            className='text-yellow mt-14 mb-2 text-[22px]'
            {...props}
            id={String(children).replaceAll(' ', '-')}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            className='text-blue mt-5 mb-2 text-lg'
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
        p: ({ node, className, ...props }) => <p {...props} className='mb-0' />,
        blockquote: ({ node, className, ...props }) => (
          <blockquote
            className={`${className} text-indigo my-2 border-l-[5px] border-indigo`}
            {...props}
          />
        ),
        input: ({ node, className, ...props }) => (
          <input className={`${className} my-0 mr-1 mt-1 w-4 h-4`} {...props} />
        ),
        a: ({ node, className, ...props }) => (
          <a className={`${className} text-slate font-medium`} {...props} />
        ),
        del: ({ node, className, ...props }) => (
          <del className={`${className} text-slate`} {...props} />
        ),
        li: ({ children }) => (
          <li className='marker:text-yellow marker:font-bold my-2'>
            {children}
          </li>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
