## Next.js 13에서 목차 기능 구현하기

목차는 개인적으로 블로그하면서 꼭 넣어야겠다고 생각했던 기능이었다. 어떤 글을 볼 때에는, 특히 인터넷 페이지 상에서 글을 볼 때에는 현재 내가 어느 위치에 있는지 알려주고, 쉽게 원하는 위치로 이동할 수 있도록 만들어 주는 것이 좋다고 생각한다. 아날로그와 달리 디지털 인터넷 상에서는 특히 현재 내가 어느 위치에 있는지 가늠하기가 어렵고, 원하는 위치로 쉽게 이동하기 어렵기 때문이다.

그래서 꼭 스크롤 진행률바와 목차는 꼭 구현하기로 생각했었는데, 스크롤 진행률바는 비교적 쉽게 구현한 반면 목차는 어떻게 구현해야할지 감이 안잡혀서 제일 구현하기 어려웠던 것 같다.

- **목차 기능 구현 사항 4가지**

  원하는 **목차 기능 구현 사항**으로는 4가지가 있었다.

  1. **반응형**으로 모바일에서도 목차를 볼 수 있을 것

  2. 마크다운의 **제목**(h2, h3, h4)을 목차로 나타내기

  3. 목차를 **클릭**하면 해당 위치로 이동할 것

  4. **현재 위치 목차**임을 **표시**할 것

     - 스크롤하면서 특정 목차로 진입하면 자연스럽게 표시도 넘어가기

사실 1~3번까지는 괜찮았는데, 4번에서 어떻게 시작해야할지 조금 감이 안잡혔던 것 같다.

### 1. 반응형 모바일 목차

- 사용한 라이브러리 : react-responsive

첫번째로 반응형으로 좁은 화면인 모바일에서도 목차를 볼 수 있도록 구현하고 싶었다. 그래서 React의 공식문서의 목차 버튼을 참고했다. 스마트폰에서 공식문서를 볼 때마다 참 유용하게 잘 사용했기 때문이다.

![react 공식문서 목차 버튼](/public/images/react/react-공식문서-목차버튼.png)

현재 블로그도 모두 반응형으로 개발했기 때문에 **모바일 반응형에서 목차 버튼**을 넣고, **태블릿 이상에서부터 포스트 글 옆에 목차 공간**을 넣으면 좋을 것 같았다.

(_코드의 간결성을 위해 클래스네임은 생략했다._)

하지만 반응형으로 목차를 만드는데에도 난관이 있었다. 처음에는 react-responsive 라이브러리를 자체 라이브러리에서 제공하는 SSR을 적용하려고 했다. 그런데 나는 현재 이 프로젝트에서 Next.js 13 버전에서 app 폴더만을 사용하고 있고, pages 폴더는 사용하고 있지 않은데, react-responsive에서 SSR을 적용하려면 pages 폴더의 \_app.js 파일이 필요했다. 현재 프로젝트에서는 라이브러리에서 제공하는 SSR 기능이 적용 불가능하다는 생각이 들어서 다른 방법을 찾기 시작했다.

- **첫번째 시도**

그래서 일단 단순하게 아래와 같은 코드로 mobile 상태를 하나 만들고 `useEffect`를 통해 첫렌더링에 반응형을 정해서 렌더링했다. 아래의 코드와 같다.

```tsx
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function TableOfContents() {
  const [mobile, setMobile] = useState(false); // 🚫 불필요한 상태
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  const isTablet = useMediaQuery({
    query: '(min-width: 768px)',
  });

  useEffect(() => { // 🚫 단순한 상태 변경은 지양한다
    isTablet ? setMobile(false) : setMobile(true);
  }, [isTablet]);

  return (
    mobile ? /* 모바일 컴포넌트 */ : /* 태블릿 이상 컴포넌트 */
  );
}
```

그러다가 `useEffect`는 **단순히 컴포넌트 상태를 변경하기 위해 사용하는 것을 지양**해야 한다는 이야기를 들었다. 현재 반응형 상태를 저장하기 위해 mobile 상태를 더 만드는 것도 좋지 않다는 생각이 들었다.

