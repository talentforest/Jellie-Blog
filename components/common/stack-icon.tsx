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
  SiPwa,
  SiExpo,
  SiCss3,
} from 'react-icons/si';

export default function StackIcon({ stack }: { stack: string }) {
  return (
    <>
      {stack === 'next.js' ? (
        <SiNextdotjs fontSize={14} className='text-text' />
      ) : stack === 'expo' ? (
        <SiExpo fontSize={13} className='text-text' />
      ) : stack === 'styled-components' ? (
        <SiStyledcomponents fontSize={14} className='text-[#DB7093]' />
      ) : stack === 'recoil' ? (
        <SiRecoil fontSize={14} className='text-[#3578E5]' />
      ) : stack === 'react' || stack === 'react-native' ? (
        <SiReact fontSize={14} className='text-[#61DAFB]' />
      ) : stack === 'axios' ? (
        <SiAxios fontSize={14} className='text-[#5A29E4]' />
      ) : stack === 'swr' ? (
        <SiSwr fontSize={14} />
      ) : stack === 'typescript' ? (
        <SiTypescript fontSize={14} className='text-[#3178C6]' />
      ) : stack === 'tailwindcss' ? (
        <SiTailwindcss fontSize={14} className='text-[#06B6D4]' />
      ) : stack === 'react-query' ? (
        <SiReactquery fontSize={14} className='text-[#FF4154]' />
      ) : stack === 'framer-motion' ? (
        <SiFramer fontSize={14} className='text-[#0055FF]' />
      ) : stack === 'sass' ? (
        <SiSass fontSize={14} className='text-[#CC6699]' />
      ) : stack === 'redux-toolkit' ? (
        <SiRedux fontSize={14} className='text-[#764ABC]' />
      ) : stack === 'firebase' ? (
        <SiFirebase fontSize={14} className='text-[#FFCA28]' />
      ) : stack === 'javascript' ? (
        <SiJavascript fontSize={14} className='text-[#FFCA28]' />
      ) : stack === 'pwa' ? (
        <SiPwa fontSize={14} className='text-[##5A0FC8]' />
      ) : stack === 'css' ? (
        <SiCss3 fontSize={14} className='text-[#1572B6]' />
      ) : (
        <></>
      )}
    </>
  );
}
