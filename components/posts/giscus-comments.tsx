'use client';

import Giscus from '@giscus/react';

export default function GiscusComments() {
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
      theme='dark'
      lang='ko'
    />
  );
}
