## 기존의 브라우저 렌더링 방식

브라우저는 실제 DOM을 조작하여 UI를 변경한다.

1. 자바스크립트에서 DOM을 조작하여 변경 사항이 생긴 경우, 브라우저는 DOM 노드 트리에서 쭉 탐색하며 내려가면서 변경된 부분을 찾는다.
2. 변경되어야 하는 요소와 해당 요소의 자식 요소들을 모두 제거한 후 변경된 요소로 교체한다.
3. 이후 변경 완료한 DOM과 CSS를 다시 계산하여 새로운 렌더 트리를 생성한다.
4. 레이아웃과 페인팅 합성 과정을 다시 거친다.

[브라우저의 렌더링 과정](https://jellieblog.dev/posts/browser-rendering-process)

과정이 굉장히 복잡해보이지만 빠른 알고리즘 덕분에 브라우저에서 렌더링이 느린 것은 아니다. 하지만 전체 페이지의 아주 작은 일부분만 변경하는 것임에도 DOM을 조작할 때마다 위의 과정을 전부 반복해서 거치는 것은 굉장히 비효율적이다.

이후 SPA가 등장하면서 웹페이지가 더 동적으로 보이기 위해 효율적인 DOM 조작이 요구되었고 바로 React가 SPA 대표 라이브러리로 가상돔을 통해 효율적으로 화면을 렌더링하고 있다.

## React의 렌더링 방식

그럼 리액트는 어떤 방식으로 브라우저에 렌더링하는지 알아보자.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

리액트 프로젝트에서 index.html 파일에 들어가보면 `<body>` 태그 내에 `<div id="root"></div>`만 있고 텅텅 비어있는 것을 볼 수 있었을 것이다.

```javascript
import ReactDOM from 'react-dom/client';
import App from 'App';

// ✅ ReactDOM
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
```

그리고 index.js 파일에 들어가보면 이렇게 `ReactDOM.createRoot()`이 작성되어 있다. 바로 이 ReactDOM은 텅텅 비어있는 DOM 트리에 React 코드를 자바스크립트로 변환하여 `<div id="root"></div>`에 연결하는 역할을 맡고 있다. 그리고 연결한 트리를 `render()` 함수를 호출해 브라우저에 렌더링되는 것이다.

즉, ReactDOM은 React 코드를 브라우저에서 실행 가능한 형태로 변환하는, 실제 DOM을 렌더링하기 위한 도구이다.

리액트가 어떤 식으로 브라우저에 실제 DOM을 렌더링하는지는 알았다. 그렇다면 리액트는 이 실제 DOM을 어떻게 변경하는 걸까? 리액트는 좀더 빠르고도 효율적으로 렌더링하기 위해 Virtual DOM을 활용한다.

## Virtual DOM이란?

React는 Virtual DOM을 활용하여 렌더링을 한다는 특징을 갖고 있다.

> Virtual DOM, (가상돔, 이하 VDOM으로 통칭)
>
> 실제 DOM 노드 트리를 복사하여 메모리에 저장된 자바스크립트 객체. 이후 이 복사본이 실제 DOM과 동기화된다.

VDOM은 DOM을 복사하여 DOM의 노드들을 Fiber 노드로 변환한 트리이다. 여기서 Fiber 노드란 리액트 컴포넌트 트리에 대한 추가 정보를 포함한 내부 객체를 뜻한다. 이 내부 객체들로 이루어진 트리가 바로 VDOM이 된다.

VDOM의 특징은 class와 style 속성은 복제하지만 DOM API는 복제하지 않는다는 것이다. 그렇기 때문에 VDOM으로 화면의 내용을 직접적으로 수정할 수는 없다. 그렇다면 이 DOM 트리 복사본을 렌더링에 어떻게 활용하는 걸까?

## 브라우저와 조금 다른 의미의 렌더링?

먼저 **"렌더링"** 용어의 정확한 의미에 대해 이해해보자. 리액트 렌더링과 브라우저 렌더링과 조금 다른 의미를 가진다. 먼저 브라우저에서 렌더링은 렌더 트리가 레이아웃, 페인팅, 합성 과정을 거쳐서 화면에 그려지는 것을 뜻한다.

하지만 리액트에서 렌더링은 조금 다른 의미를 가진다.

> 리액트에서 렌더링
>
> "Rendering" is React calling your components. _(공식문서 Render and Commit)_
>
> 리액트에서 렌더링이란 **컴포넌트를 호출**하는 것을 뜻한다. 초기 렌더에서는 root components가 호출되고, 이후 연속적인 렌더링에서는 상태를 변경할때마다 함수 컴포넌트가 계속 호출된다는 것을 뜻한다.

## Virtual DOM을 활용한 UI 업데이트

그럼 이제 본격적으로 VDOM을 활용하여 리액트가 어떻게 렌더링하고 UI를 업데이트 하는지 알아보자.

1. 변경사항 발생

   UI를 업데이트, 렌더링하려면 일단 변경사항이 발생해야 할 것이다. 이 변경사항은 **state나 props가 변경**되면 발생한다. 그래서 렌더링 최적화를 위해서는 불필요한 state나 props를 줄여야하는 것이다.

2. **Render Phase** (새로운 VDOM 생성)

   React는 두개의 VDOM 객체를 갖고 있다.

   ![두개의 VDOM](/public/images/react/react-virtual-dom-and-rendering/virtual-dom-1.png)

   1. 변경사항 발생 이전 트리 구조의 VDOM
   2. 변경사항이 반영된 트리 구조의 VDOM

   상태나 속성이 변경되면 React는 2번의 변경사항이 반영된 가상 DOM 객체를 생성한다. 그럼 React는 Diffing 알고리즘을 사용하여 두 VDOM을 순회하고 **이전 가상 DOM과 새로운 가상 DOM을 비교**해 어디에 어떤 변경사항이 있는지 찾는다.

   그리고 변경사항을 반영한 다른 새로운 가상 DOM을 생성한다. 이 새로운 가상 DOM이 생성되는 즉시 1번의 이전 VDOM은 메모리에서 해제되고, 2번의 VDOM이 1번의 이전 VDOM이 된다. 그렇게 렌더링이 일어날 때마다 순차적으로 이전 VDOM, 새로운 VDOM으로 옮겨진다.

   - **batch update**

     그리고 React 버전 18 이후 여러 변경사항들을 하나로 묶어 일괄적으로 업데이트한다.

3. Commit Phase (DOM 동기화)

   렌더 단계가 완료되면 React는 변경사항을 실제 DOM에 확정하는 단계로 진입한다. 이 과정에서 브라우저에 변경 사항이 반영되고 화면이 업데이트된다.

4. 에필로그: 브라우저 페인트

   컴포넌트 렌더링을 끝내고 리액트가 DOM을 업데이트하면 브라우저는 화면을 리페인트한다.

## 재조정 (reconciliation)

이전 트리로 렌더링된 요소와 새롭게 생성된 요소가 일치하지 않을 때 이 변경사항을 DOM을 반영하여 동기화하는데 이 과정을 **재조정**(reconciliation)이라고 한다.

VDOM을 겉핥기식으로 알고 있었을 때는 실제 DOM의 복사본, 변경사항을 비교해서 DOM에 렌더링. 이런 식으로 조금 쉽게 보았었는데 제대로 동작 원리와 순서에 대해 공부하니까 단번에 이해하기 어려웠다. 특히 중간의 Render Phase 과정에서 왜 이전 VDOM, 변경사항이 반영된 이후 VDOM을 비교해서 새로운 VDOM을 만들고 그걸 그래도 이 글을 작성하면서 좀더 리액트의 렌더링에 대해 깊이 알 수 있었던 시간이었다. 그리고 어떻게 리액트의 렌더링을 최적화를 해야할지에 대해서도 깊은 고민이 들게 되었다.

&nbsp;

&nbsp;

참고

- [공식문서:render-and-commit](https://react.dev/learn/render-and-commit)
