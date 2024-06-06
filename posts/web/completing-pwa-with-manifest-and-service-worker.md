최근에 독서모임 한페이지 웹 애플리케이션을 PWA로 만드는 작업을 했다. PWA로 만든 가장 큰 이유는 푸쉬 알림을 구현하고 싶었기 때문이다. 구현 과정에서 PWA에 대해 공부하고 서비스 워커를 만들며 푸쉬 알림을 구현했는데, 그 과정에서 공부한 것들을 작성해보려고 한다.

## PWA란?

PWA는 Progressive Web Application의 약자로 **브라우저**에서 네이티브 앱과 같은 사용자 경험을 얻을 수 있는 기술을 뜻한다. 2015년 Google I/O에서 처음 소개되었고, 2017년부터 다양한 브라우저에서 PWA을 지원하면서 점차 많은 개발자들이 사용하기 시작했다.

그렇다면 브라우저에서 네이티브 앱과 같은 사용자 경험을 얻는다는 것은 무엇을 뜻할까? 실제 우리가 스토어에서 다운받아 쓰는 앱을 상상해보면 된다. 앱을 스토어에서 다운받으면 스마트폰의 홈화면에 추가되듯이 **브라우저에서** 웹페이지를 홈 화면에 추가할 수도 있고, 홈화면에 추가했을 때 쓸 아이콘을 직접 설정할 수 있다. 또한 페이지에 접속했을 때 브라우저의 주소창을 아예 사라지게 해 실제 앱처럼 앱의 화면만 보여줄 수 있고, 심지어는 웹페이지에서 푸쉬 알림을 받을 수도 있다.

