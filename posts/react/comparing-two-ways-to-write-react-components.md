## 표현식 vs 선언식

React에서 함수형 컴포넌트를 작성할 때는 표현식과 선언식, 이렇게 두가지 방법이 있다. React 개발자라면 이 두가지 작성법에 대해 다 인지하고 있을텐데, 어떤 개발자는 표현식을 즐겨 사용하고, 또 어떤 개발자는 선언식을 사용한다.

나 같은 경우에는 일년 전쯤 표현식을 자주 사용했다가 이제는 `export default`와 함께 선언식으로 컴포넌트를 작성하고 있다. 처음에는 표현식으로 React를 배웠고, 함수 표현식이 좀더 현대적인? 문법이었기 때문에 별 생각 없이 표현식으로 작성했던 것 같다.

그런데 새로운 React 공식문서에서 예시 코드로 `export default`와 함께 선언식으로 작성한 코드를 보게 되었다. 분명히 예전에 CRA로 프로젝트를 만들었을 때 템플릿으로 함수 표현식으로 작성되어 있었던 것 같은데 공식문서에는 선언식으로 작성되어 있고, 또 이제는 CRA에서도 선언식으로 변경되어 있었다. 정확한 것은 아닌데 아마 React 18 전후로 뭔가 변경이 있었던 것 같다. (추측입니다!) 이 두가지 작성법이 호이스팅면에서 차이가 있을 뿐 기능상으로는 똑같이 동작한다는 것을 알게 되어 이후 선언식으로 작성 방식을 변경하게 되었다. 개인적 취향이 반영되었지만 `export default`와 함께 선언식으로 작성하는 것이 이 컴포넌트가 메인 컴포넌트라는 것을 잘 드러냈고, 유지보수하기에도 좀더 좋았기 때문이다.

그런데 컴포넌트를 작성하면 작성할수록 이제는 이 두가지 작성법의 차이가 계속 머리끝에 걸려 있는 느낌이었다.

_"보통 사람들은 어떤 기준으로 작성하지? 둘이 진짜 차이가 없나?"_

계속 질문이 꼬리에 꼬리를 물고 찜찜한 느낌이어서 한번 생각을 정리해보자는 마음으로 포스트를 작성하게 되었다.

- 표현식과 선언식, 그리고 `export default`

  ```jsx
  // ✅ 1. 함수 표현식 작성 방식
  const Home = () => {
    //...생략
  };

  export default Home;

  // ------------------
  // ✅ 2. 함수 선언식 작성 방식
  function Home() {
    //...생략
  }

  export default Home;

  // ------------------
  // ✅ 3. 함수 선언식은 export default와 함께 사용할 수 있다.
  export default function Home () {
    //...생략
  }
  ```

문법적으로 함수 표현식과 함수 선언식 이 둘의 가장 큰 차이는 다음과 같다.

1.  호이스팅 여부
2.  `this` 바인딩 에러 발생 가능 여부

바닐라 자바스크립트에서 코드는 작성하고 호출 순서가 굉장히 중요하다면 함수 작성시 이 차이를 고려해야겠지만 React 컴포넌트에서 작성하는 것이라면 이 두가지 차이는 그렇게 고려할 필요가 없어보인다. 왜냐하면 React 컴포넌트는 컴포넌트 자체가 모듈화 된 것이며 모듈을 `export`, `import` 하는 것이기 때문이다. 컴포넌트를 사용하는 시점에 이미 컴포넌트가 정의되어 있고 내보내고 들여보내고 하는 것이기 때문에 호이스팅 문제는 그렇게 고려할 필요가 없어보인다. 또한 `this` 바인딩 문제 같은 경우에도 클래스형 컴포넌트도 아닌 **함수형 컴포넌트**라면 걱정할 필요가 없을 듯 하다.

## 표현식과 선언식을 사용하는 기준

React의 동작 방식에 큰 차이가 없는 이 두가지 작성법은 어떤 기준으로 선택할까?

