웹페이지에 자바스크립트가 복잡해지고 리소스가 많아지면서 성능이 좋지 않아진 것을 다들 한번씩 경험해보았을 것이다. 나는 사이드 프로젝트로 림플릭스 영화 사이트를 개발하면서 특히 이 성능 저하를 경험해 보았다. 사실 영화 정보 사이트는 이제 사이드 프로젝트라고 부를 수 없을 정도로 굉장히 흔한 사이트이다😅 하지만 영화 포스터에 따른 많은 이미지 처리와 트레일러 영상, 영화 상세 정보 등등 굉장히 많은 리소스를 필요로 하고, 복잡한 애니메이션도 들어감에 따라 이 프로젝트만큼 성능 최적화가 필요한 프로젝트가 없었던 것 같다. 그래서 해당 프로젝트를 바탕으로 성능 최적화를 해본 경험으로, 성능이 떨어졌을 때 어떻게 성능을 정확히 측정하고 개선해볼 수 있는지에 대해서 정리해보고자 한다.

## 웹 성능 측정 도구

성능 측정 도구로는 3가지가 있다.

- Lighthouse (개발자도구)

  - Lighthouse는 개발자도구에서 측정하는데, 빌드 후 배포된 환경에서 사용해야 더 정확하다. 개발 환경에서 측정하면 정확도가 떨어진다는 의견이 많았다.

- Pagespeed Insights [바로가기](https://pagespeed.web.dev/)

  ![pagespeed insights](/public/images/web/webpage-optimization/web-optimization-1.png)

  구글에서 제공하는 무료 도구로 개발자들이 가장 많이 사용한다고 한다.

## 웹 성능 측정 지표

1. **LCP** (Largest Contentful Paint)

   - 웹페이지에서 **가장 큰 콘텐츠**가 표시되기까지 걸리는 시간

   - **2.5초 이내**에 발생해야 이상적이다.

2. **CLS** Cumulative Layout Shift

   - 웹페이지 로드 중 예상치 못한 레이아웃 변경의 합계를 측정 (레이아웃 안정성)

   - **0.1 이하**여야 이상적이다.

3. **FCP** (First Contentful Paint)

   - 웹페이지에서 **첫번째 콘텐츠**가 화면에 표시되기까지 걸리는 시간

   - **2초 이내**에 발생해야 이상적이다.

4. **FID** (First Input Delay)

   - 웹페이지에서 사용자의 첫번째 상호작용에 대한 응답까지 걸리는 시간

   - **100ms 이내**에 발생해야 이상적이다.

5. **TTI** (Time To Interactive)

   - 웹페이지가 상호 작용 가능한 상태가 되는데 걸리는 시간을 측정

   - **5초 이내**에 TTI가 발생해야 이상적이다

6. **TBT** (Time To Block)

   - 리소스를 다운받으면서 웹페이지 렌더링 과정중에 발생하는 차단 시간을 측정. 차단은 사용자와의 상호 작용을 차단한다는 것을 말한다.

   - **300ms 이하**여야 이상적이다.

## LCP의 저해 요인과 개선 방안

> LCP: Largest Contentful Paint, 최대 콘텐츠풀 페인트
>
> - 처음 진입했을 때 가장 큰 컨텐츠가 뜨기까지의 시간

1. 느린 서버 응답 시간

   - 개선 방안

     ✅ 서버 성능 최적화하기

     ✅ CDN 사용하기

2. 렌더를 막는 자바스크립트 / CSS

   - 개선 방안

     ✅ 파일의 크기가 너무 크니 JS / CSS 최적화하기

     ✅ 우선 사용되는 파일 제외하고는 다운로드 연기 **(defer)**

3. 느린 리소스 로딩 시간

   - 개선 방안

     ✅ 가장 임팩트한 효과를 얻을 수 있음

     ✅ 이미지 최적화(압축, 최신 포맷 사용 등) - API로 이미지를 받아오는 경우 저해상도의 이미지 api로 받아오기

     ✅ 캐싱

     ✅ 우선 사용되는 리소스 preload

## CLS의 저해 요인과 개선 방안

> CLS: Cumulative Layout Shift, 누적 레이아웃 시프트
>
> - 시각적 안정성 측정  
>   레이아웃이 불안정성(갑자기 페이지가 밀린다거나 팝업이 떠서 밀리는 일)이 없을 수록 좋다.

1. 문서 상단에 동적으로 추가되는 엘리먼트

   - 개선 방안

     ✅ 그렇다면 동적으로 움직이는 엘리먼트의 크기의 컨테이너를 미리 만들어주는 것이 좋다.

     ✅ 예시로 사이즈가 지정되지 않은 미디어(이미지, 비디오, iframe)등의 엘리먼트에 미리 width, height 속성 지정해주고 컨테이너에도 지정

## FID의 저해 요인과 개선 방안

> FID: First Input Delay, 최초 입력 지연
>
> - 메인스레드가 빌 때까지 걸리는 시간. 빨리 빌수록 유저에게 빨리 반응.
> - 스크롤, 클릭 이벤트 등등 상호 작용을 측정한다.

1. 메인 스레드를 막는 자바스크립트

   - 개선 방안

     ✅ 연산이 오래걸리는 자바스크립트 작업 쪼개기

     ✅ 자바스크립트 실행 시간 줄이기(코드 최적화, 초기에 사용되지 않는 코드는 다운로드 연기 = defer, code spliting)

     - `build` 시 하나의 자바스크립트 파일(bundle.js)로 합쳐지게 되는데 용량이 굉장히 크다면 느려지게 된다. 그렇기 때문에 파일을 여러개로 쪼개는 code spliting을 함.

       ex. **[React.lazy](https://ko.reactjs.org/docs/code-splitting.html) Suspense로 감싸야 함**

       - 현재 보이지 않는 컴포넌트에 적용
       - `lazy`를 쓰기 좋은 곳은 SPA! 왜냐하면 각 페이지에 레이지하면 첫 화면에서 다른 페이지를 볼 일은 없으니까.
         - 모달창 이미지

     ✅ web worker을 사용해 메인 스레드의 작업 부담 덜기

여기까지 각 지표의 저해 요인과 개선 방안에 대해 작성해보았다. 3가지 지표만 작성한 이유는 이 저해 요인과 개선 방안이 다른 지표에도 공통적으로 적용되는 것이 많기 때문이다. 예를 들어 LCP의 저해요인과 개선방안은 FCP에도 적용된다. 이유는 둘다 웹페이지에 콘텐츠가 뜨는 것과 관련된 사용자 경험에 영향을 미치는 지표이기 때문이다. 이외에도 FID와 TBT는 둘다 사용자와의 상호작용을 중점으로 측정하는 것이기 때문에 둘의 개선 방안은 비슷하다.

&nbsp;

그렇다면 지금까지 웹페이지의 성능 측정 지표에 대해 알아보았고, 개선 방안을 통한 최적화 방법을 알아보았으니 이제 또 다른 웹페이지 최적화 기법에 대해서도 알아보자.

## 로딩 최적화 기법

1. 로딩 최적화 기법

   - Lazy Loading

2. 이벤트 핸들링 최적화

   - Debouncing

   - Throttling

   FID 메인스레드를 잘 비워주기 위한 기법. 두 패턴 모두 어떤 함수가 지나치게 자주 실행되는 것을 제한해 브라우저 성능을 향상시킨다.

### Debouncing

> **함수를 그룹화하여 특정 시간이 지난 후 하나의 함수만 실행**한다. 그러니까 이벤트가 엄청나게 많이 발생해도 특정 시간이 지나지 않으면 마지막 하나만 실행한다.
>
> 예) 100ms보다 짧은 간격으로 실행된 함수는 모두 무시하고, 가장 마지막 함수만 실행한다.

- 대표적인 사용 예시

  input의 `onChange` 함수의 경우 글자가 바뀔 때마다 함수가 실행
  계속 스크롤하다가 250밀리초 이상 지나면 함수 실행

- 코드 예시

  ```jsx
  let debounceTimer;

  const debounce = (callback, time, e) => {
    if (debounceTimer) {
      clearTimer(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      callback(e);
    }, time);
  };

  //... 코드 중략
  <SearchInput
    //...
    onChange={(e) => debounce(() => console.log(e.target.value), 200, e)}
  />;

  // 이 부분은 직접 구현하지 않아도 lodash에서 제공함
  ```

### Throttling

> **특정 주기마다 실행될 수 있는 함수의 실행 횟수를 제한**한다.
>
> 예) 100ms마다 최대 1번만 함수를 실행한다.

