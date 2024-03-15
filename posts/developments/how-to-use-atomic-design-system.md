## 먼저, 디자인 시스템부터 짚고 가기!

요즘 프론트엔드 개발에서 무작정 컴포넌트 개발부터 바로 시작하는 경우는 많이 없는 것 같다. 그래도 일단 페이지를 어떻게 구현할 것인지 설계부터 시작하는데, 간단한 프로젝트의 경우 Top ➡️ Down 형식으로, 규모가 많이 큰 프로젝트라면 Bottom ➡️ Up 형식으로 하게 되는 것 같다. Top ➡️ Down 형식은 큰 페이지에서부터 하나하나 분리하여 작은 컴포넌트를 만들지만, Bottom ➡️ Up 형식은 하위 컴포넌트가 독립적으로 동작하여 모듈성을 높이는 방식으로 개발이 된다. 그리고 보통 디자인 시스템은 바로 이 Bottom ➡️ Up 형식에서 많이 사용된다.

권위 있는 UX 컨설팅 기업 Nielsen Norman Group은 디자인 시스템을 이렇게 정의한다고 한다.

> 디자인 시스템은 다양한 페이지와 채널에서 공통의 언어와 시각적 일관성을 이루고, 반복 작업을 줄여 규모에 맞게 디자인을 관리하기 위한 표준 집합이라고 한다.

그러니까 **디자인 시스템이란, 하나의 프로덕트에서 시각적 일관성을 유지하고, 반복 작업을 줄이기 위해 제품을 구성하는 디자인 모듈들을 모아놓아 관리하는 시스템**이라고 이해했다.

디자인이라는 단어가 들어가있기 때문에 보통 디자이너를 위한 시스템이라고 생각할수도 있지만, 이것은 다른 조직 구성원, 특히 프론트엔드 개발자에게도 굉장히 중요한 시스템이다. 디자인의 결과물인 컴포넌트를 구현하고 관리하는 것이 개발자의 몫이 되기 때문이다.

디자인 시스템은 특히 규모가 있는 팀 프로젝트에 굉장히 유용한데, 왜냐하면 사람이 많아지고 시간이 흐르면서, 일관성이 사라지고 규칙이 흐려지는 현상이 생기기 때문이다. 그렇게 되면 중요한 시각적 일관성이 사라져 사용자 경험에 악영향을 줄 수 있다. 다음은 디자인 시스템을 사용함으로써 얻는 장점 4가지이다.

1. 일관성 있는 사용자 경험 (UX Consistency)
2. 다양한 제품에 대응 (Design at Scale)
3. 협업에 기여 (Collaboration)
4. 효율성 확보 (Efficiency)

이렇게 좋은 장점들이 많지만, 정말 중요한 건 디자인 시스템은 정말 꾸준히 모든 구성원들이 참여해 관리하고 발전해야한다는 것이다. 초기에 열심히 시스템을 만들었어도, 관리해주지 않으면 위의 장점을 가져갈 수 없고 오히려 시간 낭비한 꼴이 될 수 있다.

![headless logo](/public/images/developments/how-to-use-atomic-design-system/headlessui-logo.png)

![storybook logo](/public/images/developments/how-to-use-atomic-design-system/storybook-logo.png)

