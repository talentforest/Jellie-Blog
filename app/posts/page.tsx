interface Props {
  params: {
    slug: string;
  };
}

export default function PostPage({ params: { slug } }: Props) {
  return <main className='px-4 md:px-20'>{slug} Post Page</main>;
}
