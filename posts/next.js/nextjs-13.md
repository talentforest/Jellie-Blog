> Beta 공식문서 사이트 :
> [https://beta.nextjs.org/docs/getting-started](https://beta.nextjs.org/docs/getting-started)
>
> 공식문서 사이트 : [https://nextjs.org/docs](https://nextjs.org/docs)

## Next.js 13 변경사항

![beta와 stable 안내](/public/images/next.js/nextjs-13/beta-stable.png)

~~먼저 주의할 점은 Next.js 13으로 바뀌었지만 아직 어떤 기능들은 **Beta버전**이라는 것이다. 아래 표의 Beta 기능 참고~~

| ~~Beta 기능~~               | ~~stable 기능~~       |
| --------------------------- | --------------------- |
| ~~app directory~~           | ~~font optimization~~ |
| ~~React Server Components~~ | ~~update Image~~      |
| ~~Streaming~~               | ~~Link~~              |
| ~~new data fetching~~       | ~~Script components~~ |

현재는 stable 단계이다.

## Next.js 13 설치

13버전이 어떻게 바뀌었을지 궁금해서 일단 타입스크립트로 설치해보았다.

```bash
npx create-next-app@latest --experimental-app --typescript
```

![터미널](/public/images/next.js/nextjs-13/terminal.png)

프로젝트 이름과 ESlint 설정한다.

- **src/ directory**를 사용할거냐고 물어본다. (기본값: No ➡️ No)

- **import alias**를 어떻게 설정할거냐고 물어본다. (기본값: `@/*` ➡️ `@/*`)

  절대경로와 모듈 path 명을 설정할 때 설정한다.

- 설치한 next.js 13 폴더 구조

  ![Next.js 초기 폴더 구조](/public/images/next.js/nextjs-13/initial-structure.png)

  그럼 이런식으로 프로젝트 초기 구조가 나온다. 13 버전으로 갓 출시가 되었을 때 app이랑 pages가 둘다 같이 있었던 것을 보았던 것 같은데 이제는 app 폴더만 존재한다. 기존 page폴더에 있던 api 폴더는 이제 app폴더 안으로 옮겨져 있다. app으로 변경되었다고 이제 page 폴더를 사용할 수 없는 건 아니고 물론 page 폴더로 프로젝트를 하고 싶은 경우 page로 설정할 수도 있지만 app 폴더를 사용할 것을 권장하고 있다.

  [App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)
  [Page Router](https://nextjs.org/docs/pages/building-your-application/routing)

## 새로운 디렉터리 구조: app폴더

~~아직 **Beta기능**이라고 한다.(2023.02.04)~~

app 디렉토리는 **Next.js와 React Server Components와 React 18를 통합**하여 새로운 기능들을 사용할 수 있는 디렉토리라고 한다. ~~아직 베타 버전이라서 프로덕션이라면 추천하지 않는다고 써져 있다. 이제는 안정화 되었다.~~

app 폴더 안에 아래와 같은 파일들을 갖고 있다.

```bash
# ✅ app폴더 안에 layout.tsx 파일이 들어간다.
.root
├── app
│   ├── api/hello
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx # ✅ head 파일의 역할 포함한 파일이다
│   ├── page.module.css
│   ├── page.tsx
```

## Route 방식 변경

> v13에서는 route가 app 폴더 내에서 **폴더 기준**으로 변경되었다.
>
> - 기본 라우팅 컴포넌트 명은 **page.tsx**로 처리한다.
> - 동적 라우팅은 `[slug]` 폴더 안에 page.tsx 컴포넌트를 생성한다.

- 라우팅 방식 예시

```bash
app
├── detail
│   ├── [slug] # ✅ 동적라우팅 slug 폴더로 변경
│   ├── ├── page.tsx # ✅ /detail/1
├── post
│   ├── [...slug] # ✅ Catch All
│   ├── ├── page.tsx # ✅ /post/react = /post/react/100 = /post/react/100/200
├── movie
│   ├── [[...slug]] # ✅ Optional Catch All, 있어도 되고 없어도 되는 파라미터
│   ├── ├── page.tsx # ✅ /movie = /movie/comedy = /movie/comedy/100 = /movie/comedy/100/200
│   ├── page.tsx # ✅ /detail
└── page.tsx # ✅ /
```

### 동적 라우팅 파라미터

위에서 [slug]로 표현된 동적 라우팅 페이지에서는 아래와 같이 동적 파라미터를 받을 수 있다.

```tsx:app/detail/test-page.tsx
interface Props {
  params: {
    slug: string;
  };
}

function TestPage({ params }: Props) {
  // ✅ params
  return <div>{params.slug}</div>;
}

export default TestPage;
```

### generateStaticParams

동적 라우팅 페이지에서 몇몇 페이지는 정적으로 만들고 싶을 때 `generateStaticParams`를 사용한다.

```tsx:app/detail/test-page
interface Props {
  params: {
    slug: string;
  };
}

function TestPage({ params }: Props) {
  return <div>{params.slug}</div>;
}

export default TestPage;

// ✅ 동적 라우팅이지만 특정 페이지는 정적으로 만들고 싶을 때
export function generateStaticParams() {
  const products = ['pants', 'skirts']; // ✅ 'pants', 'skirts' 는 정적으로 만들어진다.
  return products.map((product) => ({
    slug: product,
  }));
}
```

- 그럼 `<div>{params.slug}</div>` 이 params도 미리 받아와서 정적 페이지로 만들어둔다.

![dynamic route](/public/images/next.js/nextjs-13/dynamic-route.png)

- `[]` 안에 이름이 있는 폴더라면 라우팅에 영향을 주지 않아 url에 이름이 들어가지 않는다.

## Server Component

> 12 버전은 페이지 단위로 렌더링 방식을 규정하는 것에 반해, 13 버전은 **컴포넌트 단위**로 렌더링 방식을 규정한다.

![서버 컴포넌트](/public/images/next.js/nextjs-13/server-component.png)
전체 페이지에서 상태 변화해야하는 클라이언트 컴포넌트를 구분한 모습이다.

- app에서 클라이언트 컴포넌트로 만들고 싶다면 파일 맨 위에 `‘use client’`를 선언한다.

- hook같은 것들은 당연히 클라이언트 컴포넌트에 사용한다.

  `useRouter`, `usePathname`, `useSearchParams`

```tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function HomePage({ recentPosts }) {
  return (
    <div>
      {recentPosts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

여기서 주의해야할 점은 `use client` 선언을 통해 클라이언트 컴포넌트가 되었다고 해당 컴포넌트는 클라이언트 사이드 렌더링만 된다는 의미가 아니다. 처음에 이 클라이언트 컴포넌트 개념이 굉장히 헷갈렸는데, Next.js에서는 `use client` 선언 여부 상관 없이 일단 모든 컴포넌트가 서버 사이드 렌더링이 되며, 이후 `use client` 선언이 된 클라이언트 컴포넌트는 **hydration**을 통해 리액트 컴포넌트가 되어야 하는 코드가 있다는 것을 의미한다.

그러니까 한번 더 정리하자면, `use client` 선언이 있는 클라이언트 컴포넌트에서도 정적인 부분은 먼저 서버에서 처리해 pre-rendering되고, 그 다음 이벤트 처리나 상태 변화 등, 브라우저에서 상호작용되어야하는 react 코드는 이후 hydration을 통해 작동한다는 것이다.

클라이언트 컴포넌트 `!==` CSR로 작동

Next.js에서는 일단 모든 컴포넌트가 서버 사이드 렌더링된다는 것을 기억하자.

## File Conventions

### Layout 파일

layout.tsx 안에 head의 역할이 같이 들어가 있다.

```tsx:app/layout.tsx
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
```

layout.tsx는 **\_document.tsx, \_app.tsx와 layout.tsx**을 하나로 합친 것이다. `<html>`, `<head>`, `<body>` 가 들어가 있다.

- 개별 라우팅 페이지별로 layout을 만들수도 있다.
  ![layout](/public/images/next.js/nextjs-13/dynamic-route.png)
  - 라우팅 폴더 내에 layout 파일을 넣는다.

### not-found 페이지

[next.js 공식문서 not-found.js](https://beta.nextjs.org/docs/api-reference/file-conventions/not-found)

- ~~아직 app폴더 내에서 원하는대로 커스텀해서 바로 렌더링되는 404.js 파일은 지원이 안되나보다.~~
- ~~현재 `notFound()` 함수로만 not-found.js 파일을 렌더링할 수 있다고 한다.~~

not-found 페이지가 업데이트되었다. app 폴더 내에 not-found.tsx 파일을 생성하면 된다.

```tsx:app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href='/'>Return Home</Link>
    </div>
  );
}
```

### Loading 컴포넌트

- 라우팅 폴더 내에 loading.tsx 이름의 파일을 생성하면 된다. React Suspense 방식을 사용하여 만들어진다. 이 로딩 컴포넌트는 서버 컴포넌트이지만 `use client`를 선언하면 클라이언트 컴포넌트로도 작동 가능하다. 해당 loading 컴포넌트는 페이지 전체에 로딩 페이지가 적용되는데 여기서 스켈레톤 로딩이나 커스텀 로딩을 만들면 된다.

```javascript:app/loading.tsx
export default function Loading() {
  // Or a custom loading skeleton component
  return <p>Loading...</p>;
}
```

### Error 컴포넌트

[next.js 공식문서 Error.js](https://beta.nextjs.org/docs/api-reference/file-conventions/error)

- 에러 발생시의 UI를 만들고 싶다면 라우팅 폴더 내에 error.js 이름의 파일을 만들면 된다. React Error Boundary 방식을 사용한다.
- 반드시 클라이언트 컴포넌트여야 한다고 한다.
- global-error.js도 있다.

## Data fetching 방법 변경

- 기존 버전의 Data fetching 방법이었던 `getServerSideProps`, `getStaticProps`, `getInitialProps` 는 두번째 인자로 무엇을 넣느냐에 따라 함수가 달라지는 더 간단한 fetch API로 대체되었다.

  변경 전

  1. `getServerSideProps()`
  2. `getStaticProps()`
  3. `getInitialProps()`

  변경 후

  1. `fetch(주소, 두번째 인자 설정)` (하나로 통일)

1. Similar to `getStaticProps`

   ```tsx
   export default async function Page() {
     const staticData = await fetch(`https://...`, { cache: 'force-cache' });

     return <div>...</div>;
   }
   ```

   - **`force-cache` 는 디폴트로 생략 가능하다.**

2. Similar to `getServerSideProps`

   ```tsx
   export default async function Page() {
     const dynamicData = await fetch(`https://...`, { cache: 'no-store' });

     return <div>...</div>;
   }
   ```

   - 두번째 인자로 `{ cache: 'no-store' }`

3. Similar to `getStaticProps`

   ```tsx
   export default async function Page() {
     const revalidatedData = await fetch(`https://...`, {
       next: { revalidate: 10 },
     });

     return <div>...</div>;
   }
   ```

   - 두번째 인자로 `{ next: { revalidate: 10 } }` 유효시간을 적어준다.

## Image 성능 향상

`<Image />` 컴포넌트는 이미지 렌더링 시 자동으로 Layout Shift를 알아서 해결해주고, 이미지의 너비 높이를 설정해주지 않아도 된다. 예를 들어 다음과 같이 사용할 수 있다.

```jsx
import Image from 'next/image';
import avatar from './lee.png';

export default function Page() {
  return <Image src={avatar}></Image>;
}
```

- Layout Shift를 알아서 해결해줌 너비 높이 설정해주지 않아도 된다.

## Link 사용법 변경

`<Link>` 컴포넌트의 사용법이 변경되었다. 이전 문법에서는 a태그로 감싸줘야 했지만, 13버전 부터는 감싸주지 않아도 된다.

```jsx
// 이전 문법
<Link href="/about">
 <a>about</a>
</Link>

// 13버전 문법 : a태그로 안감싸도 됨
<Link href="/about">
 about
</Link>
```

## 새로운 빌드 옵션

- 빌드 시간을 줄이기 위한 `-build-timeout` 옵션을 추가했다.
- `-output-dir` 옵션은 빌드 결과물을 저장하기 위한 옵션이다.
- `-max-workers` 옵션은 빌드 시간을 줄이기 위해 빌드가 이루어지는 최대 워커 갯수를 지정하는 옵션이다.
- `-experimental-extras` 옵션은 Next.js 프레임워크의 비공개 기능들을 활성화하는 옵션이다.
- `-no-prerender` 옵션은 빌드 시 미리 렌더링을 하지 않고, 런타임 동작만을 수행하는 옵션이다.

&nbsp;

&nbsp;

&nbsp;

여기까지 Next.js 13의 변경 사항들을 정리해보았다. 여기서 가장 큰 변화는 단연코 서버 컴포넌트와 클라이언트 컴포넌트로 구분한 점이 아닐까 싶다. 물론 데이터 fetching 방식이 기존 3가지 방식에서 하나로, 그것도 fetch api로 변경되었다는 점이 인상적이었다. Next.js 13으로 버전업한지 얼마되지 않아 사용해서 베타 버전도 많았고 아직 구현되지 않았던 부분도 있었는데 시간이 흐르고 보니 대부분의 기능이 안정화되었다. 그리고 실제로 사용해보니 라우팅이나 로딩, 이미지 최적화, 데이터 캐싱 등등 프레임워크에서 알아서 설정해주니까 정말 편리했다. 확실히 갈수록 더욱더 편리한 프레임워크가 되어가고 있는 것 같다. 당분간 react 프레임워크에서 가장 인기가 있는 프레임워크 자리에서 내려올 것 같진 않다.🔥
