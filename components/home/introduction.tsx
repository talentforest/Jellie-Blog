'use client';

import { Fragment, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { ImArrowUpRight2 } from 'react-icons/im';
import { LuCopy } from 'react-icons/lu';
import { FaCheck } from 'react-icons/fa6';
import Avatar from '../common/avatar';

interface Props {
  introduction?: string;
  extraData?: boolean;
}

const email = 'talentforest0501@gmail.com';

const introductionData = [
  {
    type: 'Email',
    title: 'Jellie의 이메일 주소',
    href: email,
  },
  {
    type: 'GitHub',
    title: 'Jellie의 깃헙 페이지',
    href: 'https://github.com/talentforest',
  },
];

export default function Introduction({
  extraData = false,
  introduction,
}: Props) {
  const [showPasteMsg, setShowPasteMsg] = useState(false);

  const iconCommonStyle = 'text-gray w-5 h-5 mr-1';

  const dataBoxCommonStyle =
    'border border-light-gray hover:border-light-yellow group w-64 cursor-pointer hover:-translate-y-0.5 transition flex items-center px-2 py-1 bg-box rounded-lg';

  const titleCommonStyle = 'flex-1 text-[13px] text-light-blue mt-0.5 mr-3';

  const onEmailClick = async () => {
    if (showPasteMsg) return;

    try {
      await navigator.clipboard.writeText(email);

      setShowPasteMsg(true);

      setTimeout(() => {
        setShowPasteMsg(false);
      }, 2000);
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <section className='w-full my-10 px-4 flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center md:px-6'>
      <Avatar />

      <div className='mt-4 flex-1 items-center justify-center flex flex-col md:ml-5 md:items-start'>
        <h3 className='font-normal'>🌼 젤리 🌼</h3>
        <p className='text-[15px] leading-6 m-4 tracking-wide text-center md:text-start'>
          개발을 통해 재미있는 프로젝트를 만들며 성장하는 프론트엔드 개발자
          젤리입니다. {introduction}
        </p>

        {extraData && (
          <ul className='relative flex flex-col items-center justify-center gap-2 pl-1 mt-4'>
            {showPasteMsg && (
              <div className='border absolute -top-7 flex border-medium-gray bg-box px-2 pb-0.5 pt-1 rounded-lg'>
                <FaCheck className='text-teal mr-1 w-3.5 h-3.5' />
                <span className='text-xs text-gray'>
                  이메일 주소가 복사되었습니다!
                </span>
              </div>
            )}
            {introductionData.map((info) => (
              <Fragment key={info.type}>
                {info.type === 'GitHub' ? (
                  <a
                    title={info.title}
                    href={info.href}
                    target='_blank'
                    className={`${dataBoxCommonStyle}`}
                  >
                    <FaGithub className={`${iconCommonStyle}`} />
                    <span className={`${titleCommonStyle}`}>{info.title}</span>
                    <ImArrowUpRight2 className='w-3 h-3 text-light-blue group-hover:text-blue ' />
                  </a>
                ) : (
                  <button
                    className={`${dataBoxCommonStyle}`}
                    onClick={onEmailClick}
                  >
                    <HiOutlineMail className={`${iconCommonStyle}`} />
                    <span className={`${titleCommonStyle}`}>{info.href}</span>

                    <LuCopy className='w-3.5 h-3.5 text-light-blue group-hover:text-blue' />
                  </button>
                )}
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
