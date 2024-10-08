## 2년 전 출시했던 프로젝트: 독서모임 한페이지 기록앱

이 사이드 프로젝트는 2년 전인 2022년도에 내가 참여하고 있는 독서모임을 위해 만든 서비스 애플리케이션이었다. 이전에 관련글도 작성했었으니 이 프로젝트에 대해 더 궁금하신 분들은 이 글을 읽어보시면 좋을 것 같다. 이번 글에서는 2년 동안 해당 서비스를 어떻게 업데이트해왔는지에 대해 작성해보려고 한다.

사실 2022년 출시하고 나서 2023년 1년동안 화면상으로 엄청 큰 변화가 있지는 않았다. 좋아요 기능을 추가했고, 버그나 UI를 수정, Firebase 데이터베이스 구조 등등을 변경하긴 했지만 화면에서의 큰 틀은 변경하지 않았던 것 같다. 서비스와 그 기능들을 안정화하고 폴더 구조를 최적화하는 것에 집중했던 해였다.

해가 바뀌어 2024년이 되자 새해기념으로 독서모임 한페이지 기록앱을 완전히 새로 리뉴얼했고, 버전 2.0.0으로 업데이트했다. 서비스 어플리케이션을 어떻게 유지보수하고 업데이트했는지 2024년 버전으로 다시 회고해보려고 한다.

## 2024년 업데이트

![2024년 화면 설계도](/public/images/side-projects/bookclub-hanpage-app-review/화면%20설계도%202024.png)

위의 이미지에서 빨간색 박스가 업데이트하면서 새로 추가된 페이지이다. 이외에도 모든 페이지에서 변경이 있었다. 새롭게 서비스를 업데이트하고 유지보수하면서 느꼈던 건 모임에서 새롭게 시작하고자 하는 것, 수정되거나 추가된 규칙 등에 영향을 받아 코드를 변경하게 된다는 것이었다.

2023년에는 많은 변화가 없어서 웹페이지도 많이 바뀌지 않았었으나 2024년 신년맞이 모임을 가지면서 모임운영과 방향에 대한 회의를 했고, 그 과정에서 웹사이트를 완전히 새롭게 리뉴얼해야겠다는 생각을 하게 되었다.

### 사용자 경험 향상을 위한 UI 변경

웹사이트에서 사용자 경험은 굉장히 중요하다고 생각하는 편이다. 왜냐하면 사용자가 편리하다고 느껴야 이탈하지 않고 계속 이용할 것이기 때문이다. 물론 초기에는 욕심만 많아서 이것저것 기능들을 다 넣으려고 했지만, 이제는 기능을 추가할 때 이것이 정말 사용자들이 사용할만한 것인지, 유용한 것인지 한번 더 필터링을 거치고, 사용되는 기능이라면 이것이 사용자들이 헷갈리지 않고 편리하게 사용할만한가?를 따지면서 변경했다. 그 결과 아래와 같은 변경이 있었다.

1. **폰트 변경**

   ![홈화면](/public/images/side-projects/bookclub-hanpage-app-review/홈화면.png)

   원래는 다른 아기자기한 폰트를 사용했었는데, 발제문과 정리 기록 같은 긴 글을 읽어야 하는 웹페이지 특성상 가독성 있는 폰트가 더 적합하다고 생각되어 변경했다.

2. **추천책 정보를 위치 홈으로 변경**

   ![홈화면에 있는 추천책 리스트](/public/images/side-projects/bookclub-hanpage-app-review/추천책.png)

   월별로 모임에서 멤버들이 추천했던 책들을 작성할 수 있는데, 변경 전에는 이전 모임의 월별 모임 정보에 일일이 들어가서 확인해야했다. 이렇게 되면 많은 멤버들이 이달에는 추천책이 뭐가 있었지 생각하며 찾아볼 것 같지 않았다. 따라서 추천책 정보들만 빼서 아예 홈에 보여줘야겠다고 생각했다.

