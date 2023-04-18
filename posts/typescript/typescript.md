## 이제는 거의 모든 프로젝트에서 사용하는 Typescript!

### Typescript의 특징

- 컴파일 언어, 정적타입 언어, 런타임 오류 방지
- 자바스크립트 슈퍼셋(상위확장)

### Typescript를 고려해야 하는 이유

- 객체 지향 프로그래밍 지원
- 높은 수준의 코드 탐색과 디버깅
- 자바스크립트 호환
- 강력한 생태계
- 점진적 전환도 가능

## TS의 타입

### TS의 기본 데이터 타입

TS에는 JS 기본 데이터 타입 이외의 타입이 더 있다.

| JS에 없는 타입스크립트 추가 타입 +               |
| ------------------------------------------------ |
| `void`, `never`, `any`, `unknown`, `enum`, tuple |

1. `void` : 변수에 undefined와 null만 할당하고 함수에는 리턴 값을 설정할 수 없는 타입

2. `never` : 특정 값이 절대 발생할 수 없을 때 사용한다.

3. `any` : 모든 데이터 허용, 하지만 typescript의 취지와 맞지 않으므로 최대한 사용하지 말아야 한다. any를 할당할 경우 컴파일러가 그냥 무시하고 지나가게 된다.

4. `unknown` : unknown은 좀더 안전한 any 타입이라 볼 수 있다. any와 같이 모든 타입을 할당받을 수 있지만, 컴파일러가 프로퍼티나 연산을 하는 경우 타입을 체크한다.
   또한 unknown은 any가 아닌 변수에 할당되지 않는다.
   `any`가 사용되어야 할 것 같다면 `unknown`로 대체해서 사용하는게 좋을 것 같다.

5. `enum` : **열거형**으로 Number 또는 String의 **‘특정 상수들의 집합**’에 고정된 이름을 부여할 수 있는 타입.

   값의 종류가 일정한 범위로 정해져 있는 경우, 더 쉽게 코드를 문서화할 수 있고, 사례 집합에 유용하다고 한다.

   가장 많이 쓰이는 숫자 열거형과 문자열 열거형을 한번 살펴보자.

   - **숫자 열거형**

     - 상수만 적고 값을 초기화하지 않았을 경우

     기본값으로 0부터 시작하여 1씩 증가한다. 값 자체는 중요하지 않지만 구별을 해야할 떄 사용하면 좋을 듯 하다.

     ```tsx
     enum ToDos {
       Todo, // Todo = 0
       Doing, // Doing = 1
       Done, // Done = 2
     }
     ```

     - 값을 초기화했을 경우

     초기화한 그 지점에서 뒤의 요소들은 자동으로 1씩 증가한다.

     ```tsx
     enum ToDos {
       Todo = 1, // Todo = 1
       Doing, // Doing = 2
       Done, // Done = 3
     }
     ```

     - 계산된 값으로 초기화?

     숫자 열거형에서 앞의 상수는 계산된 값이 아닌, 아무것도 값을 초기화하지 않거나 숫자형을 초기화한 상수여야 한다.

     ```tsx
     function getValue() {
       return 1 + 2;
     }

     enum E1 {
       A = getValue(),
       B, // 🚫 Error! 앞의 상수가 계산된 값이므로 다음 상수도 값을 초기화해줘야 한다
     }

     enum E2 {
       A = 1,
       B = getValue(),
       C, // 🚫 Error! 더 전의 상수가 숫자형으로 초기화되었어도 바로 앞의 상수가 계산된 값이므로 값을 초기화해줘야 한다
     }

     enum E3 {
       A = getValue(),
       B = 1,
       C, // ✅ 앞의 상수가 숫자형으로 초기화되었으므로 OK
     }
     ```

     > 주의! 계산된 값은 그 뒤의 요소도 초기해줘야 한다.

   - **문자열 열거형**

   문자열 열거형은 반드시 값을 초기화해야 한다.

   ```tsx
   enum Todos {
     Todo = '할일',
     Doing = '진행 중',
     Done = '완료',
   }
   ```

