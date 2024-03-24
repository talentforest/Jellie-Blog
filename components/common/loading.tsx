export default function Loading({ height = 40 }: { height?: number }) {
  return (
    <div className={`h-${height} bg-box shadow rounded-2xl p-4 w-full mx-auto`}>
      <div className='animate-pulse flex space-x-4 h-full'>
        <div className='rounded-xl bg-light-gray w-1/3'></div>

        <div className='flex-1 space-y-2 py-1 justify-between flex flex-col'>
          <div className='h-6 w-1/2 bg-light-gray rounded-full' />
          <div className='h-6 w-full bg-light-gray rounded-md' />
          <div className='h-6 w-full bg-light-gray rounded-md' />
          <div className='flex gap-2 md:w-3/4'>
            <div className='h-5 w-full bg-light-gray rounded-md' />
            <div className='h-5 w-full bg-light-gray rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
}
