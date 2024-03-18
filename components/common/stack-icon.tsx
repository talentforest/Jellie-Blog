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
  SiJavascript,
} from 'react-icons/si';

export default function StackIcon({ stack }: { stack: string }) {
  return (
    <>
      {stack === 'next.js' ? (
        <SiNextdotjs fontSize={13} className='text-text' />
      ) : stack === 'styled-components' ? (
        <SiStyledcomponents fontSize={13} className='text-[#DB7093]' />
      ) : stack === 'recoil' ? (
        <SiRecoil fontSize={13} className='text-[#3578E5]' />
      ) : stack === 'react' ? (
        <SiReact fontSize={13} className='text-[#61DAFB]' />
      ) : stack === 'axios' ? (
        <SiAxios fontSize={13} className='text-[#5A29E4]' />
      ) : stack === 'swr' ? (
        <SiSwr fontSize={13} />
      ) : stack === 'typescript' ? (
        <SiTypescript fontSize={13} className='text-[#3178C6]' />
      ) : stack === 'tailwindcss' ? (
        <SiTailwindcss fontSize={13} className='text-[#06B6D4]' />
      ) : stack === 'react-query' ? (
        <SiReactquery fontSize={13} className='text-[#FF4154]' />
      ) : stack === 'framer-motion' ? (
        <SiFramer fontSize={13} className='text-[#0055FF]' />
      ) : stack === 'sass' ? (
        <SiSass fontSize={13} className='text-[#CC6699]' />
      ) : stack === 'redux-toolkit' ? (
        <SiRedux fontSize={13} className='text-[#764ABC]' />
      ) : stack === 'firebase' ? (
        <SiFirebase fontSize={13} className='text-[#FFCA28]' />
      ) : stack === 'javascript' ? (
        <SiJavascript fontSize={13} className='text-[#FFCA28]' />
      ) : (
        <></>
      )}
    </>
  );
}
