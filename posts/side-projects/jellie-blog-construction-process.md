## 젤리 블로그(Jellie Blog) 만들기 프로젝트 시작 🚀

개인 블로그인 **젤리 블로그**를 만들기로 결심한 것에는 크게 3가지 이유가 있었습니다.

1. 나만의 커스텀
2. 글에 대한 접근성
3. Next.js 13 버전 출시

아래에서 위의 이유에 대해 좀 더 자세히 이야기해보겠습니다.

1. 나만의 커스텀: 커스텀이 너무 하고 싶다.

사실 블로그를 만드시는 분들의 가장 큰 이유가 이게 아닐까요? 처음에 저는 관리하기 쉬우면 컨텐츠 내용에 더 신경쓸 수 있지 않을까 해서 유명한 Velog를 사용했습니다. 그런데 오히려 사용하면 사용할수록 커스텀에 대한 아쉬움이 커졌습니다.

단적인 예로 색을 자유롭게 쓸 수 없다는 점이 있었습니다.🤪 저는 포스트를 작성하면서 강조하거나 구분할때 **색**을 좀 많이 사용하는 편인데, 색을 사용하려면 아래와 같이 요소 안에 style 속성으로 작성해줘야 합니다.

```html
<span style="color: blue">Blue Color</span>
<!-- 마크다운으로 작성하다 갑자기 HTML 요소로?????🫠 -->
```

이 점에서 조금 불편했지만, 다른 블로그 선택지와 비교했을 때 Velog가 가장 괜찮아서 사용하기 시작했습니다. 그런데 포스트를 작성하면 작성할수록 색상때문에 HTML 요소로 바꿔야 할 때 너무 귀찮아지기 시작했습니다.🫠 ~~(어떻게 색상 저장해서 쉽게 적용 못하나요...?)~~ 색 문제가 가장 컸지만, 색 문제 뿐만 아니라 **코드 블럭 스타일**도 조금 더 예뻤으면 좋겠다는 생각이었습니다.

---

2. 글에 대한 접근성: 그래도 다른 사람도 내 글을 볼 수 있어야지...

그렇게 Velog에 한동안 색 없이 작성하다가 어느덧 **Notion**에다가 공부한 것을 정리하고 있었습니다. 노션이 단축키가 손에 익으면 마크다운식으로 정말 빠르게 작성할 수 있고 또 코드 블럭 스타일도 괜찮았습니다. 색도 여러가지로 쓸 수 있었고요. 그리고 페이지안의 페이지별로 작성해서 한눈에 보이는 카테고리를 만들 수 있는 것도 좋았습니다. 워낙 편리하다보니 처음에는 노션에다 정리하고 좀 더 다듬어서 Velog에 정리하자는 생각이었는데, 어느 순간부터 노션만 쓰고 있었습니다.😅

그렇게 한동안 노션을 잘 사용했는데, 결국 개인 블로그를 만들어보겠다고 결심하게 된 것은 **접근성**이 굉장히 떨어지기 때문입니다. 글이라는 것이 혼자 정리하는 용으로 적는 것도 괜찮지만, 일단 다른 사람들도 읽을 수 있는 글을 작성해야 정보 공유도 되고 좀 더 좋은 글을 쓸 수 있다고 생각합니다. 그런데 노션은 요금제 업그레이드를 하지 않는 한 링크 공유를 통해서만 다른 사람들이 볼 수 있었고, 오랜 로딩 시간에 걸쳐 노션에 접속할 수 있으니 답답했습니다. 그래서 노션 요금제 업그레이드로 도메인 사이트로 만들어야 되나 생각하기 시작하면서, 이때부터 직접 나만의 블로그를 만들어보는 것을 진지하게 고민하기 시작했던 것 같습니다.

---

3. Next.js 13 버전 출시: Next.js 13 버전이 너무 궁금하다.

Next.js가 13버전으로 업그레이드 되었습니다! Next.js 13은 React 18이 도입되어 정말 새로워진 버전이었습니다. Next.js 13이 궁금한데 왜 개인블로그를 만들어? 라는 생각이 드실 수도 있지만 마침 블로그가 정적 사이트로 Next.js 13을 사용하기 딱 좋은 프로젝트였습니다.

