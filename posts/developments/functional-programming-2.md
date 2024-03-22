## 소프트웨어 설계의 실용적 정의

> 코드를 만들고, 테스트하고, 유지보수하기 쉬운 프로그래밍 방법을 선택하기 위해 미적 감각을 사용하는 것.

위는 책 <함수형 코딩>에서 말하는 소프트웨어의 설계에 대한 실용적인 정의이다. 이후 소프트웨어의 계층형 설계에 대해 이야기하는데, 이번 글에서 책을 읽으며 계층형 설계에 대해 이해한 것들을 정리해보았다.

## 계층형 설계에 대한 이해

말그대로 소프트웨어를 **계층으로 구성**하는 것을 뜻한다. 각 계층에 있는 함수는 아래 계층의 함수를 이용해 정의한다. 계층은 장바구니 기능을 예로 들자면 장바구니 비지니스 규칙 계층, 장바구니 조작을 위함 함수 계층, 일반적으로 사용할 수 있는 유용한 함수 계층 등을 들 수 있다.

일반적으로 계층은 어떤 공식으로 구분하는 것이 아니라 자신이 개발하고 있는 소프트웨어에 맞춰서 계층을 나누는 것이다. 그만큼 계층을 어떻게 구분해야할지 어려울 수 있는데, 어떻게 하면 계층을 잘 나눌 수 있을까?

**함수의 입력과 출력**은 계층을 잘 나누기 위한 단서가 될 수 있다.

| 함수의 입력                                                                                                                                                                                                                                                                                     | 함수의 출력                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. 함수 본문<ul><li>길이</li><li>복잡성</li><li>구체화 단계</li><li>함수 호출</li><li>프로그래밍 언어의 기능 사용</li></ul>2. 계층 구조<ul><li>화살표 길이</li><li>응집도</li><li>구체화 단계</li></ul>3. 함수 시그니처<ul><li>함수명</li><li>인자 이름</li><li>인잣값</li><li>리턴값</li></ul> | 1. 조직화<ul><li>새로운 함수를 어디에 놓을지 결정</li><li>함수를 디른 곳으로 이동</li></ul>2. 구현 <ul><li>구현 바꾸기</li><li>함수 추출하기</li><li>데이터 구조 바꾸기</li></ul>3. 변경 <ul><li>새 코드를 작성할 곳 선택하기</li><li>적절한 수준의 구체화 단계 결정하기</li></ul> |

위의 요소들을 단서로 계층형 설계를 할 수 있다. 이 부분은 외워서 하는 것보다 많은 연습을 통해 체화시켜야하는 부분인 것 같다.

## 계층형 설계의 4가지 패턴

계층형 설계를 하는 패턴에는 4가지가 있다.

- 패턴 1: 직접 구현

- 패턴 2 : 추상화 벽

- 패턴 3 : 작은 인터페이스

- 패턴 4 : 편리한 계층

이 패턴을 직접 작성하거나 아니면 구현되어 있는 코드에서 패턴을 발견하게 될 수도 있다. 먼저 첫번째 패턴인 직접 구현에 대해 알아보자.

### 패턴 1: 직접 구현

직접 구현 패턴에서는 먼저 어떤 기능이 해야 할 동작에 대한 목록을 작성해볼 수 있다. 장바구니 기능을 예로 들자면 아래와 같이 작성해볼 수 있겠다. 보통 이런 작성은 설계 스프린트 과정에서 작성한다.

- 장바구니가 해야 할 동작 목록

  - 제품에 대한 CRUD
  - 장바구니에 제품이 있는지 확인
  - 장바구니 합계 계산
  - 장바구니 전체 비우기
  - 무료 배송이 되는지 확인

  위의 목록은 장바구니에 대한 기본 필수 동작이고,
  **넥타이를 사면 넥타이 클립 무료**같은 요소는 마케팅적 요소의 비지니스 함수이다. 일단은 먼저 필수적으로 기능해야하는 목록을 작성한 후 비지니스적 요소는 나중에 고려한다.

