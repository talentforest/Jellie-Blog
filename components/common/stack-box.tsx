import StackIcon from './stack-icon';

export default function StackBox({ stack }: { stack: string }) {
  return (
    <li className=' flex items-center gap-1.5 bg-bg px-2.5 py-1 border border-slate w-fit rounded-md text-slate group-hover:text-text text-sm h-fit'>
      <StackIcon stack={stack} />
      <span>{stack}</span>
    </li>
  );
}
