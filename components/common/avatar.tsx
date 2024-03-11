import Image from 'next/image';

interface Props {
  width?: number;
  height?: number;
}

export default function Avatar({ width = 150, height = 150 }: Props) {
  return (
    <Image
      src='/images/about/avatar.png'
      alt='avatar'
      width={width}
      height={height}
      priority
      className='border border-gray bg-box object-cover rounded-full shadow-sm justify-center items-center'
    />
  );
}
