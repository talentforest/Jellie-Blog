## TailwindCss란?

> TailwindCss는 사용하기 쉬운 CSS 라이브러리이다. TailwindCss는 단순화한 스타일링과 유용한 기능을 통해 빠르게 스타일링할 수 있도록 도와준다.

### Just in time compiler?

TailwindCss가 3.0으로 버전이 업그레이드되기 이전에는 빌드할 때 실제 사용하는 클래스네임 이외에는 삭제하는 과정이 있었다. 이전에는 커다란 CSS 파일이었을 뿐이지만 버전이 업데이트되면서 Just in time compiler라는 기능이 추가되었다.

Just in time compiler(JIT)는 **코드를 실시간으로 감시**하면서 클래스를 새로 작성하면 컴파일러가 그것을 찾아낸 다음 바로 CSS를 생성해주는 기능이다. 그러면서 다양한 조합의 modifier를 사용할 수 있게 되었다. 클래스를 새로 작성하면 다시 새로 생성해주고, 지우면 바로 지워지기 때문에 사용하지 않는 클래스네임이라는 것은 존재하지 않게 되었다.

**TL;DR**

> TailwindCss가 Just in time compiler(JIT)로 실시간으로 클래스를 감시해 클래스를 조합하고 생성하는 3.0으로 업그레이드 되면서 기존에는 되지 않았던 것들,
>
> - 다양한 조합의 modifier
>
>   ex `dark:first:hover:bg-slate-400`
>
> - 유틸리티에 없는 값 적용
>
>   ex `text-[200px]` , `bg-[url(’/vercel.svg’)]`
>
> 가능해졌다.

## TailwindCss를 Next.js에 설치하기

Next.js는 TailwindCss를 간편하게 설치하고 사용할 수 있도록 지원한다.

1. 다음과 같은 npm 패키지를 설치한다.

```bash
# postcss.config.js 파일 같이 생성
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

아래는 선택사항으로 tailwind prettier 플러그인을 통해 클래스이름을 자동 정렬할 수도 있다.

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

2. `postcss.config.js` 파일

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

3. `tailwind.config.js` 설정

```javascript
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

```javascript
import '@/styles/globals.css';
```

6. 변경 사항을 적용하기 위해 프로젝트를 다시 시작한다.

```bash
npm run dev
```

## 유용한 클래스네임

1. `gap`과 `space-x`, `space-y`
   둘 다 붙어있는 자식요소끼리 떨어지는 공간을 만들어준다.

   - 하지만 `gap`은 그대로 `gap`속성
   - `space`는 `tailwind`에서 제공하는 유틸리티로 붙어있는 요소 사이의 `margin`을 설정한다.

2. `divided`
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

3. `inset`
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

4. `aspect`
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

```javascript
// 사용예시
<iframe class="w-full aspect-[4/3]" src="https://www.youtube.com/...
```

## Transition + Ring