요즘에는 정말 많은 기업에서 디자인 시스템(ex.)을 갖추고 있고, 이를 위한 많은 UI 컴포넌트 라이브러리(ex. [headlessui](https://headlessui.com/))와 디자인 시스템을 도와주는 [StoryBook](https://storybook.js.org/)이 있다. 이렇게 좋은 도구들이 많을 때 한번 디자인 시스템을 도입하는 것도 좋을 것 같다.

## 아토믹 디자인?

아토믹 디자인이란 brad frost가 화학적 관점에서 영감을 받아 만든 디자인 시스템이다. 그래서 이름이 굉장히 화학적인데, atom(원자), molecules(분자), organism(유기체)가 있다. 원자에서 분자, 분자에서 유기체로 간다는 점에서 이 아토믹 디자인이 무엇인지 벌써 조금 유추할 수 있다.

아토믹 디자인은 5단계를 통해 추상적인 가장 간단한 컴포넌트에서 구체화된 페이지에 이르게 된다.

![아토믹 디자인 플로우](/public/images/developments/atomic-design-flow.png)

1. Atoms(원자)
   ![아토믹 디자인 - Atom](/public/images/developments/how-to-use-atomic-design-system/atoms-form-elements.png)

   - 더 이상 분해할 수 없는 기본 컴포넌트.
   - button, input, label과 같은 보통 기본 HTML element 태그
   - 컬러 팔레트, 애니메이션, 폰트와 같은 추상적인 요소도 포함될 수 있다.

---

2. Molecules(분자)
   ![아토믹 디자인 - Molecules](/public/images/developments/how-to-use-atomic-design-system/molecule-search-form.png)

   - 여러개의 atom을 결합한다.
   - button의 경우 form까지 이루어진 한 덩어리의 요소로 말할 수 있다.
   - SRP(Single Responsibility Principle)원칙에 따라 한가지 일을 해야 한다.

---

3. Organisms(유기체)
   ![아토믹 디자인 - Organisms](/public/images/developments/how-to-use-atomic-design-system/organism-header.png)

   - Molecules 포함해 보다 더 복잡한 컨텍스트를 가지는 영역
   - 특정 컨텍스트를 갖기 때문에 여기서부터 재사용성이 낮아진다.

---

4. Templates(템플릿)
   ![아토믹 디자인 - Templates](/public/images/developments/how-to-use-atomic-design-system/template.png)

   - 여러개의 organism, molecule로 구성된다.
   - 페이지의 레아이웃을 잡는 와이어 프레임으로 안에 컨텐츠가 없다고 생각하면 된다.

---

5. Pages(페이지)
   ![아토믹 디자인 - Pages](/public/images/developments/how-to-use-atomic-design-system/page.png)

   - 실제 유저가 보는 화면
   - template에 콘텐츠를 담아 여러 화면을 나타낼 수 있다.

가장 추상적인 Atom 원자에서 하나의 구체화된 페이지로 이르게 되는 것이다.

## 아토믹 디자인 적용시 컴포넌트 분류의 어려움

Brad frost는 꼭 단계별로 컴포넌트가 나아가야한다고 하지 않는다. 그저 명확한 기준을 잡고 컴포넌트를 분류하기만 하면 된다는 것이다. 하지만 이 단위를 나누는 기준이 굉장히 주관적이라서 팀 프로젝트인 경우 팀원들간 이 주관을 맞추는 의사소통을 많이 해야되겠다는 생각이 들었다.

사실 혼자 아토믹 디자인 패턴은 몇번 적용해봤는데, 정말 명확한 기준을 잡고 컴포넌트를 잘 분리하는 사람이라면 정말 잘 맞겠다고 생각했다. 아직은 실력이 부족한지라 개발을 하다보면 꼭 아토믹 디자인 분류에 조금 애매한 느낌의 컴포넌트들이 생겼다. 특히 molecules와 organism 사이, organism과 template 사이가 그랬다. 그렇지만 정말 좋은 디자인 패턴이라고 생각하고, 다른 팀에서는 보통 어떤 기준으로 컴포넌트 단위들을 분류하는지 궁금해서 이 포스트를 작성하게 된 이유가 크다.

자료를 찾다가 카카오 기술 블로그에서 작성한 아토믹 디자인 포스트를 보게 되었는데, 굉장히 도움이 많이 됐다. 카카오 페이지 웹에서도 아토믹 디자인 활용하여 디자인 시스템을 구축하고 있는데, 가장 헷갈렸던 Molecule과 Organism을 나누는 기준점으로 **컨텍스트가 있느냐 없느냐**에 따라 분류한다고 한다.

| Molecules로 분류 | Organisms으로 분류 |
| ---------------- | ------------------ |
| Input            | CommentInput       |
| TextBadge        | Comment            |

예를 들어 Input이라는 컴포넌트가 있다면, 이것은 Molecules로 분류된다. 하지만 CommentInput이라는 이름의 Comment라는 컨텍스트가 들어간 Input이라면 이것은 Organisms으로 분류한다고 한다.

이 부분을 읽으니 좀더 분류하는 기준이 명확해진 느낌이었고, 좀 더 아토믹 디자인을 이해할 수 있었다.

---

아토믹 디자인에서, 특히 팀 프로젝트라면 무엇보다 중요한 건 각각의 단위에 대해 어떤 기준을 갖고 분류할 것인지를 잘 상의해야한다는 점을 느낀다. 카카오팀에서는 어떤 기준을 갖고 분류하는지 알 수 있어서 좋았다.

#### 참고

[디자인 시스템이란 무엇인가](https://devocean.sk.com/blog/techBoardDetail.do?ID=163710)  
[사진 출처 - Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/#the-part-and-the-whole)  
[카카오 기술블로그 - 아토믹 디자인을 활용한 디자인 시스템 도입기](https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/)
