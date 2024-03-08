이 포스트는 <함수형 코드: 심플한 코드로 복잡한 소프트웨어 길들이기>를 읽으면서 공부한 내용이나 떠오른 것들을 정리해보고자 작성한 글이다.

이 책을 알게된 계기는 예전에 원티드에서 "프론트엔드 프리온보딩"이라고 무료로 제공해주었던 프론트엔드 강의가 있는데(지금은 유료로 바뀌었다) 그곳에서 강사님이 해당 책을 바탕으로 리팩토링 관련 강의를 해주셨다. 강의는 굉장히 유익했고, 그래서 책도 직접 읽어봐야겠다는 생각을 하게 되었다. 또 책의 예시 코드로 자바스크립트가 사용되기 때문에 더 좋았던 것도 있다.

강사님이 추천해준 책이라는 이유도 있지만 그 이전에도 대체 함수형 프로그래밍은 정확하게 어떻게 되어먹은 것인가? 생각을 항상 갖고 있었다. 그 이유는 React가 16 버전부터 새롭게 hook이라는 기능이 추가되면서 함수형 컴포넌트를 작성할 수 있게 되었기 때문이다. 객체 지향 프로그래밍으로 클래스 컴포넌트로만 작성할 수 있었던 것에서 함수형 프로그래밍으로도 작성할 수 있게된 걸 알고 함수형 프로그래밍에 대해 공부도 해봤지만 썩 그렇게 이해된 느낌은 아니었다. 그런데 이 책이 함수형 프로그래밍을 이해할 수 있는 좋은 기회를 주었고, 많은 해답을 주었다.

## 함수형 프로그래밍이란

> 함수형 프로그래밍의 학문적 정의
>
> 1. 수학 함수를 사용하고 부수 효과를 피하는 것이 특징인 프로그래밍 패러다임
> 2. 부수 효과 없이 순수 함수만 사용하는 프로그래밍 스타일

함수형 프로그래밍의 학문적인 정의는 위와 같이 **순수 함수**만을 사용해서 프로그래밍을 한다는 것이다. 이전에도 학문적인 정의는 알고 있었는데, 이 정의에서 굉장히 헷갈렸었다. 어떻게 소프트웨어 개발에서 부수 효과 없이 개발할 수가 있지? 그럼 소프트웨어 개발에서는 완벽하게 함수형 프로그래밍할 수는 없는 건가라고 혼동이 왔었다.

책에 이에 대한 답변을 있었다. 함수형 프로그래밍에서 함수는 부수 효과가 분명히 존재할 수 있고, 함수형 프로그래머는 부수 효과가 있는 함수를 잘 사용할 뿐만 아니라 잘 다룬다. 이렇게 실제로 사용하는 소프트웨어적인 측면에서 함수형 프로그래밍은 학문적인 의미가 아닌 기술과 개념으로 봐야한다는 것이다.

> 함수형 프로그래밍의 기술과 개념
>
> 1. 모든 코드를 데이터와 계산, 액션으로 구분한다.
> 2. 일급 추상

이 책에서 말하는 함수형 프로그래밍의 기술과 개념은 위와 같다. 일급 추상이라는 개념은 다음에 살펴볼 것이고, 이번 포스트에서는 1번인 기술을 중점적으로 정리할 것이다.

> 함수형 프로그래머는 코드를 액션, 계산, 데이터로 나눠서 바라본다.

책에서 가장 중요한 문장을 꼽으라면 위의 문장이 아닐까 싶다. 그렇다면 액션과 계산, 데이터가 무엇일까?

## 데이터란

> 데이터 예시
>
> - 2024년 완주할 책 정보
> - 내가 읽고 있는 책
> - 좋은 문구 모음
> - 사용자 정보

### 데이터의 특징

