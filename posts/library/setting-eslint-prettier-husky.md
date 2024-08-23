이번에 정말 운좋게도 정말 재밌어 보이는 사이드 프로젝트에 참여하게 되었다. 팀원이 10명이나 되는 프로젝트로 기획자와 UXUI 디자이너, AI, 백엔드, 프론트엔드 정말 구성원도 다양하게 있는 팀이다. 특히 이 사이드 프로젝트에 참여하고 싶었던 이유에는 여러가지가 있었는데, 가장 큰 이유는 이 다양한 구성원들과 소통하며 협업해볼 수 있다는 점이었다. 어느정도 기획자는 어떻게 프론트엔드 개발자에게 기획한 내용을 전달하고, 또 프론트엔드 개발자는 기획자가 전달해준 기능 명세서 같은 문서를 읽고 어떤 것들을 질문하고 소통해나가야할지? 또 UXUI 디자이너와는 UI 컴포넌트에 대해서 어떤 식으로 이야기를 나눠야할지 매우 기대됐다. 또 앞으로 다른 역할을 맡은 팀원과 소통했던 부분에 대해 한번 회고해보고 더 잘 소통할 수 있었던 점은 없었을지 회고해보려고한다.

다른 역할을 맡은 팀원과의 소통도 중요하겠지만 일단 제일 중요한 것은 **같은 역할을 맡은 프론트엔드 팀원들과의 소통**이다. 이렇게 10명의 팀원 중 프론트엔드 개발자는 나를 포함하여 2명이다. 프론트엔드 개발자가 많지는 않지만 두명든 다섯명이든 똑같이 소통하며 협업해나가야할 것이다. 정말 또 운좋게도 같이 협업하게 된 프론트엔드 개발자 분이 굉장히 따듯하시고 또 꼼꼼하셔서 소통도 잘되고 문서같은 부분을 굉장히 잘 작성할 수 있었다. 그리고 나는 이제 프로젝트 초기 세팅이라는 임무를 부여받아 세팅을 시작했다.

가장 먼저 프로젝트를 생성해본다. 프로젝트 스택은 **Vite, React, Typescript**였기 때문에 아래와 같은 명령어로 한방에 설치해주었다.

```bash
npm create vite@latest [프로젝트명] -- --template react-ts
```

이제 프로젝트도 생성되었으니 어떻게 협업 도구들을 세팅할지 알아보자.

## 프론트엔드 개발자를 위한 협업 도구

여러명이 함께 코드를 작성해야하는 경우에 협업 도구는 빛을 발한다. 특히 프론트엔드 개발자들은 한 프로젝트 내에서 동일한 스타일로 코드를 작성하는 것이 중요하다. 그리고 이를 위한 바로 대표적인 도구가 **ESLint와 Prettier**다. 그리고 ESLint와 Prettier 검사를 손쉽게 자동화해주는 도구로 **Husky**가 있다.

이번 프로젝트에서 이 세가지 도구들을 모두 적용했는데, 또 다음 프로젝트를 위해 이번에 어떻게 ESLint와 Prettier, Husky를 어떻게 초기세팅을 했는지 작성해보려고 한다.

## ESLint

> ESLint
>
> = ES + Lint의 합성어
>
> ES는 ECMAScript를 나타내며, Lint는 코드의 오류나 스타일의 문제를 찾아내는 도구를 의미한다.

위의 뜻과 같이 ESLint는 팀원들간 규칙을 정해 사전에 스타일의 오류를 잡아주는 도구이다. 미리 코드 규칙을 정해놓음으로써 개발자의 실수를 방지해 코드의 품질을 높일 수 있다고 한다.

이번 프로젝트에서는 ESLint의 규칙중 가장 유명한 Airbnb 스타일을 적용했다.

### Airbnb 스타일 ESLint 설정하기

설정 방법은 다음과 같다.

Vite + React 프로젝트를 생성하고 나면 자동으로 devDependencies에 ESLint 관련 라이브러리가 설치되어있다.

```json:package.json
"devDependencies": {
  "@eslint/js": "^9.9.0",
  // ...
  "eslint": "^9.9.0",
  "eslint-plugin-react-hooks": "^5.1.0-rc.0",
  "eslint-plugin-react-refresh": "^0.4.9",
  // ...
  "typescript-eslint": "^8.0.1",
  // ...
}
```

나는 Airbnb 스타일을 설정할 것이기 때문에 아래 두가지는 제거해주었다.

- `@eslint/js`
  - 이미 Airbnb 설정에 포함되어 있는 라이브러리이다.
- `typescript-eslint`
  - Airbnb 스타일로 설정하는 경우 다른 라이브러리를 사용한다.

그럼 이제 아래와 같은 명령어로 Airbnb 스타일을 설치해준다.

```bash
npx install-peerdeps --dev eslint-config-airbnb
```

