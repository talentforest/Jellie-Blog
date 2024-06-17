## 웹에서 푸시 알림을 개발하게 된 계기

이전 포스트에서 독서모임 한페이지 기록앱을 PWA로 만들었다고 이야기했는데, PWA로 만든 이유는 푸시 알림을 구현해보고 싶었기 때문이다. 이전에는 **카카오톡으로 공유하기** 기능을 제공해서 독서모임 멤버가 발제문이나 정리 기록 같은 글을 등록하면 직접 공유하기 버튼을 눌러서 글을 등록한 것을 알 수 있도록 했다. 그런데 시간이 지나다 보니 멤버들이 글을 올리고 나서 공유하는 과정이 귀찮았는지 점점 카톡으로 공유하기를 하지 않기 시작했다.🥲

그동안 푸시 알림을 개발하지 않았던 이유는 iOS 사파리에서는 푸시 알림을 지원하지 않았기 때문이다. 하지만 작년 2023년에 iOS가 16.4로 업데이트되면서 사파리 브라우저에서 푸시 알림 기능을 지원하기 시작했다. 그러다 보니 써보고 싶다는 생각을 계속 하는 도중 글 등록에 대해 답답해질 찰나 그럼 푸시 알림을 개발해야겠다는 생각을 하게 되었다.

멤버들에게 푸시 알림 기능을 개발할 생각인데 어떤 알림을 받고 싶은지 묻자 정말 기다렸다는 듯이😅 대답들이 줄줄이 쏟아져 나왔다. 이 정도로 뜨거운 반응일 줄은 몰랐는데 멤버들도 이 기능이 굉장히 반가웠나보다. 그래서 이 답변들을 추려서 개발을 시작했고 지금 테스트 단계에 있다. 의외로 자료가 많지 않아서 개발 과정이 정말 쉽지 않았는데, 내가 무엇을 구현해야하는지, 어떤 방식으로 동직해야하는지 하나하나 생각하면서 어떻게 코드를 써내려갈지 생각했다. 이 포스트에서 웹의 푸시 알림을 구현하는 과정에서 어떤 로직을 생각했고 버그들이 있었는지 다시 그 과정을 돌이켜보며 복기해보려고 한다.

## 현재 프로젝트 상황과 개발 요구사항

독서모임 한페이지 기록앱은 프론트엔드는 `React`, 서버는 서버리스인 `Firebase`에서 9버전으로 개발되었다.

```json:package.json
"react": "18.0.0",
"firebase": "^9.6.1",
```

따라서 미리 이야기하자면 이후 푸시 알림도 Firebase를 토대로 FCM, Firebase Functions를 활용해서 개발한다.

그렇다면 이제 푸시 알림과 관련된 개발 요구사항은 다음과 같다.

1. 포그라운드 메시지 알림 수신 : 유저가 웹앱을 열어 보고 있는 동안에 알림을 받을 수 있어야 한다.

2. 백그라운드 메시지 알림 수신 : 유저가 앱을 구동하고 있지 않고 닫고 있을 때 알림을 수신할 수 있어야 한다.

- 단, 알림을 보내는 주체는 알림을 받지 않는다.

요구사항은 단 두가지로 간단하지만 그 과정이 정말 간단하지 않았다😅

## 전체적인 과정 훑어보기

공부하면서 막 구현했을 때는 이것 저것 공부하고 생각하며 작성하고 다시 되돌리는 등 여러 시행착오를 거쳤는데, 다시 정리하면서 전체적인 큰 과정을 작성해보면 좋을 것 같아서 일단 작성해보려고 한다. 일단 크게 4단계로 나누어서 보면 좋을 것 같다.

1단계 : 일단 PWA로 만들고 푸시 알림 테스트 해보기

2단계 : 유저의 FCM 데이터와 저장하기

3단계 : Firebase Functions에서 푸시 알림을 보낼 서버 함수 구현하기

4단계 : 토큰 관리하기

### 1단계 : 일단 PWA로 만들고 푸시 알림 테스트 해보기

1-1. PWA로 만들어줄 서비스 워커 작성하기

가장 먼저 웹앱에서 푸시 알림을 받을 수 있으려면 PWA로 만들어야 한다. 이전 포스트에서 웹사이트를 PWA로 어떻게 만드는지에 대해 이야기했는데, 답은 **manifest.json** 파일과 **서비스 워커** 파일을 작성하는 것이었다. manifest.json은 이전 포스트에서 설정한대로 잘 작성하면 되지만, 서비스 워커 파일은 Firebase의 맥락에서라면 작성하는 방법이 조금 달라진다. 웹앱에 서비스 워커 등록부터 해보자!