1. 선언식 사용

- 전체 컴포넌트는 `export default`와 함께 선언식으로 작성한다.

  앞서 이야기했듯 함수 선언식으로 작성하면 파일 안에서 메인 컴포넌트가 무엇인지 명확하게 명시할 수 있어서 좋았다. 또한 `export default`와 함께 한번에 선언하니 만약 컴포넌트명을 바꾸거나 할 때 유지보수적인 면에서도 더 좋았던 것 같다.

  하지만 고차 컴포넌트(HOC)를 작성하는 경우에는 export default는 따로 작성한다.

  ```jsx
  function MyComponent(props) {
    return <div>{props.value}</div>;
  }

  export default React.memo(MyComponent);
  ```

2. 표현식 사용

대부분 모두 선언식으로 컴포넌트를 작성한다. 하지만 두가지의 경우에는 표현식으로 작성하고 있다.

- 한 파일 내에서 메인 컴포넌트 이외에 서브 컴포넌트를 작성하는 경우

  드문 일이긴 하지만 한 파일 내에서 메인 컴포넌트 이외에 서브 컴포넌트를 작성하게 될 때가 있다. 메인 컴포넌트에 전부 작성하기에는 가독성이 좋지 않아져서 서브 컴포넌트로 분리했지만 정말 메인 컴포넌트에서만 사용하게 될 서브 컴포넌트이게 될 때이다.

  ```javascript
  export default function MainComponent() {
    return (
      <SubComponent>
    )
  }

  const SubComponent = ({...props}) => {
  // ...생략
  }
  ```

  위와 같이 작성해서 명확하게 어떤 것이 메인 컴포넌트인지, 서브 컴포넌트인지를 나타낸다.

앞서 이야기했듯 함수 선언식으로 작성하면 파일 안에서 메인 컴포넌트가 무엇인지 명확하게 명시할 수 있어서 좋았다. 또한 `export default`와 함께 한번에 선언하니 만약 컴포넌트명을 바꾸거나 할 때 유지보수적인 면에서도 더 좋았던 것 같다.

2. 표현식 사용

- 한 파일 내에서 메인 컴포넌트 이외에 서브 컴포넌트를 작성할 때는 표현식으로 사용한다.

드문 일이긴 하지만 한 파일 내에서 메인 컴포넌트 이외에 서브 컴포넌트를 작성하게 될 때가 있다. 메인 컴포넌트에 전부 작성하기에는 가독성이 좋지 않아져서 서브 컴포넌트로 분리했지만 정말 메인 컴포넌트에서만 사용하게 될 서브 컴포넌트이게 될 때이다.

```javascript
export default function MainComponent() {
  return (
    <SubComponent>
  )
}

const SubComponent = ({...props}) => {
 // ...생략
}
```

위와 같이 작성해서 명확하게 어떤 것이 메인 컴포넌트인지, 서브 컴포넌트인지를 나타낸다.

## 결론

### 결국 중요한 건 가독성과 일관성이 아닐까?

결론은 결국 React 컴포넌트 작성시 함수 표현식과 선언식은 기능상 차이가 없다는 것이었다. 여기저기서 이야기하는 호이스팅 여부도 React 컴포넌트 부분에서는 고려할만한 사항이 아니었다. 작성법은 개발자의 취향에 따른 것이라 생각하지만, 그렇다고 중구난방으로 이것저것 사용하다 보며 코드의 통일성을 해칠수 있다. 작성법이 두가지인만큼 팀 컨텐션이나 개발자가 스스로 기준을 갖고 일관되게 코드를 작성해야 될 것 같다.

내가 어떤 기준을 갖고 작성법을 선택해서 전체적으로 일관된 코드를 작성하는지가 더 중요할 것 같아서 그 기준에 대해서 생각해본 결과가 이 글이다. 작성하고 보니 조금 허접한 것 같지만...🥲 한번 생각했던 것을 글로 정리해봐서 개운하다!