- **두번째 시도, 최종 선택**

```tsx
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactResponsive = dynamic(() => import('react-responsive'), {
  ssr: false,
}); // ✅ dynamic import한 react-responsive

export default function TableOfContents() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  return (
    <>
      {/* ✅ 반응형 태블릿 이상인 경우 렌더링 */}
      <ReactResponsive minWidth={768}>
        <section>
          <TocContent headingEls={headingEls} activeId={activeId} />
        </section>
      </ReactResponsive>
      {/* ✅ 반응형 모바일인 경우 렌더링 */}
      <ReactResponsive maxWidth={767}>
        <button onClick={toggleModal}>목차</button>
        {modal && <Modal>}
      </ReactResponsive>
    </>
  );
}
```

`useEffect`와 mobile 상태를 완전히 제거하고, 이렇게 dynamic import를 통해 라이브러리를 가져오니 hydration 에러 없이 반응형 목차를 만들 수 있었다.

그래서 반응형을 구현하면서  
라이브러리 자체에서 SSR을 적용할 수 있는 방법을 찾다가  
`useEffect`를 사용했다가  
다시 동적 import를 적용했다는 이야기를 해보았다...😅

### 2. 마크다운의 제목을 목차로 나타내기

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function TableOfContents() {
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  useEffect(() => {
    const article = document.querySelector('article');
    if (article) {
      // ✅ article 요소에 포함되어있는 모든 제목 가지고 오기
      const headingElements = Array.from(
        article.querySelectorAll('h2, h3, h4')
      );
      setHeadingEls(headingElements);
    }
  }, []);

  return (
    <>
      {headingEls.map((headingEl) => (
        <li key={index}>{el.innerHTML}</li>
      ))}
    </>
  );
}
```

마크다운 문서의 제목들을 모아놓을 수 있는 상태를 하나 만들었다. 그리고 `useEffect`에서 직접 DOM에서 마크다운을 나타내는 문서인 article을 가져오고, 그안에 포함되어있는 h2, h3, h4 요소들을 모아 배열을 만들어 headingEls 상태를 업데이트했다.

여기서 h2, h3, h4만 가지고 오는 것은, h1은 문서 타이틀로 사용하고, h2부터 문서 내부의 목차 제목으로 사용하기 때문이다.

### 3. 목차를 클릭 시 해당 위치로 이동

```tsx
return (
  <>
    {headingEls.map((headingEl) => (
      <li key={index}>
        {/* ✅ a 태그에서 id 속성 추가해 #을 포함한 값 지정하기 */}
        <a href={`#${el.id}`}>{el.innerHTML}</a>
      </li>
    ))}
  </>
);
```

목차 안의 하나의 제목 아이템을 a태그로 지정해서 id 속성의 값을 #을 포함해 지정하면 내부 문서의 책갈피 용도로 사용할 수 있게 된다.

클릭을 해보면 문서 url 뒤에 **#제목**이 붙으며 해당 위치로 이동한다.

### 4. 현재 위치 목차 표시

이제 a태그에서 자체 제공해주는 책갈피 기능으로 클릭만 하면 자유자재로 이동할 수 있게 되었다. 하지만 현재 자신이 위치한 목차를 어떻게 알 수 있을까? 이 부분을 제일 구현하기가 어려웠던 것 같다.

Intersection Observer API로 현재 화면의 요소를 탐색하는 함수 `getIntersectionObserver`를 만든다.

```tsx
// ✅ Intersection Observer API 함수
import { Dispatch, SetStateAction } from 'react';

const option = {
  rootMargin: '-80px 0px -80% 0px',
  threshold: 1.0,
};

export function getIntersectionObserver(
  setState: Dispatch<SetStateAction<string>>
) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setState(entry.target.id);
      }
    });
  }, option);

  return observer;
}
```

이 함수는 목차가 상단에서 전체 높이의 20% 정도에서 탐색이 되면 해당 요소를 반환한다.

그 다음 toc 컴포넌트에서 현재 위치하고 있는 목차를 담는 상태인 activeId를 하나 만들고, 위에 만든 `getIntersectionObserver` 함수를 가져온다.

```tsx
'use client';