먼저 책에서 예시를 든 장바구니 관련 함수를 보자. 넥타이 하나를 구매하면 무료로 넥타이 클립을 주는 마케팅 함수이다.

```javascript
function freeTieClip(cart) {
  let hasTie = false;
  let hasTieClip = false;

  // ✅ 제품이 있는지 없는지 확인하는 저수준의 반복문 코드
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    if (item.name === 'tie') {
      hasTie = true;
    }
    if (item.name === 'tie clip') {
      hasTieClip = true;
    }
  }

  if (hasTie && !hasTieClip) {
    let tieClip = make_item('tie clip', 0);
    return add_item(cart, tieClip);
  }

  return cart;
}
```

위의 코드에서 문제점을 찾아보자면 마케팅 관련 함수가 장바구니가 배열이라는 사실을 알아야 할 필요는 없다. 또 모든 코드가 그냥 `freeTieClip()`라는 하나의 함수에 추가되어 있다.

위의 함수를 개선하자면, 넥타이나 넥타이 클립이 있는지 확인하는 반복문을 빼내서, 어떤 제품이 장바구니에 있는지 없는지 확인할 수 있는 어떤 더 재사용성이 높은 함수로 추출할 수 있다.

```javascript
function freeTieClip(cart) {
  let hasTie = isInCart(cart, 'tie');
  let hasTieClip = isInCart(cart, 'tie clip');

  if (hasTie && !hasTieClip) {
    let tieClip = make_item('tie clip', 0);
    return add_item(cart, tieClip);
  }

  return cart;
}

// ✅ 장바구니에 어떤 이름의 제품이 있는지 없는지 확인하는 재사용성 높은 함수로 추출
function isInCart(cart, name) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      return true;
    }
    return false;
  }
}
```

위에서 작성한 코드처럼 반복문을 추출해내면 장바구니에 어떤 이름의 제품이 존재하는지 확인할 수 있는 더 재사용성이 높은 함수로 만들었다. 보통 **반복문인 코드는 추출해야할 가능성이 크다.**

여기서 장바구니에 해당 이름의 제품이 있는지 찾는 더 공통적인 함수를 만들었다. 그렇다면 이제 함수들이 어떤 계층들을 갖는지 생각해보자.

1. 호출그래프를 통해 계층 구분해보기

   ![호출 그래프 계층](/public/images/developments/functional-programming/call_graph.png)

   앞서 예시를 들었던 함수를 위와 같이 호출 그래프로 만들어볼 수 있다. 호출 그래프는 해당 함수가 내부에서 어떤 함수들을 호출하고 있는지 그래프로 표현한 것이다. `freeTieClip()`는 다음 3가지 함수들을 호출하고 있기 때문에 상위 계층에 있는 함수이다.

   > 호출 그래프를 그릴 때 기억해야 점
   >
   > - 화살표는 무조건 아래로 향해야 한다.
   > - 어떤 함수가 호출된다면 하위 계층, 호출한다면 상위 계층에 있는 것이다.
   > - 함수를 호출할 때 바로 아래에 있는 하나의 계층의 함수만 호출하는 것이 좋다. 만약 두 계층에서 호출한다면 그 함수는 개선해야할 가능성이 높다. 만약 꼭 두 계층에서 호출할 수 밖에 없다면 그 사이 중간 계층에 새로운 계층을 만들어야 하는 것일 수도 있다.

