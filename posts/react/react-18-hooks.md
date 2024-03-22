## React 18의 새로운 Hook

이전 포스트에서 [React 18의 새로운 기능들](https://jellieblog.dev/posts/react-18-new-features)에 대해 살펴보았다. 그리고 React 18에서 새로운 Hook들이 추가되었는데, 과연 어떤 훅들이 추가된건지 훅 3가지를 일단 살펴보고자 한다.

### useTransition

UI에서 블로킹없이 상태를 업데이트하고자 할때 사용하는 훅이다. 이 hook은 특히 사용자와의 빠른 인터랙션이 중요할 때 유용하다.

```tsx
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  // ✅ isPending은 보류중인 전환이 있는지 알려준다.
  // ✅ startTransition는 전환해야 하는 업데이트로 표시해준다.
  // ...
}
```

보통 React의 상태 변화는 즉각적으로 나타나는데, 관리해야 상태가 많거나 하나의 상태에서 복잡한 연산을 처리해야 하는 경우 사용자 경험이 좋지 않아지는 경우가 있다.(예: 문자 입력시 버벅이는 현상) 이때 급하지 않은 상태변화를 나중에 처리함으로써 인터랙션이 급한 상태를 더 빨리 렌더링할 수 있다.

`startTransition()`로 래핑하면 상태값 업데이트가 되는 것들중 우선순위가 낮다는 것을 나타낼 수 있다.

예시

```tsx
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    // ✅ startTransition으로 래핑
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

**사용시 주의할 점**

1. `useTransition`은 훅이라서 커스텀 훅이나 컴포넌트 내에서만 사용할 수 있으므로, 데이터 라이브러리와 같은 다른 곳에서 전환을 해야 하는 경우 hook이 아닌 `startTransition` 함수를 대신 사용한다.

2. 상태 업데이트를 직접적으로 처리하는 경우에는 `useTransition`을 사용하여 전환을 적용할 수 있지만, prop이나 커스텀 훅의 값에 의존하여 전환을 시작해야 하는 경우에는 `useDeferredValue`를 사용하여 처리하는 것이 좋다.

3. `startTransition`에 래핑되는 함수는 동기식이어야 한다. 왜냐하면 React는 즉시 전환 기능을 실행해버리기 때문이다. 더 나중에 `setTimeout` 같은 비동기 함수로 더 나중에 실행하려고 하면 전환으로 표시되지 않는다.

참고  
[react.dev/useTransition](https://react.dev/reference/react/useTransition)

### useDeferredValue

UI 한 부분의 업데이트를 지연시킬 수 있는 훅이다.

```tsx
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

UI에서 우선순위를 나타낸다는 것에서 `useTransition`과 비슷하지만, `useDeferredValue`는 상태 업데이트로 **변경된 값**을 지연시키는 것이다. 새로운 값이 로딩되고 있는 동안 이전의 오래된 값을 보여준다. 보통 외부 라이브러리로 코드에 접근할 수 없을 때 값 자체를 지연시키기 위해 사용한다.

두번째 매개변수로 최대 지연 시간을 지정할 수도 있다. 이것은 값에 대한 리렌더링을 지연시킬 수 있는 것이지 자식 컴포넌트를 지연시키는 것이 아니다. 자식 컴포넌트 지연은 `useMemo`를 사용한다.

**사용시 주의할 점**

1. `useDeferredValue`에 전달되는 값은 원시값이거나, 외부에서 렌더링되도록 생성된 객체여야 한다. 새로운 객체를 넣어서는 안된다. 만약 렌더링 중에 새로운 객체를 생성하고 즉시 전달하는 경우 렌더링마다 객체값이 달라지므로 매번 불필요한 렌더링이 발생한다.(객체의 특성)

2. `useDeferredValue`는 `Object.is`로 현재 렌더링되는 이전 값 수신된 값을 비교한다. 이전 값과 수신한 값이 다르다면, 수신한 새로운 값으로 백그라운드에서 재실행할 일정을 설정한다. 그리고 이 백그라운드 리렌더는 만약 또다른 새로운 값으로 업데이트되면 렌더링을 중단하고, 새로운 값으로 렌더링을 재시작한다. 예를 들어 사용자가 입력한 값에 따라 어떤 데이터 차트가 나타나는 경우, 사용자가 입력하는 값의 상태는 막힘없이 업데이트 되고, 이 값의 업데이트가 중지된 후 데이터 차트가 다시 렌더링된다.

3. `useDeferredValue`는 Suspense와 통합되어 있다. 여기서 통합되어 있다는 것은 새로운 값으로 인해 업데이트가 일어나는 경우 fallback을 보여주지 않고 이전값으로 보여주는 것을 뜻한다.

4. stale된 값을 css로 표현할 수도 있다.

   ```tsx
   <div
     style={{
       opacity: query !== deferredQuery ? 0.5 : 1,
     }}
   >
     <SearchResults query={deferredQuery} />
   </div>
   ```

참고  
[react.dev/useDeferredValue](https://react.dev/reference/react/useDeferredValue)

### useId

접근가능한 속성인 유니크한 ID를 생성해주는 훅이다. 여러개의 연관된 요소에 ID로 생성한다.

```tsx
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  return (
    <>
      <label>
        Password:
        {/* ✅ 접근 가능한 속성 */}
        <input type='password' aria-describedby={passwordHintId} />
      </label>
      {/* ✅ 같은 ID 사용 */}
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}
```

**사용시 주의할 점**

1.  리스트의 key로 사용되어서는 안된다.

## TL;DR

React 18에 새로 등장한 Hook 3가지에 대해 살펴보았다.

기존의 hook보다 확실히 더 범용적으로 사용될 것 같은 hook은 아닌 것 같지만, 특정 상황에서 성능을 업그레이드 하고자 할때 쓸 수 있는 hook들인 것 같다.

React 18 새로운 훅 3가지 요약

1. `useTransition`

   UI를 어떤 블로킹없이 사용하고 싶을 때 사용할 수 있는 훅이다. `startTransition` 함수를 통해 렌더링의 우선순위를 정할 수 있다. 급하지 않은 상태를 **전환**해서 다른 급한 렌더링을 우선 업데이트해 사용자 경험을 개선할 수 있다.

2. `useDeferredValue`

   useTransition과 같이 렌더링에 있어 우선순위를 정할 수 있다. 하지만 **값**을 지연하는 것이므로 외부 라이브러리와 같이 어떤 상태에 직접 접근할 수 없을 때 사용한다.

3. `useId`

   접근 가능한 유니크한 값을 생성할 때 사용할 수 있는 훅이다.

이렇게 새로운 hook 3가지에 대한 개념을 정리해보았다. `useTransition`이나 `useDeferredValue`는 성능면에서 괜찮은 것 같아서 다음 프로젝트에 직접 적용해보고 싶다.
