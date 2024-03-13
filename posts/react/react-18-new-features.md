## 새로운 React 18!

SPA의 대표주자로 등장한 React는 애초에 빠르고 인터랙티브한 사용자 경험에 초점을 맞췄던 라이브러리였다. 하지만 CSR의 단점들이 나타나고, SSR 방식이 다시 나타나면서 더 좋은 사용자 경험을 만들기 위해 계속해서 고민을 한 결과가 React 18인 것 같다.

React팀이 블로그에서 React 18을 발표한지도 벌써 1년이 지났다. 내가 이제 코딩을 시작하여 React에 대해 살짝 맛만 보고 있을 때 새롭게 업데이트를 한 것이다! 그 당시에는 관련 글을 읽어보아도 절대 무슨 말인지 하나도 알아먹을 수가 없었다. ~~Concurrent Mode? 그게 뭔데... Suspense? 그게 뭔데...~~ 그렇게 1년이 지나며 조금 성장한 지금, 이제는 그 내용이 조금씩 이해가 된다.

내가 여러 글들을 보며 이해한 React 18에 대한 내용을 이 포스트에서 정리해보려고 한다. 여기에서는 **React 18의 새로운 기능**에 대해서만 다룬다. React 18에 추가된 새로운 Hook에 대한 다음 포스트에서 볼 수 있다.

## Concurrent React

React 팀에서는 React 18에서 가장 중요한 사항으로 **Concurrency 동시성**을 들었다. 동시성은 어떤 기능이 아니라, **동시에 여러가지 UI를 렌더링**할 수 있게 만들어주는 완전히 새로운 **백그라운드 매커니즘**이다.

간단히 말하면 Concurrent React는 이 Concurrency라는 매커니즘을 지원하는 새로운 React 렌더링 모델이다. 이전 렌더링 모델의 한계를 극복하고 **렌더링 작업을 분할하고 우선순위를 부여**해 다른 작업을 처리하는 동안에도 앱이 빠르고 반응성이 좋게 동작하도록 만들었다.

이에 따른 주요 특성으로는

1. **렌더링이 중단될 수 있다.**

   그리고 렌더링이 중단되더라도 UI를 일관되게 나타나도록 보장한다. 이는 대규모 렌더링 작업 중에도 사용자 인터랙션에 빠르게 응답할 수 있다는 것을 의미한다.

2. **재사용 가능한 상태**

   화면에서 UI 섹션을 삭제한 후 나중에 이전 상태를 재사용하면서 다시 추가할 수 있다. 예를 들어 사용자가 현재 화면에서 다른 곳으로 갔다가 다시 뒤로가기를 눌렀을 때 이전 화면과 같은 상태로 복원할 수 있다.

**Concurrent Features**  
동시성이 지원되는 Concurrent React를 위한 **새로운 기능**을 의미한다. 그러니까 지금 이 포스트에서 다루는 기능들인 **Suspense, Automatic Batching** 같은 것들이 Concurrent Features이다.

- **Concurrent Mode?**  
  전에 Concurrent Mode라는 용어를 봤던 것 같은데 공식문서에 없어서 따로 찾아보니 React 18이 되면서 따로 Mode 같은 것은 없어졌다고 한다. 왜냐하면 이 새로운 방식은 React 18의 기능들을 사용할 때만 활성화되기 때문이다. 이제 concurrent는 rendering과 더 자주 쓰이는 것 같다.