이 명령어 한줄이면 Airbnb 스타일에 필요한 라이브러리를 모두 버전 간 충돌 없이 설치해준다. 그리고 `package.json`을 보면 다음과 같은 라이브러리가 함꼐 설치되어 있는 것을 확인할 수 있다.

```json:package.json
"devDependencies": {
  "eslint-config-airbnb": "^19.0.0",
  "eslint-plugin-import": "^2.26.0",
  "eslint-plugin-jsx-a11y": "^6.5.1",
  "eslint-plugin-react": "^7.32.0",
  // 생략...
}
```

여기서 typescript 프로젝트라면 Airbnb 타입스크립트 라이브러리도 함께 설치해주어야 한다.

```bash
npm install eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin@^7.0.0 @typescript-eslint/parser@^7.0.0 --save-dev
```

Airbnb 라이브러리와 Typescript 관련 라이브러리를 모두 설치해주었다면 이제 프로젝트에 설정할 차례이다.

프로젝트의 root에 `.eslintrc.json` 파일을 직접 생성해준다. `npx eslint init` 명령어를 통해 프로젝트에 대한 설정을 해주어도 되는데 나는 이번에는 직접 생성했다.

파일에 들어가서 다음과 같이 설정해주었다.

```json:.eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "extends": [
   "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "plugins": ["react", "@typescript-eslint"],
  "ignorePatterns": [
    "dist",
    "vite.config.ts"
  ]
}
```

이렇게 하면 Airbnb 스타일 설정은 끝난 것이다.

ESLint 스타일 가이드에는 Airbnb 스타일만 있는 것이 아니다. Google도 있고 Mozilla에서 제공하는 스타일도 있다. Google의 경우에는 복잡한 것보다는 보다 간단하고 직관적인 규칙을 적용하고, 변수나 함수 명명에 대한 규칙이 있다고 한다.

Airbnb는 일관성과 품질에 중점을 두어 굉장히 엄격한 규칙을 적용하고 있고, react에 대한 권장 규칙이 많은 스타일 가이드이다. 우리 프로젝트는 React 프로젝트이기 때문에 jsx 규칙을 제공하는 Airbnb가 보다 적합하다고 생각해서 Airbnb를 선택했다.

만약 적용이 이상한 듯 싶다면 창을 다시 reload 해보자!

### 변경한 규칙

만약 Airbnb 스타일 규칙이 너무 까다롭다고 느낀다면 `.eslintrc.json` 파일에 들어가서 직접 규칙을 수정할 수 있다.

```json
{
  // 생략...
  "rules": {
    "react/react-in-jsx-scope": "off", // ✅ import React from "react"를 하지 않아도 된다.
    "react/require-default-props": "off", // ✅ 반드시 props에 대한 기본값을 설정할 필요가 없다.
    "@typescript-eslint/comma-dangle": ["error", "only-multiline"], // ✅ 객체나 배열의 마지막 요소에 쉼표를 여러줄인 경우에만 붙인다.
    "import/extensions": [
      // ✅ import한 파일에 대한 확장자를 붙이지 않는다.
      "error",
      "never",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/order": "off" // ✅ import한 파일에 대한 정렬을 하지 않는다. prettier에서 설정했기 때문에 eslint 설정은 껐다.
  }
}
```

이렇게 prettier과의 충돌이나 타입스크립트 설정간의 충돌로 인해 규칙을 변경해야할수도 있다.

예시로 Prettier에서 import에 대한 정렬을 설정했는데, ESLint의 디폴트 import 정렬값이 있었기 때문에 충돌이 발생해 ESLint에서는 규칙을 꺼주었다.

그리고 타입스크립트 설정에서도 아래와 같은 디폴트 설정이 있었는데,

```json:tsconfig.json
{
  "compilerOptions": {
    // ...
    "allowImportingTsExtensions": true, // ✅ false로 변경
  }
}
```

해당 설정이 `true`로 되어 있다면 타입스크립트 검사에서는 import한 파일의 확장자를 요구할 것이고, ESLint에서는 확장자를 작성하지 말라고 규칙을 작성했기 때문에 확장을 제거해도 추가해도 오류가 난다. (나의 경험담...)😅 따라서 둘다 동일한 규칙으로 작동하도록 false로 변경해주었다.

일단 설정을 해놓고 충돌이 발생했거나 너무 안맞는 규칙이 있다면 이렇게 `rules` 안에서 해결을 해주면 될 것 같다.

## Prettier

ESLint가 코드 스타일을 검사하고 통일시켜주는 도구라면 Prettier는 코드 포맷팅을 자동으로 처리해주는 도구이다. 예를 들어 함수를 작성할 때 선언식으로 작성할지 표현식으로 작성할지 정하는 것이 ESLint라면, 문자열값에 따옴표를 쓸지 홑따옴표를 쓸지 정하는 것이 Prettier이다. 아래 명령어로 설치해주자.