6. tuple: **배열의 타입 순서와 배열 길이**를 지정할 수 있는 타입.

   ```tsx
   const arr: [string, number, { [key: number]: string[] }] = [
     'aa',
     100,
     { 0: ['hello', 'world'] },
   ];
   ```

## TS의 타입 작동 방식

### 타입 추론

변수를 생성하면서 동시에 특정 값을 할당하는 경우 TS는 **그 값의 타입**을 해당 변수의 타입으로 사용한다.

- 추가로 알아두기, tsconfig.json의 설정

  - **noImplicitAny**
    만약 TS가 타입을 추론하지 못한다면 컴파일러는 any타입을 부여하는 것이 기본동작이다. 컴파일러 플래그인 noImplicitAny를 사용하면 암묵적으로 부여된 모든 `any` 타입에 오류를 발생시킨다.
  - **strickNullChecks** 설정
    strickNullChecks가 설정되면 어떤 값이 `undefined`거나 `null`일 때 오류가 발생시킨다.

    ```tsx
    function doSomething(x: string | undefined) {
      if (x === undefined) {
        // 아무 것도 하지 않는다
      } else {
        console.log('Hello, ' + x.toUpperCase());
      }
    }
    ```

    - 아니면 Null 아님 단언 연산자 `!` 를 사용할 수 있다.

    ```tsx
    function liveDangerously(x?: number | undefined) {
      // 오류 없음
      console.log(x!.toFixed());
    }
    // 반드시 null 또는 undefined가 아닌 경우에 사용하기
    ```

### 타입 정의

interface로 객체의 형태를 명시적으로 선언한다. 또한 클래스에게도 선언할 수 있으며, 함수에서 매개변수와 리턴값을 명시하는데 선언할 수 있다.

```tsx
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount('Murphy', 1);
```

### 타입 단언

타입스크립트보다 개발자가 타입에 대한 정보를 더 잘 아는 경우에 사용한다. 타입 단언을 사용하면 타입을 좀 더 구체적으로 명시할 수 있다.

- `as 타입` 아니면 `<타입>` 으로 표시한다.
  ```tsx
  const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
  // or
  const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas');
  ```

또한 지나치게 보수적으로 작동해 타입이 허용되지 않을 경우 `any`나 `unknown`으로 타입 단언을 사용하기도 한다.

### 타입 구성(Composing Types)

여러가지 타입을 이용하여 새 타입을 작성하기 위해 유니언과 제네릭을 많이 사용한다.

- 유니언 : 여러 타입 중 하나일 수 있음을 선언한다.
  ```tsx
  type MyBool = true | false;
  ```
  보통 string이나 number 같은 리터럴 집합을 설명한다.
- 제네릭 : 타입에 변수를 제공하는 방법
  ```tsx
  type StringArray = Array<string>;
  type NumberArray = Array<number>;
  type ObjectWithNameArray = Array<{ name: string }>;
  ```

```tsx
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}

printText("Hello, world", "left");
printText("G'day, mate", "centre");
Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

- **"left" | "right" | "center"** 와 같이 특정 문자열만 반환하고 싶을 때 리터럴 타입을 유니언과 함께 사용하면 유용하다.

## Interface와 Type Alias

### Type Alias 타입 별칭

같은 타입을 한번 이상 재사용하거나 다른 이름으로 부르고 싶은 경우

```tsx
type ID = number | string;
```

### Interface 인터페이스

인터페이스 선언은 객체 타입을 만드는 또 다른 방법. 자바스크립트로 컴파일 되면 사라진다

`readonly`를 붙이면 해당 속성은 값을 변경할 수 없다. 불변성 유지가 가능하다

```jsx
interface Player {
  readonly name: string
}