2. 비슷한 계층에 있는 함수 호출하는지 확인하기

   직접 구현 패턴에서 함수는 바로 아래 계층의 함수들을 호출한다. 서로 다른 다양한 추상화 계층의 함수를 호출하면 그건 직접 구현 패턴이 아니다. 앞서 `freeTieClip()` 함수도 저수준의 반복문 코드가 함께 있었다. 하지만 반복문을 꺼내 재사용 가능한 비슷한 추상화 계층의 `isInCart()`으로 추출했고 함수 개선이 가능했다. 그리고 이 개선했다는 것은 호출하는 함수가 모두 비슷한 계층에 위치하도록 **직접 구현**한 것을 뜻한다.

   그렇다면 만약 `remove_item_by_name()` 이라는 새로운 함수가 생성되었을 때 이 함수는 어느 계층에 들어가야 할까?

   계층을 결정하는 정보에는 여러가지가 있다.

   - 함수 이름을 보고 파악할 수 있다.

     - `freeTieClip()`는 마케팅 함수로 호출되는 일이 별로 없다. 하지만 `remove_item_by_name()` 함수는 `freeTieClip()`에서 호출할 수도 있고 다른 함수에 호출될 수도 있다.

   - 호출 관계를 보고 파악할 수 있다.

     - `freeTieClip()`은 `remove_item_by_name()`을 호출하지만 `add_item()`은 `remove_item_by_name()`을 호출하지 않는다. 반대로 `remove_item_by_name()`도 `add_item()` 함수를 호출하지 않는다. 그리고 `freeTieClip()`는 이 두 함수를 호출할 수 있기 때문에 비슷한 계층에 있다고 말할 수 있다.

   - 같은 계층에 있는 함수는 같은 목적을 가져야 한다.

     계층을 나눌 때 각 계층은 어떤 목적을 갖고 있고 이 계층들에 있는 함수들이 목적에 부합하는지 생각해야한다. 예를 들어 각 계층에 비지니스 규칙, 기본 동작 규칙, 카피 온 라이트 동작 규칙 계층 등등의 목적을 가질 수 있는데, 함수가 어떤 목적에 부합하는지 생각해보아야 한다.

     ![직접 구현 호출 그래프 계층](/public/images/developments/functional-programming/call_graph_2.png)

     물론 보통은 위의 그래프보다 훨씬 계층도 많고 화살표도 복잡해진다.

호출 그래프는 소프트웨어에서 어떻게 계층형 설계를 해야하는지 구체화하는 단계에 많은 단서를 주고 각 계층에 맞는 함수가 위치할 수 있도록 도와준다.

결국 직접 구현 패턴이란 직접 코드를 한단계 더 구체화해서 호출하는 함수를 같은 하위 계층에 위치할 수 있도록 만드는 것을 뜻하는 것이었다. 이것을 함수 본문에서 추출한 반복문을 통해 알 수 있었다. 이 과정에서 호출 그래프를 통해 어떤 계층을 갖고 있고 각 계층에 어떤 함수들이 들어가는지도 함께 살펴보았는데, 다시 한번 기억해야하는 중요한 것은 **계층형 설계에서 모든 계층은 바로 아래 계층에 의존해야한다**는 것이다.

직접 구현 패턴 과정을 통해 이런 소프트웨어나 어떤 특정 기능의 전체적인 계층 구조를 파악할 수 있다. 그럼 다음 나머지 3가지 패턴도 살펴보자.

### 패턴 2: 추상화 벽

앞의 직접 구현 패턴에서 모든 계층들을 적절하게 구체화해보았는데, 이제 두번째 패턴인 추상화 벽에서는 그 모든 계층들 중 세부 구현을 감추고 추상화되어 인터페이스만 제공하는 계층들을 살펴본다.

![추상화 벽 호출 그래프](/public/images/developments/functional-programming/call_graph_3.png)

추상화가 시작되는 계층을 **추상화 벽** 이라고 한다. 추상화 벽은 생각보다 낮은 계층에 있었다. 장바구니에 아이템을 추가하고 삭제하는 것부터가 추상화가 포함되어 추상화 벽 계층이었던 것이다. 사실 생각해보면 개발을 모르는 사람이 보았을 때 내부 코드를 몰라도 `add_item()`과 같은 함수 이름으로 충분히 장바구니에서의 동작을 예상할 수 있다.

그리고 추상화 벽 위로 `freeTieClip()` 함수는 추상화 벽보다 더 상위에 있는 계층이다.

> 추상화 벽의 핵심은 신경쓰지 않아도 되는 함수를 다루는 것이다.

### 패턴 3: 작은 인터페이스