1.  함수형 프로그래밍에서 데이터는 **이벤트에 대한 사실, 일어난 일의 결과를 기록한 것**을 뜻한다.

    내가 이해한 바로는, 예를 들어 로그인 폼에서 사용자가 인풋에 아이디와 비밀번호를 입력하고 로그인 버튼을 눌러 Submit 이벤트를 발생시켰을 때 이 입력된 아이디와 비밀번호 데이터가 생성되어 처리된다.

    사실 개발자가 직접 데이터를 생성하는 일은 Mock 데이터나 어떤 특정 데이터밖에 없고, 대부분은 보통 사용자와의 직접 상호작용을 통해 이벤트를 발생시켜 이벤트에 대한 사실인 데이터가 생성되는 것이라고 이해했다.

2.  데이터는 **불변성을 유지**한다.

    불변 데이터 구조를 만들기 위해 두가지 원칙을 사용한다.

    - 카피온라이트(얕은 복사)
    - 방어적 복사(깊은 복사)

3.  데이터 구조로 **의미**를 담는다.

    데이터 구조로 도메인을 표현한다. 아무 의미가 없는 데이터는 없다. 데이터는 한눈에 보았을 때 직관적으로 해석될 수 있도록 만들어야 한다.

4.  자바스크립트에서는 데이터는 **기본 데이터 타입**으로 표현한다.

    - 숫자 / 문자 / 배열 / 객체

    ```javascript
    const panda = {
      name: '푸바오',
      age: 3,
      home: '에버랜드',
      food: '대나무',
    };

    const everlandPandas = ['푸바오', '아이바오', '러바오'];
    ```

중요한 건 데이터란 직관적인 의미를 담고 있어야하며, 이벤트에 대한 사실, 일어난 일의 결과가 기록된 것이라는 것이다.

## 계산이란

> 계산 예시
>
> - 사칙연산과 같은 계산
> - 특정 문자열 찾기
> - 특정 등급의 쿠폰 목록 계산

### 계산의 특징

1. 같은 입력값에 대해 같은 출력값을 반환해주는 것을 뜻한다.

   - 실행 시점와 횟수에 상관없이 같은 입력값이라면 항상 같은 출력값을 돌려준다.

2. 자바스크립트에서 계산은 함수로 구현한다.

   - 학문적인 정의에서 나온 부수 효과가 없는 순수 함수다.

   ```typescript
   const getAge = (currentAge: number) => currentAge + 1;
   ```

## 액션이란

> 액션 예시
>
> - 이메일 보내기
> - 데이터베이스 읽기
> - ajax 요청 보내기

### 액션의 특징

1. 외부 세계에 영향을 주거나 받는 것을 뜻한다.

2. 자바스크립트에서 계산과 똑같이 함수로 구현한다.

   - 하지만 둘은 부수 효과에 대해 중대한 차이가 있다.

3. 실행 시점과 횟수에 의존한다

   - 액션은 **언제 실행되는지** 그 순서와 **얼마나 실행되는지** 반복 횟수에 의존한다.
   - 이것이 순수하지 않은 함수, 부수 효과가 있는 함수가 된다.

   ```typescript
   alert('Hello World!'); // 함수 호출

   new Date(); // 생성자 호출 시점에 따라 시간이 달라짐

   stack[2]; // 배열 참조, 값이 바뀔 위험

   delete user.age; // 속성 삭제, 외부에서 참조할 때 영향

   function showBtn() {
     // DOM 업데이트, 외부에 영향
     if (show) {
       button.show_icon();
     } else {
       button.hide_icon();
     }
   }
   ```

4. 어떤 함수 내부에 액션 함수가 들어있다면 그 함수 전체는 액션이 된다.

   - 액션은 코드 전체로 퍼질 수 있다.

소프트웨어적인 측면에서 함수형 프로그래밍의 액션은 가장 중요한 개념으로 액션을 다루는 여러가지 기술이 있고, 함수형 프로그래머는 이 부수 효과가 있는 액션을 잘 다룬다.

## 액션을 가장 적게 사용해야한다.

그리고 앞에서 데이터, 계산, 액션에 대해 알아보았고 이제 이들을 구분할 수 있게 되었다. 그렇다면 데이터, 계산, 액션을 어떻게 사용해야 하는 걸까?