function showName(player: Player) {
	player.name = "can change?" // 🚫 readonly이므로 변경할 수 없다.
}
```

### Interface와 Type의 차이

| 구분             | interface             | type                                               |
| ---------------- | --------------------- | -------------------------------------------------- |
| 확장 방식        | extends(상속)         | 교집합을 통해 타입 확장                            |
| 타입 정의        | 객체 타입 정의만 가능 | 객체뿐만 아니라 원시값, unions, tuples 정의도 가능 |
| 선언적 확장 가능 | ✅                    | 🛑                                                 |

- **타입 확장**

  **interface (extends)**

  ```tsx
  interface Animal {
    name: string;
  }

  interface Bear extends Animal {
    honey: boolean;
  }

  const bear = getBear();
  bear.name;
  bear.honey;
  ```

  **type (&)**

  ```tsx
  type Animal = {
    name: string;
  };

  type Bear = Animal & {
    honey: Boolean;
  };

  const bear = getBear();
  bear.name;
  bear.honey;
  ```

- **선언적 확장**

  선언적 확장이란 같은 이름으로 선언할 경우 자동으로 하나의 타입 정의로 합쳐진다는 의미이다.

  ```tsx
  interface Box {
    height: number;
    width: number;
  }
  interface Box {
    scale: number;
  }

  let box: Box = { height: 5, width: 6, scale: 10 };
  ```

  - interface는 같은 이름으로 선언할 경우 자동적으로 두 인터페이스가 하나로 합쳐진다. 여러 선언적 확장이 가능하다.

    ```tsx
    type Box {
      height: number;
      width: number;
    }
    type Box {
      scale: number;
    }
    // ❗️Error: Duplicate identifier 'Box'.
    let box: Box = { height: 5, width: 6, scale: 10 };
    ```

  - type은 자동적으로 합쳐지지 않는다. 다시 같은 이름으로 선언할 수 없다.

둘다 어떤 타입을 정의한다는데 공통점이 있지만, 한가지 중요한 차이점은 `type` 은 새로운 속성을 추가하기 위해 다시 같은 이름으로 선언할 수 없지만 `interface`는 선언적 확장이 가능하다는 것이다.

**그럼 언제 interface를 사용하고, type을 사용해야 할까?**

> `interface`를 우선적으로 사용하고 특정 기능이 필요할 때 `type`을 사용해야 합니다. (TS 핸드북)
>
> [🔗 TS HandBook 타입 정의하기](https://www.typescriptlang.org/ko/docs/handbook/typescript-in-5-minutes.html#%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98%ED%95%98%EA%B8%B0-defining-types)
>
> [🔗 Interface vs Type](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/52682220#52682220)

## Index Signatures

프로퍼티의 이름을 미리 알지 못하지만 값의 형태는 알고 있을 때 index signature을 사용한다.

```tsx
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
```

## Function

### 함수 타입 표현식

```tsx
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

### Call Signatures

함수에 넣는 인자의 타입과 함수의 반환 타입을 알려주는 함수 타입을 말한다. 함수를 어떻게 구현해야 하는지 알려준다. 함수 위에 마우스를 올렸을 때 볼 수도 있다.

```tsx
const add = (a: number, b: number) => a + b;
// 변수: (파라미터 타입) => 반환타입
```

```tsx
// 함수만의 타입을 만들고 싶을 때
type Add = (a:number, b:number) => number;

const add:Add = (a, b) => a + b

type Minus = (
	a: number,
	b: number
)

function minus(numberArr: Minus) {
	return a - b;
}

minus({a: 5, b: 3});

```

함수를 구현하기 전에 먼저 함수에 대한 타입을 만들어 어떻게 작동하는지 서술해둘 수 있다.

### Overloading

하나의 함수가 **여러개의 Call Signature을 갖고 있을 때** 발생한다. 보통 오버로딩을 하는 경우는 많이 없지만 외부 라이브러리 같은 경우 오버로딩으로 디자인되어 있는 경우가 많다.