작은 인터페이스 패턴은 **새로운 코드를 추가할 위치**에 관한 것이다.

만약 마케팅팀이 장바구니에 일정 금액을 넘기면 시계를 할인해주는 시계 할인 마케팅을 시작한다고 했을 때, 이 새로운 기능을 어느 계층에 위치시킬지 고민하게 된다. 마케팅과 관련된 함수이기 때문에 추상화 벽 위에 있어야 하는 것은 분명한데, 추상화 벽 계층에 놓아야할지, 더 위에 놓아야할지 그 위치를 고민하게 될 수 있다. 추상화 벽에 놓는다면 직접 장바구니 데이터 구조에 접근할 수 있지만 같은 계층에 있는 함수를 호출할 수 없고, 추상화 벽 위의 계층에 놓는다면 추상화 벽 계층 함수를 호출할 수 있지만 직접 장바구니 데이터 구조에 접근할 수 없다.

이때 작은 인터페이스 패턴을 고려한다면 새로운 기능을 추상화 벽보다 더 상위 계층에 놓는 것이 좋다. 추상화 벽 계층에 놓는다면 추상화 벽 아래에 추가해야하거나 수정해야하는 함수가 늘어날 수 있기 때문이다.

> 따라서 작은 인터페이스란 계층들에 필수가 아니라면 함수들을 더 추가하거나 수정하지 않고, 현재 갖고 있는 함수들로 기능을 생성하는 것을 뜻하는 것으로 이해했다.

### 패턴 4: 편리한 계층

위의 세가지 패턴은 이상적인 계층 구성을 만들기 위한 패턴이었지만 이 마지막 패턴은 언제 설계를 더 해야하고 멈춰야 할지에 대해 해답을 준다.

> 해답: 지금 편리한가?

해답이 굉장히 주관적이지만🤔😝 우문현답이 아닐까 싶다.

개발하면서 지금 작업하는 코드가 편리하다고 느끼는 경우 설계와 추상화를 멈춰도 된다. 하지만 너무 구체적인 코드가 보이고 반복되는 코드들이 많아지는 경우 다시 설계와 추상화를 할 필요가 있을지도 모른다는 것이다.

지금까지 좋은 계층형 설계를 하기 위한 4가지 패턴들을 모두 알아보았다. 마지막으로 계층 위치에 따른 비기능적 요구사항들의 특성들을 살펴보자

## 계층 위치로 보는 세가지 중요한 비기능적 요구사항

기능적 요구사항은 소프트웨어가 정확히 해야하는 일을 뜻하지만 비기능적 요구사항은 3가지를 들 수 있다.

> 비기능적 요구사항
>
> - 유지보수성
> - 테스트성
> - 재사용성

- 계층 위치로 보는 유지보수성

  위의 계층에 있을수록 코드를 가장 고치기 쉽고, 아래로 내려갈수록 어려워진다.
  따라서 자주 바뀌는 코드는 가능한 위쪽에 있어야 한다.

- 계층 위치로 보는 테스트성

  아래에 있는 함수일수록 테스트하는 것이 더 가치있다.

- 계층 위치로 보는 재사용성

  아래 계층에 있는 함수일수록, 바로 아래 계층에서만 호출하는 함수일수록 재사용성이 좋다.

&nbsp;

여기까지 함수형 프로그래밍에서의 계층형 설계에 대해 알아보았다. 책을 읽고 내가 이해한 바로 이 글을 작성해보았고 어딘가 잘못 이해한 부분이 있을 수 있다. 하지만 이 계층형 설계 부분을 읽고 나서 정말 무언가 전체적인 숲을 본 느낌이었고 어떤 식으로 함수를 설계해야하는지 조금 이해가 되었다. 개발할 때 너무 근시안적으로만 코드를 바라본다면 그 코드는 굉장히 유지보수하기 힘들고, 또 쉽게 확장하기가 어려워진다. 비기능적 요구사항의 유지보수성과 재사용성을 높이기 위해서 이 계층형 설계는 한번쯤 읽어보면 정말 좋은 개념인 것 같다.