import { useEffect, useState } from 'react';
import { getIntersectionObserver } from '@/util/getIntersectionObserver';

export default function TableOfContents() {
  const [headingEls, setHeadingEls] = useState<Element[]>([]);
  // ✅ 현재 위치한 목차 상태
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (article) {
      const headingElements = Array.from(
        article.querySelectorAll('h2, h3, h4')
      );
      setHeadingEls(headingElements);
      // ✅ 처음에는 첫번째 목차로 id 업데이트
      setActiveId(headingElements[0].id);

      // ✅ Intersection Observer API 함수로 탐색된 목차 제목로 업데이트
      const observer = getIntersectionObserver(setActiveId);
      headingElements.map((element) => {
        observer.observe(element);
      });
    }
  }, []);

  return (
    <>
      {headingEls.map((headingEl) => (
        <li key={index}>
          <a
            href={`#${el.id}`}
            // ✅ activeId를 통해 현재 위치 표시하기
            className={`${el.id === activeId ? 'border-indigo ' : ''} `}
          >
            {el.innerHTML}
          </a>
        </li>
      ))}
    </>
  );
}
```

그리고 이전에 headingEls 배열의 첫번째 요소로 현재 위치를 활성화한다.

그리고 이 함수를 통해서 문서의 목차 제목(h2, h3, h4)이 탐색되면 activeId로 업데이트한다.

## 전체 코드

전체 코드는 아래와 같다.

```tsx
// ✅ toc.tsx
'use client';

import { useEffect, useState } from 'react';
import { HiQueueList, HiXMark } from 'react-icons/hi2';
import { getIntersectionObserver } from '@/util/getIntersectionObserver';
import TocContent from './toc-content';
import dynamic from 'next/dynamic';
const ReactResponsive = dynamic(() => import('react-responsive'), {
  ssr: false,
});

export default function TableOfContents() {
  const [modal, setModal] = useState(false);
  const [headingEls, setHeadingEls] = useState<Element[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (article) {
      const headingElements = Array.from(
        article.querySelectorAll('h2, h3, h4')
      );
      setHeadingEls(headingElements);
      setActiveId(headingElements[0].id);

      const observer = getIntersectionObserver(setActiveId);
      headingElements.map((element) => {
        observer.observe(element);
      });
    }
  }, []);

  const toggleModal = () => setModal((prev) => !prev);

  return (
    <>
      <ReactResponsive minWidth={768}>
        <section className='overflow-scroll h-[92vh] w-48 sticky top-14 right-0 transition py-6 px-4'>
          <TocContent headingEls={headingEls} activeId={activeId} />
        </section>
      </ReactResponsive>
      <ReactResponsive maxWidth={767}>
        <button
          onClick={toggleModal}
          className='transition hover:scale-105 bg-yellow border border-slate z-20 fixed flex items-center justify-center bottom-5 right-5 w-16 h-16 shadow-lg rounded-full'
        >
          {!modal ? (
            <HiQueueList className='w-7 h-7' />
          ) : (
            <HiXMark className='w-7 h-7' />
          )}
        </button>
        {/* ✅ 목차 버튼을 누르면 생성되는 모달 */}
        {modal && (
          <>
            <div
              onClick={toggleModal}
              className='overflow-hidden transition fixed bottom-0 top-0 z-20 left-0 right-0 mx-auto w-full h-screen bg-black opacity-50'
            />
            <section className='overflow-scroll transition z-20 p-6 fixed inset-0 m-auto w-10/12 h-fit max-h-[75%] border-2 border-slate bg-bg rounded-xl'>
              <TocContent headingEls={headingEls} activeId={activeId} />
            </section>
          </>
        )}
      </ReactResponsive>
    </>
  );
}
```

이렇게 목차를 완성해보았다!

아 추가로, 내부 문서 책갈피로 스크롤 이동할 때

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
```

글로벌 CSS에 추가하면 부드럽게 스크롤 위치 이동이 가능하다. 그리고 `scroll-padding-top`는 상단에 헤더가 있어서 padding 값을 주었다.