함수형 프로그래머는 모든 코드를 데이터, 계산, 액션으로 구분해서 바라보는 것 이외에 **최대한 액션에서 계산을 빼내려고 한다**. 그 이유는 계산은 부수 효과가 없기 때문에 다른 계산들과 조합하기가 좋고 또 테스트하기가 좋기 때문이다. 또한 실행 시점이나 횟수에 의존하지 않기 때문에 의도치 않은 결과를 내지 않을 수 있다.

또한 어떤 계산들 중 굳이 계산이 필요없는 것들은 데이터로 만드는 것이 좋다고 말한다. 그러니까 최대한 액션 ➡️ 계산 ➡️ 데이터 순대로 코드를 다시 바꿔서 작성할 수 있지 않은지 고민해야한다는 것이다.

예를 들어 장보기 목록 작성 과정에서 데이터와 계산, 액션을 나눠보자

| 데이터                               | 계산                     | 액션        |
| ------------------------------------ | ------------------------ | ----------- |
| 장보기 목록<br>현재 갖고 있는 식료품 | 장보기 목록에 추가, 삭제 | 냉장고 확인 |

위와 같이 정말 간단하게 장보기 목록 작성 과정을 나눠 보았는데, 알아두어야 할 것은 냉장고 확인 함수를 실행해서 나온 결과가 **현재 갖고 있는 식료품** 리스트로 **데이터**라는 것이다.

장보기 목록 작성 과정에서 액션이라고 할만한 것은 현재라는 실행 시점에 의존하는 냉장고 확인밖에 없으며 이외에는 장보기 목록 내에서 현재 갖고 있는 식료품을 통해 계산을 하게 된다.

아예 장보기 전체 과정으로 한다면 더 다양한 과정들을 추가할 수 있겠지만 지금은 정말 간단하게 작성해보았다.

## 기술 1: 액션에서 계산 빼내기

이제 함수형 프로그래밍에서 가장 중요한 기술인 **액션에서 계산 빼내기**에 대해 이야기해볼 것이다. 앞에서 계산은 같은 입력값에 대해 같은 출력값을 반환한다는 특징을 갖고 있다고 말했다. 그렇다면 반드시 어떤 "결과값"을 반환해야한다는 것이다. 또한 값이 암묵적으로 변경될 우려가 있는 전역 변수가 없어야 한다. 이 전역 변수를 읽는 것을 **암묵적 입력**, 변경하는 것을 **암묵적 출력**이라고 한다. 바로 이 암묵적 입출력이 없어야 한다는 것이다.

> 계산
>
> 같은 입력값에 대해 같은 출력값을 반환한다.
>
> 1. 반드시 어떤 결과값을 반환할 것
>    - 명시적 입출력이 있을 것
> 2. 전역 변수를 참조하지 않을 것
>    - 암묵적 입출력이 없을 것

액션에서 계산 빼내는 단계는 아래와 같다. 이 단게를 장바구니 코드 예시와 함께 살펴보자

> 계산 추출 단계
>
> 1. 계산 코드를 찾아 빼내기
> 2. 새 함수에 임묵적 입력과 출력을 찾는다.
> 3. 압묵적 입력 ➡️ 인자, 암묵적 출력은 리턴값으로 명시적으로 변경한다.

코드는 타입스크립트와 리액트로 예시를 들어보았다.

1. 계산 코드를 찾아 빼내기

   ```javascript
   // 원래 코드
   type Item = { name: string, price: number };

   function addItemToCart(item: Item) {
     const newCart = [...cart, item];
     setCart(newCart);

     const totalPrice = newCart.reduce((acc, item) => {
       return acc + item.price;
     }, 0);
     setTotalPrice(totalPrice);
   }
   ```

   위의 코드에서 `addItemToCart`는 `cart`라는 전역 상태를 참조하고 변경하고 있으므로 액션이다. 이 액션 함수에서 뺴낼 수 있는 계산이 있는지 찾아보았을 때 전체 금액을 구하는 코드를 뺄 수 있을 것 같다. 이 전체 금액을 구하는 코드는 다른 곳에서도 충분히 재사용할 수 있기 때문에 더욱 분리하는 것이 좋을 것 같다. 여기서 이미 1단계을 완료했다.

