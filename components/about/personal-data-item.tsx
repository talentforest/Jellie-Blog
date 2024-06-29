'use client';

import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { ImArrowUpRight2 } from 'react-icons/im';
import { LuCopy } from 'react-icons/lu';
import { FaCheck } from 'react-icons/fa6';

interface Props {
  type: string;
  title: string;
  link: string;
}

export default function PersonalDataItem({ type, title, link }: Props) {
  const [showPasteMsg, setShowPasteMsg] = useState(false);

  const onEmailClick = async () => {
    if (showPasteMsg) return;

    try {
      await navigator.clipboard.writeText(link);
      setShowPasteMsg(true);
      setTimeout(() => {
        setShowPasteMsg(false);
      }, 2000);
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  const iconCommonStyle = 'text-gray mr-1 w-5 h-5';

  const dataBoxCommonStyle =
    'border border-light-gray hover:border-light-yellow group w-64 cursor-pointer hover:-translate-y-0.5 transition flex items-center px-2 py-1 bg-box rounded-lg';

  const titleCommonStyle =
    'group-hover:text-blue flex-1 text-[13px] text-light-blue mt-0.5 mr-3';

  return (
    <>
      {type === 'GitHub' && (
        <a
          title={title}
          href={link}
          target='_blank'
          className={dataBoxCommonStyle}
        >
          <FaGithub className={`${iconCommonStyle} p-[1px]`} />
          <span className={titleCommonStyle}>{title}</span>
          <ImArrowUpRight2 className='w-3 h-3 text-light-blue group-hover:text-blue ' />
        </a>
      )}

      {type === 'Email' && (
        <>
          <button className={dataBoxCommonStyle} onClick={onEmailClick}>
            <HiOutlineMail className={iconCommonStyle} />
            <span className={`${titleCommonStyle}`}>{link}</span>
            <LuCopy className='w-3.5 h-3.5 text-light-blue group-hover:text-blue' />
          </button>

          {showPasteMsg && (
            <div className='border absolute -top-7 flex border-medium-gray bg-box px-2 pb-0.5 pt-1 rounded-lg'>
              <FaCheck className='text-teal mr-1 w-3.5 h-3.5' />
              <span className='text-xs text-gray'>
                이메일 주소가 복사되었습니다!
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
}