ex)

```tsx
type Config = {
  path: string;
  state: number;
};

type Push = {
  // 여러개의 call signature로 overloading
  (config: Config): void;
  (config: string): void;
};

const push: Push = (config) => {
  if (typeof config === 'string') {
    console.log(config);
  } else {
    console.log(config.path);
  }
};

router.push('/home'); // type === "string"

router.push({
  // type === Config
  path: '/home',
  state: 1,
});
```

### Generic을 통해 Polymorphism 다형성 구현

Polymorphism은 다양한 형태를 도출해낼 수 있다는 것을 뜻한다. 인자들과 반환값의 형태(타입)에 따라 그에 상응하는 형태(타입)를 가질 수 있다.

🚫 Overloading으로 다양한 타입을 정의해 다양한 형태를 얻기 🚫

✅ **Generic으로 다양한 형태 얻기** ✅

Generic은 확실히 정해진 타입(concrete type)이 아니다. Generic은 아직 확실히 지정되지는 않았지만 나중에 해당 자리를 차지할 수 있는 다른 것을 나타내는 표시자라고 할 수 있다.

| concrete type                 | generic type                     |
| ----------------------------- | -------------------------------- |
| number, string, void, unknown | 앞으로 들어올 타입의 표시자일 뿐 |

**언제 제네릭을 사용해야 할까?**

Call signature 작성시 **들어올 확실한 타입을 미리 알 수 없을 때** Generic을 사용할 수 있다. 그럼 타입스크립트는 Generic으로 정의된 인자을 보고 타입을 자동으로 추론해준다.

- 제네릭 사용 예시

  ```tsx
  // Generic으로 다형성 활용하기
  // 예시 1
  type SuperPrint = {
    <T, M>(a: T, b: M): void;
  };

  const superPrint: SuperPrint = (a, b) => {
    console.log(a, b);
  };

  superPrint(1, 'hello');

  // 예시2
  function map<Input, Output>(
    arr: Input[],
    func: (arg: Input) => Output
  ): Output[] {
    return arr.map(func);
  }

  const parsed = map(['1', '2', '3'], (n) => parseInt(n));

  // Generic은 any보다 더 많은 보호를 받을 수 있다.
  type PrintFirstItem = {
    (a: T[]): T;
  };

  const printFirstItem: PrintFirstItem = (arr) => arr[0];

  let firstItem = printFirstItem([1, 3, 5]);

  firstItem.toUpperCase(); // ❗️Error type이 number이기 때문이다.
  ```

**any와 generic의 차이점**

`any`와 제네릭의 차이점은 해당 타입에 대한 정보를 잃지 않는다는 것이다. `any`는 타입 정보를 알 수 없지만 제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 concrete type을 하나하나 추가하는 방식이기 때문에 더 많은 보호를 받을 수 있다.

- 제네릭 사용 시 타입 제한 조건

  ```tsx
  function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
  }

  // longerArray 의 타입은 'number[]' 입니다'
  const longerArray = longest([1, 2], [1, 2, 3]);
  // longerString 의 타입은 'alice' | 'bob' 입니다.
  const longerString = longest("alice", "bob");
  // 에러! Number에는 'length' 프로퍼티가 없습니다.
  const notOK = longest(10, 100);
  Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
  ```

## Class와 Interfaces

### Classes

자바스크립트엔 없는, 자바스크립트보다 **좀 더 객체지향적인 코드**를 작성할 수 있는 기능들을 제공한다. (상속, 추상화, 캡슐화, 다형성)

- **private, protected, public, abstract…**

| 구분      | 선언한 클래스 내에서 접근 | 상속받은 클래스 내에서 접근                               | 인스턴스에서 접근 |
| --------- | ------------------------- | --------------------------------------------------------- | ----------------- |
| private   | ✅                        | 🚫                                                        | 🚫                |
| protected | ✅                        | ✅ 외부에선 안되지만 상속한 클래스에서는 사용하고 싶을 때 | 🚫                |
| public    | ✅                        | ✅                                                        | ✅                |