```bash
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

`eslint-config-prettier`와 `eslint-plugin-prettier` 는 ESLint와 Prettier 설정간의 충돌이 날 수 있는데 이를 통합시켜준다.

그리고 프로젝트 루트에 `.prettierrc.json` 파일을 생성한다. 그리고 팀원들간의 합의한 규칙대로 설정을 마친다.

```json:.prettierrc.json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "endOfLine": "lf",
  "arrowParens": "avoid"
}
```

만약 import한 파일들에 대한 정렬도 가능하다.

```bash
npm i @trivago/prettier-plugin-sort-imports --save-dev
```

위의 라이브러리를 설치한 후 설정 파일에 다음과 같이 작성한다.

```json:.prettierrc.json
{
  // 생략
  "plugins": [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  "importOrder": [
    "^react(/.*)?$",
    "^react-router-dom(/.*)?$",
    "^react-dom(/.*)?$",
    "^@tanstack/(.*)$",
    "^@/hooks/(.*)$",
    "^@/services/(.*)$",
    "^@/atoms/(.*)$",
    "^@/utils/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
    "<THIRD_PARTY_MODULES>",
    "^@/layouts/(.*)&",
    "^@/pages/(.*)$",
    "^@/components/(.*)$"
  ],
  "importOrderSeparation": true, // import 구문을 그룹화하고 각 그룹사이에 빈줄 추가 여부
  "importOrderSortSpecifiers": true // import { ... } 중괄호 안에 들어가는 여러가지 변수들의 정렬 여부
}
```

그리고 `.eslintrc.json`에서도 설정할 부분이 있다.

```json
{
  //... 생략
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended" // ✅ 마지막으로 추가해야 해당 설정으로 오버라이딩 된다.
  ],
  "plugins": ["react", "@typescript-eslint", "prettier"] // ✅ 마지막으로 추가해야 해당
}
```

이렇게 추가해서 ESLint와 Prettier가 충돌이 나고 ESLint를 통해 Prettier가 포맷팅되도록 만든다.

### 주요 설정 옵션

Prettier의 몇가지 주요 설정들에 대해 알아보자!

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

## Husky + Lint-Staged

이렇게 코드 규칙들을 설정했더라도 실수로 규칙을 지키지 않은 코드를 커밋하게 될 가능성이 있다. 그렇게 되면 ESLint와 Prettier를 설정한 것이 무색해져 버릴 것이다. 나는 최대한 그런 실수는 줄이고 싶었고, 팀원들에게도 실수에 대한 걱정을 덜어주고 싶었기 때문에 커밋하기 전에 ESlint나 Prettier 규칙상 오류가 없는지 자동으로 검사해주는 도구를 함꼐 적용하고 싶었다. 그리고 그 도구가 바로 Husky였다!

Husky는 커밋하기 전 ESLint와 Prettier 검사의 자동 실행을 도와주는 도구이며, 만약 오류가 발견될 경우 바로 커밋하는 것을 실패처리해버린다. 그래서 개발자는 걱정없이 커밋을 할 수 있게 되는 것이다.

그리고 Lint-Staged는 보통 Husky와 함께 사용되는 라이브러리인데, 커밋할 파일에 대한 검사만 진행하도록 도와주는 도구이다. ESLint와 Prettier는 매번 전체 파일에 대한 검사를 하게 되는데, 이전에 검사를 마쳐서 오류가 없는 파일까지도 반복적으로 검사를 할테니 굉장히 비효율적이게 될 것이다. Lint-Staged는 바로 전체 파일이 대상이 아닌, 커밋할 파일에 대한 검사만 진행하도록 도와준다.

```bash
npm install --save-dev husky
```

```bash
npx husky init
```

이렇게 `init`을 하면 프로젝트 폴더에 pre-commit 폴더가 생성되고 package.json script에 husky 실행어가 생성된다.

나는 올해 나온 버전인 v9를 사용할 것이다. v8과 v9 버전에 많은 차이가 생겨서 처음에 좀 헤맸었는데 훨씬 간편해졌다.

그리고 [Lint-Staged](https://github.com/lint-staged/lint-staged)도 설치해주자!

```bash
npm install --save-dev lint-staged # requires further setup
```

### 커밋 전 ESLint와 Prettier 자동 검사하기

Husky 라이브러리를 설치하고 `init`까지 했다면 프로젝트 루트에 `.husky` 이라는 폴더가 생성되었고 그 안에는 `pre-commit` 이라는 파일이 포함되어 있을 것이다. 여기서 [Git Hooks](https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks)에 대해 알고있다면 Husky와 pre-commit에 대한 더 빠른 이해가 가능하다.

우리는 "커밋 전" 자동 검사를 하고 모두 통과시 커밋을 추가하고, 오류 발생시 커밋을 실패시킬 것이다.

그렇다면 `package.json` 파일에 가서 script에 적절한 명령어들을 작성해준다.

```json:package.json
{
  //...
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .", // ✅
    "lint:fix": "eslint . --fix", // ✅
    "format": "prettier --write .", // ✅
    "prepare": "husky", // ✅
    "postinstall": "husky install", // ✅
    "lint-staged": "lint-staged" // ✅
  },
}
```

그리고 lint-staged를 통해 커밋할 파일들이 어떤 것들을 실행할지 작성해주어야 한다.

```json:package.json
{
  //...
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "prepare": "husky",
    "postinstall": "husky install",
    "lint-staged": "lint-staged"
  },
  "lint-staged": { // ✅ lint-staged 실행
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  },
}
```

lint-staged를 통해 자동으로 ESLint와 Prettier를 검사하도록 명령어를 작성해주었다.

여기서 끝이 아니고, 이 명령어를 `.husky` 폴더 안의 파일에도 작성해주어야 한다. 최종 실행은 Husky에서 하는 것이기 때문이다. `.husky` 폴더 안의 `pre-commit` 파일에 들어가서 아래와 같은 명령어 한줄을 작성해준다.

```bash:.husky/pre-commit
npm run lint-staged
```

그러면 이제 커밋했을 때 에러가 발생한다면

```bash
> lint-staged

