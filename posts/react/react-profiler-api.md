## 웹 성능 최적화 도구

웹 성능을 측정하고 최적화할 수 있는 도구로는 여러가지가 있는데, 가장 유명한 것으로는 개발자 도구에 있는 lighthouse가 있다. 하지만 React 프로젝트에서는 React에서 제공해주는 유용한 측정 도구 `<Profiler>`가 있는데 이 측정 도구에 대해 알아보자.

### React Profiler API

React에서 제공하는 성능 측정도구로 컴포넌트별로 렌더링 시간을 확인할 수 있다.

`<Profiler>`으로 React 트리의 렌더링 성능을 측정한다. `<Profiler>`가 필요한 props로는 `id`와 `onRender`함수를 받는다.

- `id`는 측정 중인 UI 부분을 식별하는 문자열이다.
- `onRender`은 프로파일 중인 트리의 컴포넌트가 업데이트될 때마다 React가 호출하는 콜백함수이다. 렌더링된 내용과 소요된 시간에 대한 정보를 수신한다.

### 코드 예시

```tsx
function Page() {
  const onRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime // ✅ onRender props에 넣을 콜백함수가 받는 인자
  ) => {
    console.log(
      `(${id})
      phase: ${phase}, 
      actualDuration: ${actualDuration}, 
      baseDuration: ${baseDuration}, 
      startTime: ${startTime} 
      commitTime: ${commitTime}`
    );
  };

  return (
    // ✅ Profiler가 필요한 props 두가지
    <Profiler id='App' onRender={onRender}>
      <App />
    </Profiler>
  );
}
```

- `onRender` 함수에 받는 파라미터
  - `id` : 프로파일하는 react 트리를 식별하는 id. 위의 코드 예시로 id는 "App"이다.
  - `phase` : "mount", "update", "nested-update" 중 트리의 상태 정보를 수신한다. 여기서 update는 컴포넌트 자체의 업데이트를 뜻하며, nested-update는 부모 컴포넌트의 변경으로 업데이트된 경우를 뜻한다.
  - `actualDuration` : 프로파일하는 부분이 현재 업데이트를 하기 위해 쓴 렌더링 시간을 나타낸다. 이것은 서브트리에 대해 메모이제이션을 얼마나 잘했는지를 나타낸다. 초기 마운트 된 후 이 값이 크게 감소하는 것이 이상적이다.
  - `baseDuration` : 프로파일하는 부분이 최적화하지 않은 상태에서 전체를 다시 렌더링하는데 걸리는 시간을 예측한다. 이 값으로 렌더링에 가장 많은 비용을 드는 부분을 찾을 수 있다. actualDuration과의 비교를 통해 memoization이 잘 작동하는지 확인할 수 있다.
  - `startTime` : 업데이트 렌더링을 시작한 시점을 나타내는 숫자 타임 스탬프.
  - `endTime` : 현재 업데이트를 커밋한 시점을 나타낸 숫자 타임스탬프

그럼 이런식으로 콘솔에서 확인할 수 있다.

![profiler-console](/public/images/react/react-profiler-api/profiler-console.png)

**사용시 주의할 점**
기본적으로 **프로덕션 빌드에서는 사용하지 않도록** 설정되어 있다. 프로덕션에서 사용할 경우 개발자 도구의 React Developer Tools의 Profiler 탭에서 분석 결과를 볼 수 없다.

![profiling-not-supported](/public/images/react/react-profiler-api/profiling-not-supported.png)

아래와 같이 나와야 한다.
![profiling](/public/images/react/react-profiler-api/profiling.png)

개발모드에서 사용하기!

### 참고

[React Profiler](https://react.dev/reference/react/Profiler)