기존에 서비스 워커 파일은 그냥 `service-worker.js`이라는 이름으로 파일을 생성했지만 Firebase와 함께 서비스 워커를 사용하고자 한다면 파일명을 `firebase-messaging-sw.js`로 작성해주어야 한다. 그리고 `index.html` 파일이 있는 `public` 폴더 안에 넣어주면 된다.

```javascript:public/firebase-messaging-sw.js
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

/* eslint-disable no-restricted-globals */
/* ✅ 서비스 워커 설치 이벤트 리스너 */
self.addEventListener('install', function () {
  self.skipWaiting();
});

/* ✅ 서비스 워커 활성화 이벤트 리스너 */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    clients.claim() // 클라이언트 제어 권한 획득
  );
});

const messaging = firebase.messaging();

/* ✅ 백그라운드 상태일때 알림 수신 */
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

서비스 워커를 설치하고 활성화하는 이벤트 작성 이외에도 Firebase를 초기화하기 위한 코드를 작성해준다. 주의할 점은 `importScripts` 가져온다면 주소에 `compat`이 들어가는지 꼭 확인해야한다는 점이다. `compat`이 없이 안내되고 있는데, 이 경우 브라우저에서 서비스 워커는 ES 모듈을 사용해야 하며 `importScripts()`에서 동적 호출은 제한이 있다고 한다.

[Firebase-JS-SDK Issue](https://github.com/firebase/firebase-js-sdk/issues/5403)  
[서비스 워커의 ES 모듈](https://web.dev/articles/es-modules-in-sw?hl=ko)

이렇게 스크립트를 가져왔다면 `firebaseConfig` 값을 가져온다. `firebaseConfig` 값은 firebase console에서 프로젝트 설정 페이지의 일반 탭에 들어가면 확인할 수 있다. 그런데 `firebaseConfig`에서 `env` 환경변수로 값을 작성했는데 이렇게 하면 배포 환경에서 값을 인식하지 못한다. 따라서 배포 단계에서는 실제 값을 입력해주었다. apiKey나 id 값 같은 것이 있어서 공개되어도 괜찮은가 걱정했는데 이 firebaseConfig 설정값들은 프로젝트에 연결만 될 뿐 보안상으로는 괜찮다고 한다.

그럼 이제 public 폴더에 있는 `index.html`에서 이 서비스 워커를 불러와 설치하는 스크립트를 작성한다.

```html:index.html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/han-bookclub-app/firebase-messaging-sw.js', {
        scope: '/han-bookclub-app/',
      })
      .then(
        function (registration) {
          console.log(
            '✅ServiceWorker registration successful with scope: ',
            registration.scope
          );
        },
        function (err) {
          console.log('❌ServiceWorker registration failed: ', err);
        }
      );
  }
</script>
```

그리고 `index.html`에서 스크립트로 `firebase-messaging-sw.js` 파일을 실행해준다. 아래 예시 코드에서 볼 수 있듯이 적절한 파일 경로를 작성해주어야 한다. 나는 현재 gh-pages로 배포를 했기 때문에 뒤에 `/han-bookclub-app/`까지가 메인 주소라서 앞에 붙여주었다. 그럼 이제 빌드를 해주자.

![firebase-messaging-sw 파일 등록 성공 여부를 나타낸 console 탭](/public/images/web/how-to-implement-push-notifications-with-fcm-and-firebase-functions/firebase-messaging-sw-console.png)

![firebase-messaging-sw 파일 등록을 확인할 수 있는 application 탭](/public/images/web/how-to-implement-push-notifications-with-fcm-and-firebase-functions/firebase-messaging-sw-application.png)

빌드 이후 이렇게 개발자 도구의 애플리케이션 탭에서 서비스 워커가 활성화된 것이 잘 나타나면 성공한 것이다. 그럼 이제 **토큰**을 얻어보자!

---

1-2. 브라우저에 알림 허용 요청하고 토큰 얻기

토큰은 FCM이 푸시 알림을 어떤 기기에 보내야 할지 알려주는 아주 중요한 정보이다. 토큰이 없다면 절대 푸시 알림을 보낼 수 없다. 그런데 이 **토큰은 브라우저에서 유저가 알림을 허용한 경우에만 발급**된다. 그래서 먼저 Notification API에서 제공하는 `Notification.requestPermission()`을 통해 알림 허용 요청을 해야한다.

```javascript
const onPermitClick = async () => {
  if (!('Notification' in window)) {
    return alert('현재 브라우저에서는 알림을 지원하지 않습니다.');
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      sendNotificationToCurrentUser(notificationData);
      saveFcmDataInDB();
    }
  }
};
```

일단 나는 알림 안내 버튼을 만들어서 허용하기 버튼을 누르면 브라우저에서 알림 요청을 보낼 수 있도록 했다. 그러면 이제 아래 이미지와 같이 브라우저에서 알림 권한 요청이 온다. 여기서 허용을 누르면 된다. 차단을 누르면 이제 직접 설정에 들어가서 변경해줘야한다.

![Pinterest PWA 화면](/public/images/web/completing-pwa-with-manifest-and-service-worker/pinterest-pwa.png)

만약 React앱 내에서 Firebase를 초기화하는 파일을 작성했다면 그곳에서 아래와 같은 코드를 작성한다. `getToken`은 현재 기기의 토큰을 알려주는 아주 중요한 함수이다. 이렇게 토큰을 얻기 위한 알림 권한도 허용으로 설정했다면, firebase에서 제공하는 함수인 `getToken`을 이용하여 토큰을 가져오자.

```javascript:firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

