import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MdContentPaste } from 'react-icons/md';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';

interface Props {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: Props) {
  const [isOpenCodeCopyModal, setIsOpenCodeCopyModal] = useState(false);

  const copyCodeBlock = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setIsOpenCodeCopyModal(true);
          setTimeout(() => {
            setIsOpenCodeCopyModal(false);
          }, 800);
        })
        .catch(() => alert('복사를 다시 시도해주세요.'));
    }
  };

  return (
    <>
      <SyntaxHighlighter
        language={language}
        PreTag='div'
        codeTagProps={{ className: 'text-[15px]' }}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          paddingTop: 15,
          paddingBottom: 15,
          borderRadius: 0,
          borderWidth: 0,
        }}
      >
        {children}
      </SyntaxHighlighter>

      <div className='absolute bottom-2 right-4 h-5 w-5'>
        {isOpenCodeCopyModal ? (
          <FaCircleCheck className='w-5 h-5 text-indigo transition' />
        ) : (
          <button onClick={() => copyCodeBlock(children)}>
            <MdContentPaste className='w-5 h-5 text-slate hover:text-light-yellow hover:scale-105 transition' />
          </button>
        )}
      </div>
    </>
  );
}