3. **텍스트 Editor 툴바를 더 간단하게 변경**

   ![에디터 툴바](/public/images/side-projects/bookclub-hanpage-app-review/에디터툴바.png)

   기존에는 툴바에 글을 화려하게 만들 수 있는 텍스트 에디터 툴들이 많았다. 하지만 사용자들이 이 툴들을 다 사용하지 않았고, 오히려 많은 에디터 툴들이 사용자들에게 혼란을 주는 것 같았다. 그래서 머리글, 취소줄, 전체 지우기 같은 툴바 기능은 삭제하고 기본 툴(글자색 팔레트, 목록, 이탤릭, 인용문, 링크)만 제공하는 것으로 변경했다.

4. **모임 규칙 노션 링크 제공**

   이 부분은 사소하다고 할 수 있지만 좀 더 섬세하게 멤버들에게 편리함을 주고 싶었다.
   기존에는 키톡의 공지사항에만 모임 규칙 노션 링크가 있었는데 해당 링크를 웹페이지 하단에 같이 사용함으로서 접근성을 높였다.

위의 부분들을 어떤 것이 사용자 경험을 높일 수 있을까 고민하면서 변경했던 부분이다. 확실히 사용자 경험을 더 신경쓰니 실제로 이용률이 더 높아진 것을 확인할 수 있었다. 또한 Firebase에서 Spark 무료 요금제를 쓰고 있기 때문에 정확한 통계를 제공해주지는 않지만, 쓰기 사용률을 확인해보니 한달간 약 30개가 평균적으로 잡혔는데, 위의 변경 이후 50개로 정도로 160%가 증가했다. 물론 챌린지 이벤트나 모임 불참 설정 등 기능이 더 많아진 덕분도 있다.

### 사용자 경험 향상을 위한 기능 추가

1. **좋아요 기능**

   이 기능은 사용자들의 참여율을 더 높이기 위해 만든 기능이다. 현재 댓글 기능도 없기 때문에, 예를 들어 모임 후기글을 써도 내 글이 누군가에게 읽히고 있는지 알수가 없다는 느낌이 있었다. 해당 느낌을 희석하고 누군가 글을 읽었다는 것을 확인시키기 위해 좋아요 표시를 만들었다. 확실히 해당 기능을 만드니 멤버들이 후기를 많이 올려주었고 서비스 이용률이 증가했다.

2. **이달의 불참 멤버 명시 테이블 기능**

   ![불참 멤버 표시](/public/images/side-projects/bookclub-hanpage-app-review/월별정보.png)

   이 부분은 모임에서 멤버들이 사정이 생겨 못나오게 될 경우를 위해 직접 불참하는 달을 명시하도록 만든 기능이다. 해당 기능으로 월별로 어떤 멤버들이 불참하는지 쉽게 확인할 수 있다.

### 수정되거나 추가된 모임 규칙에 따른 기존 코드 변경

서비스 애플리케이션은 끊임없는 요구사항에 맞춰 변화하고 개발해야하는 것을 느낄 수 있었던 부분이었다. 기존의 모임 규칙이 바뀌다 보니 모임 규칙과 관련된 기존 코드를 변경해야 하는 경우가 있었다.

1. **월별 발제자는 한명만 가능했던 것에서 여러명 가능 변경**

   기존에는 발제자는 월별로 한명씩 정했기 때문에 한명만 고를 수 있도록 코드를 짰으나 이번해에는 두명이 같이 발제를 준비하고 싶다는 의견이 있었다. 해당 의견이 반영되어 웹페이지도 발제자를 여러명 선택할 수 있도록 변경되었다.

2. **다음달 발제자가 직접 다음 모임책 등록하도록 변경**

   이제 매달 셋째주 모임날까지 다음달 발제자는 다음 책을 정해오기로 규칙이 변경되었다. 이에 따라 웹사이트도 관리인이 직접 다음달 책을 등록했던 것과 달리 다음달 발제자가 직접 다음달 책을 등록할 수 있게 변경했다.

