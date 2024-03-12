> [Next.js 공식 블로그: Next.js 14 포스트](https://nextjs.org/blog/next-14)

## Next.js 14 변경사항

Next.js 13 버전이 나오고 체감상 얼마 되지 않아 바로 14 버전이 나와서 굉장히 깜짝 놀랐던 기억이 난다. 그리고 어떤 변화가 있었는지 살펴보니 엄청난 변화가 있었던 13 버전과 달리 엄청난 변화가 많지는 않았다. Next.js 14에는 어떤 변화가 있는지 한번 정리해보려고 한다.

## 최소 node.js 버전

Next.js 14 버전에서는 최소 Node.js v18.17.0을 사용해야한다.

## Server Actions

가장 생소했던 기능인데, 13 버전에 실험적으로 있었다가 14 버전에 안정화된 기능이다. 사실 Next.js는 풀스택 프레임워크로 프론트엔드뿐만 아니라 백엔드의 api 라우터도 사용할 수 있는데, 바로 이 백엔드의 api 라우터를 자동화해주는 기능이다. 그리고 Server Actions는 Next.js 프로젝트에서만 사용하는 것이라면 api 라우터를 만들지 않고도 서버 컴포넌트에서 바로 데이터베이스에 한번에 값을 저장하고 수정할 수 있다고 한다. 따라서 유저에게 코드가 노출될 걱정 없이 데이터베이스를 관리할 수 있다.

`'use server'`을 함수나 파일 내에 작성하면 되고, 이 선언이 있다면 서버에서만 작동하게 된다.

```jsx
// app/page.tsx

export default function Page() {
  async function create(formData: FormData) {
    'use server'; // ✅ 함수 내 작성
    const id = await createItem(formData); // ✅ form 데이터 바로 가져온다.
  }

  return (
    // ✅ 액션 속성
    <form action={create}>
      <input type='text' name='name' />
      <button type='submit'>Submit</button>
    </form>
  );
}
```

만약 서버로 데이터를 전송하는 form에서 작성할 때, 클라이언트에서 전송하는 절차를 굉장히 간소화할 수 있어 개발자 경험이 좋아진다.

그리고 `<form>` 태그에서는 `onSubmit`이 아니라 `action` 속성을 사용해야 한다.

이 기능을 보니, Next.js는 React 프레임워크라는 틀을 넘어 풀스택 패키지 프레임워크가 되어가고자 한다는 방향성이 보인다.

이제 프론트엔드 상에서 onSubmit 함수를 구현하지 않고 서버상에서 구현하여 바로 data mutations(서버 데이터 수정)을 하고, 보안도 높일 수 있다.

이 기능은 정말 간단하게 맛만 본 정도여서 실제로 사용하면서 더 공부해봐야겠다.

[server-actions-and-mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## Partial Prerendering (Preview)

이제 먼저 데이터가 들어온 부분은 전체 페이지에서 부분적으로 먼저 렌더링이 가능하다. 같은 시간에 api 요청이 들어가고 먼저 들어온 데이터대로 바로 들어가는데, react의 <Suspense> 기능을 통해 각 데이터가 들어가기 전에 각 로딩 화면을 보여준다.

```jsx
export default function Page() {
  return (
    <main>
      <header>
        <h1>My Store</h1>
        {/* ✅ Suspense: 로딩과 부분 렌더링 */}
        <Suspense fallback={<CartSkeleton />}>
          <ShoppingCart />
        </Suspense>
      </header>

      {/* ✅ Suspense: 로딩과 부분 렌더링 */}
      <Suspense fallback={<ProductListSkeleton />}>
        <Recommendations />
      </Suspense>
      <NewProducts />
    </main>
  );
}
```

## Metadata 개선

메타데이터로 Viewport나 페이지 테마, 색상 구성에 관한 정보를 설정하면 레이아웃이 이동하거나 페이지가 깜박이는 것을 방지하여 원활한 사용자 환경을 제공한다.

- viewport
- colorScheme
- themeColor

기존에는 메타데이터 설정에서 title이나 description, ogTag와 같은 기본 메타 태그와 위의 정보들을 같이 설정했었지만, 이제는 따로 분리해서 정의해야한다고 한다.

```jsx
// 기존 방식
export const metadata = {
  title: 'My App',
  themeColor: 'dark',
  viewport: {
    width: 1,
  },
};
```

```jsx
// ✅ 새로운 방식, metadata와 viewport 분리
export const metadata = {
  title: 'My App',
};

export const viewport = {
  width: 1,
  themeColor: 'dark',
};
```

[metadata-to-viewport-export](https://nextjs.org/docs/app/building-your-application/upgrading/codemods#metadata-to-viewport-export)

## 기타 변경사항

- Turbopack 성능 향상
  - local server startup 53% ⬆️
  - fast refresth 94% ⬆️

등등이 있다.

&nbsp;

&nbsp;

이 포스트에서 Next.js 14에서 어떤 점들이 바뀌었는지를 살짝 살펴보았다. 얼마 지나지 않아 14 버전이 업데이트가 된 것 같은데, 정말 빨리 빨리 사용자들의 피드백을 수용하고 있다는 것이 느껴진다. 앞으로 얼마나 발전할지 기대가 되는 프레임워크다👍