- 대표적인 사용 예시

  - 연속적인 상호작용(`scroll`, `resize`등)에 따른 이벤트 처리 무한 스크롤, 진행도 표시
    계속 스크롤 할 때 250밀리초 마다 함수 실행

- 코드 예시

  ```jsx
  let throttlingTimer;

  const throttling = () => {
    if (!throttlingTimer) {
      timer = setTimeout(function (event) {
        timer = null;
        console.log('여기에 input query 요청', event.target.value);
      }, 200);
    }
  };
  // 200밀리초 타이머 설정, 시간 지난 뒤에 스스로 해체, 다시 타이머 설정을 반복
  ```

- 실제 사용 예시: `resize` 이벤트를 훅으로, 2초에 한번씩만 실행

  ```jsx
  import { useEffect, useState } from 'react';

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

    const throttle = (func: () => void, delay: number) => {
      let inProgress = false;
      return () => {
        if (inProgress) return;
        inProgress = true;
        setTimeout(() => {
          func();
          inProgress = false;
        }, delay);
      };
    };

    useEffect(() => {
      const handleResize = throttle(() => {
        setWindowSize({ width: window.innerWidth });
      }, 2000);

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
      windowSize,
    };
  };

  export default useWindowSize;
  ```

### Throttling과 Debouncing의 차이

> Throttling은 정해진 시간마다 **실행되는 것을 보장**하는 한편, Debouncing은 정해진 시간 이내라면 아무리 이벤트가 발생해도 다 무시하고 **마지막 하나만 실행**시킨다.