// ✅포그라운드 상태일때 알림 처리
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  const notificationTitle = payload.notification.title
  const notificationOption = {
    body: payload.notification.body
  }

  const notification = new Notification(notificationTitle, notificationOption)
});

// ✅토큰 가져오기
export const getDeviceToken = async () => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_MESSAGING_TOKEN,
    serviceWorkerRegistration: await navigator.serviceWorker.register(
      '/han-bookclub-app/firebase-messaging-sw.js'
    ),
  });
};
```

기존에 작성했던 firebase 관련 파일이 있을 것이다. 나는 해당 파일에서 토큰을 가져올 수 있는 함수를 만들었다. `getToken`함수는 두가지 인자가 들어가는데, `validKey`에는 firebase 콘솔의 프로젝트 설정 > 클라우드 메시징 탭에 들어가서 하단의 웹 푸시 인증서의 키쌍을 발급받은 값을 사용하면 된다. 두번째 인자인 `serviceWorkerRegistration`에는 서비스 워커가 등록된 위치를 작성해주면 된다.

그리고 토큰이 필요한 곳에 가져와서 콘솔에 찍어보면 이렇게 토큰을 확인할 수 있다.

```javascript:App.tsx
getDeviceToken()
  .then((token) => console.log("🔍token:", token));
