## 협업 도구 Eslint와 Prettier의 중요성

## Eslint 설정

### 플러그인의 종류

- CRA의 기본 제공 플러그인

  1. eslint-plugin-react
  2. eslint-plugin-react-hooks
  3. eslint-plugin-jsx-a11y

- 추가할 수 있는 필수 플러그인

  1. eslint-plugin-prettier
  2. eslint-config-prettier
  3. eslint-plugin-import
  4. @typescript-eslint/parser
  5. @typescript-eslint/eslint-plugin

- 추가할 수 있는 플러그인 소개 및 용도

  1. eslint-plugin-promise
  2. eslint-plugin-node
  3. eslint-plugin-security
  4. eslint-plugin-testing-library
  5. eslint-plugin-jest
  6. eslint-plugin-json
  7. eslint-plugin-unused-imports
  8. eslint-plugin-simple-import-sort

- 기타 유용한 플러그인

  1. eslint-plugin-compat
  2. eslint-plugin-functional
  3. eslint-plugin-unicorn
  4. eslint-plugin-babel 등

### 기타 추천 Eslint 설정

1. Airbnb Style

   - eslint-config-airbnb

2. TypeScript with Airbnb
3. Google Style
4. Standard Style
5. React-Strict
6. Functional Programming

## Prettier 설정

### 주요 설정 옵션

- `semi`

  문장 끝에 세미콜론을 추가할지를 결정한다.

  옵션: `true`(기본값), `false`

  ***

- `singleQuote`

  문자열을 작은 따옴표로 감쌀지를 결정한다.

  옵션: `true`, `false`(기본값)

  ***

- `trailingComma`

  객체나 배열의 마지막 항목 뒤에 콤마를 추가할지를 결정한다.

  옵션: `all`, `es5`(기본값), `none`

  - `all`

    ```javascript
    const obj = {
      id: 1,
      id: 2, //✅ 콤마 자동 생성
    };
    ```

  - `es5`

    객체나 배열 같이 ES5 문법에서 유효한 곳만 쉼표를 추가한다.

  - `none`

    맨 마지막 요소 뒤의 콤마가 제거된다.

  이 옵션은 테스트해봤을 때 한줄로 작성할 때 맨마지막 요소에 콤마가 생성되는 것은 아니고 객체나 배열 안에 요소가 많아서 자동 줄바꿈이 될 때 맨 마지막 요소에 콤마가 작성되는 것 같다.

  왜 마지막 요소에 콤마를 추가하는지 궁금해서 찾아봤는데 "git에서 이전 커밋과 현재 커밋에서 변경된 줄의 차이를 줄일 수 있어서"라고 한다.

  ***

- `tabWidth`

  탭 너비를 설정한다.

  옵션: 숫자(기본값은 `2`)

  ***

- `printWidth`

  한줄의 최대 너비를 설정한다.

  옵션: 숫자(기본값은 `80`)

  ***

- `bracketSpacing`

  객체 리터럴의 중괄호 `{}` 안에 공백을 추가할지 결정한다.

  옵션: `true`(기본값), `false`

  ***

- `jsxBracketSameLine`

  jsx에서 마지막 `>`를 새로운 줄로 내릴지를 결정한다.

  옵션: `true`, `false`(기본값)

### 추가 설정 옵션

- `arrowParens`

  화살표 함수의 인수를 괄호로 감쌀지를 결정한다.

  옵션: `avoid`, `always`(기본값)

  ***

- `endOfLine`

  파일 끝의 줄바꿈 형식을 설정한다.

  옵션: `auto`(기본값), `lf`, `crlf`, `cr`

  ***

- `quoteProps`

  객체 리터럴의 속성 이름에 대한 따옴표 규칙을 설정한다.

  옵션: `as-needed`(기본값), `consistent`, `preserve`

## 팀 협업을 위한 베스트 프랙티스

### 공유 가능한 Eslint 및 Prettier 설정 파일 만들기

### Pre-commit 훅과 Continuous Integration(CI)에서 Eslint 적용

## 참고

[prettier playground](https://prettier.io/playground/)
