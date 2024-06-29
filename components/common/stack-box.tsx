import StackIcon from './stack-icon';

export default function StackBox({ stack }: { stack: string }) {
  return (
    <li className='flex items-center gap-1.5 bg-hoverbox px-2 py-0.5 border border-light-gray w-fit rounded-md text-sm h-fit'>
      <StackIcon stack={stack} />
      <span>{stack}</span>
    </li>
  );
}