- **클래스**
  자바스크립트에서 작성했던 constructor 메서드 안에 this.firstname = firstname 과 같은 필드를 작성하지 않아도 this를 추론해준다. 타입스크립트가 알아서 JS로 컴파일해준다.

  ```tsx
  class User{
  	constructor(
  		private firstname:string,
  		private lastname:string,
  		public nickname:string
  	){
  		getNickname():void
  	}
  }

  const ellie = new User("ellie", "jeon", "jellie");

  ellie.firstname // 🚫 선언한 클래스 밖 error
  ellie.nickname // ✅ 접근 가능
  ```

- **추상 클래스와 추상 메서드**
  추상 클래스는 다른 클래스에게 **상속하기만** 하는 클래스. 직접 새로운 인스턴스를 만들 수 없다.
  추상 메서드는 구현이 되어 있지 않은 메서드로, 반드시 해당 메서드가 구현되어야 하는 경우 작성한다.

  ```tsx
  abstract class User{
  	constructor(
  		private firstname:string, // 예약어 + 프로퍼티
  		private lastname:string,
  		public nickname:string
  	){
  		getFullname() {
  			return `${firstname} ${lastname}`
  		}
  		abstract getNickname():void // 추상 메서드
  	}
  }

  class Player extends User{
  // 추상 메서드는 추상 클래스를 상속받는 클래스들이 반드시 구현(implement)해야하는 메서드이다.
  	getNickname(){
  		console.log(this.nickname)
  	}
  }

  const ellie = new User("ellie", "jeon", "jellie");

  ellie.getFullname(); // ellie jeon
  ```

- **Dictionary Example**

  ```tsx
  // index signature
  type Words = {
    [key: string]: string;
  };

  // 전체 딕셔너리 클래스
  class Dict {
    private words: Words; // 내부적으로 존재하는 데이터
    constructor() {
      this.words = {};
    } // words 초기화
    add(word: Word) {
      // 단어 추가하기 메서드, 클래스를 타입으로 사용 ✅
      if (this.words[word.term] === undefined) {
        this.words[word.term] = word.def;
      }
    }
    def(term: string) {
      // 단어의 정의 리턴하기 메서드
      return this.words[term];
    }
  }

  // 단어 클래스
  class Word {
    constructor(public term: string, public def: string) {}
  }

  const dict = new Dict();

  const kimchi = new Word('kimchi', '한국의 대표 음식');

  dict.add(kimchi);
  dict.def('kimchi'); // 한국의 대표 음식
  ```

  - **또한 클래스를 하나의 타입처럼 사용할 수 있다.**

**추상클래스보다는 interface 와 implement 사용하자**

그러나 추상 클래스는 자바스크립트로 컴파일되면 다른 클래스에 상속만 할 수 있다는 본래의 기능을 잃어버린다. 이런 경우에 interface를 사용한다. interface 는 컴파일되면 사라지기 때문이다. 또한 자바스크립트 파일의 크기를 줄일 수 있다는 점에서 좋다.
interface를 클래스에 implements를 통해 상속하면 추상 클래스를 사용할 필요없다. implements을 사용하여 클래스가 특정 인터페이스를 충족하는지 확인할 수 있다.

```tsx
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log('ping!');
  }
}
```

## @ts-check + JSDoc

자바스크립트에서 타입스크립트로 이전하는 경우 js 파일에 ts 문법을 적용하고 싶은 경우 사용한다. .js파일의 첫번째 줄에 `@ts-check` 를 추가한다.

또한 JSDoc 주석을 사용하여 JS파일에 타입 정보를 제공할 수 있다.

```tsx
@ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
  return true;
}

/**
 * Exits the program
 * @param {number} code
 * @returns number
 */
export function exit(code) {
  return code + 1;
}
```
