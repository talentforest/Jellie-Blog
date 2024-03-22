## 림플릭스 프로젝트에서 어떤 걸 했나?

![림플릭스 영화 정보 사이트 이미지](/public/images/side-projects/rimflix.png)

글은 예전에 썼는데 해당 블로그로 글들을 이전하면서 림플릭스 웹페이지 이미지는 최근 사진으로 다시 가져와봤다😆

림플릭스 프로젝트는 영화 정보 웹사이트다. 노마드코더에서 제공하는 React 챌린지를 통해 만들었는데, 정말 누구나 React를 공부하면서 한번씩은 만드는 영화 사이트가 아닐까 싶다.😅 정말 너무나 흔한 프로젝트이긴 하지만 많은 것들을 생각해보고 공부하며 배워갈 수 있었기 때문에 좋아했던 프로젝트다.

단순히 영화 정보를 보여주는 것 이외에도 CGV에서 제공하는 서비스인 포토카드가 떠올라 **포토카드**를 만들어볼 수 있는 페이지를 만들어보고, **여러가지 애니메이션**을 적용해보려고 했고, 또 배포 이후에는 웹 성능을 실제로 측정하고 **성능 최적화**를 적용해보았다는 점에서 공부를 많이 했던 프로젝트였다.

그리고 이 포스트에서는 성능 최적화를 했던 경험에 대해 작성해보려고 한다.

성능 최적화를 해야한다고 느낀 건 개발을 마치고 배포하고 난 후 였다. 배포 후 웹사이트에 들어가보니 애니메이션이 버벅되고 이미지가 느리게 떠서 사용자 경험이 좋지 못하다고 느꼈다. 엄청 느렸던 건 아니지만 그렇다고 빠른 것도 아니었다. 그 이유로는 3가지로 추측되었다.

- 반응형웹
- 너무 많은 리소스 요청
  - 영화 이미지, 트레일러 영상 등등
  - 심지어 반응형 이미지로 모바일 이미지, 데스크탑 이미지가 다르다.
- 많은 애니메이션

개발을 진행하면서 웹페이지에 생각보다도 훨씬 많은 이미지와 비디오가 들어갔는데, 심지어 **반응형** 웹으로 반응형 이미지를 적용하고, 또 많은 애니메이션이 들어갔기 때문에 페이지가 버벅이는 것을 확인할 수 있었다. 챌린지를 하는 동안에는 성능에 대해 생각할 시간이 없었는데, 챌린지를 마치고 나서 계속 속도가 느리다는 점이 마음에 걸렸고 이를 개선해야겠다는 생각을 하게 되었다.

추가로 성능 개선과 더불어 반응형 웹인만큼, 이번 기회에 데스크탑에서는 **마우스 이벤트**, 반응형 모바일에서는 **터치 이벤트**로 구분해서 사용자 경험을 더 좋게 만들 수 있을 것 같다는 생각이 들어 적용해보고자 했다.

> 요약하면, 챌린지를 마친 후 다시 아래의 두 가지를 진행해보았다.
>
> - 성능 최적화를 통한 웹 성능 개선
> - 특히 반응형 모바일에서 터치 이벤트를 통한 사용자경험(UX) 개선

## 성능 최적화 측정과 시도

개발을 위해 사용한 웹 성능 측정 사이트는 **Google Lighthouse**다.

- Desktop 성능 최적화 전

  ![데스크탑 성능 최적화 이전](/public/images/side-projects/rimflix-optimization/performance-1.png)

- Mobile 성능 최적화 전

  ![모바일 성능 최적화 이전](/public/images/side-projects/rimflix-optimization/performance-2.png)

성능 최적화를 하기전 Lighthouse로 측정한 Desktop 성능은 **56점**이었다. Mobile 성능은 **29점**으로 더욱 심각해 _~~충격…~~_ 웹 성능은 Mobile과 Desktop으로 나뉘어서 성능을 측정할 수 있는데, 데스크탑 보다는 모바일 리소스가 한정적인 만큼 모바일웹의 성능이 더 낮게 나온다고 하긴 한다.

