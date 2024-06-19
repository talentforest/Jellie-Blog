# 📑 Jellie Blog

### 📍 프로젝트 소개

> **Next.js 13**으로 만들어본 정적 블로그 사이트입니다.
> 저에게 맞는 편리한 UI와 기능들을 직접 커스텀해보았습니다. 이전에 작성한 포스트들을 현재 만든 블로그로 옮기고, 앞으로 좋은 포스트들을 추가할 예정입니다.
>
> [https://jellieblog.dev/](https://jellieblog.dev/)
> 

<img src="https://github.com/talentforest/Jellie-Blog/assets/91457443/f161ecea-fd77-4c06-829c-a1fae5a2dcc0" alt="젤리블로그 홈화면 다크모드" width="600px" />
<img src="https://github.com/talentforest/Jellie-Blog/assets/91457443/dd5e3762-83dd-400b-bdc6-fef9a3ba1488" alt="젤리블로그 홈화면 라이트모드" width="600px" />

### 📍 프로젝트에 사용한 스택

<div>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/next.js-fff?style=for-the-badge&logo=next.js&logoColor=black">
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white">
</div>

> #### Next.js를 선택한 이유
>
> 처음에 정적 사이트를 만들기 위해 Gatsby와 Next.js 둘 사이에서 고민을 하다가, Next.js를 선택했습니다. 이전에 여러번 써본 Next.js를 선택한 이유는 13 버전을 사용해보고 싶었기 때문입니다. 만약 13 버전이 안나왔다면 Gatsby를 선택했을 것 같습니다. 그리고 써본 후기는 더 복잡해졌지만 더 만족스러워졌다는 것입니다. 더 자세한 내용은 아래 프로젝트 후기에서 확인할 수 있습니다.

### 📍 프로젝트 기능

<div>
  <img src="https://github.com/talentforest/Jellie-Blog/assets/91457443/d6e635c4-4b49-4d1f-84d5-7279cb89cfd1" alt="블로그 포스트 목차" />
  <img src="https://github.com/talentforest/Jellie-Blog/assets/91457443/5c9a2599-d49e-4d1e-9f22-16810dd95f53" alt="카테고리" />
  <img src="https://github.com/talentforest/Jellie-Blog/assets/91457443/dc511c1a-d7b1-460c-826d-07b5e6756c49" alt="포스트 헤더" />
</div>

| 기능               | 설명                                                             |
| ------------------ | ---------------------------------------------------------------- |
| 다크모드           | 시스템 기본 설정을 디폴트로 다크모드 버튼 지원                                               |
| 카테고리별 포스트  | 카테고리 항목별로 포스트 분류하기                                |
| 선별 포스트      | 모든 포스트 중 보여주고 싶은 포스트를 선별하여 리스트로 보여주기 |
| 이전과 다음 포스트 | 포스트를 보여주는 페이지에서 하단에 이전과 다음 포스트 보여주기  |
| 목차               | 포스트의 목차                                                    |
| 현재 스크롤 위치          | 현재 나의 스크롤 위치를 퍼센테이지로 가로 진행바에서 보여주기      |
| 댓글 | Giscus를 이용하여 댓글 기능 구현 |
| PWA | 웹앱 설정  |

### 📍 프로젝트 후기

일단 먼저 저만의 블로그를 만들었다는 점에서 굉장히 뿌듯합니다. 앞으로 저에게 더욱 도움이 되는 블로그로 만들어보고자 합니다 🚀
블로그를 만들면서 가장 신경썼던 건 글을 읽는 독자가 글을 읽으며 높은 사용자 경험을 얻을 수 있도록 신경썼던 것 같습니다. 물론 제가 저의 공부를 위해 글을 쓰는 공간이지만 그 글을 보는 독자도 편하게 글을 볼 수 있는 공간이었으면 했습니다.

이를 위해서
1. 현재 나의 스크롤 위치가 어디인지 가로 진행바 퍼센테이지로 보여주는 기능
2. 목차를 만들어 해당 목차로 바로 이동할 수 있는 기능
3. 해당 문서를 읽는 데 몇분 걸리는지 알려주는 기능
4. PWA로 만들어 모바일에서 웹앱으로 더 편하게 볼 수 있는 기능
을 구현했던 것 같습니다.

그 결과로 100%는 아니어도 꽤 마음에 드는 결과물이 나왔습니다. 앞으로도 성장을 위해 좋은 글들을 많이 올릴 예정입니다! 

#### 처음 사용해본 Next.js 13 버전 개인적인 후기

새로 나온 Next.js 13 버전을 사용해봤는데요. React Server Component의 도입 이후 앞으로의 Next.js의 방향성을 알 수 있었습니다. 13 버전에서는 한 페이지 내에서 서버 컴포넌트와 클라이언트 컴포넌트를 분리하여 더 복잡해졌지만 아래와 같은 이유로 더 편리하기도 했습니다.
    
1. 먼저 클라이언트에서 API 요청을 하지 않아도 된다는 점입니다.
   클라이언트에서 요청할 필요가 없으니 코드가 더 적어졌지만 서버에서 모두 수행되어 같은 화면을 보여줄 수 있었습니다.
2. 오히려 컴포넌트를 나누기 더 쉽기도 했습니다.
   페이지의 어떤 부분을 서버 컴포넌트로 만들것인지, 어떤 부분을 꼭 클라이언트 컴포넌트로 만들어야 하는지로 생각하다보니 오히려 더 컴포넌트를 쉽게 나눌 수 있었던 것 같습니다.
3. 자동 React.lazy 적용
   서버 컴포넌트에 import된 클라이언트 컴포넌트는 모두 Code splitting 되어 자동으로 React.lazy이 적용되어 작성하지 않아도 되어서 굉장히 편했습니다.
    
아직 13.2.4 버전에서 app폴더 내에서의 404.js 파일이 지원되지 않고, 서버 컴포넌트의 async 적용과 타입스크립트 간에 충돌이 있는 등 안정되지 않는 부분들이 있지만 굉장히 만족스럽습니다!
