interface Props {
  content: string;
}

export default function EmptyBox({ content }: Props) {
  return (
    <div className='border w-full md:col-span-2 rounded-lg bg-white dark:border-slate-500 dark:bg-slate-800 flex items-center justify-center h-28 text-sm'>
      아직 해당 카테고리로 작성된 {content}가 없습니다
    </div>
  );
}
