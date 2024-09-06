## 정확한 너비값이 없을 때 제대로 작동하지 않는 CSS 속성

항상 느끼는 거지만 CSS 지식을 많이 알고 있다면 UI 작업 속도가 훨씬 빨라지는 것 같다. 나는 UI 퍼블리싱 작업을 하는 것을 좋아하기 때문에 CSS 작업을 좋아하는 편인데, 이번에 프로젝트를 하면서 기록해두면 좋을 점들이 몇가지 보여서 포스트를 작성하게 되었다.

### 정확한 너비값을 설정하지 않은 상황

이번 사이드 프로젝트에서 많은 페이지에서 공통적인 레이아웃이 적용되었기 때문에 나는 공통 레이아웃을 먼저 구현하고, 다른 개발자들은 해당 영역에서 작업하면 되도록 만들어두었다.

![layout](/public/images/css/create-scrollbar-without-an-exact-width-value/layout.png)

근데 문제가 가운데 `MainView`를 `flex-1`으로 설정해놓았다는 점이었다. `NavigationBar`와 `SideView`의 너비는 `%`와 `max-width`를 통해 좀더 반응적으로 스타일되도록 적용해서 `MainView`는 그 나머지 영역의 너비를 차지하도록 만들었다. 그러다 작업을 하면서 느낀 점인데 의외로 css는 정확한 너비값을 설정해주지 않으면 제대로 작동하지 않는 속성이 많다는 점이었다.

### overflow

대표적으로 스크롤이 있었다. 디자이너분이 전달해주신 디자인에서 가로로 스크롤되는 스크롤바를 구현할 일이 있었는데 여기서 **정확한 너비값을 지정해주지 않았더니** `overflow: scroll` 속성을 적용해주어도 자식 요소의 크기대로 너비가 커졌다. 일단 부모 요소에 `flex-1`가 있기 때문에 `width: 100%`가 적용해도 속성이 듣지 않았다.

그렇다고 정확한 너비값을 지정해주기도 어려웠던 것이 반응형으로 브라우저의 너비에 따라 유동적으로 변해야했기 때문이다. 그래서 여러가지 아이디어를 적용해보다가 잘 듣지 않자 다른 사람들은 어떻게 해결했는지 찾아보았다. 역시나 나와 같은 상황인 사람들이 많았는데, 이분들은 부모 요소에 정확한 너비값을 주지 못할 경우 `max-w-0`을 적용해주었다. 처음에는 너비값을 0으로 만들라는 것이 이해가 안가서 반신반의하면서 적용해보았는데 정말 내가 원하는대로 작동했다. 그래서 어떻게 스타일이 적용되는 건지 천천히 뜯어보았다.

코드는 아래와 같다. React 프로젝트라서 jsx로 간단하게만 공통 컴포넌트로 만들어보았다.

```jsx:ScrollContainer.tsx
import styles from './ScrollContainer.module.css';

export default function ScrollContainer({ children }) {
  return (
    <div className={styles.scrollContainer}>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
}
```

```css:ScrollContainer.module.css
.scrollContainer {
  margin-top: -10px;
  margin-bottom: -10px;
  overflow-x: scroll;
  padding-top: 10px;
  padding-bottom: 10px;
  scrollbar-width: none;
}

.scrollContainer::-webkit-scrollbar {
  display: none;
}

.list {
  display: flex;
  max-width: 0;  /* ✅ 중요! */
  gap: 8px;
}

.list > * {
  flex-shrink: 0; /* ✅ 중요! */
}
```

코드를 살펴보면 최상단에 `div` 태그가 있고 그 안에 `ul` 태그를 놓고 아이템으로 `li` 태그를 사용했다. `overflow-x: scroll`는 최상단 요소에 적용해준다.

그리고 그 다음이 중요하다! 그 자식 요소인 `ul`에서 `max-width: 0`을 적용해준다. 이는 최대 너비값이 0이라는 소리인데 이렇게 설정해주는 이유는 자식요소의 너비가 부모 요소의 너비에서 넘쳤다는 것을 인식시켜주기 위함이다. 부모 요소의 너비는 0인데 자식 요소인 아이템들의 너비는 이보다 크므로 최상단 요소인 `div`에서 `overflow: scroll` 속성이 제대로 작동하게 되는 것이다.

물론 아이템의 너비가 부모 요소에 영향을 받으면 안되므로 본래 너비를 유지하도록 `flex-shrink: 0`를 적용해준다.

그럼 이제 정확하게 원하는대로 작동하게 된다!

### text-overflow

`text-overflow`도 `overflow`와 비슷하다. 표안에서 어떤 문장을 말줄임 표시해야하는 상황이라고 생각해보자. `<table>`에서도 특히 `<td>`는 명확한 너비가 설정되어 있지 않다. 이떄 만약 어떤 긴문장을 한문장으로만 나타내고 너비에 따라 말줄임 표시(...)를 어떻게 적용해 볼 수 있을까?

아래 간단하게 표를 코드로 작성해보았다.

```jsx:Table.tsx
// ...생략
<table className='mx-1 my-4 border-separate border-spacing-y-3'>
  <colgroup>
    <col width='10%' />
    <col width='70%' />
    <col width='20%' />
  </colgroup>

  <thead>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>본문</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>1</td>
      <td>표에서 생략 표시하기</td>
      {/* 아래 문장을 한줄로, 넘치면 말줄임 (...) 표시하기 */}
      <td className={styles.ellipsis}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus mollitia voluptate nemo quia delectus suscipit vero neque. Sunt eius provident quae saepe, temporibus fugiat ut, optio consequuntur, magnam modi distinctio?
      </td>
    </tr>
  </tbody>
</table>
```

```css
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 0; /* ✅ */
}
```

말줄임표를 표시하는 css 속성은 `text-overflow: ellipsis`이다. 그리고 한줄로 표시하려면 `white-space: nowrap`를 적용해준다. 그리고 넘친 부분을 안보이게 하기 위해 `overflow: hidden`를 적용한다.

그리고 `overflow` 때와 같이 `max-width: 0`을 적용해준다. 그러나 `overflow`와 약간 다른 점은 위의 css 속성들을 `<td>` 요소에 바로 한번에 적용해준다는 점이다. `table`은 너비가 `width` 속성으로 정해지지 않고 `<colgroup>`으로 정해지기 때문인 것 같다. 이렇게 하면 정확한 너비값이 없는 표 셀에서도 말줄임 표시를 구현할 수 있다! `max-width: 0`의 위력을 느낄 수 있었다.

![text-overflow in table](/public/images/css/create-scrollbar-without-an-exact-width-value/text-overflow.png)
