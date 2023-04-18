## Deep Dive into useEffect!

아마 React 훅 중 `useState` 다음으로 가장 많이 사용되는 훅이 `useEffect`가 아닐까 싶다. 오늘 포스트에서는 `useEffect`를 사용하는 상황에 대해 간단히 알아보고, 또 언제 사용하지 말아야 하는지 등 기본적인 개념에서 좀 더 Deep Dive 해보려고 한다.

```tsx
useEffect(콜백함수, 의존성 배열);
```

## Effect란 무엇인가?

React 구성 요소 내부에는 두 가지 로직이 있는데, 첫번째는 JSX를 반환하는 렌더링 코드, 두번째는 유저와의 인터랙션으로 side effect가 포함되는 이벤트 핸들러이다.

1. **Rendering Code(렌더링 코드)**

   Props나 State를 가지고 이것들을 변환하면서 화면에 표시할 JSX를 반환한다. 그리고 중요한 것은 **렌더링 코드는 순수해야 한다는 점이다.**

2. **Event Handler(이밴트 핸들러)**

   구성요소 내부에 중첩되어 작업을 수행하는 함수이다. 이벤트 핸들러는 유저와의 인터랙션(클릭이나 입력)으로 발생하는데, 여기서 side effect를 포함한다.

하지만 위의 두가지 구성요소로는 특히 외부와 상호작용할 수 없다. 왜냐하면 렌더링 코드는 순수해야 하기 때문에 렌더링 중에 실행할 수 없기 때문이다.

> 이때 effect를 이용하면 렌더링 자체에서 발생하는 side effect를 지정해서 외부와 상호작용할 수 있다.

그러니까 채팅방을 예시로 들자면,  
채팅방에서 메시지 발송 버튼은 사용자와의 인터랙션으로 발생하는 event handler라면,
채팅방에 접속할 때 채팅 서버에 연결하는 것은 effect인 것!

그리고 effect는 컴포넌트에 `useEffect`를 통해 선언한다.

## 컴포넌트에서 useEffect의 역할

> `useEffect`이 하는 역할을 살펴보면,
>
> 1. **외부의 값이나 상태와 상호작용**하며 **컴포넌트의 side effect**를 처리
> 2. 컴포넌트의 **특정 생명 주기에 맞춰 특정 작업**을 처리
>
> 이렇게 두가지를 들 수 있다.

### 외부의 값이나 상태와 상호작용하며 컴포넌트의 side effect를 처리

외부와 상호작용한다는 것은 React 시스템에서 벗어나 상호작용할 수 있다는 뜻이다. 예시로 네트워크상에서 데이터를 변경한다던가, 수동으로 DOM을 조작하는 것 등이 있다.

```tsx
import React, { useState, useEffect } from 'react';

function CountBox() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.alert(`You clicked ${count} times`);
    // ✅ 외부 브라우저와 상호작용하는 side effect
  }, []);

  return <button onClick={() => setCount(count + 1)}>Click me</button>;
}
```

### 컴포넌트의 특정 생명 주기에 맞춰 특정 작업을 처리

| 마운트                                           | 업데이트                                               | 언마운트                    |
| ------------------------------------------------ | ------------------------------------------------------ | --------------------------- |
| `componentDidMount`                              | `componentDidUpdate`                                   | `componentWillUnmount`      |
| useEffect의 의존성 배열에 []로 첫렌더링에만 관여 | useEffect의 의존성 배열에 업데이트 되어야 하는 값 넣기 | return문으로 clean-up해준다 |

- `componentDidMount` & `useEffect`

  `componentDidMount`는 컴포넌트의 생명주기에서 DOM에 삽입되어 화면에서 처음으로 렌더링된 것을 나타내는데, 이 특정 생명주기를 `useEffect`로 나타낼 수 있다.

  ```tsx
  import React, { useState, useEffect } from 'react';

  function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      window.alert(count);
    }, []); // ✅ 빈배열

    return <p>You clicked {count} times</p>;
  }
  ```

  위와 같이 의존성 배열에 빈배열을 넣는다면 useEffect가 첫렌더링에만 관여하게 된다.
  따라서 컴포넌트의 첫렌더링에 외부와 상호작용하여 처리해야할 일이 있다면 의존성 배열에 빈배열로 처리하여 수행할 수 있다. 위에는 첫렌더링에만 alert 창이 뜬다.

- `componentDidUpdate` & `useEffect`

  react에서 특정 값의 변화에 따라 재렌더링되어야 하는 경우가 있는데, 이 경우에는 `useEffect`의 의존성 배열에 해당 값을 넣으면 된다.

  ```tsx
  import React, { useState, useEffect } from 'react';

  function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      window.alert(count);
    }, [count]); // ✅ count 값이 변화되면 재실행

    return <button onClick={() => setCount(count + 1)}>Click me</button>;
  }
  ```

  버튼을 눌러 count 값이 하나씩 올라가면 alert 창이 계속 뜬다.

  주의할 점은 의존성 배열에 객체를 넣어서는 안된다는 것이다. 객체는 렌더링마다 새로운 참조값을 갱신하기 때문에 계속 렌더링하게 된다.

- `componentWillUnmount` & `useEffect`

  `componentWillUnmount`는 컴포넌트가 사라지기 직전에 수행할 수 있는 함수이다. `useEffect`에서도 언마운트되기 직전에 수행할 함수를 지정할 수 있다. `useEffect` 내에서 return 문을 작성하면 된다.

  ```tsx
  import React, { useState, useEffect } from 'react';

  function Example() {
    useEffect(() => {
      const timer = setInterval(() => {
        console.log('타이머 돌아가는 중...');
      }, 1000);

      // ✅ clean-up
      return () => {
        clearInterval(timer);
        console.log('타이머 종료');
      };
    }, []);

    return <div>타이머</div>;
  }
  ```

  위의 예시에서 만약 clean up을 해주지 않았다면 컴포넌트가 언마운트되었어도 계속 타이머가 돌아가게 된다.