아래 분석된 결과를 보니 원인은 역시나 과도한 이미지였다. 반응형 웹페이지로 심지어 반응형 이미지로 제작했음에도 일단 무작정 고화질, 대용량 크기의 사진을 펑펑 써댔던 것이다. 이미지가 웹페이지의 성능에 큰 영향을 끼친다는 것을 크게 깨달을 수 있었다.

## 성능 개선을 위해 적용한 방법들

### 이미지 리사이징

이미지의 사이즈만 조절했음에도 데스크탑과 모바일 둘다 두배 정도 성능이 좋아졌다. 이미지 리소스가 웹페이지 성능에 얼마나 많은 영향을 끼치는지 확인할 수 있었다.

- 이미지 최적화 적용 후 Desktop 성능

  - 데스크탑 성능은 **56점 → 80점**

  ![이미지 최적화 이후 데스크탑 성능](/public/images/side-projects/rimflix-optimization/image-optimization-1.png)

- 이미지 최적화 적용 후 Mobile 성능

  - 모바일 성능은 **29점 → 53점**

  ![이미지 최적화 이후 모바일 성능](/public/images/side-projects/rimflix-optimization/image-optimization-2.png)

림플릭스 프로젝트에서는 TMDB API를 통해 영화 포스터와 이미지를 불러오는데, 이미지 URL에서 TMDB가 제공하는 여러가지 이미지 사이즈 중 하나를 선택하여 그에 맞는 사이즈의 이미지를 가져올 수 있다. 이렇게 여러개의 사이즈를 제공해줌에도 나는 그냥 최고 사이즈의 이미지를 가져와서 사용했고 그에 따라 성능이 굉장히 안좋아졌던 것이다.

- 최적화 전에는 디폴트값이었던 original(이미지 원본)을 사용했다면, TMDB가 제공하는 여러가지 이미지 사이즈를 타입스크립트의 `enum`으로 정의하고 이 중 골라서 사용할 수 있도록 만들었다. `posterSizes`로 사이즈 타입을 정해주니 편하게 사용할 수 있었다.

  ```tsx:utils/sizeImagePath.ts
  export enum posterSizes {
    w92 = 'w92',
    w154 = 'w154',
    w185 = 'w185',
    w342 = 'w342',
    w500 = 'w500',
    w780 = 'w780',
    original = 'original',
  }

  export function sizeImagePath(file_size: string, file_path: string) {
    const base_url = 'https://image.tmdb.org/t/p';
    return `${base_url}/${file_size}${file_path}`;
  }
  ```

  ```tsx:components/common/Banner.tsx
  import { posterSizes, sizeImagePath } from '../utils/sizeImagePath';

  interface IPosterProps {
    imgPath: string;
  }

  const Poster = ({ imgPath }: IPosterProps) => {
    return <img src={sizeImagePath(posterSizes.w342, imgPath)} alt='poster' />;
  };
  ```

### Source를 통한 반응형 이미지 제공

사용자 경험 향상을 위해서 너비가 긴 데스크탑에서는 가로가 긴 썸네일 사진을, 태블릿 이하로는 세로 길이가 더 긴 포스터 사진을 제공하고 싶었다. 기기에 맞춰 첫 화면에 보이는 포스터를 최대한 많은 부분을 보여주고 싶었기 때문이다.

- 림플릭스 반응형 데스크탑 이미지

  ![반응형 데스크탑 이미지](/public/images/side-projects/rimflix-optimization/반응형이미지1.png)

- 림플릭스 반응형 모바일 이미지

  ![반응형 모바일 이미지](/public/images/side-projects/rimflix-optimization/반응형이미지2.png)

그리고 이 부분에서도 역시나 많은 리소스를 차지하고 있다는 경고가 떴고 자바스크립트를 통해 동적으로 변경했었기 때문에 바로 즉각적으로 변경되는 것이 아닌, 조금 느리게 변경되는 현상이 있었다.

이 부분은 너비에 따라 로드하는 사진 자체가 달라지기 때문에, HTML에서 제공하는 아트 디렉션 기법을 활용했다.

