## Tailwind CSS?

> Tailwind CSS는 사용하기 쉬운 **CSS 라이브러리**이다. Tailwind CSS는 CSS를 단순화하고 재사용 가능하게 만들어준다. Tailwind CSS는 개발자가 개발 프로세스를 더 빠르게 만들고, 다양한 기능이 포함되어 있어 유용하다.

## Tailwind CSS를 Next.js에 설치하는 방법

Next.js는 Tailwind CSS를 간편하게 설치하고 사용할 수 있도록 지원한다.

1. 다음과 같은 npm 패키지를 설치한다.

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p # postcss.config.js 파일 생성
   npm install -D prettier prettier-plugin-tailwindcss # Prettier를 통한 TailwindCSS 클래스 자동 정렬 플러그인
   ```

2. `postcss.config.js` 파일

   ```tsx
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

3. `tailwind.config.js` 설정

   ```tsx
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       './pages/**/*.{js,jsx,ts,tsx}',
       './components/**/*.{js,jsx,ts,tsx}',
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

4. `globals.css` 에 tailwind를 적용한다.

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. `_app.js` 파일에 다음과 같이 스타일 시트를 추가한다.

   ```tsx
   import '@/styles/globals.css';
   ```

6. 변경 사항을 적용하기 위해 프로젝트를 다시 시작한다.

   ```bash
   npm run dev
   ```

## 유용한 클래스네임

- `gap`과 `space-x`, `space-y`
  둘 다 붙어있는 자식요소끼리 떨어지는 공간을 만들어준다.
  - 하지만 `gap`은 그대로 `gap`속성
  - `space`는 `tailwind`에서 제공하는 유틸리티로 붙어있는 요소 사이의 `margin`을 설정한다.
- `divided`
  요소 사이의 선을 컨트롤하고 싶을 때 사용
  ```css
  .divide-x-0 {
    border-right-width: 0px;
    border-left-width: 0px;
  }
  .divide-x {
    border-right-width: 0px;
    border-left-width: 1px;
  }
  .divide-y-reverse {
    --tw-divide-y-reverse: 1;
  }
  ```
- `inset`
  absolute나 fixed된 요소가 부모에 꽉 차게 만들고 싶을 때 사용할 수 있다.
  ```css
  .inset-2 {
    top: 0.5rem /* 8px */;
    right: 0.5rem /* 8px */;
    bottom: 0.5rem /* 8px */;
    left: 0.5rem /* 8px */;
  }
  .inset-y-0 {
    top: 0px;
    bottom: 0px;
  }
  .inset-x-0 {
    left: 0px;
    right: 0px;
  }
  ```
- `aspect`
  [https://tailwindcss.com/docs/aspect-ratio](https://tailwindcss.com/docs/aspect-ratio)
  요소의 종횡비를 제어하기 위한 유틸리티. 대괄호를 사용하여 새로운 속성을 생성할 수도 있다.
  ```css
  .aspect-auto {
    aspect-ratio: auto;
  }
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  .aspect-video {
    /* 비디오를 쓸 때 좋음 */
    aspect-ratio: 16 / 9;
  }
  ```
  ```tsx
  // 사용예시
  <iframe class="w-full aspect-[4/3]" src="https://www.youtube.com/...
  ```

## Transition + Ring

[https://tailwindcss.com/docs/ring-color](https://tailwindcss.com/docs/ring-color)

```tsx
<div className="transition">hi</div>
// transition 만 적어도 all, duration, timing-function을 적용해준다.
<div className="transition duration-150 ease-out md:ease-in">hi</div>
<button className="ring-2 ring-offset-2 focus:ring-2 transition">추가하기</button>
```

## Modifier 리스트

- 중첩해서 사용도 가능하다.
- 가상 클래스 Modifier
  - hover (&:hover)
  - focus (&:focus)
  - active (&:active)
  - disabled (&:disabled)
  - **리스트**에 css를 적용할 때 유용한 가상 클래스
    - first (&:first-child)
    - last (&:last-child)
    - only (&:only-child) → 항목이 하나 남았을 때 유용하겠다.
    - odd (&:nth-child(odd))
    - even (&:nth-child(even))
    - empty (&:empty) → 항목에는 있지만 내용이 빈 항목일 경우 `empty:hidden` 같은 것처럼 만들 수 있다.
  - **Form**에 쓰면 좋은 가상 클래스 Modifier
    - invalid (&:invalid) → 유효하지 않은 패턴인 경우, required 상태일 때 빈값일 경우도 포함
    - valid는 반대로 유효하게 작성 중일 때
    - placeholder-shown: 빈값이어서 placeholder가 보일 때 보이는 스타일
    - disabled
    ```tsx
    // Form에 쓰면 좋은 가상 클래스 Modifier 예시
    <form>
      <h1>프로필</h1>
      <span>아바타</span>
      <input
        type='email'
        required
        placeholder='이메일을 입력해주세요.'
        className='border-yellow-5 h-8 w-1/2 rounded-lg px-2 required:border-2'
      />
      <input
        type='password'
        required
        placeholder='패스워드를 적어주세요'
        className='border-yellow-5 h-8 w-1/2 rounded-lg px-2 required:border-2'
      />
      <input type='submit' value='Login' className='bg-red' />
    </form>
    ```
  - <Details>에 쓰면 좋은 가상 클래스 Modifier
      - select (&:select-none) → 복붙이 안되도록 글자 드래깅을 막는 거네
      
      ```tsx
      <details className='select-none p-12 open:bg-indigo-400 open:text-white'>
        <summary className='select-none'>Selection</summary>
        <span>김밥</span>
      </details>
      ```
      
      - className='selection:bg-indigo-300' 이건 드래깅했을 때 색상을 바꿔준다.
- 가상 요소 Modifier
  - before (&::before)
  - after (&::after)
  - placeholder (&::placeholder)
- 반응형 Modifier
  [https://tailwindcss.com/docs/responsive-design#overview](https://tailwindcss.com/docs/responsive-design#overview)
  - tailwind는 mobile를 기준으로 디자인한다.
    | Breakpoint prefix | Minimum width | CSS |
    | ----------------- | ------------- | ---------------------------------- |
    | sm | 640px | @media (min-width: 640px) { ... } |
    | md | 768px | @media (min-width: 768px) { ... } |
    | lg | 1024px | @media (min-width: 1024px) { ... } |
    | xl | 1280px | @media (min-width: 1280px) { ... } |
    | 2xl | 1536px | @media (min-width: 1536px) { ... } |
  - landscape나 portrait도 가능하다.
- 다크모드 - prefers-color-scheme
  - dark (@media(prefers-color-scheme: dark))
  - 다크 모드는 개인 컴퓨터 환경 설정이 기본값이다.
  - 만약 사이트에 직접 다크모드 버튼을 추가하고 싶다면 tailwind.config.js 환경설정에서 설정해줘야 한다.
  ```tsx
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {},
    },
    **darkMode: "class"** // 원래는 "media"가 기본값이다. "class"로 바꾸면 .dark가 있는 클래스를 찾아 변경해주는 것 뿐이다.
    plugins: [],
  };
  ```

## Group-{Modifier}

**Styling based on parent state (group-{modifier})**

- 전체 박스를 타깃으로 hover했을 때 조그만 글씨의 색상이 바뀐다든가 하는 경우 사용 가능하다.
- hover, first, last, odd, even, checked, required 등등 사용 가능

```tsx
// Group-{Modifier} 예시
<form className='**group**'>
  <h1>프로필</h1>
  <span className='**group-hover:bg-red-300**'>아바타</span>
  <button>자세히 보기</button>