사실 작년 22년 12월, 저번 프로젝트였던 <냉장고에 뭐가 있지?>를 시작할 때도 Next.js 13이 나오긴 했었지만 그때는 출시된지 두달도 안되었기 때문에 너무 실험적인 요소들이 많다고 판단, 결국 12버전을 사용했었습니다. 그리고 나온지 6개월이 지난 지금, 아직 안정적이지 않은 기능들도 많지만 사용해볼만하다는 생각이 들었고, 마침 블로그는 Next.js 13으로 만들기 괜찮은 프로젝트여서 한번 개인 블로그를 만들어보기로 결심했습니다. 사실 세번째 이유가 결정적인 이유이긴 했네요😙

위와 같은 이유로 개인 블로그를 만들어보기로 했는데, 얼추 만들고 포스트를 작성하는 지금 굉장히 만족스럽습니다. 뭔가 주인의식이랄까요? 내가 마음에 드는 코드 블럭 스타일을 지정하고, 원하는 색상을 사용하고, 커스텀하며 내가 원하는 기능들을 추가하니 포스트에 뭔가 더 애정이 생기는 기분입니다.

## 블로그에는 어떤 기능을 넣었는가?

일단 블로그를 개발하기 앞서서 블로그를 기획하며 [MVP](https://www.notion.so/7764fca2bcf541c2a25f100bd0b6a45a)를 작성했습니다. _(MVP 링크를 클릭하면 블로그의 MVP등을 기록한 상세정보페이지를 보실 수 있습니다.)_

### 포스트 페이지에 사용되는 기능 MVP

| 포스트 기능  | 설명                                 | 사용한 라이브러리 |
| ------------ | ------------------------------------ | ----------------- |
| markdown     | react-markdown을 통해 md 문서 렌더링 | react-markdown    |
| progress bar | 스크롤 위치에 따른 스크롤 진행률 바  |
| toc          | 포스트의 목차                        |                   |

최소한의 기능을 적는 것이었지만, 초기에 꼭 구현해야겠다고 생각한 기능은 **목차**와 **스크롤 진행률바** 기능이었습니다. 인터넷에서 글을 읽을 때 독자가 현재 글의 어디쯤에 있는지 위치를 가늠할 수 있게 해주는 것이 중요하다고 생각하기 때문입니다.

위의 MVP를 작성한 후 하나하나 구현해 나가기 시작했습니다.

1. markdown 문서 렌더링

그래서 일단 목업 데이터로 md 파일을 하나 만든 뒤, **react-markdown** 라이브러리를 다운받아 html 요소로 화면에 렌더링하였습니다. react-markdown을 선택한 이유는 문서에 설명이 굉장히 잘 되어 있었기 때문입니다. remark나 rehype에서 제공해주는 다양한 플러그인도 사용할 수 있었고요. 그래서 rehype에서 제공하는 코드 블럭 타이틀 플러그인도 적용해보았습니다.

```tsx:/component/posts/markdown-viewer.tsx
import remarkGfm from 'remark-gfm';
import rehypeCodeTitles from 'rehype-code-titles';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }:Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeCodeTitles]}
      component={/*... */}
    >
      {content}
    </ReactMarkdown>;
  )
}

```

역시 직접 커스텀하니까 마음에 쏙 드네요! 👍

react-markdown 라이브러리를 적용한 더 자세한 이야기는 다음 포스트인 [젤리 블로그 기능 1: Markdown문서 렌더링과 스크롤 진행률 바 만들기](https://jellieblog.dev/posts/jellie-blog-features-1) 여기에서 확인할 수 있습니다.

2. progress bar(=스크롤 진행률 바)

스크롤 진행률 바는 페이지에서 스크롤 위치에 따라 가로선으로 퍼센트 비율을 나타내는 기능입니다. 사실 화면 오른쪽 가로로 스크롤바 위치가 나타나기 때문에 꼭 필요한 기능은 아닙니다. 하지만 상단 가로 너비에 스크롤 위치에 따른 퍼센트를 보여주면 사용자가 스크롤하는 행위 없이도 남은 스크롤을 계속 직관적으로 파악할 수 있어서 개인적으로 좋아합니다😊. 그래서 `useEffect` 내에서 throttle 함수를 적용한 스크롤 이벤트를 통해 구현해보았습니다. 똑같이 자세한 내용은 [젤리 블로그 기능 1: Markdown문서 렌더링과 스크롤 진행률 바 만들기](https://jellieblog.dev/posts/jellie-blog-features-1)에서 보실 수 있습니다.

3. toc(목차)

사실 가장 어려웠던 부분은 목차 기능입니다. 어떻게 구현해야할지 처음에 잘 떠오르지 않았습니다. 목차도 해당 기능을 제공하고 있는 라이브러리가 있었지만 목차 부분은 라이브러리 사용 없이 직접 구현해보고 싶었습니다. 그렇게 어떻게 구현해야할지 찾아보다가 **IntersectionObserver API**를 통해 구현했습니다. 더 자세한 내용은 [젤리 블로그 기능 2: 목차(toc) 만들기](https://jellieblog.dev/posts/jellie-blog-features-2)에서 볼 수 있습니다. 그리고 반응형으로 제작했기 때문에 모바일에서는 버튼으로, 태블릿 이상에서는 오른쪽 부분에서 볼 수 있도록 지원하고 있습니다. 제일 어려웠지만 뭔가 해나가는 맛이 있는 기능이었네요😊

### 전체 페이지에 사용되는 기능 MVP

| 전체 기능     | 설명                                                         | 사용한 라이브러리 |
| ------------- | ------------------------------------------------------------ | ----------------- |
| **dark mode** | 시스템 기본 설정을 기본값으로 라이트모드, 다크모드 버튼 지원 | next-themes       |

1. dark mode(다크 모드 기능)

다크 모드 기능이라고 했지만 사실 **사용자가 설정한 시스템 화면 모드를 기본값**으로 다크모드, 라이트모드를 지원하는 버튼을 만들고 싶었습니다. 그러니까 TailwindCss를 사용하고 있는 현재, 이렇게 구현하기 굉장히 어려웠습니다. 사실 공식문서에도 시스템 설정과 모드 변경 버튼 모두 지원할 수 있다고 말하기는 합니다. **localStorage와 window.matchMedia() API**를 이용하면 된다고 하는데요.

그런데 적용해본 결과, 깜박임 현상이 있었습니다. TailwindCss는 `useEffect`를 통해 조건이 맞다면 최상단 DOM인 `document.documentElement`에 직접 `dark`라는 클래스를 넣도록 안내하고 있습니다. _[(TailwindCss Dark Mode)](https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection)_ 그런데 이 부분이 Next.js에서는 적용하기 어려웠던 게 일단 Next.js는 클라이언트 컴포넌트일지라도 상태 조작과 같은 클라이언트에서 필요한 것들을 다 뺀 일단 서버에서 렌더링할 수 있는 것들을 미리 렌더링해놓기 때문입니다. 그러다보니 만약 사용자의 시스템 설정이 다크 모드인 경우, 페이지에서는 첫 렌더링에 아직 최상단 DOM에 `dark`라는 클래스가 없으므로 잠깐 라이트 모드였다가 `useEffect` 실행을 통해 다크 모드가 되는 현상이 일어났습니다. 이 부분이 굉장히 거슬렸습니다.

그래서 일단 이 방법은 아닌듯 해 열심히 여러가지를 찾아보다가, next.js에서 시스템 설정 모드, 다크 모드를 지원하고자 할 때는 **next-themes** 라이브러리를 많이들 사용한다는 것을 알게 되었습니다. 해당 라이브러리는 딱 제가 원하는 기능들이 들어있는 라이브러리였습니다! 직접 구현하고 싶었지만, 시간이 너무 오래 걸려서 시간 관계 상 해당 라이브러리를 사용하기로 결정했습니다.

이렇게 블로그 구축 과정에서 가장 이야기해볼만한 기능들에 대해 소개해보았습니다. 그리고 블로그의 기능을 개발하면서 의외로 어떤 라이브러리를 사용해야할지, 사용하지 않고 직접 구현하는 것이 나을지, 사용해야할지 고민하고 결정하는 것에도 많은 시간이 걸렸네요!

## 블로그 구축 과정에서 마주한 에러

Next.js 13의 가장 큰 변화로는 컴포넌트를 서버와 클라이언트로 구분하게 된 것이 있었는데요. 이 부분을 구분해 작성하면서 마주한 에러들이 있었습니다. 저는 현재 13.2.4 버전을 사용했다가 **13.3.0**으로 업그레이드 한 상태입니다.

1. 클라이언트 컴포넌트 내에서는 async 서버 컴포넌트를 사용할 수 없습니다.

아래 코드에서 `<CarouselBox />` 컴포넌트는 클라이언트 컴포넌트로, children을 `<PostBox />` 라는 async 서버 컴포넌트를 받습니다.

```tsx:/app/page.tsx
import CarouselBox from '@/components/common/carousel-box';
import { getAllPosts } from '@/service/posts';

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    {/* */}
    <CarouselBox config={{ centerMode: true, showDots: true }}>
      {allPosts.map((post) => (
        // ❗️ async server component
        <>
          {/* @ts-expect-error Async Server Component */}
          <PostBox key={post.path} post={post} />
        </>
      ))}
    </CarouselBox>
    {/* */}
  );
}
```

```tsx:/components/common/post-box.tsx
export default async function PostBox({ post, prev }: PostBoxProps) {
  const postData = await getPost(post.path); // 🚫 내부 문서 정보 가져오는 함수
  return (
    //...
  )
}
```

그렇게 되면 화면에 아래와 같은 에러가 뜨게 됩니다.

**❗️ Objects are not valid as a React child (found: [object Promise])**

공식문서에서는 클라이언트 컴포넌트 안에 서버 컴포넌트를 하위 컴포넌트로 넣으려고 한다면 위와 같이 클라이언트 컴포넌트의 children props로 전달해줘야 한다고 말하고 있습니다[(공식문서)](https://beta.nextjs.org/docs/rendering/server-and-client-components#importing-server-components-into-client-components). 그래서 위의 코드와 같이 클라이언트 컴포넌트인 `<CarouselBox />`의 children으로 서버 컴포넌트인 `<PostBox/>`를 전달하려고 했는데요. 계속 해당 에러가 발생했습니다.

그러다 [스택오버플로우에 완전히 같은 상황의 글](https://stackoverflow.com/questions/75665733/how-to-import-async-server-components-into-client-components-in-nextjs-13)이 있는 것을 보고 async 서버 컴포넌트는 클라이언트 컴포넌트 안에서 사용할 수 없다는 것을 깨달았습니다. 어쨌든 간 클라이언트 컴포넌트의 하위 요소이기 때문에 서버 전용 코드(데이터베이스나 파일 시스템 유틸리티)는 제한이 있다는 것이었습니다. 이 부분을 유념헤서 코드 구조를 짜야 할 것 같습니다.

2. 모든 클라이언트 컴포넌트에 `'use client'`를 작성하지 않아도 됩니다.

이 부분 또한 서버 컴포넌트와 클라이언트 컴포넌트 사이에서 발생하는 경고인데요. 이 부분은 에러가 나지는 않지만 경고 표시가 나타납니다. 아래는 `<CategoriesBox />`에 `setCategory`라는 `useState`의 setter 함수를 넘겨주고 있습니다.

```tsx:/template/categorized-posts-section
'use client';

import { useState } from 'react';
import CategoriesBox from '../common/categories-box';

export default function CategorizedPostsSection({ allPosts }: Props) {
  const [category, setCategory] = useState('All' as Category);

  return <CategoriesBox category={category} setCategory={setCategory} />;
}
```

```tsx:/component/posts/categories-box;
'use client';

// ❗️ setCategory에 Warning
export default function CategoriesBox({ category, setCategory }) {
  const [category, setCategory] = useState('All');
  const onCategoryClick = (category) => setCategory(category);

  return <button onClick={onCategoryClick}>{category}</button>;
}
```

**❗️ props must be serializable for components in the "use client" entry file, "setCategory" is invalid.**

위의 코드에서 `<CategoriesBox />`에 전달받는 `setCategory`에 위와 같은 경고 표시가 나타나게 되는데요. 이유는 이미 부모 컴포넌트에 `'use client'`가 선언되었기 때문입니다. `'use client'` 선언은 서버 컴포넌트와 클라이언트 컴포넌트 사이의 경계를 나타낼 때에만 작성하는 것이기 때문이라고 합니다.

![use client](/public/images/side-projects/jellie-blog-construction-process/use-client.png)

![client-server-component](/public/images/side-projects/jellie-blog-construction-process/client-server-component.png)

서버와 클라이언트가 구분되는 경계에서 한 번만 정의하면 해당 클라이언트 컴포넌트로 import한 모든 모듈이 클라이언트 구성요소로 간주된다고 합니다. 따라서 클라이언트 컴포넌트의 하위 컴포넌트인 `<CategoriesBox/>`에 또 `'use client'`를 작성할 필요가 없었습니다. 지워주니 경고도 사라졌네요. 서버와 클라이언트의 경계인지 잘 생각하면서 `'use client'`를 사용해야 할 것 같습니다.

3. `<Link />`로 다른 페이지 이동 시 이전 페이지의 스크롤 위치 그대로 이동되는 버그가 있었습니다.

Next.js에서는 `<Link />`로 이동할 때 페이지의 최상단에 위치하도록 작동합니다. 헤더의 네비게이션, 예를 들어 Home에서 About 페이지로 이동할 때는 페이지의 최상단에 잘 위치하는데, 이상하게 포스트 내용을 보는 상세 페이지로 들어가면, 이전 페이지의 스크롤 위치에 위치하고 있었습니다. `<Link />`에서 제공하는 props인 scroll는 페이지 이동시 최상단에 위치시킬 건지를 결정하는 속성인데, 디폴트값이 true이지만, 다시 한번 명시해줘봐도 마찬가지였습니다.

아니나 다를까 [Next.js의 issue에 논의](https://github.com/vercel/next.js/issues/42492)되고 있는 중이었습니다. 논의되고 있는 이슈에서는 명확한 이유가 나오지 않았고, 임시방편으로 `useEffect`에서 `scrollTo(0,0)`을 사용하라는 답이 많습니다. 앞으로 좀 더 지켜봐야 할 것 같습니다. 혹시 이유와 해답을 알고 계신다면 댓글로 알려주세요.🙂

따라서 저는 현재 포스트 페이지로 이동할 때만 이런 현상이 나타나므로, 포스트 페이지에 있는 progress-bar(스크롤 진행률 바) 컴포넌트에 아래와 같은 코드 한줄을 추가해주었습니다.

```tsx
export default function ProgressBar() {
  useEffect(() => {
    // ✅ 페이지 이동시 scrollTop으로 이동
    window.document.documentElement.scrollTo(0, 0);
    // ...
  }, []);
}
```

## 더 고민이 되는 부분

1. 정적 이미지를 담는 폴더 구조가 너무 복잡하다.

앞으로 더 구축해나가야 할 것들이 있지만, 현재 고민이 되는 부분은 이미지를 담는 폴더 구조입니다.

```bash
.root
├── 📂 posts
│   ├── 📂 react
│   │   ├── 📄 react-18-new-features.md # ✅ react 카테고리의 md 문서
├── 📂 public
│   ├── 📂 image
│   │   ├── 📂 react
│   │   │   ├── 📂 react-18-new-features
├── └── └── └── └── 🖼️ profiling.png # ✅ react-18-new-features 문서의 이미지
└── tsconfig.json
```

현재 포스트는 posts 폴더 내 각 카테고리 폴더에 위치하고 있는데요. 포스트에 사용되는 이미지는 public 폴더 내 image 폴더에서 또 각 카테고리별 폴더를 생성한 후 포스트 이름의 폴더를 또 생성해 여기서 이미지를 넣고 있습니다. 그러니까 이미지는 4개의 폴더를 들어가야 볼 수 있는 건데요. 이 루트가 너무 복잡하지 않은지 고민입니다.

그렇지만 또 md 문서처럼 카테고리별로 다 묶어버리기엔 나중에 이미지가 많아졌을 때 찾기 어려울 것 같았고, 특정 포스트에서만 사용하는 이미지들이 대다수이기 때문에 포스트 제목 폴더별로 한번 더 묶는 것이 더 낫다고 생각되었습니다. 아직은 좀 더 포스트를 작성하면서 지켜봐야할 것 같습니다.

---

여기까지 블로그 구축 과정과 그 과정에서 마주쳤던 에러들을 정리해보았습니다. Next.js 13으로 블로그를 구축하시는 분들에게 도움이 되었으면 좋겠네요! 앞으로 더 좋은 포스팅을 정리해보겠습니다.🚀