참고  
[17.reactjs.org/docs/concurrent-mode-intro.html](https://17.reactjs.org/docs/concurrent-mode-intro.html)  
[react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react)

## React 18의 새로운 기능

React 18은 새로운 기능들이 많이 추가되었는데, 정말 '업그레이드'되었다는 표현이 알맞은 것 같다. 그만큼 기존의 기능은 강화되었고, 새롭게 다양한 기능이 추가되었다. 새롭게 추가된 기능 중 5가지에 대해 알아보자.

### 1. createRoot, hydrateRoot

> `render()` → `createRoot()`로 렌더링 함수가 변경되었다.

- **React 17: `render()`**

  ```tsx
  ReactDOM.render(리액트 요소, DOM 노드인 루트, 콜백함수?);
  ```

  18버전 이전에 ReactDOM는 react-dom에서 나왔고, `render()`라는 함수를 이용해 렌더링했다. 첫번째 인자는 렌더링할 React 컴포넌트, 두번째 인자로는 렌더링을 표시할 DOM 노드 container이다. 세번째 함수는 랜더링 완료 후 추가적인 작업을 수행할 수 있는 콜백함수를 넣을 수 있었다.

  ```typescript:index.tsx
  // ✅ React 17
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  const container = document.getElementById('root')

  ReactDOM.render(<App />, container);
  ```

- **React 18: `createRoot()`**

  ```tsx
    const root = createRoot(domNode, options?)
  ```

  createRoot는 브라우저의 DOM 노드 내에 React 컴포넌트를 표시하는 루트를 생성해준다. 첫번째 인자로 해당 DOM요소를 위한 루트를 생성한다. 두번째 인자는 추가적인 옵션으로 `onRecoverableError`와 `identifierPrefix`가 있다.

  ```tsx:index.tsx
  // ✅ React 18
  import { createRoot } from 'react-dom/client';
  import App from './App';

  const domNode = document.getElementById('root') as HTMLElement;
  const root = createRoot(domNode);

  root.render(<App />);
  ```

  `createRoot()`는 VirtualDOM 트리에서 index.html 문서 내 `<div id="root"></div>`를 나타내는 노드를 생성한다. createRoot는 부모를 가지면 안되며, 최상위 레벨이어야 한다는 조건이 내장되어 있다.

  `createRoot()`는 domNode를 위한 Root를 생성해 DOM의 관리를 이어받는다.

  - **root.render()?**  
    `root.render()`는 React Node인 JSX의 조각을 브라우저 DOM 노드에 표시한다. 위의 코드에서 React는 root에서 html에 있었던 코드들을 지우고 `root.render()`로 전달한 `<App/>` 컴포넌트를 표시해 root 내부 DOM의 관리를 이어받는다.

    1. 렌더를 유발한다.
    2. Render phase
       업데이트를 수행해 화면을 변경한다.
       - perfomUnitOfWork
       - beginWork
       - completeUnitOfWork
       - completeWork
    3. Commit phase
       변경된 화면을 실제 브라우저에 나타낸다.

#### 왜 createRoot로 변경되었을까?

1. 일단 createRoot를 통해 React 18의 기능을 사용할 수 있다.

   ![createRoot docs](/images/react/react-18-new-features/createRoot.png)
   [https://react.dev/blog/2022/03/29/react-v18#react-dom-client](https://react.dev/blog/2022/03/29/react-v18#react-dom-client)

   `createRoot` 없이는 React 18 기능이 동작하지 않는다. 예를 들어 다음에 이어지는 이야기인 Automatic Batching이나 `startTransition` 기능도 이 `createRoot` 함수를 통해 이용 가능하다.

2. 이제 계속 DOM에 접근하지 않아도 된다.

   이전 Legacy인 `ReactDOM.render()`는 두번째 인자에 root를 넣는데, root를 DOM 노드를 통해 접근하기 때문에 root인 container에 변경이 없더라도 렌더링하기 위해서 계속 DOM에 접근해야 했다.

   하지만 React 팀은 렌더링 과정마다 이 루트를 통과하는 것이 무의미하다고 생각하고, 새로운 API인 `createRoot`를 만들었다. `createRoot`에서는 인자로 DOM 노드를 넣어 새로운 root를 생성하고 이 새로운 root에서 `render` 함수를 호출하기 때문에 더 이상 DOM에 접근하지 않아도 된다.

   [https://react.dev/reference/react-dom/client/createRoot](https://react.dev/reference/react-dom/client/createRoot)
   [https://tech.osci.kr/2022/05/03/react-18v/](https://tech.osci.kr/2022/05/03/react-18v/)

3. 더 효율적으로 렌더링하기 위함이다.(:지연된 렌더링)

   컴포넌트를 즉시 렌더링하지 않고 브라우저가 다른 작업을 수행할 수 있도록 할 수 있다.

정리하면 `ReactDOM.createRoot()` 함수는 더욱 효율적이며 빠르게 렌더링하고, 최종 DOM 노드를 결정할 수 있는 방식을 제공한다.

- **`hydrateRoot` 추가**  
  만약 서버 렌더링되는 애플리케이션이라면 `createRoot()`는 작동하지 않는다. 이때는 `hydrateRoot`를 사용한다.

### 2. Automatic Batching

Batching이란 "한묶음"이라는 뜻으로, 여러가지 요소를 하나로 묶는 것을 나타낸다. React에서는 성능 향상을 위해 여러 상태 업데이트를 하나의 리렌더링으로 그룹화하는 것을 뜻한다. Batching을 통해 렌더링 수를 줄일 수 있는 것이다.

기존에는 **React 이벤트 핸들러** 내에서만 Batching 기능이 적용되었고, `setTimeout`, `promises` 네이티브나 기타 이벤트에서는 적용되지 않았다.

하지만 이제는 모든 업데이트에서 자동으로 Batching이 적용된다.

```tsx
// v18 전
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // ✅ React 이벤트 핸들러가 아닌 setTimeout
  // ✅ setCount, setFlag 두번 렌더링된다.
}, 1000);
```

```tsx
// v18
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // ✅ 이제 모든 업데이트에서 Batching되므로 한번 렌더링된다.
}, 1000);
```

### 3. Transitions

transition은 긴급한 상태 업데이트와 긴급하지 않은 상태 업데이트를 구분한다. 그러니까 업데이트에 **우선순위**를 줄 수 있는 것이다.

긴급한 상태 업데이트로는 유저와의 상호 작용인 입력, 클릭과 같은 것들로 즉각적으로 빠르게 상태 업데이트를 해야할 요소들이 있다. 이때 transition을 통해 다른 UI를 우선적으로 렌더링하도록 '전환'하는 것이다.

```tsx
import { startTransition } from 'react';

// ✅ 긴급한 유저의 인풋 상태 업데이트
setInputValue(input);

// ✅ 다른 상태 업데이트는 startTransition으로 더 나중에 업데이트 가능
startTransition(() => {
  // 서치 결과를 보여주는 것에서 더 긴급한 업데이트인 인풋 상태가 들어오면 전환
  setSearchQuery(input);
});
```

이 기능은 `useTransition`이라는 hook으로도 똑같이 구현할 수 있는데, 이 `transition`은 hook을 사용할 수 없을 때 사용한다. concurrent 매커니즘을 사용하는 것으로 긴급한 상태 업데이트로 전환되어 일시중단된 다른 상태는 백그라운드에서 렌더링하면서 현재 콘텐츠를 계속 표시하도록 만든다.

### 4. Suspense

Suspense는 컴포넌트 트리의 일부가 아직 표시될 준비가 되지 않았을 경우 로딩 상태를 선언적으로 지정할 수 있다. 로딩 상태는 컴포넌트 안이 아니라 외부에 있고, 외부에서 로딩 상태를 컨트롤할 수 있게 되는 것이다.

이제 `Suspense`는 클라이언트나 서버 둘 모두에서 지원된다.

```tsx
// ✅ Comments의 렌더링이 아직 준비되지 않은 경우 컴포넌트의 로딩 상태 선언
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

`Suspense`는 transition과 결합했을 때 가장 잘 작동한다고 한다. React는 이미 표시된 콘텐츠가 transition으로 일시중단되었을 때 fallback으로 표시되는 것을 방지하고 렌더를 지연시킨다.

### 5.React Server Component

말그대로 서버에서 동작하는 컴포넌트. 클라이언트가 아니라 서버에서 컴포넌트를 만들고 만든 결과를 화면에 보여준다. **서버 사이드 렌더링과 다르다.** 서버 컴포넌트의 코드는 클라이언트로 전달되지 않는다.

- 장점

  1.  API를 통한 데이터 요청이 빈번한 컴포넌트일 경우 서버 컴포넌트로 만든다면 브라우저에서 서버에 API 요청할 필요 없이 서버에서 모두 수행되어 그 결과만 클라이언트에 보내지기 때문에 성능과 사용자 경험이 더욱 좋아진다. 클라이언트 컴포넌트에서 발생하던 client-server waterfall이 사라지는 것이다.

  2.  Code splitting 기법의 React.lazy을 사용하려면 사용하려는 곳에 일일이 적용해야 한다. 하지만 서버 컴포넌트는 서버 컴포넌트에 import되는 모든 클라이언트 컴포넌트를 code splitting포인트로 간주, React.lazy를 자동으로 적용하기 때문에 명시하지 않아도 된다. 서버 자체에서 미리 필요한 컴포넌트를 선택한다고 한다.

## TL;DR

React 18은 Concurrency, 동시성을 통해 여러가지 렌더링 작업을 분할하고 렌더링에 우선순위를 부여하며, 다양한 기능을 통해 더 효율적인 방식으로 좋은 사용자 경험을 제공한다.

1. createRoot API를 통해 매번 container DOM에 접근해야했던 것에서 접근하지 않아도 된다.
2. automatic batching을 통해 더 적고 효율적으로 렌더링할 수 있게 되었다.
3. transition을 통해 렌더링에 우선순위를 부여할 수 있게 되었다.
4. 아직 준비되지 않는 React 요소에 대해 **밖에서** 처리할 수 있게 되었다.
5. 서버에서 동작하는 컴포넌트를 만들 수 있게 되었다.

&nbsp;

&nbsp;

#### 참고

[React Blog: react-v18](https://react.dev/blog/2022/03/29/react-v18)
[카카오페이 | React 18: 리액트 서버 컴포넌트 준비하기](https://tech.kakaopay.com/post/react-server-components/)
[React Docs: react-dom-client](https://ko.reactjs.org/docs/react-dom-client.html)
[React Docs: concurrent mode intro](https://17.reactjs.org/docs/concurrent-mode-intro.html)
[https://tech.osci.kr/2022/05/03/react-18v/](https://tech.osci.kr/2022/05/03/react-18v/)