</form>
```

## Peer-{Modifier}

**Styling based on sibling state (peer-{modifier})**

- 형제요소를 기반으로 다른 형제의 스타일을 변경할 수 있다. 예를 들어 잘못된 형식의 input을 작성하고 있을 때 span의 스타일을 변경 가능.

<aside>
❗ 주의!!!!!!!
peer이 들어간 요소가 먼저 나와야 한다! peer-focus 이런 요소가 먼저 오면 적용되지 않는다.

</aside>

```tsx
<form>
  <h1>유저 이름</h1>
  <input
    type='text'
    required
    placeholder='유저 이름을 입력해주세요.'
    className='**peer** h-8 w-1/2 rounded-lg px-2 focus:outline-none '
  />
  <span className='hidden **peer-invalid:block** peer-invalid:text-red-500'>
    This input is invalid
  </span>
  <span className='hidden **peer-valid:block** peer-valid:text-teal-500'>
    Good! Keep going
  </span>
</form>
```

## Tailwind Plugins

[https://tailwindcss.com/docs/plugins](https://tailwindcss.com/docs/plugins)

```tsx
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, config }) {
      // Add your custom styles here
    }),
  ],
};
```

### Official Plugins

```tsx
module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
```

- @tailwindcss/forms
  - 스타일링하기 쉽도록 레이어를 리셋한다.

## Tailwind CSS Just in time compiler

> Tailwind CSS가 3.0으로 버전이 업그레이드되기 이전에는 빌드할 때 실제 사용하는 클래스네임 이외에는 삭제하는 purging과정이 있었다. 정말 그저 하나의 커다란 CSS 파일이었다. 하지만 버전이 업데이트되면서 Just in time compiler가 추가되었다.
>
> Just in time compiler(JIT)는 코드를 실시간으로 감시하면서 클래스를 새로 생성하면 컴파일러가 그것을 찾아낸 다음 내가 원하는 클래스로 css를 생성해준다. 그러면서 다양한 조합의 modifier를 사용할 수 있게 되었다. 또한 새로 작성하면 바로 생성해주고, 지우면 바로 지워지기 때문에 사용하지 않는 클래스네임이라는 것은 존재하지 않게 된 것이다.
>
> 기존의 Tailwind CSS는 사용하기 위해 모든 클래스를 미리 컴파일해야 하는 반면, JIT은 실행 시점에 컴파일 해주기 때문에 빠르고 간결하게 코드를 작성할 수 있다. 또한 다양한 테마와 플러그인 사용이 가능하고, 개발 프로세스를 더 빠르게 만들 수 있다.
>
> 정리, Just in time compiler(JIT)로 업그레이드 되면서 기존에는 되지 않았던
>
> - 다양한 조합의 modifier를 사용 가능
> - tailwind 유틸리티에 없는 값 적용 가능 ex `text-[200px]` , `bg-[url(’/vercel.svg’)]`
>
> 등이 가능해졌다.

## Tailwind Styled Components

- 가장 큰 장점은 className 안에 인라인형식으로 적지 않아도 되기 때문에 코드가 굉장히 깔끔해진다는 것이다👍🏻 사실 거의 이 장점 때문에 쓰지 않나 싶다.
- 또한 CSS in JS로 재사용성과 확장 가능성이 높다. props 전달 가능

[tailwind-styled-components](https://www.npmjs.com/package/tailwind-styled-components)
