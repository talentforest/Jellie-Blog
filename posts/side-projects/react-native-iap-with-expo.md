현재 앱개발은 완료하고 인앱결제 기능을 구현하고 있는 중이다. 나는 Expo React Native 환경에서 인앱결제를 구현하고 있는데, 정말 여러가지 난관들이 있었다. 그리고 expo 환경에서의 자료들이 정말 없어서 지금까지 내가 해결한 과정들을 공유하려고 한다.

사실 해당 사이드 프로젝트는 그냥 React Native를 공부하면서 이왕이면 스토어에 배포도 해보자라는 생각으로 개발한 간단한 프로젝트였기 때문에 인앱결제를 구현할 생각이 없었다. 그래서 쉽게 Expo 환경을 선택했는데, 점점 갈수록 좀 더 완성도 있는 앱에 욕심이 생겼고 인앱결제도 구현하고 싶었다. 나중에 인앱결제기능도 구현해봐야겠다는 생각이 들어 찾아보니...!

Expo에서 인앱결제 라이브러리를 직접 제공하지 않고 있었다…! 내가 알고 있었던 expo-in-app-purchase는 2022년도에 중단되었고 23년에는 아예 없앨 예정이라고 한다.🤪 그래서 expo 공식문서에는 eas build와 호환이 되는 [react-native-iap](https://github.com/dooboolab/react-native-iap)나 [react-native-purchases](https://www.revenuecat.com/blog/using-revenuecat-with-expos-managed-workflow/) 라이브러리를 대신 사용하라고 안내되어있었다.

걱정이 되는 부분은 아래와 같았다.

## 🙄그래서 지금 내 앱에서 인앱 결제가 가능한건가…?

1. **현재 expo 환경인데…**

   ⇒ 찾아보니 expo 환경에서도 react-native-iap 라이브러리의 경우 app.json에서 플러그인 설정만 하면 사용할 수 있다고 한다.

   [how-do-i-use-react-native-iap-in-expo](https://react-native-iap.dooboolab.com/docs/faq#how-do-i-use-react-native-iap-in-expo)

2. **expo go에서는 작동하지 않는다는데…**

   : `expo-dev-client`를 통해 development build 모드에서 작동하는 것 같다. 그러니까 expo 공식문서에서 eas build와 호환이 되는 [react-native-iap](https://github.com/dooboolab/react-native-iap) 나 [react-native-purchases](https://www.revenuecat.com/blog/using-revenuecat-with-expos-managed-workflow/) 라이브러리를 사용하라고 안내되어있지 않았을까? 아예 안됐으면 공식문서에서 쓰지도 않았겠지…?(지금 해보니 된다.)

   [development build에 대해 더 자세히 알아보기](https://docs.expo.dev/develop/development-builds/introduction/)

3. **서버가 없는 클라이언트만 있는 앱인데…**

   ⇒ 찾아보니, [react-native-iap](https://github.com/dooboolab/react-native-iap) 라이브러리의 경우 서버 없이도 인앱 결제가 가능하다고 한다. 그리고 실제로 서버 없이 구현했다고 작성한 블로그도 있었다.

   [how-do-i-validate-receipt-in-android](https://react-native-iap.dooboolab.com/docs/faq/#how-do-i-validate-receipt-in-android)

   : 서버가 없다면 라이브러리에서는 결제 기능까지 제공하고 영수증 확인 같은 기능은 제공하지 않는다.

expo react native 환경에서 인앱 결제를 구현한 블로그 글이나 관련 정보를 정말 찾기가 힘들었지만, expo의 공식문서만 믿고 일단 시작해보기로 했다.

그러니까 나는 인앱결제 라이브러리로 react-native-iap를 사용하려고 하고, 일단 결제해주는 기능까지 구현하고, 영수증 확인 같은 기능은 다른 분이 해결하신 방법으로 적용해보려고 한다.

> 이 글에서는 안드로이드 버전만 작성하고 있으며 iOS 정보는 없습니다.

## Play Console에서 앱을 등록

아직 출시도 안할건데 무슨 앱 등록부터 한다는거지? 라고 생각할 수 있지만…(내가 그랬다). 순서가 구글 플레이 콘솔에 앱 정보를 등록하고 일종의 테스트를 거친 후 인앱 결제 상품을 생성해야하는 식이다. 일단 지금 큰 흐름만 적어보려고 한다. 자세한 구글 플레이 콘솔 앱 등록 순서는 이 [포스트](https://jellieblog.dev/posts/mobile-app-launch-on-google-play-console-after-nov-13)에서 확인하시길!

일단 흐름만 개괄적으로 작성해보자면,

1. 개발자 계정 생성 (+ 결제 프로필 설정)

   가장 먼저, 나는 11월 중순쯤에 개발자 계정을 생성했다. 그후, 결제 프로필(Payments)에 들어가서 설정 후 25달러 지불하면 일단 돈을 지급받을 수 있는 계정 생성은 완료한 것이다.

2. 비공개 테스트 진행, 검토 완료

   개발자 계정을 생성했다면 이제 인앱 상품을 등록하기 전 비공개 테스트를 활성화해야하고, 설정한 정보들을 전송해서 구글측의 검토가 완료되어야 한다.

   나는 앱을 출시하려면 최소한 ‘비공개 테스트’를 거쳐야한다고 한다고 해서 내부테스트 없이 그냥 바로 비공개 테스트를 진행했고, 요구하는 조건들을 입력하고 수정했다.

   ![react-native-iap-with-expo](/images/side-projects/react-native-iap-with-expo/react-native-iap-1.png)

   위에 보이듯이 12개 종류의 정보를 입력하고도, 2개의 스토어 등록 기본 정보도 작성해야한다.🤪  모든 필요한 정보를 다 작성하고 비공개 테스트 검토 요청이 완료되면 이제 인앱 상품을 생성할 수 있는 조건이 만족된 것이다.

   > 나는 이 버튼을 누르고 검토를 시작한뒤 4일 뒤에 검토 완료 표시가 뜨고 비공개로 스토어에 앱이 게시되었다. 보통 검토 기간은 최소 3일에서 8일 정도 소요된다고 한다.

## 인앱 상품 생성하기

드디어 앱 설정을 완료하고 구글에 전송해서 비공개 테스트가 활성화되었다면 이제 드디어 인앱 상품을 생성할 차례다.

이런식으로 Google Play Console 내 자신의 앱 대시보드로 들어가서 왼쪽 Drawer 하단을 보면 인앱상품이 나온다. 여기에 들어가면 아래와 같은 화면이 나온다.

![react-native-iap-with-expo](/images/side-projects/react-native-iap-with-expo/react-native-iap-2.png)

여기에서 상품 만들기 버튼을 누르고 제품 ID, 상품 세부정보, 가격, 세금 준수 프로그램 같은 항목을 작성하면 된다. 그리고 이 제품 ID로 인앱 결제 정보를 호출하게 된다고 한다.

> <다시 한번 주의할 점은 비공개 테스트가 완료되고, 스토어에 앱이 게시된 후에야 인앱상품 호출이 가능하다는 점이다. 그전까지는 인앱상품을 등록하고 활성화했어도 검색되지 않는다.

나는 위의 사실을 몰라서 검토 중인 기간동안 정말 왜 안되는지 좌절했었다;;; 모든 것을 다 맞게 설정했는데도 인앱상품 정보가 검색이 안돼서 정말 포기할 뻔했다. 여러분들은 그런 고통 겪지 마시길.

여기까지 콘솔에서의 설정을 모두 성공했다면 이제 로컬 환경으로 돌아가보자.

## React-Native-Iap에서 expo 세팅

1. 이제 본격적으로 인앱결제 라이브러리를 설치한다.

   expo-dev-client는 development build된 앱을 실행할 수 있도록 도와주는 앱이다. react-native-app은 expo go 환경에서는 작동하지 않기 때문에 꼭 이 라이브러리를 설치하고 development build된 환경에서 봐야 한다.

   [development build에 대해 더 자세히 알아보기](https://docs.expo.dev/develop/development-builds/introduction/)

   ```bash
   npm install expo-dev-client
   npm install react-native-iap
   ```

2. app.json이나 아니면 app.config.json 파일에서 아래 코드를 추가한다.

   ```json:app.json
   {
     "expo": {
       "plugins": ["react-native-iap"]
     }
   }
   ```

   - `paymentProvider` (_string_): payment provider to configure
     : `Play Store`, `Amazon AppStore`, `both`
     `paymentProvider` 라는 추가 속성을 넣을 수도 있는데, 이 속성은 어느 스토어에서 결제가 이루어지는지를 작성하는 속성이다. 만약 추가하지 않는다면 구글 플레이 스토어만 기본으로 적용된다.

     코드예시

     ```json:app.json
     {
       "expo": {
         // 생략...
         "plugins": [
           [
             "react-native-iap",
             {
               "paymentProvider": "both" // 이부분
             }
           ]
         ]
       }
     }
     ```

3. 이런식으로 추가하고, 다시 development build한다.

   ```bash
   eas build --profile development --platform android
   ```

4. 실제 기기에 development build한 앱 설치하기

   이렇게 expo 설정을 마쳤다면 로컬 환경으로 돌아간다.

   준비되어야 하는 것은, 실제 안드로이드 기기인데 왜냐하면 에뮬레이터 상에서는 돌아가지 않기 때문이다. 실제 기기에서 테스트하기 위해 expo-dev-client 라이브러리를 설치하고 expo development build를 했던 것이다.

   > 혹시 몰라 이야기하지만 주의할 점은 development build를 해야한다. production build가 아니다.

   ![react-native-iap-with-expo](/images/side-projects/react-native-iap-with-expo/react-native-iap-3.png)

   그렇다면, development build를 마쳤다고 생각하고, expo 홈페이지나 터미널에서 해당 빌드 상세 페이지로 들어간다. 그럼 apk를 다운받을 수 있는 QR 코드가 나오는데, 실제 테스트할 기기에서 이 QR 코드를 찍고 다운로드 받으면 된다. 그럼 내 기기에 파일로 다운받은 apk를 설치하면 된다.

   그럼 내가 설정한 앱아이콘으로 앱이 실제 기기에 설치된 것을 볼 수 있는데, 앱에 들어가면 expo 화면이 보이게 된다. 이 앱은 내 앱 + expo앱 이 합쳐진 버전이라고 생각하면 된다.

   그리고 프로젝트에서 아래 명령어를 통해 실행한다.

   ```bash
   npx expo start --dev-client
   ```

앱을 실제 기기에 설치했다면, 이제 진짜로 인앱 결제 기능을 구현해볼때닷.

먼저 결제 버튼을 만들기 전에 유용한 정보가 있어서 가져와봤다.

**인앱 구매 구현을 위한 모범 사례**

1. 명확한 제품 설명 제공
   각각의 인앱 구매 제품이 그 장점과 특징을 설명하는 명확하고 간결한 설명을 가지고 있는지 확인한다. 사용자는 구매를 하기 전에 자신이 구매하는 것이 무엇인지 잘 이해해야 한다.
2. 원활한 구매 흐름 제공
   사용자에게 마찰을 최소화하는 간단하고 직관적인 구매 흐름을 설계한다. 사용자가 구매 프로세스를 포기하도록 유도할 수 있는 불필요한 단계나 주의 산만함을 방지한다.
3. 오류 및 에지 사례 처리
   네트워크 문제, 실패한 트랜잭션 및 기타 에지 사례를 처리하기 위해 강력한 오류 처리를 구현한다. 사용자에게 유익한 오류 메시지를 제공하고 문제 해결을 위한 지원을 제공한다.
4. 보안 및 데이터 개인 정보 보호
   보안 연결(HTTPS)을 사용하고 데이터 개인 정보 보호 규정을 준수함으로써 사용자 데이터 및 결제 정보를 보호한다. 민감한 사용자 데이터를 디바이스 또는 서버에 불필요하게 저장하는 것을 방지한다.
5. 자동 갱신형 구독 구현
   만약 당신의 앱이 구독 기반의 인앱 구매를 제공한다면, 자동 갱신형 구독을 구현하는 것을 고려해보라. 이 모델은 지속적인 수익 흐름과 더 나은 사용자 유지를 보장한다.
6. 앱 내 구매 정보 현지화
   만약 당신의 앱이 다른 지역 또는 국가의 사용자를 대상으로 한다면 가격 및 설명을 포함한 현지화된 제품 정보를 제공해야 한다. 현지화된 정보는 사용자 경험을 향상시키고 전환율을 높인다.
7. 현지화된 가격 표시
   현지화된 가격을 사용자 통화로 표시하여 구매 경험을 보다 친숙하고 투명하게 만든다. 플랫폼별 API를 사용하여 앱스토어에서 현지화된 가격 정보를 검색한다.
   이러한 모범 사례를 따르면 사용자에게 원활하고 즐거운 인앱 구매 경험을 제공하여 사용자 만족도를 높이고 수익을 창출할 수 있습니다.
   출처 : https://medium.com/@greennolgaa/in-app-purchase-in-react-native-a-comprehensive-guide-777d608fd25

&nbsp;

## 결제 버튼 기능 만들기

![react-native-iap-with-expo](/images/side-projects/react-native-iap-with-expo/react-native-iap-4.png)

위의 로직은 react-native-iap 라이브러리에서 보여주는 구매 흐름 로직이다. 나는 백엔드가 없기 때문에 파란색 박스 표시를 한 부분인 구매 요청까지만 하고, 구글 측에서 알아서 처리해서 결제성공 / 결제실패 결과를 보내주면 그 결과를 사용자에게 적절하게 보여주면 될 것 같다.

다시 한번 말하지만 구글 플레이 콘솔에서 검토가 다 완료된 이후에 인앱 상품이 검색된다. 삽질하지 말자.

나는 react-native-iap에서 제공하는 hook으로 간편하게 구현할 수 있는 것 같아서 hook을 사용했다.

react-native-iap 공식문서의 **_LifeCycle_** 순서를 보면,

1. `initConnection`으로 결제를 먼저 연결하고

2. `getProducts`로 상품을 불러오고

3. 결제를 요청한 다음,

4. `endConnection`으로 결제를 끝낸다.

이런식으로 되어 있는데, useIAP 훅에서 1, 2, 4번을 정말 간편하게 메서드로 제공하고 있고 결제 상태를 알려주는 리스너도 제공해준다.

인앱 결제를 위해 일단 구현해볼 로직은 다음과 같았다.

일단 공통적으로 상품 검색(`getProducts`) → 결제 요청(`requestPurchase`)을 한다.

### 👍결제 성공 시

1.  성공시 받은 결과값을 asyncStorage에 영수증 확인용으로 purchaseToken을 저장한다.

2.  성공시 받은 결과값이 유효한 결과인지 검증 과정 필요하다. 안드로이드는 서버를 통해 확인이 가능한데, 서버가 없기 때문에 `getAvailablePurchase` 함수를 통해 결제 정보를 한번 더 가져와서 결제가 성공한 것인지 확인한 후 `finishTransaction`을 사용하여 결제 종료한다.

3.  결제 성공이 검증되었다면, limit 상태를 false로 업데이트하고 UI도 무제한으로 변경한다.

4.  어차피 삭제하면 asyncStorage 값도 없어지니 사용자가 앱에 들어올 때마다 인앱 결제 검증할 필요는 없겠다.

### 👎구매 실패 경우

1.  사용자가 결제를 취소한 경우

2.  사용자의 네트워크가 이상한 경우

3.  구글에서 구매 승인이 거절된 경우 (뭐 잔액 부족이나 그런 경우?)

### 🔎구매 복원

1.  복원은 `getAvailablePurchases` 를 통해 가져온다.

    해당 코드

    ```jsx
    import { useEffect } from 'react';
    import { View } from 'react-native';
    import {
      Text,
      TouchableOpacity,
    } from '../../components/common/native-component';
    import { requestPurchase, useIAP, withIAPContext } from 'react-native-iap';
    import { changeNoLimit } from '../../redux/slice/limitSlice';
    import { useDispatch } from '../../redux/hook';
    import { skus } from "./constants"
    import tw from 'twrnc';

    const PaymentBtn = () => {
      const {
        connected,
        products,
        getProducts,
        currentPurchase,
        currentPurchaseError,
        availablePurchases,
      } = useIAP();

      useEffect(() => {
        console.log('currentPurchaseError:', currentPurchaseError);
      }, [currentPurchaseError]);

      useEffect(() => {
        console.log('currentPurchase:', currentPurchase);
      }, [currentPurchase]);

      const dispatch = useDispatch();

      const handlePurchase = async (skus: string[]) => {
        if (connected) {
          await getProducts({ skus })
            .catch(() => console.log('상품을 불러올 수 없습니다.'))
            .then(() => {
              console.log(products);
              requestPurchase({ skus });
            })
            .catch(() => console.log('상품을 구매할 수 없습니다'));
            .then(() => dispatch(changeNoLimit()));
        } else {
          console.log('앱이 인앱결제에 연결되지 않았습니다.');
        }
      };

      return (
        <TouchableOpacity
          **onPress={() => handlePurchase(skus)}**
          style={tw`bg-blue-50 border border-blue-200 py-3.5 px-4 rounded-2xl`}
        >
          <Text fontSize={17} style={tw`text-blue-700`}>
            인앱상품 결제하기
          </Text>
        </TouchableOpacity>
      );
    };

    export default **withIAPContext**(PaymentBtn);
    ```

    이렇게 작성하면 버튼을 눌렀을 때 상품이 호출되고 `requestPurchase`를 통해 구매 요청까지 들어간다.

### 실제 기기에서 테스트해보기

에러 과정

그렇게 실제기기에서 인앱상품 결제하기 버튼을 눌렀는데 아래와 같은 에러를 만나게 되었다.

```bash:terminal
# useEffecth 속 currentPurchaseError
currentPurchaseError: {"code": "E_DEVELOPER_ERROR", "debugMessage": "Please ensure the app is signed correctly.", "message": "Google is indicating that we have some issue connecting to payment.", "responseCode": 5}

# 함수 오류
Possible Unhandled Promise Rejection (id: 1):
Google is indicating that we have some issue connecting to payment.
...
```

![react-native-iap-with-expo](/images/side-projects/react-native-iap-with-expo/react-native-iap-5.png)

![react-native-iap-with-expo](/images/side-projects/react-native-iap-with-expo/react-native-iap-6.png)

“Google is indicating that we have some issue connecting to payment.” 와 같은 에러가 나는 것은 라이선스 테스트를 제대로 등록하지 않았기 때문이다.

![react-native-iap-with-expo](/images/side-projects/react-native-iap-with-expo/react-native-iap-7.png)

원래는 위의 플레이 콘솔에서 라이선트 테스트 페이지에 들어가서 내 이메일을 등록하기만 하면 됐다는데 나는 **"라이선스 테스트를 사용하여 Play Intergrity API를 테스트할 수 없습니다."** 라는 안내 표시가 뜬다. 하지만 이 부분은 인앱 결제 통합을 테스트하는 것과 별로 상관이 없는 것 같아서 테스터들을 등록하고 LICENSED라는 응답을 받도록 설정했다.

#### 결제 성공 / 실패 확인하기

iOS에서는 앱 자체에서 결제가 성공했는지 알 수 있다고 하는데, 안드로이드는 서버가 있어야 가능하다. 하지만 나는 서버가 없기 때문에 `getAvailablePurchases`를 통해 이용 가능한 상품이 있는지 정보를 가져와서 결제를 확인했다.

## 좀더 고쳐야 하는 버그

- 이용권 구매 복원 실패했음에도 알림 창 뜨기 이전에 구매 상태로 전환되는 것

- 인앱 결제 환불 / 이용 자격 취소까지 체크?

  환불을 했음에도 `getAvailablePurchase`에 상품 정보가 뜬다. 이게 이용 자격 취소까지 체크를 했어야 정보가 안 불러와지나?
  [구글 인앱 결제 구현](https://velog.io/@for12v/구글-인앱-결제-구현)

&nbsp;

---

참고

- react-native-iap 관련

  - 공식문서: Hooks
    [Hooks | React Native IAP](https://react-native-iap.dooboolab.com/docs/api-reference/hooks)  
    [Announcing React Native IAP hooks](https://medium.com/dooboolab/announcing-react-native-iap-hooks-96c7ffd3f19a)

    - `developerPayloadAndroid` 속성이 있어야 하는가?

      https://github.com/dooboolab-community/react-native-iap/issues/986

  - 개괄적인 라이브러리 사용 파악  
    [React Native에서 인앱 결제 구현하기](https://deku.posstree.com/ko/react-native/react-native-iap/#개요)  
    [TIL: RN | 인앱 결제 react-native-iap Hooks (함수 컴포넌트 사용 시) - 221206](https://velog.io/@lumpenop/TIL-RN-인앱-결제-react-native-iap-Hooks-함수-컴포넌트-사용-시-221206)

  - 각 함수 공부 관련
    [개인블로그](https://mangoday.tistory.com/122)

  - getProducts 함수 에러 관련

    [getProducts always return null · Issue #124 · dooboolab-community/react-native-iap](https://github.com/dooboolab-community/react-native-iap/issues/124#issuecomment-386593185)

    [react-native-iap 관련 질문입니다.](https://forums.crossplatformkorea.com/topic/63/react-native-iap-관련-질문입니다/4)

  - expo build 관련

    [[Expo][react-native] Expo EAS Deploy, Build(android, ios)](https://velog.io/@tbdpapdl/Exporeact-native-Expo-Eas-Deploy-Build-android-ios)

- 구글 플레이 콘솔 관련

  - 최소한의 테스트를 통과해야 인앱상품을 호출할 수 있다
    [애플리케이션 라이선스로 인앱 결제 테스트하기 - Play Console 고객센터](https://support.google.com/googleplay/android-developer/answer/6062777?hl=ko)
  - 라이선스 테스터
    [인앱결제 테스트 주의사항](https://devmae.tistory.com/m/434)
  - 구글 플레이 결제 라이브러리 통합 테스트
    [Google Play 결제 라이브러리 통합 테스트  |  Google Play 결제 시스템  |  Android Developers](https://developer.android.com/google/play/billing/test?hl=ko)

- 개발자 제공 결제 정보 관련
  [Changes to Google Play's billing requirements for developers serving users in South Korea - Play Console Help](https://support.google.com/googleplay/android-developer/answer/11222040#zippy=,개발자-제공-결제-시스템과-함께-google-play-결제-시스템을-계속-제공해야-하는-이유는-무엇인가요,서비스-수수료를-계속-내야-하는-이유는-무엇인가요)
  [Google Play 결제 라이브러리 통합 테스트  |  Google Play 결제 시스템  |  Android Developers](https://developer.android.com/google/play/billing/test?authuser=1&hl=ko)
- 인앱결제 포괄적인 설명
  [In-App Purchase in React Native: A Comprehensive Guide](https://medium.com/@greennolgaa/in-app-purchase-in-react-native-a-comprehensive-guide-777d608fd25)