말 그대로 웹앱인 것인데, 대표적으로 [X(트위터)](https://x.com/?lang=ko), [핀터레스트](https://kr.pinterest.com/CodicaCom/progressive-web-apps/), [스타벅스](https://app.starbucks.com/) 등등에서 PWA가 구현되어 있는 것을 발견할 수 있다.

![Pinterest PWA 화면](/public/images/web/completing-pwa-with-manifest-and-service-worker/pinterest-pwa.png)

## PWA의 장점과 단점

그렇다면 최근에 어떤 이유로 PWA를 만드는 추세가 되고 있을까? 이유는 다양하지만, 일단 많은 브라우저들에서 PWA를 지원해주기 시작했고, 또 최근에 iOS에서 브라우저의 푸쉬 알림을 허용하는 소프트웨어 업데이트가 이루어졌기 때문이다. 이런 기반들이 갖춰져 나가다 보니 점차 PWA가 많아지고 있는 것이 아닌가 싶다. 그렇다면 PWA는 대체 어떤 장점들이 있어서 사용하는 걸까? 앞서 말한 네이티브 앱 같은 높은 사용자 경험을 제공한다는 장점 이외에도 여러가지가 있다.

### 장점

1. 다양한 디바이스와 플랫폼에서 일관된 경험 제공

   이 장점은 무엇보다도 스마트폰과 같은 모바일 기기에서 더욱 유용할 것이다. 모바일 기기에서 네이티브 앱처럼 사용 가능함과 동시에, 데스크탑, 태블릿 등등 브라우저가 있는 모든 환경에서 일관된 화면을 볼 수 있다. 네이티브 앱이라면 좀더 한정된 디바이스에서만 사용할 수 있었을 것이다. 브라우저를 사용할 수 있는 환경이라면 PWA를 활용 가능하다는 것이 장점이다.

2. Offline 상태에서도 동작 가능

   PWA로 만들면 네트워크가 연결되지 않았더라도 서비스 워커를 통해 캐싱된 데이터를 화면에 나타낼 수 있다. 브라우저는 네이티브 앱에 비해 네트워크가 연결되지 않으면 아무것도 볼 수 없다는 것이 가장 큰 단점이었지만 PWA의 등장을 통해 이 부분을 보완할 수 있게 되었다. 이 부분은 네트워크가 연결되지 않는 상황이더라도 보여주고 싶은 콘텐츠가 있는 경우에 정말 큰 장점으로 작용할 것 같다.

3. 항상 최신 상태를 유지

   네이티브 앱은 직접 업데이트를 해주어야 하는 것과 달리 PWA는 웹페이지 화면이기 때문에 따로 업데이트를 해줄 필요 없이 항상 최신 상태를 유지한다.

4. HTTPS를 통한 안전한 데이터 전송

   PWA는 HTTPS 환경에서만 동작하기 때문에 좀 더 안전하다.

5. 단일 코드베이스로 개발 및 유지보수 효율성 향상

   네이티브 앱이라면 플랫폼에 따라 따로 개발해야하지만, PWA는 HTML, CSS, JavaScript를 통해 다양한 플랫폼에서 동작하기 때문에 개발 및 유지보수 효율성이 향상된다.

### 단점

1. 네이티브 앱보다는 부족한 성능

   브라우저 위에서 실행되는 것이기 때문에 네이티브 앱에 비해서는 성능이 떨어진다.

2. 특정 하드웨어 기능에 접근 불가능

   현재 지원해주는 WEB API가 훨씬 많아졌다고 하나 네이티브 앱과 달리 몇몇 기기의 특정 하드웨어 기능에 접근할 수 없다.

3. 서비스 워커나 캐싱 전략 등으로 인한 개발 복잡성 증가

   일반적인 웹 개발보다도 서비스 워커, 캐싱 전략, 오프라인 기능 등을 신경써야 하기 때문에 개발이 복잡해질 수 있다.

4. 사용자에게 노출이 부족

   스토어에 앱이 등록되어 발견하는 형식이 아니기 때문에 사용자들에게 노출되기 어렵다.

## PWA 설정하기

지금까지 PWA가 무엇이며 장점과 단점에 대해 알아보았다! 그렇다면 웹페이지를 PWA로 어떻게 설정할 수 있을까? PWA로 설정하기 위해서는 3가지가 갖춰져야 한다. 첫번째는 manifest.json 파일, 두번쨰는 서비스 워커, 세번째는 https 환경이다.

앞서 말했듯 HTTPS 환경이 필요한 이유는 서비스 워커가 HTTPS 환경에서만 동작하기 떄문이다. 로컬 개발 환경에서는 localhost에서도 테스트할 수 있다.

### Manifest 파일 작성

PWA가 어떻게 보이고 동작할지 정의할 수 있는 파일이다. 사실 manifest.json 파일은 PWA과 관련된 설정이 아니더라도 브라우저에 웹페이지에 대한 메타 데이터를 제공하는 파일로 작성하는 게 좋다. 이 manifest.json 파일은 index.html 파일의 `<head>` 태그 내에 아래와 같이 올바른 파일 경로로 연결해주면 된다.

```html
<!--✅ manifest 파일 연결 -->
<link rel="manifest" href="manifest.json" />
```

그럼 이제 manifest.json의 속성들에 대해 알아보자.

#### 주요 속성

1.  name

    웹 애플리케이션의 이름으로 유저가 홈 화면에 추가했을 때 표시되는 이름이다.

    ```json
    "name": "독서모임 한페이지"
    ```

2.  short_name

    만약 `name` 값이 너무 길 경우 화면에 `short_name` 속성값을 표시한다.

    ```json
    "short_name": "한페이지"
    ```

3.  description

    웹 애플리케이션의 목적이나 기능을 설명할 수 있다.

    ```json
    "description": "독서모임을 관리해주는 앱입니다."
    ```

4.  start_url

    웹 애플리케이션이 시작될 때 열릴 URL을 지정한다. 상대 경로나 절대 경로를 사용할 수 있다.

    ```json
     "scope": "/han-bookclub-app/"
    ```

5.  display

    애플리케이션이 어떻게 표시될지 설정한다.

    ```json
     "display": "standalone"
    ```

    - `fullscreen`

      게임이나 프레젠테이션 전체화면 같이 브라우저의 UI요소를 모두 숨기고 웹 애플리케이션을 전체화면으로 나타낸다.

    - `standalone`

      PWA 애플리케이션에서 많이 설정되는 값으로, 네이티브 앱처럼 보이게 만들어준다. 주소 표시줄이나 브라우저 툴바 같은 브라우저의 UI 요소가 없어지나, 타이틀 바나 상태 바는 표시될 수 있다.

    - `minimal-ui`

      주소 표시줄은 사라지지만, 최소한의 브라우저 UI는 표시된다. 예를 들어 브라우저의 뒤로가기나 새로고침 같은 네비게이션 버튼을 사용할 수 있다.

    - `browser`

      일반적인 브라우저 탭처럼 표시된다.

6.  icons

    다양한 크기의 애플리케이션 아이콘을 제공하여 여러 장치에서 적절한 아이콘이 사용될 수 있도록 만들어준다. type으로는 `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`이 있다.

    ```json
    "icons": [
      {
        "src": "/hanpage_book_logo_192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/hanpage_book_logo_512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    ```

7.  orientation

    애플리케이션이 실행될 때의 기본 방향을 지정한다.

    ```json
    "orientation": "portrait"
    ```

    - `any`

      모든 방향에서 실행될 수 있다.

    - `natural`

      기기의 기본방향을 따른다.

    - `landscape`

      게임같이 가로 방향으로 강제한다.

    - `portrait`

      세로 방향으로 강제한다.

8.  theme_color

    브라우저나 OS의 UI 요소에 사용될 색상을 지정한다. 주소창, 상태바 등의 색상으로 사용된다.

    ```json
    "orientation": "portrait"
    ```

9.  background_color

    애플리케이션이 로드되는 동안 배경 색상을 지정한다. 스플래시 스크린의 배경색으로 사용된다.

    ```json
    "background_color": "#FEFEFE"
    ```

#### 추가 속성

10. scope

    애플리케이션이 접근할 수 있는 URL의 범위를 지정한다. 이 범위를 벗어난 URL은 웹 애플리케이션의 맥락에서 벗어나게 되므로 접근할 수 없게 된다.

    ```json
      "scope": "/han-bookclub-app/"
    ```

11. lang

    애플리케이션의 기본 언어를 지정한다.

    ```json
    "lang": "ko-KO"
    ```

12. screenshot

    PWA의 설치 전 사용자에게 애플리케이션의 UI와 기능을 스크린샷으로 미리 보여줄 수 있다.

    ```json
    "screenshots": [
      {
        "src": "/images/screenshot1.png",
        "type": "image/png",
        "sizes": "640x480"
      },
      {
        "src": "/images/screenshot2.png",
        "type": "image/png",
        "sizes": "1280x720"
      }
    ]
    ```

위에서 알아본 속성들을 작성하면 아래와 같이 된다.

```json
// manifest.json

{
  "name": "독서모임 한페이지",
  "short_name": "독서모임 한페이지",
  "start_url": "/han-bookclub-app/",
  "scope": "/han-bookclub-app/",
  "icons": [
    {
      "src": "/hanpage_book_logo_192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/hanpage_book_logo_512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#FEFEFE",
  "background_color": "#FEFEFE"
}
```

PWA로 설정하려면 manifest.json에서 `start_url`, `display`, `icons`, 속성은 반드시 작성해야한다. 이렇게 설정한 Manifest는 크롬 브라우저에서는 개발자 도구 Application 탭에서 어떻게 적용되었는지 확인할 수 있다.

[MDN: Manifest](https://developer.mozilla.org/ko/docs/Web/Manifest) 여기서 각 속성의 브라우저 호환성도 확인해보면 좋을 것 같다. 아직 안되는 브라우저들도 많다...!

### Service Worker 작성

#### 서비스 워커의 역할은?

서비스 워커(Service Worker)는 네트워크 요청을 가로채고 캐싱을 관리하여 PWA의 성능을 최적화하고 오프라인 기능을 구현하는 데 중요한 역할을 한다.

#### 서비스 워커 설치 및 활성화

가장 먼저 service-worker.js라는 이름의 파일을 작성한다. 일단은 설치하고 활성화할 수 있는 코드를 작성해보자.

```javascript
// 서비스 워커 설치 이벤트 리스너
self.addEventListener('install', function () {
  self.skipWaiting();
});

// 서비스 워커 활성화 이벤트 리스너
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});
```

설치, 활성화를 한 후 이 파일에서 캐싱 전략, 백그라운드 동기화, 푸쉬 알림에 대해 정의할 수 있다. 그리고 이 파일의 위치는 보통 index.html이 있는 public 폴더에 놓고 JavaScript 파일에서 등록하면 된다.

```javascript
// main.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
```

그렇다면 브라우저가 해당 웹페이지에 접속했을 때 서비스 워커 파일의 존재를 확인하게 되고 등록 후 실행하게 된다. 잘 설치되고 실행된다면 아래와 같이 개발자 도구 애플리케이션 탭에서도 확인할 수 있게 된다.

![서비스 워커 설치 성공 콘솔](/public/images/web/completing-pwa-with-manifest-and-service-worker/service-worker-console.png)

![개발자 도구에서의 서비스 워커 정보](/public/images/web/completing-pwa-with-manifest-and-service-worker/service-worker.png)

#### 주요 서비스 워커 이벤트

1. `install`

   서비스 워커가 처음 설치될 때 발생한다. 이 이벤트를 사용하여 초기 캐시 설정 등 필요한 리소스를 미리 캐시할 수 있다.

   ```javascript
   self.addEventListener('install', (event) => {
     // 서비스 워커가 처음 설치될 때 발생
   });
   ```

2. `activate` 이벤트

   새로운 서비스 워커가 설치되고, 기존 서비스 워커를 대체할 때 발생한다. 이 이벤트를 사용하여 오래된 캐시를 정리할 수 있다.

   ```javascript
   self.addEventListener('activate', (event) => {
     // 서비스 워커가 활성화될 때 발생
   });
   ```

3. `fetch` 이벤트

   서비스 워커가 네트워크 요청을 가로챌 때 발생다. 이 이벤트를 사용하여 캐시된 리소스를 제공하거나 네트워크에서 리소스를 가져올 수 있다. 이후 이야기할 캐싱 전략도 이 이벤트를 통해 구현한다.

   ```javascript
   self.addEventListener('fetch', (event) => {
     // 서비스 워커가 네트워크 요청을 가로챌 때 발생
   });
   ```

4. `sync` 이벤트

   백그라운드 동기화가 필요할 때 발생한다. 이 이벤트를 사용하여 오프라인 상태에서 발생한 작업을 온라인 상태로 복귀했을 때 처리할 수 있다.

   ```javascript
   self.addEventListener('sync', (event) => {
     if (event.tag === 'sync-data') {
       event.waitUntil(syncData());
     }
   });

   function syncData() {
     // 오프라인 상태에서 발생한 데이터를 서버로 동기화하는 로직
   }
   ```

5. `push` 이벤트

   푸시 알림이 도착했을 때 발생한다. 이 이벤트를 사용하여 사용자에게 알림을 표시할 수 있다.

   ```javascript
   self.addEventListener('push', (event) => {
     const data = event.data.json();
     const options = {
       body: data.body,
       icon: '/images/icon.png',
       badge: '/images/badge.png',
     };
     event.waitUntil(self.registration.showNotification(data.title, options));
   });
   ```

6. `notificationclick` 이벤트

   사용자가 푸시 알림을 클릭했을 때 발생한다. 이 이벤트를 사용하여 알림 클릭 시의 동작을 정의할 수 있다.

   ```javascript
   self.addEventListener('notificationclick', (event) => {
     event.notification.close();
     event.waitUntil(clients.openWindow(event.notification.data.url));
   });
   ```

여기까지 서비스 워커의 주요 이벤트들에 대해 알아보았다. 각 이벤트에 간단한 예시 코드만 작성해본 것이고 안에 적절한 이벤트 메서드들은 또 따로 공부해보아야 한다. 서비스 워커도 복잡하게 작성하려면 많은 공부가 필요할 것 같다.

#### 서비스 워커의 캐싱

이번에는 서비스 워커에 캐싱 전략들이 있다고 해서 공부해보았다. 서비스 워커는 오프라인에서도 동작할 수 있게 만들어준다고 했다. 이는 서비스 워커가 처음 설치될 때 데이터를 캐싱하고 이후 캐싱된 데이터를 사용하기 때문이다.

```js
// service-worker.js
// 설치 이벤트 작동시 데이터를 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('static-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/images/icon.png',
      ]);
    })
  );
});
```

그럼 Cache Storage에 데이터를 저장하고, 이후 fetch 이벤트 리스너를 통해 이 캐시를 불러와 사용하게 된다. 이 캐싱된 데이터를 사용하는 방식에는 5가지 전략이 있다.

1. 캐시 우선

   먼저 캐시에서 데이터를 찾고, 없으면 네트워크 요청을 보내는 전략. 빠른 로딩 속도를 제공하며, 오프라인 환경에서 유용하다.

   ```javascript
   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request).then((response) => {
         return response || fetch(event.request);
       })
     );
   });
   ```

2. 네트워크 우선

   먼저 네트워크 요청을 보내고, 실패하면 캐시에서 데이터를 찾는 전략. 최신 데이터를 제공하지만, 네트워크 상태에 따라 로딩 속도가 달라질 수 있다.

   ```javascript
   self.addEventListener('fetch', (event) => {
     event.respondWith(
       fetch(event.request).catch(() => {
         return caches.match(event.request);
       })
     );
   });
   ```

3. 캐시 전용

   캐시된 데이터만 사용하며, 네트워크 요청은 전혀 보내지 않는 전략. 오프라인 환경에서는 유용하지만, 데이터가 최신이 아닐 수 있다.

   ```javascript
   self.addEventListener('fetch', (event) => {
     event.respondWith(caches.match(event.request));
   });
   ```

4. 네트워크 전용

   네트워크 요청만 보내며, 캐시를 전혀 사용하지 않는 전략. 이런 경우 오프라인 환경에서도 작동할 수 있는 기능을 사용하지 않는 것이 된다.

   ```javascript
   self.addEventListener('fetch', (event) => {
     event.respondWith(fetch(event.request));
   });
   ```

5. Stale-While-Revalidate (SWR, 오래된 데이터 새로 고침)

   먼저 캐시된 데이터를 반환하고, 동시에 네트워크 요청을 보내서 데이터를 업데이트하는 전략. 빠른 초기 로딩과 최신 데이터 제공을 모두 만족한다.

   ```javascript
   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request).then((cachedResponse) => {
         const fetchPromise = fetch(event.request).then((networkResponse) => {
           caches.open('dynamic-cache').then((cache) => {
             cache.put(event.request, networkResponse.clone());
           });
           return networkResponse;
         });
         return cachedResponse || fetchPromise;
       })
     );
   });
   ```

보통 5번 전략을 많이 사용한다고 한다. 하지만 5번 전략은 캐싱 전략이 복잡해질 수 있고, 데이터가 자주 변경되는 경우 일관되지 않을 수 있다고 한다. 하지만 이렇게 캐싱된 데이터를 사용하는 경우 네트워크 요청이 실패하더라도 사용자는 콘텐츠를 볼 수 있기 때문에 꼭 보여줘야 하는 콘텐츠가 있는 경우에 PWA로 만들면 정말 좋을 것 같다.

서비스 워커는 위의 주요 이벤트에서도 보았듯이 백그라운드 동기화 기능도 제공한다. 오프라인에서 캐싱된 웹페이지를 보게 되었을 때 이벤트가 발생하거나 데이터가 변경될 수 있는데 이런 경우 백그라운드 동기화를 통해 네트워크가 연결되었을 때 다시 이벤트를 발생시키거나 데이터를 변경시켜 동기화할 수 있다.

[서비스 워커 캐싱 전략](https://developer.chrome.com/docs/workbox/caching-strategies-overview?hl=ko) 문서를 한번 읽어보면 더 도움이 될 것 같다.

#### 서비스 워커의 푸쉬 알림

푸쉬 알림 기능은 웹을 가장 앱처럼 보이게 만들어주는 기능이 아닐까 싶다. PWA 이전의 웹이라면 서버에서 보내는 알림을 받을 수 없었겠지만 서비스 워커를 통해 알림을 수신할 수 있게 되었다.

푸쉬 알림은 구현하는 첫번째 단계는 사이트에서 알림 권한을 허용해야 한다는 것이다. Web API인 Notification API의 `requestPermission()`을 통해 알림 허용 요청이 가능하다.

```javascript
function notifyMe() {
  if (!('Notification' in window)) {
    alert('이 브라우저는 알림 기능을 지원하지 않습니다.');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification('알림 성공');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification('알림 성공');
      }
    });
  }
}
```

서비스 워커의 주요 이벤트에서 이야기한 `push` 이벤트를 작성하면 푸쉬 알림을 수신할 수 있다.

[MDN: Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notification)

## 결론

여기까지 PWA가 무엇이며, 어떻게 웹 애플리케이션을 PWA로 만드는지를 살펴보았고 그 과정에서 어떻게 manifest.json을 작성해야 하는지, 서비스 워커가 무엇인지에 대해 공부해보았다.

웹의 특성상 오프라인일 경우에는 전혀 사용하지 못한다는 것과, 네이티브 앱보다는 사용자 경험이 떨어지는 등등의 단점이 있었으나 PWA가 등장하면서 단점들을 보완하고 있다. 아직 브라우저마다 호환성이 제각각이지만 앞으로 계속 업데이트 되지 않을까 생각한다. 따라서 앞으로 PWA의 사용이 확대되면 확대되었지 감소하지는 않을 것 같다!

다음 포스트에서는 이렇게 공부한 것을 바탕으로 Firebase 환경에서 서비스 워커와 함께 푸쉬 알림을 어떻게 구현했는지 작성해보고자 한다.

## 참고

[서비스 워커 캐싱 전략](https://developer.chrome.com/docs/workbox/caching-strategies-overview?hl=ko)

[MDN: Manifest](https://developer.mozilla.org/ko/docs/Web/Manifest)

[MDN: Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notification)