- **의존성 배열에서 주의할 점!**

  - 의존성 배열에는 컴포넌트 렌더링에 따라 값이 변화할 수 있는 변수만 넣는다.

    예를 들어 state나 props, 아니면 state나 props를 이용해 계산하는 어떤 값을 넣을 수 있다.

    ```tsx
    function ChatRoot({ roomId, serverUrl }) {
      const settings = useContext(SettingsContext);
      const url = serverUrl ?? settings.url;

      useEffect(() => {
        // ...어떤 코드
      }, [roomId, url]); // ✅ url: 계산되는 값, roodId: props

      //...
    }
    ```

  - `useEffect`에 ref값이 사용되었어도, 의존성 배열에 ref 값은 생략한다.

    왜냐하면 먼저 말한대로 의존성 배열에는 변화하는 값만 넣어야 하기 때문이다. ref는 모든 렌더링에서 항상 동일한 객체를 얻어 값이 변하지 않는다. 값이 변경되지 않으므로 `useEffect`가 재실행되지 않는다.

## useEffect가 필요하지 않을 수 있다.

useEffect는 사실 특정 렌더링에서 특정 작업을 수행하는 것이므로 쓰지 않을 수록 코드가 동작하는 것이 예상하기 쉬워진다. 따라서 꼭 필요한 경우에만 쓰는 것이 좋은데, 대표적으로 useEffect가 필요하지 않은 상황 2가지가 있다.

1. 내부 props과 state를 업데이트 하려는 경우

   기존 props나 state로 무언가를 계산할 수 있다면 그것을 렌더링 중에 계산하는게 좋다.

   ```tsx
   function TodoList({ todos, filter }) {
     const [newTodo, setNewTodo] = useState('');

     // 🔴 아래와 같이 하지 말기
     // const [visibleTodos, setVisibleTodos] = useState([]);
     // useEffect(() => {
     //   setVisibleTodos(getFilteredTodos(todos, filter));
     // }, [todos, filter]);

     // ✅ useEffect가 아닌 렌더링 중 계산
     const visibleTodos = getFilteredTodos(todos, filter);
     // ...
   }
   ```

2. 사용자 이벤트를 처리하는 경우

   이벤트 핸들러는 일반적으로 컴포넌트 내부에서 정의된 것이 아니고, 렌더링에 필요한 것이 아니기 때문에 컴포넌트가 업데이트될 때마다 이벤트 핸들러가 다시 등록되어 버그가 발생할 수도 있으니 컴포넌트 내부에서 직접 처리하는 것이 좋다.

   ```tsx
   function Form() {
     const [name, setName] = useState('');

     // ✅ 처음 렌더링되는 동안 실행되어야 하는 analytics POST
     useEffect(() => {
       post('/analytics/event', { eventName: 'visit_form' });
     }, []);

     // 🔴 사용자가 submit버튼을 눌러 발생하는 이벤트인 경우
     // 아래의 useEffect는 사용하지 않는 것이 좋다.

     // const [jsonToSubmit, setJsonToSubmit] = useState(null);
     // useEffect(() => {
     //   if (jsonToSubmit !== null) {
     //      post('/api/register', jsonToSubmit);
     //   }
     // }, [jsonToSubmit]);

     function handleSubmit(e) {
       e.preventDefault();
       setJsonToSubmit({ name });
     }
     // ...
   }
   ```

   - 하지만 이벤트 핸들러를 사용할 때가 있다.

     ```tsx
     import React, { useState, useEffect } from 'react';

     function MyComponent() {
       const [scrollPosition, setScrollPosition] = useState(0);

       const handleScroll = () => {
         const position = window.scrollY;
         setScrollPosition(position);
       };

       useEffect(() => {
         window.addEventListener('scroll', handleScroll);

         return () => {
           window.removeEventListener('scroll', handleScroll);
         };
       }, []);

       return (
         <div>
           <p>Current scroll position: {scrollPosition}px</p>
           <div style={{ height: '1000px' }}>
             Scroll down to update position
           </div>
         </div>
       );
     }
     ```

     위의 코드에서는 `useEffect`에 scroll 이벤트 핸들러를 등록하고 있다. 의존성 배열에는 빈배열을 전달하고 있는데, 이렇게 하여 컴포넌트가 마운트될 때에만 이벤트핸들러를 등록하도록 한다. 위의 코드에서 스크롤에 따라 `window.scrollY`의 값이 변화하는데, 이것은 `handleScroll`내 `useState`을 통해 상태로 관리하여 업데이트된다. 그러니까 의존성 배열에 handleScroll을 넣을 필요가 없는 것이다.

최대한 useEffect를 사용하지 말기

> useEffect를 사용하지 않으면 코드를 더 쉽게 실행할 수 있고 오류 발생률이 낮아진다고 한다. useEffect 는 실제로 컴포넌트가 외부 시스템과 동기화되기 위한 hook이므로 렌더링 자체로 인한 부작용에만 사용해야 한다. 또한 잘못하면 메모리 누수가 발생할 수 있으므로 이에 대한 처리도 중요하다.

## 참고

[react.dev/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects)
[react.dev/useEffect](https://react.dev/reference/react/useEffect)
[react.dev/you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect)
[react.dev/lifecycle-of-reactive-effects](https://react.dev/learn/lifecycle-of-reactive-effects)

```

```
