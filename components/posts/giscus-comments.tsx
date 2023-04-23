'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function GiscusComments() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      id='comments'
      repo={'talentforest/Jellie-Blog'}
      repoId={'R_kgDOJMVXxw'}
      category='General'
      categoryId='DIC_kwDOJMVXx84CViy4'
      mapping='pathname'
      term='welcome'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang='ko'
    />
  );
}