```

![콘솔에서 보이는 토큰](/public/images/web/how-to-implement-push-notifications-with-fcm-and-firebase-functions/console-token.png)

토큰을 얻었다면 Firebase 콘솔에서 FCM 서비스를 활성화하고 알림을 테스트해본다.

---

1-3. FCM 콘솔에서 알림 테스트해보기

토큰을 가져왔다면 이제 이 토큰으로 알림이 잘 오는지 테스트해볼 차례다. 혹시 Firebase 콘솔에서 아직 FCM 서비스를 활성화하지 않았다면 활성화한다.

![fcm 콘솔 화면](/public/images/web/how-to-implement-push-notifications-with-fcm-and-firebase-functions/fcm-console.png)

그럼 이제 첫번째 캠페인 열기 버튼을 누르고

![fcm 콘솔 알림 테스트](/public/images/web/how-to-implement-push-notifications-with-fcm-and-firebase-functions/fcm-test.png)

여기서 나처럼 당황하지 않았으면 하는 마음에 덧붙여 이야기하자면, 위의 테스트 창에서 토큰을 추가할 때 대체 어디에 추가해야하는건지 입력창이 보이지가 않아서 굉장히 헤맸다. 그런데 버튼처럼 보이는 **FCM 등록 토큰 추가**라고 적혀 있는 부분이 사실은 입력창이었다. 저 부분을 클릭해보면 커서가 깜박이는걸 볼 수 있을 것이다. 그곳에 `getToken`을 통해 얻은 토큰을 추가해준다.

그리고 테스트 버튼을 눌러보면

![콘솔에서 알림 테스트](/public/images/web/how-to-implement-push-notifications-with-fcm-and-firebase-functions/test-message.png)

알림이 잘 수신된 것을 확인할 수 있었다. 만약 브라우저에서 알림이 오지 않는다면 설정에 들어가서 **알림 설정에 크롬이 허용되어 있는지** 살펴봐야한다!

여기까지 토큰을 이용해 현재 기기에서 푸시 알림이 잘 오는지 확인해보는 과정을 마쳤다.

요구사항에서도 보았듯이 알림을 보내는 주체 이외의 모든 멤버가 백그라운드나 포그라운드에서 푸시 알림을 수신할 수 있어야 한다. 그렇다면 이제 클라이언트에서만 될 것이 아니라 **서버**가 필요할 때다.

### 2단계 : 유저의 FCM 데이터를 저장하기

2-1. 유저의 알림 허용 여부를 로컬스토리지에 저장한다.

토큰을 발급받으려면 브라우저에서 알림 권한이 허용되어 있어야 한다고 했다. 나는 이 푸시 알림 모달을 만들어서 허용하기 버튼을 누르면 나타나도록 만들었다.

![notification-modal](/public/images/web/how-to-implement-push-notifications-with-fcm-and-firebase-functions/notification-modal.png)

유저가 허용하기를 누르면 로컬스토리지에 notification 라는 키에 "granted", 거절하기를 누르면 "denied" 저장한다.

```javascript
const onPermitClick = async () => {
  if (!('Notification' in window)) {
    return alert('현재 브라우저에서는 알림을 지원하지 않습니다.');
  }

  if (Notification.permission === 'granted') {
    sendNotificationToCurrentUser(notificationData);
    saveFcmDataInDB();
  } else if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      sendNotificationToCurrentUser(notificationData);
      saveFcmDataInDB();
    }
  }
  handleLocalStorage('set', true);
  toggleModal();
};
```

2-2. 허용하기를 눌렀다면 FireStore에 FCM 데이터를 저장한다.

유저가 알림 허용하기 버튼을 누른 경우 토큰을 비롯한 FCM 데이터를 FireStore 데이터베이스 문서에 저장한다. 나는 FCM이라는 새로운 컬렉션을 만들어서 각 유저별로 문서를 만들어 데이터를 저장했다.

```javascript
const fcmData = {
  createdAt: 데이터베이스에 저장한 시간,
  notification: "granted",
  tokens: [토큰1, 토큰2, ...]
}
```

### 3단계 : 푸시 알림을 보낼 서버 함수 구현하기

3-1. Firebase Functions를 환경 만들기

유저의 FCM 토큰 정보까지 데이터베이스에 잘 저장했다. 그럼 이제 푸시 알림을 보낼 서버를 만들어보려고 한다. 서버는 고민을 많이 했다. Node.js로 만들어서 서버를 배포해야할까? 하지만 알림이 그렇게 많이 가는 것이 아닌데 서버까지 만들어서 24시간 매일 서버가 돌아가고 있는 것이 낭비같았다. 그리고 현재 프로젝트에 Firebase를 쓰고 있는데 서버 함수를 작성할 수 있는 서비스인 Firebase Functions를 이용하는 것이 더 맞다는 생각이 들었다.

[Firebase Functions 시작하기](https://firebase.google.com/docs/functions/get-started?hl=ko&_gl=1*1wn2txp*_up*MQ..*_ga*MTk4NjU3MzY4NC4xNzE4MDAzMDE3*_ga_CW55HF8NVT*MTcxODAwMzAxNi4xLjAuMTcxODAwMzAxNi4wLjAuMA..&gen=2nd)

Firebase Functions 서비스를 사용하려면 Firebase 요금제가 Blaze여야 한다. 먼저 요금제를 변경한 뒤, Firebase Functions 공식문서에 안내되는대로 콘솔과 프로젝트를 설정했다.

이에 따라 프로젝트 폴더 구조도 바뀌었는데, 서버와 클라이언트의 구분을 위해 client와 server 폴더를 생성하여 기존 React의 파일들은 client 폴더에 넣고 현재 만드는 firebase functions의 코드들은 server 폴더 내에 넣었다.

```bash
.root
├── client
├── node_modules
├── server
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

```bash
.root
├── server
│   ├── functions
│   │   ├── lib
│   │   ├── node_modules
│   │   ├── src
│   │   │   ├── index.ts
│   │   ├── src
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── .firestore.indexes.json
│   ├── .firestore.rules
├── #...생략
```

위와 같이 server 폴더 구조를 생성했다.

추가로 클라이언트와 서버를 한번에 실행하는 명령어를 만들면 편할 것 같아서 프로젝트 root 부분에 package.json을 만들고 다음과 같이 작성했다.

```json:package.json
{
  "scripts": {
    "client": "cd client && npm start",
    "server": "cd server/functions && npm run serve",
    "dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""
  },
  "dependencies": {
    "concurrently": "^8.2.2"
  }
}
```

