export default function SkeletonBox({ height = 60 }: { height?: number }) {
  return (
    <div
      className={`lg:h-${height} h-fit bg-box shadow rounded-2xl p-4 w-full mx-auto`}
    >
      <div className='animate-pulse flex flex-col lg:flex-row lg:space-x-4 h-full'>
        <div className='rounded-xl bg-light-gray lg:w-1/3 w-full h-44 lg:h-full' />

        <div className='flex-1 space-y-2 py-4 lg:py-1 justify-between flex flex-col'>
          <div className='h-6 w-1/2 bg-light-gray rounded-full' />
          <div className='h-6 w-full bg-light-gray rounded-md' />
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
