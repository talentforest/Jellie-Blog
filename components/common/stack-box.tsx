import {
  SiNextdotjs,
  SiStyledcomponents,
  SiRecoil,
  SiReact,
  SiAxios,
  SiSwr,
  SiTypescript,
  SiTailwindcss,
  SiReactquery,
  SiFramer,
  SiSass,
  SiRedux,
  SiFirebase,
} from 'react-icons/si';

export default function StackBox({ stack }: { stack: string }) {
  return (
    <li className='flex items-center gap-1.5 bg-bg px-2.5 py-1 border border-slate w-fit rounded-md text-slate group-hover:text-text text-sm h-fit'>
      {stack === 'next.js' ? (
        <SiNextdotjs fontSize={13} />
      ) : stack === 'styled-components' ? (
        <SiStyledcomponents
          fontSize={13}
          className='group-hover:text-[#DB7093]'
        />
      ) : stack === 'recoil' ? (
        <SiRecoil fontSize={13} className='group-hover:text-[#3578E5]' />
      ) : stack === 'react' ? (
        <SiReact fontSize={13} className='group-hover:text-[#61DAFB]' />
      ) : stack === 'axios' ? (
        <SiAxios fontSize={13} className='group-hover:text-[#5A29E4]' />
      ) : stack === 'swr' ? (
        <SiSwr fontSize={13} />
      ) : stack === 'typescript' ? (
        <SiTypescript fontSize={13} className='group-hover:text-[#3178C6]' />
      ) : stack === 'tailwindcss' ? (
        <SiTailwindcss fontSize={13} className='group-hover:text-[#06B6D4]' />
      ) : stack === 'react-query' ? (
        <SiReactquery fontSize={13} className='group-hover:text-[#FF4154]' />
      ) : stack === 'framer-motion' ? (
        <SiFramer fontSize={13} className='group-hover:text-[#0055FF]' />
      ) : stack === 'sass' ? (
        <SiSass fontSize={13} className='group-hover:text-[#CC6699]' />
      ) : stack === 'redux-toolkit' ? (
        <SiRedux fontSize={13} className='group-hover:text-[#764ABC]' />
      ) : stack === 'firebase' ? (
        <SiFirebase fontSize={13} className='group-hover:text-[#FFCA28]' />
      ) : (
        <></>
      )}
      <span>{stack}</span>
    </li>
  );
}