2. 새 함수에 임묵적 입력과 출력을 찾는다.

   그렇다면 분리한 코드에서 2단계인 암묵적 입출력이 무엇인지 찾는다.

   ```javascript
   const getTotalPrice = (cart: Item[]) => {
     return newCart.reduce((acc, item) => {
       return acc + item.price;
     }, 0);
   };
   ```

   위에서 `newCart`는 전역변수를 참조한 암묵적 입력이다.

3. 압묵적 입력 ➡️ 인자, 암묵적 출력은 리턴값으로 명시적으로 변경한다.

   이 암묵적 입력을 인자로 명시하고, 값을 리턴한다. 이렇게 3단계까지 모든 과정을 마쳤다.

   아래는 완성 코드이다.

   ```javascript
   // 바꾼 코드
   const getTotalPrice = (cart: Item[]) => {
     return cart.reduce((acc, item) => {
       return acc + item.price;
     }, 0);
   };

   function addItemToCart(item: Item) {
     const newCart = [...cart, item];
     setCart(newCart);

     const totalPrice = getTotalPrice(newCart);
     setTotalPrice(totalPrice);
   }
   ```

액션에서 계산 빼내기 기술도 굉장히 간단한 함수로 구현해보았는데 실제 프로덕트는 이보다 훨씬 복잡하다. 계산 추출 단계를 통해 액션 내부에 어떤 것들을 계산으로 빼낼 것인지 구분하고 적절하게 분리하는 데에 많은 연습이 필요할 것 같다.

## 기술 2: 더 좋은 액션 만들기

어떤 액션에서는 빼낼 수 있는 계산이 없을 수도 있다. 하지만 액션이더라도 재사용성을 높일 수 있는 방법이 있다.

1. 암묵적 입출력 줄이기

   액션에 있는 왜 암묵적 입출력을 줄이는 것이 좋을까? 각 컴포넌트는 재사용성이 중요하기 때문이다. 이 재사용성을 높이기 위해서는 독립성을 높이고 결합도를 낮춰야하는데, 바로 이 암묵적 입출력이 결합도를 올리기 때문에 재사용성 측면에서 좋지 않다. 따라서 될 수 있는만큼 액션에서도 암묵적 입출력을 줄여야 한다.

   그렇다면 암묵적 입출력은 어떻게 줄일 수 있을까? 일단 암묵적 입력인 전역 변수가 있는지 찾고 이것을 함수의 인자로 사용하는 것이다.

2. 액션 내부의 코드들이 명확하고 의미있는 역할을 갖고 있기

   함수 내부에 한줄만 액션이더라도 전체 함수는 액션이 된다. 따라서 액션 함수에는 여러 다른 계산들과 액션들이 혼합해 있는 경우가 있는데, 이 경우 각 계산들은 명확한 자신의 역할을 갖고 있어야 하고, 액션또한 어떤 부수 효과를 일으키는지 명확하게 나타내야한다. 왜냐하면 각각의 역할들이 의미 있고 명확해야 쓸데없는 전역 변수, 즉 암묵적 입력을 가지지 않을 수 있기 때문이다.

&nbsp;

&nbsp;

여기까지 함수형 프로그래밍의 데이터, 계산, 액션에 대해 알아보았다. 책에서는 자바스크립트 코드로 예시를 들고 있는데, 여기서 다시 리액트 코드로 재작성해보았다. 더 좋은 예시를 들고 싶었지만 더 복잡해졌다가 코드가 산으로 가는 것 같아서 일단 쉽고 잘 이해되는 코드로 작성해보았다.

이렇게 데이터, 계산, 액션에 대해 공부를 해보니 함수형 프로그래밍에 대한 이해도 더 깊어진 것 같고, 코드를 어떻게 바라보아야 하는지에 대한 기준도 잘 알 수 있게 되었던 것 같다. 또 의외로 함수형 프로그래밍에 대해 공부한 것인데 리팩토링에 대한 공부도 되었던 것 같다. 정말 괜찮은 책인 것 같다! 소프트웨어 개발에서 함수형 프로그래밍이란 대체 무엇인지 궁금하셨던 분들에게 추천하고 싶다.