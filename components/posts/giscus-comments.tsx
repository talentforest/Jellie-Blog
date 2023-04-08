'use client';

import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function GiscusComments() {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark');
    darkMode ? setDarkTheme(true) : setDarkTheme(false);
  }, []);

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
      theme={darkTheme ? 'dark' : 'light'}
      lang='ko'
    />
  );
}