[MDN:Responsive_images](https://developer.mozilla.org/ko/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

`<source />`는 HTML을 통해 반응형 이미지를 만드는 것이기 때문에 자바스크립트를 통해 동적으로 변경하는 것보다 속도가 더 빠르다고 한다. 아래의 코드와 같이 `media` 속성에 해당 이미지가 나타나야하는 너비를 작성해준다.

```tsx:components/common/Banner.tsx
import {
  backdropSizes,
  posterSizes,
  sizeImagePath,
} from '../utils/sizeImagePath';

const Banner = ({ data }: IBannerProps) => {
  return (
    <Poster>
      <source
        srcSet={sizeImagePath(backdropSizes.original, data.backdrop_path)}
        media='(min-width: 1023px)'
      />
      <source
        srcSet={sizeImagePath(posterSizes.w780, data.poster_path)}
        media='(min-width: 650px)'
      />
      <img
        src={sizeImagePath(posterSizes.w500, data.poster_path)}
        alt={`${data.title || data.name}poster`}
      />
    </Poster>
  );
};
```

- `<img>`에 loading lazy 적용

  모달같은 컴포넌트에 있는 `<img>` 태그에 `loading=”lazy”`를 적용해 보이지 않는 이미지라면 나중에 다운로드되도록 했다.

### Font Optimization을 통한 LCP 개선

![폰트 최적화 이후 데스크탑 성능](/public/images/side-projects/rimflix-optimization/font-optimization-1.png)

LCP는 가장 큰 요소가 렌더링된 시점을 뜻한다. 우수 성능은 **2.5초** 이하인데 가장 큰 요소인 배너 영화 포스터 이미지가 3.6s로 느리게 렌더링 되고 있다고 뜨고 있었다. 그래서 어떤 것이 최초 렌더링에 영향을 주고 있을까 살펴봤는데 LCP에 대한 문서에서 아래와 같은 문구가 있었다.

> 타사 출처에 대한 서버 요청은 특히 페이지에 중요한 콘텐츠를 표시해야 하는 경우 LCP에 영향을 줄 수 있습니다. [출처](https://web.dev/optimize-lcp/?utm_source=lighthouse&utm_medium=devtools#render-blocking-resources)

![렌더링 분석 결과](/public/images/side-projects/rimflix-optimization/font-optimization-2.png)

이뿐만 아니라 렌더링을 방해하는 리소스를 제거하라는 분석에서 폰트가 있었다. 그래서 폰트를 테스트로 한번 지워봤는데 정말 갑자기 성능이 확 올라갔다.  
3.6s - 2.3s이라니!

![렌더링 분석 결과](/public/images/side-projects/rimflix-optimization/font-optimization-3.png)

하지만 성능 최적화를 한다고 폰트를 사용하지 않을 수는 없다. 그래서 찾아보니 `preconnect` 연결이 폰트를 preload해주는 역할이라고 한다. 전에는 이게 무슨 역할인지 모르고 그냥 썼는데 앞으로 절대 지우면 안되겠다.

```html:index.html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</head>

<!-- preconnect로 빠르게 preload -->
```

하지만 별로 **이전과 성능 차이는 없는** 것으로 나온다. 😥

### React.Lazy를 통한 LCP 개선

Preload 이외에도 Modal과 같이 **사용자가 처음에 보지 않는 컴포넌트**는 Lazy import를 적용했다.

```jsx:components/common/Banner.tsx
const VideoPlayer = lazy(() => import('./common/VideoPlayer'));

const Banner = () => {
  return (
    <Container>
      {/* 생략 */}
      <Suspense fallback={<div>loading...</div>}>
        <VideoPlayer
          videoId={data?.id}
          backdropPath={data?.backdrop_path}
          title={data?.title || data?.name}
        />
      </Suspense>
      {/* 생략 */}
    </Container>
  );
};
```

### 레이아웃 안정성 높이기

CLS는 시각적 안정성을 측정한다. 이에 대한 방해 요인은 상단의 요소가 렌더링되면서 기존의 요소들이 아래로 밀리는 것이 있었다. 이에 따라 가장 이미지나 비디오 같은 것은 부모 요소에 적절한 크기의 witdth와 height를 설정해 밀림을 방지했다.

### Throttling 적용

반응형 프로젝트이기 때문에 화면의 너비에 따라 결정되는 컴포넌트들이 있다. 그래서 `useWindowSize`라는 훅을 만들어 window의 너비값을 가져올 수 있는데, 이 `useWindowSize` 훅에 `throttle` 함수를 적용해보았다. 왜냐하면 창의 너비를 조절할때마다 함수가 실행되는 것보다 일정시간 후 한번의 값을 가져오는 것이 더 효율적이기 때문이다.

```tsx:hooks/useWindowSize.tsx
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

## 접근성 (Accessibility)

원래는 100이었는데 갑자기 92로 떨어졌다. 그래서 원인을 보았는데…

- 원인 1. Background and foreground colors do not have a sufficient contrat ratio.

  ![접근성 성능 분석 결과](/public/images/side-projects/rimflix-optimization/accessiblity-1.png)

  - 저 트레일러의 색상 대비율(?)을 통과를 못한 것이었다. 웹 접근성에서 색상 대비율도 보는구나..

- 원인 2. Links must have discernible text.

  ![접근성 텍스트 분석 결과](/public/images/side-projects/rimflix-optimization/accessiblity-2.png)

  문제가 된 부분은 링크 안에 로고이미지를 넣은 부분인데, 링크에 대해 시각 장애인들이 식별할 수 있는 텍스트를 제공하지 않아서였다.
  [출처](https://dequeuniversity.com/rules/axe/4.4/link-name?utm_source=lighthouse&utm_medium=devtools)

  ```tsx
  <Link to='/' aria-label='rimflix'>
    {/*aria-label attribute 제공 */}
    <LogoBox />
  </Link>
  ```

  ![접근성 최종 결과](/public/images/side-projects/rimflix-optimization/accessiblity-3.png)

## Best Practice

- Best Practice란? https://developer.chrome.com/docs/lighthouse/best-practices/
- 원인 1. Displays images with incorrect aspect ratio

  ![Best Practice 분석 결과](/public/images/side-projects/rimflix-optimization/best-practice-1.png)

  ![Best Practice 분석 결과](/public/images/side-projects/rimflix-optimization/best-practice-2.png)

  잘못된 이미지 종횡비로 인해 나타난다고 한다. 보아하니 0.67의 종횡비를 가지고 있는데 실제 디스플레이 된것은 0.65의 종횡비를 갖고 있다고 나온다.

## 최종 결과와 요약

- 성능 개선 부분에서는

  1. **이미지 리사이징**

  2. `<picture>`와 `<source>` **태그를 통해 반응형 이미지 제공**

  3. `<img>` 태그에 `loading=”lazy”` 적용

  4. **Font Optimization을 통한 LCP 개선**

  5. **React.Lazy 적용**

  6. **Layout 안정 CLS 개선**

  7. **`window.innerWidth` 값을 가져오는 훅에서 `throttling`함수 적용**

- Best Practice에서는

  1. 이미지의 종횡비 개선

- Accessibility에서는

  1. 색상 대비율, 로고 텍스트 제공 개선

을 통해 아래와 같이 개선할 수 있었다.

- Desktop Perfomance 성능 56점 → 86점 (20점 증가)

  ![데스크탑 성능 최종 결과](/public/images/side-projects/rimflix-optimization/desktop_result-1.png)

  ![데스크탑 성능 최종 결과](/public/images/side-projects/rimflix-optimization/desktop_result-2.png)

- Mobile Perfomance 성능 29점 → 56점 (27점 증가)

  ![모바일 성능 최종 결과](/public/images/side-projects/rimflix-optimization/mobile_result-1.png)

  ![모바일 성능 최종 결과](/public/images/side-projects/rimflix-optimization/mobile_result-2.png)

여기까지 웹페이지 성능을 개선하기 위해 적용해본 것들을 작성해보았다. 일단 성능을 측정해보는 것은 중요하다고 생각하지만 모든 것을 100에 맞추기 위해 아등바등할 필요는 없는 것 같다. 왜냐하면 어쩔 수 없는 항목들도 있었기 때문이다. 예를 들어 자바스크립트 파일 크기가 너무 크다, 폰트를 사용해서 느리다, 등등은 해결하기가 어렵다. 따라서 성능을 측정해서 개선할 부분을 정확히 찾는 것도 중요한 것 같다.

다음으로는 성능 개선보다는 사용자 경험 향상을 위해 적용해본 것을 작성해보았다.

## 모바일 반응형 터치 이벤트 적용

개발을 하면서 모바일 반응형에서는 데스크탑 반응형과 다르게 마우스 이벤트가 잘 맞지 않는 것을 느끼게 되었다. 마우스를 `hover`하면 약간의 영화 정보박스가 떠올라야 하는데, 스마트폰으로 본 모바일웹에서는 `hover`를 할 수 없고 터치만 가능하기 때문이다. 스마트폰에서 영화 포스터를 터치하면 정보박스가 버벅대면서 나타났다.

따라서 마우스 `hover`를 통해 나타나는 정보 박스는 모바일에서는 `display: none` 처리를 했다.

```css:components/common/InfoBox.tsx
const InfoBox = styled(motion.div)`
  display: none; /* 모바일에서는 display none */
  @media ${device.tablet} {
    position: absolute;
		display: flex;
    background-color: ${(props) => props.theme.black.darker};
    border-bottom-left-radius: 5px;
  }
`;
```

또한 데스크탑에서는 클릭하면 영화리스트가 슬라이드되어 이동되는 반면 반응형에서는 보통 손가락으로 드래그해서 슬라이드한다. 따라서 이 부분도 모바일 웹에서 어떻게 드래그를 적용할지 찾아보다가 터치 이벤트라는 것을 알게 되었다. React에서는 스마트폰이나 태블릿 기기에서도 편하게 사용할 수 있도록 터치 이벤트 핸들러를 제공하고 있고 브라우저도 이 터치 이벤트를 제공해서 상호작용할 수 있다.

- 터치 이벤트 핸들러 사용

```tsx:components/common/RowSlider.tsx
const RowSlider = ({ title, data }: PropsType) => {
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition({
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
    });
    backRef.current.style.visibility = 'visible';
    forwardRef.current.style.visibility = 'visible';
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const distanceX = Math.abs(touchPosition.x - event.changedTouches[0].pageX);
    const distanceY = Math.abs(touchPosition.y - event.changedTouches[0].pageY);
    if (distanceY + distanceX < 350 && distanceX > distanceY) {
      if (touchPosition.x - event.changedTouches[0].pageX < 0) {
        decreaseIndex();
      } else if (touchPosition.x - event.changedTouches[0].pageX > 0) {
        increaseIndex();
      }
    }
    backRef.current.style.visibility = 'hidden';
    forwardRef.current.style.visibility = 'hidden';
  };

  return (
    <Slider onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {/* */}
    </Slider>
  );
};
```

`onTouchStart`와 `onTouchEnd`를 구현해서 슬라이드 컴포넌트에 적용해주었다. 이렇게 하니 모바일에서는 손가락으로 드래그해서 다음 정보를 볼 수 있어서 더욱 UX가 향상되었다. 적용해보길 잘했다는 생각이 들었다.👍

## 프로젝트 소감

사실 이 프로젝트는 굉장히 흔한 프로젝트지만 리액트에 입문하고 공부하면서 만들 수 있는 좋은 프로젝트라고 생각한다. 이 프로젝트에서 React 18의 Lazy loading과 Suspense를 통해 로딩 최적화를 해보는 경험도 할 수 있었고, API를 통해 받는 데이터를 다루는 법과 typescript, react-query에 대한 공부를 할 수 있었다. 또한 Framer Motion으로 현란한 애니메이션을 적용해보는 경험도 할 수 있었다.

그외에도 나중에는 이미지와 비디오가 많아 웹 성능 최적화를 공부하기 좋은 프로젝트라는 생각이 들어 공부하며 성능 개선 시도를 했고, 퍼포먼스를 56점에서 86점으로 올렸다.

하지만 굳이 90을 넘기려고 아등바등하지는 않았는데, 사실 성능 최적화를 하는 것은 좋지만 이에 너무 매몰되어 써야하는 이미지나 폰트를 쓰지 않는다던가, 굳이굳이 이미지를 webP로 변형한다던가, code splitting할 모든 곳을 불에 키고 찾는다던가 하는 것은 오히려 시간 낭비한다고 느꼈기 때문이다.

이 림플릭스 프로젝트는 영화 예고편도 많이 봤던 재미있는 프로젝트였다!😆 사실 Next.js를 이용하면 프레임워크가 이미지나 폰트에서 자동으로 어느정도 최적화를 해주기 때문에 더 빠르게 성능 최적화를 하고 싶다면 Next.js를 사용하는 것도 좋은 것 같다.