3. **발제자의 모임 정리 기록 등록 추가하도록 변경**

   2024년에 만들어진 규칙은 아니지만, 2023년 중순에 모임이 끝나면 모임에서 나눴던 이야기를 간단하게 정리하는 기록을 작성하기로 규칙을 변경했다. 이에 따라 발제문 뿐만 아니라 발제자의 정리 기록 전용 페이지를 만들고 관리할 수 있게 개발했다.

### 2024년 새롭게 시작한 독서 미션에 따른 업데이트

위에서 모임 규칙 변화에 따른 기존 코드를 변경했다면 이번에는 아예 새로운 페이지를 개발하게 되었다.

1. **2024년 개인별 챌린지 페이지 추가**

   ![챌린지](/public/images/side-projects/bookclub-hanpage-app-review/챌린지.png)

   이번 2024년에는 모두가 도전하고 싶었던 책을 완주하는 이벤트를 하기로 했다. 이 이벤트를 **2024년 개인별 챌린지**라고 명명하고, 이 이벤트를 위한 페이지를 만들기로 했다.

   이 페이지에서 개인별로 도전하고 싶은 책과 전체 페이지 수를 등록하면 이렇게 개인별로 박스가 생성된다. 그러면 이제 아래 게이지가 표시되고 현재까지 읽은 페이지를 수정해서 게이지를 채우는 식으로 만들었다. 멤버들이 너무 재밌어 해서 뿌듯했다.

   - 멤버들과 공유하고 싶은 문구 페이지 추가

     이 부분은 한 멤버의 요청이 있었다. 챌린지 책을 읽으면서 좋은 문구가 있으면 다 같이 공유할 수 있는 기능이 있었으면 좋겠다는 것이었다. 정말 이 기능이 있으면 좋을 것 같아서 의견을 받아들였고, 문구를 작성할 수 있는 페이지도 만들었다.

## 앞으로 해야하는 업데이트

1. **웹 알림 구현**

   이렇게 두가지가 있다. 특히 웹 알림은 등록된 글을 즉각적으로 수신하기 위해 해야겠다고 느꼈다. 발제문과 정리기록은 카카오톡 공유하기로 알려주기 때문에 바로 읽을 수 있지만 모임 후기나 추천책 같은 경우는 글을 써도 나중에 읽게되고, 그렇게 되면 참여율이 높아질 수가 없다고 생각했다.

2. **페널티 현황표 구현**

   현재 모임에서 페널티로 추가 발제문이나 벌금을 걷고 있다. 이 현황표를 노션 페이지에서 볼 수 있게 했는데 이 부분을 홈페이지로 바로 가져오려고 한다.

다른 우선순위가 있기 때문에 언제 할지는 아직 정하지 않았지만, 웹 알림은 빨리 해야할 것 같다.

&nbsp;

여기까지 2024년 1월부터 현재 3월까지 업데이트한 점들에 대해 작성하고, 왜 업데이트에 대해 회고해보았다. 사용자 경험을 향상시키기 위해 많은 UI를 변경했고, 기능을 추가했으며, 기존 모임 규칙 변화에 따라 기존 코드를 변경하거나 유지보수해야하기도 했으며, 새롭게 추가된 이벤트에 따라 새로운 페이지를 개발해야하기도 했다. 그리고 이 모든 개발과 유지보수를 하면서 나름의 근거를 가지고 개발을 했었던 것 같다. 그리고 그 과정에서 독서모임 한페이지 멤버들의 웹사이트 이용률이 160% 정도로 눈에 띄게 증가했다.

작년말에는 웹사이트를 보고 독서모임이 굉장히 체계적이라서 가입하고 싶다는 분도 계셨다. 2년간 기존 멤버가 모임을 그만두거나, 잠깐 정지하기도 했고 새로운 멤버들이 들어오기도 했는데, 앞으로도 독서모임은 잘 굴러갈 것 같다. 앞으로도 업데이트는 열심히 계속해야겠다.
