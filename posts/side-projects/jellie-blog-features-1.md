## Markdown 기능

- 사용한 라이브러리: react-markdown, react-syntax-highlighter, tailwindcss

react-markdown을 통해 마크다운을 element로 렌더링 해주는 컴포넌트를 만들었다. 적용한 코드는 아래와 같다. 물론 components props에 커스텀한 컴포넌트를 더 추가했지만 아래에서는 react-markdown에서 제공해주는 코드 블럭 적용 예시이다.

```tsx
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export default function MarkdownViewer({ content }: Props) {
  return (
    <ReactMarkdown
      className='prose'
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag='div'
              {...props}
              style={okaidia}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

클래스네임 `prose`는 tailwindcss에서 제공해주는 플러그인으로 텍스트의 가독성과 일관성을 높이기 위해 디자인된 클래스이다. 텍스트의 행간, 글꼴 크기, 여백 등 콘텐츠 요소들을 자동으로 지정해주어서 적용했다.

코드 블럭 같은 경우 위와 같이 적용했고, 만약 다른 요소들도 좀 더 커스텀하고 싶은 경우 아래와 같이 components props에 추가하면 된다. 나는 tailwindcss로 클래스네임을 추가해 좀 더 커스텀했다.

```tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    strong: ({ children }) => (
      // ✅ 클래스네임 추가로 커스텀
      <strong className='text-teal font-bold'>{children}</strong>
    ),
  }}
>
  {contents}
</ReactMarkdown>
```

더 자세한 내용은 [여기 react-markdown 공식문서](https://github.com/remarkjs/react-markdown)에서 볼 수 있고, 코드 블럭 스타일은 [여기 코드 블럭 스타일 목록 문서](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD)을 확인할 수 있다.

사실 이부분은 라이브러리를 설치하고 공식문서만 잘 읽으면 쉽게 적용할 수 있는 부분이어서 더 설명할 것은 없는 것 같다 😊

## Progress bar 기능

- 사용한 라이브러리 : 없음

다음 기능은 포스트 페이지에서 스크롤을 내릴수록 0퍼센트에서 100퍼센트까지 올라가는 **스크롤 진행률 바**를 만들었다.

이 페이지 위에 바로 볼 수 있어서 따로 이미지 첨부는 안해도 될 것 같다.

아래는 실제 적용한 코드이다.

1.  `useEffect`로 첫렌더링되었을 때 스크롤 이벤트를 등록한다.

    ```tsx
    export default function ProgressBar() {
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      //...
    }
    ```

2.  그럼 스크롤 할 때마다 실행할 `handleScroll` 함수와 상태 관리할 useState를 작성한다.

    ```tsx
    export default function ProgressBar() {
      const [width, setWidth] = useState(0);

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const { scrollHeight, clientHeight } = document.documentElement;
        if (scrollY === 0) return setWidth(0);

        // ✅ 최대로 스크롤할 수 있는 값
        const windowHeight = scrollHeight - clientHeight;

        // ✅ 현재 스크롤 위치 / 최대 스크롤 값
        const currentPercent = scrollY / windowHeight;

        // ✅ 상태 관리로 업데이트
        setWidth(currentPercent * 100);
      };

      //....
    }
    ```

    - `handleScroll` 함수에서는 `document.documentElement`을 통해 html상의 scrollTop, scrollHeight, clientHeight을 통해 현재 퍼센트를 계산한다.

    - `window.scrollY` : 페이지의 가장 최상단부터 현재 화면에 보이는 부분까지 얼마나 스크롤 됐는지 높이 반환
    - `element.scrollHeight` : 스크롤할 수 있는 요소의 총 높이
    - `element.clientHeight` : 현재 화면에서 보이는 높이

    여기서 최대로 스크롤할 수 있는 값은 scrollHeight가 아니라, 현재 화면 높이를 뺀 값이다.

    그럼 현재까지 스크롤 한 값인 scrollY와 최대 스크롤 할 수 있는 값인 scrollHeight - clientHeight를 나눠 100을 곱하면 현재 스크롤 진행률 값이 나온다. 이 값을 `useState`로 저장하여 업데이트한다.

3.  스크롤 할 때마다 매번 실행되면 성능상의 이슈가 있을 수 있으므로, `throttle` 함수를 적용해서 0.2s에 한번만 실행되도록 만든다.

    ```tsx
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY;
      const { scrollHeight, clientHeight } = document.documentElement;
      if (scrollY === 0) return setWidth(0);

      // ✅ 최대로 스크롤할 수 있는 값
      const windowHeight = scrollHeight - clientHeight;

      // ✅ 현재 스크롤 위치 / 최대 스크롤 값
      const currentPercent = scrollY / windowHeight;

      // ✅ 상태 관리로 업데이트
      setWidth(currentPercent * 100);
    }, 200);
    ```

    ```ts
    export const throttle = (func: () => void, delay: number) => {
      let inProgress = false;
      return () => {
        if (inProgress) return;
        inProgress = true;
        setTimeout(() => {
          func();
          inProgress = false;
        }, delay);
      };
    };
    ```

    클로저를 이용해 만든 throttle 함수이다.

    그럼 완성!

전체 코드는 아래와 같다.

```tsx
'use client';

import { throttle } from '@/util/throttle';
import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  const handleScroll = throttle((): void => {
    const scrollY = window.scrollY;
    const { scrollHeight, clientHeight } = document.documentElement;
    if (scrollY === 0) return setWidth(0);
    const windowHeight = scrollHeight - clientHeight;
    const currentPercent = scrollY / windowHeight;
    setWidth(currentPercent * 100);
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='sticky w-full top-12 md:top-14 h-3 z-10 bg-slate border-slate'>
      <div
        style={{ width: width + '%' }}
        className='transition-all h-full rounded-r-md px-1 bg-indigo text-[10px] text-white'
      >
        {width.toFixed()}%
      </div>
    </div>
  );
}
```

확실히 스크롤 진행률이 한눈에 보이니까 얼마나 읽었는지 바로 알 수 있어서 좋다.

아직은 MVP만 구현한 것인데, 글을 읽는데 몇분 정도 걸리는지 시간도 나타낼 수 있으면 좋을 것 같다. 일단 포스트 페이지에 들어오기 전에 글이 어느 분량정도 되는지 추측 가능하기 때문에 다른 사람들이 조금 더 편하게 골라서 볼 수 있을 것 같다. 추후에 추가해보려고 한다!
