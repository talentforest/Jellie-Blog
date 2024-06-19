## 웹 접근성(Web Accessibility)이란?

어느 블로그 글에서 모든 사람이 웹사이트에서 동일한 정보를 얻지 못하며 정보의 격차가 생기고 있다는 내용을 읽고 웹 접근성이라는 개념에 대해 관심이 생겼다. 웹을 공부하기 이전에는 정보의 접근성이라는 개념에 대해 생각해보지 못했는데 생각해보니 모든 사람들이 웹사이트를 쉽게 접근하고 이용하는 것은 아니었다. 몸이 불편한 장애인, 시각 장애인 등을 비롯하여 나이가 들면 들수록 인터넷을 이용하기 어려워진다.

웹 접근성은 모든 사람들이 어려움없이 웹에 접근하여 정보를 얻고 이용할 수 있어야 한다는 개념이다. 그렇게 하기 위해 여러가지 상황에 있는 사람들을 고려하여 그 사용성을 향상시키기 위해 고민하는 것이다.

### 웹 접근성은 중요할까?

먼저 웹 접근성은 왜 중요한지부터 생각해보았다. 가장 먼저 웹 접근성이 중요한 이유는 장애를 가진 사람들에게도 정보에 공평하게 접근하고 참여할 수 있는 기회를 제공하기 때문이다. 좋은 사회란 약자도 사회에 참여할 기회가 있는 사회이다. 그리고 여기서 더 나아가 약자를 배려하는 사회는 곧 일반적인 사람들의 편리함까지 향상하는 결과를 낸다. 예를 들어 ㄱ자로 구부러지는 빨대는 병상에 누워있는 환자들이 액체를 쏟지 않고 마시기 위해 만들어졌는데, 이게 확대되어 이제는 일반 사람들까지도 사용하고 있다. 이러한 맥락에서 많은 상황을 고려해 만들어진 웹페이지는 약자 뿐만 아니라 모든 사용자에게 더욱 향상된 사용자 경험을 제공할 것이다.

## 웹 접근성 가이드라인

그렇다면 웹 접근성에 대한 가이드라인이 있을까? 당연히 국제적으로 존재한다. W3C의 웹 접근성 표준 그룹에서 **웹 콘텐츠 접근성 지침**(WCAG)을 작성했고 이를 권장하고 있다.

### WCAG(Web Content Accessibility Guidelines)