root에서 바로 아래 명령어를 실행하면 된다.

```bash
npm run dev
```

---

3-2. 푸시 알림을 보낼 서버 함수 만들기

그럼 이제 본격적으로 푸시 알림을 보낼 서버 함수를 만들어보자. 현재 나의 설치한 버전은 다음과 같다.

```json:server/functions
"dependencies": {
  "firebase-admin": "^12.1.0",
  "firebase-functions": "^5.0.0"
  },
  // 생략...
```

firebase function에서 fcm을 설정하는 방법으로는

1. HTTP 요청을 통해 함수를 호출하는 방식
2. 클라이언트 앱에서 Firebase Admin SDK를 이용해 함수를 호출하는 방식

이렇게 두가지가 있다.

[FCM 서버 옵션 선택](https://firebase.google.com/docs/cloud-messaging/server?hl=ko&_gl=1*dim01k*_up*MQ..*_ga*MTIwMTg1MTgwMS4xNzE4MzYyMjcw*_ga_CW55HF8NVT*MTcxODM2MjI2OS4xLjAuMTcxODM2MjI2OS4wLjAuMA..#choosing-a-server-option)

나는 네트워크 요청 없이 클라이언트에서 그냥 바로 함수를 호출하면 되는 방식이 굉장히 편리할 것 같아서 Firebase Admin SDK를 통해 함수를 호출하는 것을 선택했다. 네트워크를 통해 함수를 호출하려면 `onRequest`를 써야하지만 Firebase Admin SDK를 통해 함수를 호출하려면 `onCall`을 사용하면 된다.

```javascript:server/functions/src/index.ts
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// 아래 서버 함수 작성
```

```javascript:client/src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { connectFunctionsEmulator } from 'firebase/functions';

// ...생략

const messaging = getMessaging(app);
const functions = getFunctions();

// ✅ 로컬 환경에서 서버 함수를 작동시키는 에뮬레이터 가동
if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
```

그렇다면 아까 클라이언트에서 firebase를 초기화해주는 파일에서 firebase functions 관련 함수를 작성해준다. `connectFunctionsEmulator도` 같이 설정해주면 실시간으로 서버 함수가 실행되는 모습을 볼 수 있다.

#### 특정 유저에게 푸시 알림 보내기

여기서 서버 함수를 작성하며 알림을 테스트하면서 굉장히 많이 헤맸다. 일단 특정 유저에게 알림을 보내는 함수를 작성했는데 완성 코드는 아래와 같다.

```javascript:server/functions/src/index.ts
export const sendUnicast = onCall(async (request: { data: FcmUnicastData }) => {
  const {
    data: { token, title, body, link },
  } = request;

  if (!token) {
    throw new HttpsError('not-found', '토큰이 없습니다');
  }

  const message = {
    data: {
      title,
      body,
      link,
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    return { success: true, response };
  } catch (error) {
    console.log('Error sending message:', error);
    throw new HttpsError(
      'internal',
      '알림 전송 중 오류가 발생했습니다.',
      error
    );
  }
});
```

특정 한 유저에게만 알림을 보낼 떄는 해당 유저의 토큰만 가져와서 `send` 메서드를 통해 알림 관련 정보만 보내주면 되기 때문에 비교적 간단한 편이다. 그런데 문제가 있었다. 개발 환경에서 Foreground나 Background 상태에서 잘 수신되는 것을 확인했는데, 배포하고 나서가 문제였다. 데스크탑 브라우저에서는 Foreground나 Background 상태에서 모두 알림을 잘 수신했지만, 스마트폰 모바일 브라우저에서는 Foreground 상태에서 알림을 수신하지 못했다. 그래서 스마트폰을 노트북과 연결해 디버깅한 결과 서버가 문제라는 500 에러만 계속 발생했다.

그래서 알림 발송 결과에서

```json
{
  "verifications": {
    "app": "MISSING", // ❗️app이 MISSING
    "auth": "VALID"
  },
  "logging.googleapis.com/labels": {
    "firebase-log-type": "callable-request-verification"
  },
  "severity": "DEBUG",
  "message": "Callable request verification passed"
}
```

app이 Missing이라고 뜨는게 원인인가 싶어서 App Check 설정까지 마쳤는데도 Foreground 상태에서 알림은 수신되지 않았다. 왜 `onMessage`가 작동을 안하는지 계속 디버깅을 해보다가 서비스 워커에서 `onBackgroundMessage`를 `push` 이벤트 리스너로 변경해보았다.

```javascript:firebase-messaging-sw.js
// 위와 동일 생략...

/* ❗️ 백그라운드 상태일때 알림 수신
// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message: ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = { body: payload.notification.body };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

/* ✅ 푸쉬 이벤트로 변경 */
self.addEventListener('push', function (event) {
  if (event.data) {
    const {
      data: { title, body, link },
    } = event.data.json();

    const options = {
      body,
      data: {
        link,
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } else {
    console.log('푸시 이벤트 데이터가 없습니다.');
  }
});
```

이렇게 변경했더니 개발과 배포 환경, 포그라운드와 백그라운드 모두 알림이 정상적으로 수신되었다. 대체 왜 `onMessage`가 왜 배포환경에서 작동을 안하는지 원인을 찾아보았으나 정확하게 알진 못했다. 하지만 아마 추측하기론 나의 버전문제 때문인 것 같았다.  
[Firebase Blog: fcm for safari ](https://firebase.blog/posts/2023/08/fcm-for-safari/)  
 9.6.1 버전에서는 아직 Firebase가 푸시 알림을 지원하지 않는다고 했기 때문이다. 아시는 분은 알려주시면 감사하겠습니다.🙂 다행히 해결책을 찾아서 `onMessage`와 `onBackgroundMessage` 관련 코드를 지우고 `push` 이벤트 리스너로 적용하기로 했다.

주의할 점은 이 방법으로 하려면 알림을 모두 data를 키로 가진 객체값으로 작성해야 한다.

```javascript
// ⭕️
const message = {
  data: {
    title,
    body,
    link,
  },
  token,
};

// ❌
const message = {
  notification: {
    title,
    body,
  }
  webpush: {
    fcmOtions: {
      link
    }
  }
  token,
};
```

서버 함수에서는 알림 정보를 데이터 형식으로만 제공해주고, 서비스 워커의 `push` 이벤트 리스너가 이 알림을 수신해준다. 만약 `notification`을 키로 가진 객체값을 같이 작성할 경우 **알림이 중복**으로 오게 되니 주의해야 한다.

#### 여러 유저에게 푸시 알림 보내기

```javascript:server/functions/src/index.ts
// 생략...

const db = admin.firestore();

export const sendMulticast = onCall(
  async (request: { data: FcmMulticastData }) => {
    const {
      data: { title, body, link, uid },
    } = request;

    const tokensSnapshot = await db.collection('FCMNotification').get();
    const tokens = tokensSnapshot.docs
      .filter((doc) => doc.id !== uid)
      .map((doc) => doc.data().tokens)
      .flat()
      .filter((token) => typeof token === 'string' && token.trim() !== '');

    if (tokens.length === 0) {
      throw new HttpsError('not-found', '토큰이 없습니다');
    }

    const message = {
      data: {
        title,
        body,
        link,
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      return { success: true, response };
    } catch (error) {
      console.log('Error sending message:', error);
      throw new HttpsError(
        'internal',
        '알림 전송 중 오류가 발생했습니다.',
        error
      );
    }
  }
);
```

여러 유저에게 알림을 보내려고 할 때는 `sendEachForMulticast` 메서드를 사용했다. 해당 메서드는 어떤 알림이 성공했고 실패했는지 결과까지 상세하게 알려준다. 그리고 클라이언트에서 FireStore에 저장한 유저의 토큰들을 불러와서 하나의 배열로 만들어주었고, 해당 토큰들로 알림을 보내주었다.

알림을 잘 만든 것을 확인한 후에 Firebase Functions에 저장해주면 된다.

```bash
firebase deploy --only functions
```

만약 함수 하나만 수정해서 저장하고 싶은 경우 아래와 같이 작성해주면 된다.

```bash
firebase deploy --only functions:sendUnicast
```

이렇게 서비스에 서버 함수들을 잘 등록해주었다면 콘솔에 이렇게 함수들이 잘 뜰 것이다.

![firebase-functions](/public/images/web/how-to-implement-push-notifications-with-fcm-and-firebase-functions/firebase-functions.png)

서버 함수들을 잘 등록했다면 이제 클라이언트에서 `getFunctions`, `httpsCallable`을 이용하여 불러온다. 그럼 해당 서버 함수들을 이제 자유자재로 사용할 수 있게 된다.

```javascript:firebase.ts
//생략...
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from 'firebase/functions';

interface NotificationData {
  title: string;
  body: string;
  link: string;
}

export interface FcmUnicastData extends NotificationData {
  token: string;
}

export interface FcmMulticastData extends NotificationData {
  uid: string;
}

interface CallableResult {
  successCount: number;
  failureCount: number;
}

//생략...

export const sendUnicast = httpsCallable<FcmUnicastData, CallableResult>(
  functions,
  'sendUnicast'
);

export const sendMulticast = httpsCallable<FcmMulticastData, CallableResult>(
  functions,
  'sendMulticast'
);
```

## 토큰 관리

알림을 잘 발송하고 수신되는 것을 확인했다면 이제 토큰을 어떻게 관리해야할지 생각해보아야할 차례이다. 독서모임 한페이지 서비스는 실제 유저들이 사용하는 서비스이기 때문에 더욱더 푸시 알림에 대한 관리를 해야했다. 어떤 유저는 알림을 받았는데 어떤 유저는 못받으면 안되기 때문이다. 그런데 토큰은 주기적으로 변경될 수 있고, 또 사용자가 앱을 삭제한다던가, 캐시를 삭제한다는 이유 등등으로 갑자기 유효하지 않은 토큰이 될 수 있다. 그렇게 되면 유효하지 않은 토큰에 계속 무의미한 서버 함수를 실행시키는 꼴이 된다. 그래서 푸시 알림을 구현한 이후에 토큰 관리를 어떻게 할지 많이 고민했다.

공식문서에서도 토큰을 관리하는 것을 권장하고 있다.  
[FCM 등록 토큰 관리를 위한 권장사항](https://firebase.google.com/docs/cloud-messaging/manage-tokens?hl=ko)

공식문서에 나온 내용은

- 기본 권장사항

  1. 서버에 토큰을 저장한다.

     앞서 데이터베이스에 FCM과 관련해 토큰 데이터를 저장했다.

  2. 저장된 토큰 중 비활성화된 토큰을 삭제한다.

     실제로 테스트를 해보면서 비활성화된 토큰들이 발생했고 전송 실패 결과가 떴다. 클라이언트에서는 토큰을 배열에 추가만 하기 때문에 시간이 지날수록 유효하지 않은 토큰들은 계속 쌓일 것이었다. 그래서 어떻게 할지 고민하다가 일단 알림을 보내고 실패 결과가 뜬 토큰들은 문서에서 삭제하기로 했다.

     ```javascript:server/functions/index.ts
     // 생략...

     try {
        // 알림 전송
        const response = await admin.messaging().sendEachForMulticast(message);

        // 응답받은 데이터로 유효하지 않은 토큰 배열 생성
        const invalidTokens = tokens.filter((_, index) => {
          const errorCode = response.responses[index].error?.code;
          return errorCode === 'messaging/registration-token-not-registered';
        });

        if (invalidTokens.length > 0) {
          const deletePromises = invalidTokens.map(async (invalidToken) => {
            // Firestore에서 토큰이 포함된 문서 찾기
            const snapshot = await db
              .collection('FCMNotification')
              .where('tokens', 'array-contains', invalidToken)
              .get();

            const updatePromises = snapshot.docs.map(async (doc) => {
              const docData = doc.data();
              const updatedTokens = docData.tokens.filter(
                (token: string) => token !== invalidToken
              );
              await doc.ref.update({ tokens: updatedTokens });
            });
            await Promise.all(updatePromises);
          });
          await Promise.all(deletePromises);
        }
     }
     ```

     이렇게 알림을 보낼 때마다 유효하지 않은 토큰이 발견된다면 삭제까지 해주는 로직을 작성했고, 덕분에 유효하지 않은 토큰이 우후죽순 쌓일 걱정은 덜었다.

  3. 정기적으로 토큰을 업데이트한다.

     공식문서에서는 **한달에 한번**을 주기로 토큰을 업데이트 해주면 된다고 이야기한다. 일단을 클라이언트에서 앱이 실행되면 현재 토큰과 데이터베이스에 있는 토큰을 비교후 업데이트하는 형식으로 작성했다.

     ```javascript:client/src/App.tsx
     const compareTokenInDB = async () => {
       const token = await getDeviceToken();

       const isExistTokenInDB = fcmDoc?.tokens?.find(
         (fcmToken) => fcmToken === token
       );

       if (isExistTokenInDB) return;

       if (!isExistTokenInDB && userData?.uid) {
         const document = doc(dbService, FCM_NOTIFICATION, userData.uid);
         const fcmData = {
           createdAt: Date.now(),
           tokens:
             fcmDoc?.tokens?.length !== 0 ? [...fcmDoc?.tokens, token] : [token],
         };
         await updateDoc(document, fcmData);
       }
     };

     useEffect(() => {
       const permissionGranted =
         Notification.permission === 'granted' && fcmDoc?.notification === true

       if (permissionGranted) {
         compareTokenInDB();
       }
     }, [])
     ```

## 앞으로 구현해볼 것

여기까지 FCM으로 푸시 알림을 어떻게 구현했는지 작성해보았다. 구현하는 과정에서 정말 공식문서 전체를 다회독했고, 여러 문서, 영상들을 많이 봤던 것 같다. 공부한 것들을 적용해보면서 많은 에러들을 고쳐나갔고, 또 어떤 로직으로 좀더 신뢰성이 높은 코드를 짜야할지 많은 고민을 했다. 이렇게 그동안 개발했던 과정들을 복기하며 다시 정리하니 좀더 이해가 잘 된 느낌이다!😃 글은 너무 길지만...😅

하지만 이것이 끝이 아니라 더 개발해야할 것들이 있다. 현재 여기까지 구현하고 배포했는데, 다음에는 **스케쥴 함수**를 한번 적용해보고 싶다. 현재는 클라이언트에서 서버 함수를 트리거해야 푸시 알림 기능을 사용할 수 있는데, 특정 요일에 알아서 발송되어야 하는 알림도 있다. 예를 들어 투표하기에서 투표 종료일 다음날에 투표 결과를 유저들에게 알림을 보낼 수 있을 것이다. 그런 경우에는 Firebase Functions 예약 함수인 `onSchedule` 메서드를 사용하고 Google Cloud PlatForm을 설정하면 되는 것 같다. 이 부분도 구현하고 나면 포스트로 작성해보려고 한다!

## 후기

독서모임 멤버들이 원했던 기능인 푸시 알림 기능을 완성해서 아주 뿌듯했다. 또 한편으로는 웹의 무궁무진한 발전 가능성을 직접 목도한 순간이었던 것 같다. 웹을 모바일 기기에서 앱으로 설치해 실제 앱처럼 보이고 푸시 알림까지 받을 수 있는 것을 보다보니 정말 신기하고 또 앞으로 웹의 미래는 또 어떻게 될까 기대가 되기도 했다. 웹앱에서 푸시 알림을 구현하려고 하는 분들에게 도움이 되는 글이었으면 좋겠다.

## 참고

[Firebase-JS-SDK Issue](https://github.com/firebase/firebase-js-sdk/issues/5403)  
[서비스 워커의 ES 모듈](https://web.dev/articles/es-modules-in-sw?hl=ko)  
[브라우저에서 알림 구현하기](https://blog.pium.life/web-push/)  
[FCM 시작하기](https://firebase.google.com/docs/cloud-messaging?hl=ko&_gl=1*1c2cm9z*_up*MQ..*_ga*MjEzNzM3Nzc1NC4xNzE4NTM1ODA4*_ga_CW55HF8NVT*MTcxODUzNTgwOC4xLjAuMTcxODUzNTgwOC4wLjAuMA..)  
[Firebase Functions 시작하기](https://firebase.google.com/docs/functions/get-started?hl=ko&_gl=1*1wn2txp*_up*MQ..*_ga*MTk4NjU3MzY4NC4xNzE4MDAzMDE3*_ga_CW55HF8NVT*MTcxODAwMzAxNi4xLjAuMTcxODAwMzAxNi4wLjAuMA..&gen=2nd)  
[FCM 서버 옵션 선택](https://firebase.google.com/docs/cloud-messaging/server?hl=ko&_gl=1*dim01k*_up*MQ..*_ga*MTIwMTg1MTgwMS4xNzE4MzYyMjcw*_ga_CW55HF8NVT*MTcxODM2MjI2OS4xLjAuMTcxODM2MjI2OS4wLjAuMA..#choosing-a-server-option)
[FCM 등록 토큰 관리를 위한 권장사항](https://firebase.google.com/docs/cloud-messaging/manage-tokens?hl=ko)  
[Firebase Blog: fcm for safari ](https://firebase.blog/posts/2023/08/fcm-for-safari/)  
[[FrontEnd] FCM을 이용해 웹 푸시 알림 적용하기](https://medium.com/@tellingme/frontend-fcm%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%9B%B9-%ED%91%B8%EC%8B%9C-%EC%95%8C%EB%A6%BC-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-368d90974b7)  
[웹 푸시알림 적용하기(with.FCM)](https://velog.io/@sang-mini/%EC%9B%B9-%ED%91%B8%EC%8B%9C%EC%95%8C%EB%A6%BC-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0with.FCM)