✔ Preparing lint-staged...
⚠ Running tasks for staged files...
  ❯ package.json — 5 files
    ❯ *.{js,jsx,ts,tsx} — 4 files
      ✖ eslint --fix [FAILED]
      ◼ prettier --write
↓ Skipped because of errors from tasks.
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ eslint --fix:

17:9  error  'test' is assigned a value but never used  @typescript-eslint/no-unused-vars
0:0  warning  File ignored because of a matching ignore pattern. Use "--no-ignore" to override

✖ 2 problems (1 error, 1 warning)
```

이런식으로 무슨 에러가 발생했는지 뜨고 커밋이 되지 않는다.

### 커밋 컨벤션까지 자동 검사하기

Husky는 위에서 자동으로 ESLint와 Prettier 검사를 실행해주는 것에 더해 [commitlint](https://commitlint.js.org/)라는 라이브러리를 같이 활용하면 손쉽게 커밋 컨벤션까지 검사해줄수 있었다! 너무나 좋은 기능이라고 생각해서 팀원끼리 회의하여 정한 커밋 컨벤션을 바로 적용해보았다.

아래 패키지를 추가로 설치해준다.

```bash
npm install --save-dev @commitlint/{cli,config-conventional}
```

아래 명령어를 통해 commit의 컨벤션 규칙을 작성할 파일을 생성한다.

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

이렇게 되면 프로젝트 루트에 `commitlint.config.js`라는 파일이 생성되었을 것이다.

```js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', ['pascal-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'design',
        'refac',
        'test',
        'chore',
        'comment',
        'remove',
        'rename',
        'build',
        'ci',
      ],
    ],
  },
};
```

나는 다음과 같이 작성해주었다. 각 규칙에 대한 상세한 설명은 [여기](https://commitlint.js.org/reference/rules-configuration.html)에서 확인할 수 있다!

그럼 이제 커밋을 잘못 작성했을 시 아래와 같이 커밋에 실패하게 된다.

```bash
⧗   input: Fix: test commit
✖   type must be lower-case [type-case]
✖   type must be one of [feat, fix, docs, style, design, refac, test, chore, comment, remove, rename, build, ci] [type-enum]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```

예를 들어 커밋 제목으로 `Fix: test commit`이라고 작성했는데, `type`은 소문자로만 작성하도록 정했기 때문에 에러가 발생한 것이다. `fix: test commit` 이라고 작성했다면 성공했을 것이다!

여기까지 프로젝트를 실행하기 앞서 팀원간의 코드 스타일이나 커밋 컨벤션과 같은 규칙을 정하고 초기 세팅을 마쳤다. 특히 개발자의 실수를 덜어주고 자동으로 검사를 실행해주는 Husky를 꼭 사용해보고 싶었는데 이번에 적용해볼 수 있어서 너무 좋았다. 지금까지 써본 결과 확실히 자동화 도구는 인간에게 많은 도움을 주는 것 같다. 실수에 대한 부담이 덜어지니 마음이 편하다 😄

## 참고

[husky](https://typicode.github.io/husky/)  
[lint-staged](https://github.com/lint-staged/lint-staged)  
[commitlint](https://commitlint.js.org/)  
[prettier playground](https://prettier.io/playground/)
[Git Hooks](https://git-scm.com/book/ko/v2/Git%EB%A7%9E%EC%B6%A4-Git-Hooks)
