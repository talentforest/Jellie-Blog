'use client';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkdown
      className='prose max-w-none text-text relative p-4 bg-box md:rounded-b-xl flex flex-col'
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag='div'
              {...props}
              style={okaidia}
              className='rounded-md'
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`${className} break-all before:hidden after:hidden p-1 border border-slate bg-bg text-text rounded-md`}
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
          <p {...props} className='mt-1 mb-3' />
        ),
        blockquote: ({ node, className, ...props }) => (
          <blockquote
            className='text-teal my-2 border-l-[5px] border-teal'
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
          <li className='marker:text-yellow marker:font-bold mt-1 mb-3'>
            {children}
          </li>
        ),
        ol: ({ children, ordered, ...props }) => (
          <ol
            className='marker:text-yellow marker:font-bold mb-2 mt-0'
            {...props}
          >
            {children}
          </ol>
        ),
        ul: ({ children }) => <ul className='my-0 pl-5'>{children}</ul>,
        hr: ({ children }) => <hr className='my-3 border-slate'>{children}</hr>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