[https://tailwindcss.com/docs/ring-color](https://tailwindcss.com/docs/ring-color)

```tsx
// react
<button className='my-40 bg-yellow ring-offset-4 ring-indigo focus:ring-2 transition py-2 rounded-lg'>
  버튼 focus 시 ring 생김
</button>
```

결과
![img](/images/my-own-docs/ring-button.png)

## Modifier

중첩 사용도 가능하다.

아래 링크에서 Modifier리스트를 확인!
https://tailwindcss.com/docs/hover-focus-and-other-states#quick-reference

### 가상 클래스 Modifier

- `hover` (&:hover)
- `focus` (&:focus)
- `active` (&:active)
- `disabled` (&:disabled)

**리스트에 유용한 가상 클래스**

- `first` (&:first-child)
- `last` (&:last-child)
- `only` (&:only-child) | 항목이 하나 남았을 때 유용할 듯.
- `odd` (&:nth-child(odd))
- `even` (&:nth-child(even))
- `empty` (&:empty) | 항목에는 있지만 내용이 빈 항목일 경우 `empty:hidden` 같은 것처럼 만들 수 있다.

**Form에 쓰면 좋은 가상 클래스 Modifier**

- `invalid` (&:invalid)
  유효하지 않은 패턴인 경우, required 상태일 때 빈값일 경우도 포함
- `valid`
  반대로 유효하게 작성 중일 때
- `placeholder-shown:`
  빈값이어서 placeholder가 보일 때 보이는 스타일
- `disabled`

```jsx
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

**Details 태그에 쓰면 좋은 가상 클래스 Modifier**

- `select` (&:select-none)

복붙이 안되도록 글자 드래깅을 막는다.

```jsx
<details className='select-none p-12 open:bg-indigo-400 open:text-white'>
  <summary className='select-none'>Selection</summary>
  <span>김밥</span>
</details>
```

- `selection:bg-indigo-300`은 드래깅했을 때 색상을 바꿔준다.

### 가상 요소 Modifier

- `before` (&::before)
- `after` (&::after)
- `placeholder` (&::placeholder)

### 반응형 Modifier

tailwind는 mobile를 기준으로 디자인한다.
[https://tailwindcss.com/docs/responsive-design#overview](https://tailwindcss.com/docs/responsive-design#overview)
| Breakpoint prefix | Minimum width | CSS |
| ----------------- | ------------- | ---------------------------------- |
| sm | 640px | @media (min-width: 640px) { ... } |
| md | 768px | @media (min-width: 768px) { ... } |
| lg | 1024px | @media (min-width: 1024px) { ... } |
| xl | 1280px | @media (min-width: 1280px) { ... } |
| 2xl | 1536px | @media (min-width: 1536px) { ... } |

### 다크모드 Modifier

`dark` `(@media(prefers-color-scheme: dark))`

- dark Modifier는 개인 컴퓨터 환경 설정을 기본값으로 작동한다. 만약 환경 설정이 다크 모드로 설정되어 있다면 다크 모드가 적용된다.
- 만약 페이지에 직접 다크모드 토글 버튼을 추가하고 싶다면 tailwind.config.js 아래와 같이 환경설정에서 설정해줘야 한다.

  ```javascript
  // tailwind.config.js
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {},
    },
    darkMode: "class" // ✅ 원래는 "media"가 기본값이다.
    plugins: [],
  };
  ```

  darkMode를 "class"로 바꾸면 클래스에 따라 모드가 변경된다.

  > 만약 사용자의 환경 설정과 함께 토글 버튼을 제공하고 싶어도 "class"로 설정하고 아래와 같이 작성해야 한다.
  >
  > TailwindCss로 다크모드 토글 버튼 기능 구현(+시스템 기본설정)

### data-[] Modifier

```html
<!-- Will apply -->
<div data-size="large" class="data-[size=large]:p-8">
  <!-- ... -->
</div>

<!-- Will not apply -->
<div data-size="medium" class="data-[size=large]:p-8">
  <!-- ... -->
</div>
```

## Group-{Modifier}

**Styling based on parent state (group-{modifier})**

전체 박스를 `hover`했을 때 자식 요소의 스타일을 변경하는 경우 사용 가능하다.

- `hover`, `first`, `last`, `odd`, `even`, `checked`, `required` 등등 사용 가능

```javascript
// Group-{Modifier} 예시
<form className='**group**'>
  <h1>프로필</h1>
  <span className='**group-hover:bg-red-300**'>아바타</span>
  <button>자세히 보기</button>
</form>
```

## Peer-{Modifier}

**Styling based on sibling state (peer-{modifier})**

형제요소를 기반으로 다른 형제의 스타일을 변경할 수 있다. 예를 들어 잘못된 형식의 `input`을 작성하고 있을 때 `span`의 스타일을 변경 가능.

> 주의❗ `peer`이 들어간 요소가 먼저 나와야 한다. `peer-focus`과 같은 요소가 먼저 오면 `peer`이 적용되지 않는다.

```html
<form>
  <h1>유저 이름</h1>
  <input
    type="text"
    required
    placeholder="유저 이름을 입력해주세요."
    className="**peer** h-8 w-1/2 rounded-lg px-2 focus:outline-none "
  />
  <span className="hidden **peer-invalid:block** peer-invalid:text-red-500">
    This input is invalid
  </span>
  <span className="hidden **peer-valid:block** peer-valid:text-teal-500">
    Good! Keep going
  </span>
</form>
```

## Tailwind Official Plugins

아직 tailwind에 속하지는 않았지만 아래 플러그인은 공식적으로 지원하고 있다.

```javascript
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

**@tailwindcss/typography**

마크다운이나 CMS 데이터베이스 컨텐츠 블록에 빠르게 타이포그래피 스타일 클래스 세트를 적용할 수 있는 `prose` 클래스를 제공한다.

**@tailwindcss/line-clamp**

텍스트를 고정된 줄수로 잘라낼 수 있는 `line-clamp-{lines}` 클래스를 제공한다.

**@tailwindcss/aspect-ratio**

요소의 가로 세로 비율을 고정시킬 수 있는 `aspect-w-{n}` 클래스를 제공한다.