WCAG는 웹 콘텐츠의 접근성을 향상시키기 위한 권장 사항과 지침들을 제공하며 가장 널리 사용되는 국제 표준이다. WCAG는 네가지 주요 원칙(인식 가능성, 운용 가능성, 이해 가능성, 견고성)에 주요 기반을 두고 있고 각 지침은 테스트가 가능한 성공 기준이 있다. 현재 2024년 5월 28일에 아주 따끈따끈한 [3.0 버전](https://www.w3.org/TR/wcag-3.0/)이 나온 것 같다.

### KWCAG(한국형 웹 콘텐츠 접근성 지침)

이 부분은 현재 우리나라의 웹 접근성 지침은 궁금해서 따로 찾아본 정보이다. KWCAG는 한국형 웹 콘텐츠 접근성 지침을 의미하며, WCAG가 국제 표준이라면 KWCAG는 국내 표준이다. 작년에 정보접근성 기술협력 컨퍼런스에서 한국시각장애인연합회가 한국형 웹 콘텐츠 접근성 지침 2.2 버전에 대해 발표했다고 한다.

새로운 웹 접근성 지침들을 통해 한국의 웹 접근성은 어떤 방향으로 가고 있는지 간단히 살펴보았다.

1. 단일 문자 단축키

   단일 문자 단축키를 제공했을 때 사용자가 **의도치 않게 문자 단축기가 작동되는 것을 방지**하기 위한 지침이다. 따라서 단일 문자 단축키를 사용하지 않거나 재설정있는 옵션을 제공하거나 해당 영역에 초점이 가 있을 경우에만 활성화될 것을 권장한다. 이 지침은 키보드보다도 음성 입력을 위한 지침이다.

2. 고정된 참조 위치 정보

   **전자출판문서** 형식의 웹페이지는 각 페이지로 이동할 수 있는 기능이 있어야 하고, 서식이나 플랫폼에 상관없이 참조 위치 정보를 일관되게 제공하고 유지해야한다.

3. 단일 포인터 입력 지원

   터치스크린이나 마우스 같은 단일 포인터 장치를 사용하여 모든 기능을 이용할 수 있어야 한다. 예를 들어 모바일 기기에서 두 손가락으로 터치하는 핀칭인 확대/축소 기능이 있는데, 그렇다면 버튼 형식으로 만들어 **한번만 터치해도 작동**하도록 만들어야 한다.

4. 포인터 입력 취소

   **단일 포인터 입력을 잘못한 경우 취소할 수 있는 기능**을 제공해야 한다. 예를 들어 어떤 버튼을 잘못 눌렀을 때 click로 실행된다면 바로 실행되지만 keyup일 때 실행하면 버튼을 누르고 드래그하면서 빠져서 떼면 실행되지 않는다. 아니면 되돌리기 기능을 제공하는 방법도 있다고 한다.

5. 레이블과 네임

   **모든 인터페이스 요소에서는 명확한 레이블과 이름**이 있어야 하며, 스크린 리더와 같은 보조 기술이 이를 인식하고 사용자에게 전달할 수 있어야 한다.

   레이블과 네임의 의미는 **텍스트나 텍스트 대체 수단이 있는 구성 요소**로 동일하다. 하지만 이부분에서 차이가 있다.

   - 레이블: 모든 사용자가 볼 수 있다.
   - 네임: 숨겨 있을 수 있으며 보조 기술에 의해서만 노출된다.

   시각 장애인을 위한 중요한 접근 요소로 레이블을 모두 작성해야 한다.

6. 동작기반 작동

   동작기반 작동이란 기기를 흔들거나 기울게 만든다거나 어떤 특정 동작으로 작동하는 것을 뜻한다. 동작 기반으로 작동하는 기능은 사용자 인터페이스 구성요소로 조작할 수 있고 동작 기반 기능 비활성화 모드를 제공해야 한다.

7. 찾기 쉬운 도움 정보

   사용자가 필요할 때 쉽게 접근할 수 있는 도움말 정보나 지원 정보를 제공해야한다. 예를 들어 Footer에 제공되는 기업 정보가 있다.

8. 접근 가능한 인증

   인증과정은 인지 기능 테스트에만 의존해서는 안되며 눈으로 확인하거나 기억하지 않고도 인증이 가능하도록 제공해야한다. 예를 들어 안면 인증, 생체 인증, 공인인증서 등이 있다.

9. 반복 입력 정보

   사용자가 반복적으로 입력해야 하는 정보는 자동 입력 또는 선택 입력할 수 있어야 한다. 예를 들어 전화번호를 여러번 작성해야하는 경우 "기존 정보와 동일" 같은 버튼을 눌러 자동입력이 될 수 있도록 만들 수 있다. 아니면 autocomplete 속성을 사용한다.

내용들을 살펴보니 확실히 장애가 있는 사람뿐만 아니라 일반적인 사람들에게도 도움이 되는 내용이 많았다. 특히 **포인터 입력 취소**나 **접근 가능한 인증**, **반복 입력 정보**는 비단 장애인들에게만 편의적인 내용이 아니다. 이 지침들을 보고 웹 접근성의 중요성에 대해 더욱 실감할 수 있었다.

## 어떻게 웹 접근성을 높일 수 있을까?

지금까지 지침들을 살펴보았다면 이제 실제적으로 어떤 방법으로 웹 접근성을 높일 수 있을까?

### ARIA(Accessible Rich Internet Application)

ARIA는 장애를 가진 사용자가 웹 콘텐츠에 더 쉽게 접근할 수 있는 방법을 정의하는 여러 특성을 뜻한다. ARIA는 스크린 리더와 같은 보조 기술이 알 수 없는 상호작용이나 위젯에 필요한 정보를 제공한다. 예를 들어 폼 제출시 실패에 대한 힌트 및 오류 메시지, 모달창 등이 있다.

그러나 MDN에 따르면 이제 많은 위젯들은 유의미한 태그를 가진 HTML5로 통합되었기 때문에 적절한 HTML 태그가 있다면 ARIA보다 HTML를 우선적으로 사용해야 한다고 한다. ARIA는 HTML5의 시멘틱 태그가 지원하지 않는 동적 콘텐츠 요소에 ARIA 속성을 사용하면 된다.

[MDN:ARIA](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA)

예를 들어 탭을 커스텀하여 동적 콘텐츠 요소로 만들었다고 해보자. 탭은 따로 HTML5의 태그로 존재하지 않기 때문에 ARIA 요소인 `role` 속성을 사용하여 탭이라는 역할이라고 보조 기술에게 설명해줄 수 있다.

```html
<!-- ✅tablist라는 role 부여 -->
<ol role="tablist">
  <li id="ch1Tab" role="tab">
    <a href="#ch1Panel">Chapter 1</a>
  </li>
  <li id="ch2Tab" role="tab">
    <a href="#ch2Panel">Chapter 2</a>
  </li>
  <li id="quizTab" role="tab">
    <a href="#quizPanel">Quiz</a>
  </li>
</ol>

<div>
  <!-- ✅tabpanel라는 role 부여 -->
  <div id="ch1Panel" role="tabpanel" aria-labelledby="ch1Tab">
    Chapter 1 content goes here
  </div>
  <div id="ch2Panel" role="tabpanel" aria-labelledby="ch2Tab">
    Chapter 2 content goes here
  </div>
  <div id="quizPanel" role="tabpanel" aria-labelledby="quizTab">
    Quiz content goes here
  </div>
</div>
```

[ARIA 소개](https://developer.mozilla.org/en-US/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets)

또한 예를 들어 시각 장애인이 로그인 폼을 제출하려는 상황이었다고 가정해보자. 그리고 로그인 버튼을 눌렀는데 스크린 리더에서는 아무 반응이 없다. 시각 장애인은 계속 로그인 버튼을 눌러보지만 반응이 없고 로그인을 할 수 없게 된다. 화면을 보니 이메일 형식이 틀려서 아래에 오류 메시지가 안내되어 있었던 것이다.

그런 경우에도 ARIA의 role 속성을 통해 간단히 해결할 수 있다.

```html
<!-- 오류 메시지 안내 -->
<div role="alert">이메일 형식이 올바르지 않습니다.</div>
```

위의 코드가 이 속성이 로그인 버튼을 눌렀을 때 나타난다면 role="alert" 속성이 있기 때문에 스크린 리더는 바로 알려줄 수 있을 것이다.

HTML5의 시멘틱 태그를 우선 사용하고 좀 더 정보를 보완할 수 있다면 ARIA 속성을 활용하면 된다.

### HTML 구조와 시멘틱 태그

HTML 구조가 잘 짜여져 있고 태그가 시멘틱할수록 스크린 리더는 웹페이지의 정보를 더욱 파악하고 사용자에게 전달한다. 예를 들어 시멘틱 태그로 `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` 등을 있는데 이를 잘 사용하여 페이지의 구조를 명확히 하면 접근성이 크게 향상된다.

또한 전체적인 구조 이외에도 헤딩 구조를 잘 적용하는 것이 좋다. 글의 제목에는 `<h1>`, 소제목에는 `<h2>`, 더 하위의 제목에는 `<h3>`, `<h4>` 등 이렇게 글의 구조를 나타내면 스크린 리더가 사용자에게 더욱 논리적으로 글을 전달하는 데 도움을 준다.

그리고 이렇게 하면 덤으로 SEO도 최적화된다👍

### 키보드 네비게이션

1. 스킵 네비게이션

웹사이트가 키보드만으로 네비게이션이 가능하도록 만드는 방법이다. 시각 장애인의 경우 전적으로 스크린 리더에 의존해야 하기 때문에 본문으로 바로 넘어가 읽고 싶어도 그 앞의 header 같은 영역을 다 읽을 때까지 기다릴 수 밖에 없다. 이 부분의 접근성과 사용자 경험을 향상 시키기 위해 스킵 네비게이션을 활용할 수 있다.

```html
<body>
  <div>
    <!-- Skip Navigation -->
    <a href="#content">메인 컨텐츠 바로가기</a>
  </div>

  <header>
    <nav>
      <ul>
        <li>
          <a href="#">MENU</a>
        </li>
        <li>
          <a href="#">STORE</a>
        </li>
        <li>
          <a href="#">CONTACT</a>
        </li>
      </ul>
    </nav>
  </header>

  <!-- Skip Navigation -->
  <main id="content">
    <section id="home">...</section>
    <section id="mainLogin">...</section>
    <section id="mainShopping">...</section>
    <section id="mainShopping">...</section>
    <section id="mainNotice">...</section>
  </main>

  <footer id="footer">...</footer>
</body>
```

이전에 목차를 만들면서 a태그의 책갈피 기능을 이용해봤는데 a태그를 이용해 skip links을 만들수 있다는 것은 이번에 처음 알았다. "메인 컨텐츠 바로가기"와 같은 a태그를 만들고 `href` 속성에 `#content`을 부여해주면 된다. 그리고 바로가기를 클릭하면 이동될 부분인 `<main>` 태그에 `id` 속성에 `content`를 작성해주면 된다.

2. tabindex 속성

`tabindex`는 HTML 속성으로, 요소가 키보드 포커스를 받을 수 있는지, 그리고 탭 키를 눌렀을 때 포커스 이동 순서를 제어한다. `tabindex`는 다음과 같은 값을 가진다.

- `tabindex="0"`

  요소를 자연스러운 탭 순서에 포함시킨다. 일반적인 문서 흐름에 따라 요소가 포커스를 받을 수 있다.

- `tabindex="-1"`

  요소를 탭 순서에서 제외하지만, focus를 받을 순 있다. 포커스를 이동시킬 때 사용한다.

- `tabindex="1"` 이상의 값

  포커스 이동 순서를 명시적으로 정의한다. 작은 값일수록 먼저 포커스를 받습니다. 하지만 이 방식은 관리가 어려워 문서의 자연스러운 탭 순서에 맞추어 `tabindex="0"`을 사용하는 것을 권장한다.

```html
<div tabindex="0">자연스러운 탭 순서에 포함된 요소</div>
<div tabindex="-1">탭으로 접근할 수 없지만 스크립트로 포커스 이동 가능</div>
<div tabindex="1">포커스 순서가 명시적으로 설정된 요소 (비권장)</div>
<input tabindex="-1" type="text" /> // 이 경우 탭으로 접근할 수 없게 된다.
```

[MDN:tabindex](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/tabindex)

3. focus 속성

`focus` 속성은 다음 요소에 자동으로 부여된다.

- `<a>`: href 속성이 있는 경우
- `<button>`
- `<input>`, `<select>`, `<textarea>`
- `tabindex` 속성이 있는 기타 모든 요소

이 요소에는 `focus` 속성을 적용해 시각적으로 강조시킬 수 있다.

위의 키보드로 접근성을 높이는 방법 세가지는 이번에 처음 제대로 알았는데 굉장히 유용한 기술이라고 생각했다. 위의 기술들은 접근성 향상에 굉장한 도움이 되는 기술인 것 같고 알아두면 좋을 것 같다.

### 이미지와 미디어 접근성

1. `<image>`에 alt text 작성, 캡션

`<image>`에 alt text를 작성하는 부분은 굉장히 잘 알려져 있고 기본적인 부분이다. 말그대로 이미지를 대신할 대체 텍스트임에도 제대로 작성하지 않고 대충 작성하는 경우가 많다. 이 부분도 웹 접근성을 향상하는 데에 많은 기여를 하기 때문에 정말로 이미지를 설명하는, 제대로 된 텍스트로 작성할 필요가 있다.

그러나 반대로 alt 텍스트를 작성하지 말아야한 이미지도 있다. 정보성이 아닌, 정말로 시각적 장식만을 위한 이미지는 빈 alt로 만들어 스크린 리더가 이를 무시하도록 만들면 된다.

```html
<img src="decorative.jpg" alt="" />
```

아니면 이미지가 정말 중요한 정보인 경우 모든 사용자가 이를 알 수 있도록 <figure>과 <figcaption> 태그를 이용해 캡션을 달 수도 있다.

```html
<figure>
  <img src="example.jpg" alt="자바스크립트의 동작 방식을 나타내는 이미지" />
  <figcaption>이 이미지는 자바스크립트의 동작 방식을 설명합니다.</figcaption>
</figure>
```

### 색상과 대비

웹 접근성에서 색깔 구분에 어려움을 겪는 사람들을 위해 색상이나 대비도 아주 중요한 고려 사항 중 하나이다. WCAG에서는 다음과 같은 최소 대비 비율을 권장한다.

- 일반 텍스트: 최소 4.5:1
- 큰 텍스트: 최소 3:1 (18pt 이상의 텍스트 또는 14pt의 볼드 텍스트)
- 사용자 인터페이스 컴포넌트: 최소 3:1

색상과 대비가 잘 이루어졌는지는 [Accessible Colors](https://accessible-colors.com/), [Contrast Ratio
](https://www.siegemedia.com/contrast-ratio)에서 확인해볼 수 있다. 또한 LightHouse로 검사를 해보면 색상과 대비가 적절하게 이루어졌는지를 알려준다.

따라서 충분히 색상 대비가 되는지, 색상만으로 정보를 지원하고 있지는 않은지, 색상과 함께 다른 정보를 함께 충분히 제공하고 있는지를 생각해보아야한다.

### 폼

폼의 모든 요소들은 명확하고 일관된 레이블을 갖고 있어야 한다. 레이블은 사용자가 해당 입력 필드가 무엇을 위한 필드인지 이해할 수 있도록 만들어준다.

```html
<form>
  <label for="name">이름:</label>
  <input type="text" id="name" name="name" />

  <label for="email">이메일:</label>
  <input type="email" id="email" name="email" />

  <button type="submit">제출</button>
</form>
```

`<label>`의 `for` 속성과 `<input>`의 `id`는 서로 연결되어 스크린 리더가 레이블을 통해 해당 입력 필드가 무엇인지 사용자에게 잘 전달할 수 있게 된다.

### 인터랙티브 요소

ARIA 속성을 사용하여 인터렉티브 요소인 드롭다운 메뉴나 모달창 등의 접근성을 높인다.

```html
<button aria-haspopup="true" aria-expanded="false" id="dropdownButton">
  메뉴
</button>
<!-- ✅ role="menu" -->
<ul id="dropdownMenu" role="menu" hidden>
  <!-- ✅ role="menuitem" -->
  <li role="menuitem"><a href="#item1">항목 1</a></li>
  <li role="menuitem"><a href="#item2">항목 2</a></li>
  <li role="menuitem"><a href="#item3">항목 3</a></li>
</ul>

<script>
  const dropdownButton = document.getElementById('dropdownButton');
  const dropdownMenu = document.getElementById('dropdownMenu');

  dropdownButton.addEventListener('click', function () {
    const expanded = dropdownButton.getAttribute('aria-expanded') === 'true';
    dropdownButton.setAttribute('aria-expanded', !expanded);
    dropdownMenu.hidden = expanded;
  });
</script>
```

버튼 클릭 시 드롭다운 메뉴가 표시되도록 하고, `aria-haspopup`, `aria-expanded`, `role="menu"`, `role="menuitem"` 속성을 사용하여 보조 기술이 요소의 역할과 상태를 인식할 수 있도록 만든다.

## 정리

지금까지 웹 접근성이란 무엇인지, 또한 웹 접근성을 어떻게 높일 수 있는지에 대해 알아보았다. 특히 웹 접근성을 높이는 방법들은 실무에서도 굉장히 유용한 내용들이었던 것 같다.

포스트를 작성하면서 웹 접근성은 장애인들의 정보 접근성을 높이기 위한 것이지만 또 우리를 위한 것이라는 생각이 들었다. 우리 모두는 나이를 먹어가고, 그리고 나이가 들수록 시각적인 능력과 신체적인 능력은 퇴화하기 마련이다. 웹 접근성은 이러한 노인들을 위한 상황까지도 고려해 만들어질 수 있다. 따라서 나는 웹 접근성이 장애인들만을 위한 것이 아니라 정말 **모든 사람**들을 위한 것이라는 생각이 들었다.

## 참고

- 블로그

  [KWCAG 2.2 변경 사항 개요](https://mulder21c.io/understanding-kwcag-22-changes-intro/)  
  [(번역) 예상치 못한 접근성 팁 소개](https://velog.io/@sehyunny/unexpected-a11y-tips)

- 영상

  [한국형 웹 콘텐츠 접근성 지침 2.2 추가 항목 9가지 둘러보기 - KWCAG 2.2](https://youtu.be/ilL5_35FIZ0?si=ZdddJqPRLwTjjaRn)  
  [[A2] 모두를 위한 모바일웹: 접근성을 준수해서 스크린리더 UX 개선하기](https://www.youtube.com/watch?v=tKj3xsXy9KM)  
  [[10분 테코톡] 🐭 미키의 웹 접근성 & 표준](https://www.youtube.com/watch?v=xToJhmAJYCE)
  [[10분 테코톡] 블링의 웹 접근성](https://www.youtube.com/watch?v=yLZZi5E7NTU)
