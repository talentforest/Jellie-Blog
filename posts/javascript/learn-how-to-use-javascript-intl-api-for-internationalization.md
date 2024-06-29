## 자바스크립트의 Intl API

Intl는 어플리케이션의 국제화(Internationalization)을 위한 자바스크립트 API이다. Intl API는 자바스크립트 언어 차원에서 국가별 시간대를 변환해주고 숫자 구문 분석, 통화 기호 표시 변환 등 다양한 기능을 제공한다. Intl API를 사용하면 개발자는 사용자가 사용하는 다국어 환경에서 국제화된 데이터를 더 쉽게 처리할 수 있다. Intl는 대부분의 최신 브라우저에서 지원하고 있다.

```javascript
const formatter = new Intl.RelativeTimeFormat('ko-KR');

formatter.format(1, 'day'); // 1일 후
formatter.format(-1, 'day'); // 1일 전
```

위는 언어별로 상대적 시간을 나타내주는 간단한 예시이다. 보다시피 "1일 후", "1일 전" 이라는 상대적 시간을 표시해준다.

Intl은 항상 첫번째 인자로 어떤 지역의 언어인지를 작성해주고 두번째 인자에서 상세한 옵션을 설정해줄 수 있다. `new Intl`을 통해 먼저 국제화 포맷을 설정해주면, `format` 메서드를 통해 포맷에 따라 언어별로 표시할 수 있다.

그럼 `Intl`을 어떻게 활용할 수 있는지 알아보자.

## Collator로 문자 정렬하기

Intl.Collator는 배열에 있는 문자열을 비교해주는 생성자다. 단순히 문자열을 비교해주는 것이라면 그냥 sort() 메서드를 사용할수도 있겠지만 Intl.Collator는 다양한 설정을 통해 문자열을 정렬해줄 수 있다.

```javascript
const fruits = ['바나나', '사과', '가지', '수박'];
// 한국어로 문자열 비교
const formatter = new Intl.Collator('ko-KR').compare;

// sort로 문자열 정렬
console.log('✅: ', fruits.sort(formatter));
// ✅: [ '가지', '바나나', '사과', '수박' ]
```

문자열을 기준으로 어떤 배열을 정렬할 때 굉장히 유용하게 사용할 수 있을 듯한 API이다. 객체 배열에서 특성 문자열 속성을 기준으로 정렬할 수도 있다.

만약 대소문자 상관없이 알파벳 순으로 정렬하고 싶은 경우 손쉽게 `Intl.Collator`로 구현할 수 있다. 아래를 보면 옵션에 따라 결과가 달라진 것을 볼 수 있을 것이다.

```javascript
const fruits = ['Banana', 'Apple', 'Eggplant', 'apple', 'banana'];

console.log('✅: ', fruits.sort());
// 1. 일반 sort 메서드로 정렬한 경우
// ✅: ['Apple', 'Banana', 'Eggplant', 'apple', 'banana', 'eggplant'];

const lowerFormatter = new Intl.Collator('en-US', { caseFirst: 'lower' })
  .compare;

const upperFormatter = new Intl.Collator('en-US', { caseFirst: 'upper' })
  .compare;

console.log('✅: ', fruits.sort(lowerFormatter));
// 2. Collator로 caseFirst: 'lower'로 정렬한 경우
// ✅: ['apple', 'Apple', 'banana', 'Banana', 'eggplant', 'Eggplant'];

// 3. Collator로 caseFirst: 'upper'로 정렬한 경우
console.log('✅: ', fruits.sort(upperFormatter));
// ✅: ['Apple', 'apple', 'Banana', 'banana', 'Eggplant', 'eggplant'];
```

한국어는 대소문자가 없기 때문에 문자열이 알파벳인 경우에 더 유용한 API인 듯 싶다. 아래 두번째 인자로 들어가는 옵션들을 통해 더욱 세밀한 조정을 할 수 있다.

- Collator의 옵션들

  ```javascript
  // 두번째 옵션
  interface CollatorOptions {
    usage?: 'sort' | 'search' | undefined;
    // 비교 용도를 지정한다고 한다. sort는 정렬을 위한 것이며 search는 검색을 위한 것이다.
    localeMatcher?: 'lookup' | 'best fit' | undefined;
    // 로컬 매칭 알고리즘을 지정한다.
    // lookup은 단순한 매칭을 수행하며 best-fit은 가능한 최적의 로컬 매칭을 수행한다.
    numeric?: boolean | undefined;
    // 숫자값을 포함하는 문자열을 숫자로 비교할지 여부를 지정한다. true인 경우 문자열이 아닌 숫자로 비교된다.
    caseFirst?: 'upper' | 'lower' | 'false' | undefined;
    // 대소문자가 혼합된 경우 대문자를 우선할지 소문자를 우선할지 지정한다. false인 경우 대소문자를 무시한다.
    sensitivity?: 'base' | 'accent' | 'case' | 'variant' | undefined;
    // 비교의 민감도를 지정한다고 한다. 기본 문자만 비교할 것인지, 악센트나 대소문자, 아니면 모든 요소를 비교할 것인지 지정한다.
    collation?:
      | 'big5han'
      | 'compat'
      | 'dict'
      | ...생략
      | undefined;
    // 유니코드에 없는 특정 인코딩 방식인 경우 정렬 방식을 지정한다.
    ignorePunctuation?: boolean | undefined;
    // 구두점을 무시할지 여부를 지정한다.
  }
  ```

  이런 상세 옵션을 통해 어떻게 비교할 것인지 설정할 수 있다.

## ListFormat로 목록 형식 나타내기

`Intl.ListFormat`은 **배열을 지역에 맞는 목록 형식**으로 만들어준다.

```javascript
const countries = ['한국', '독일', '미국'];

const conjunctionFormatter = new Intl.ListFormat('ko-KR', {
  style: 'long',
  type: 'conjunction',
});

console.log('✅: ', conjunctionFormatter.format(countries));
// ✅: 한국, 독일 및 미국

const disjunctionFormatter = new Intl.ListFormat('ko-KR', {
  style: 'short',
  type: 'disjunction',
});

console.log('✅: ', disjunctionFormatter.format(countries));
// ✅: 한국, 독일 또는 미국
```

- ListFormat의 옵션

  - `type`

    종류로는 `conjunction`과 `disjunction`, `unit` 세가지가 있다.

    1. `conjunction`

       '및' 으로 나열한다. 영어로 and와 동일

       표시 => 한국, 독일 및 미국

    2. `disjunction`

       '또는' 으로 나열한다. 영어로 or와 동일

       표시 => 한국, 독일 또는 미국

    3. `unit`

       '및'이나 '또는' 같은 부사를 첨부하지 않고 항목만 나열한다.

       표시 => 한국, 독일, 미국

  - `style`

    종류로는 `long`과 `short`, `narrow` 세가지가 있다. 한국어는 `style` 속성의 차이가 드러나지 않지만 영어에서는 차이가 나타난다. 아래 예시로 보면 이해하기 더 쉬울 것이다.

    1. `long`

       표시 => 한국, 독일 및 독일

    2. `short`

       표시 => 한국, 독일, & 독일

       이렇게 기호로 표시하게 된다.

    3. `narrow`

       표시 => 한국, 독일, 미국

       부사나 기호로 표시하지 않고 콤마로만 표시한다.

  `style`과 `type`의 조합에 따라 표시되는 방식이 달라질 수 있다!

### formatToParts

`format`이 아닌 `formatToParts` 메서드를 활용하면 리스트로 나누어진 항목들을 **배열**로 받을 수 있다.

```javascript
console.log('✅: ', conjunctionFormatter.formatToParts(countries));
// array
// ✅:  [
//   { type: 'element', value: '한국' },
//   { type: 'literal', value: ', ' },
//   { type: 'element', value: '독일' },
//   { type: 'literal', value: ' 및 ' },
//   { type: 'element', value: '미국' }
// ]
```

### resolvedOptions

`resolvedOptions` 메서드를 사용하면 현재 설정에 대한 객체가 나온다.

```javascript
console.log('✅: ', formatter.resolvedOptions());
// object
// ✅: {
//   locale: 'ko-KR',
//   type: 'conjunction',
//   style: 'long'
// }
```

## NumberFormat로 숫자 형식 나타내기

언어에 맞는 숫자 서식을 지원한다. 예를 들어 **국가별 통화 가격 표시, 큰 숫자를 간결하게 표시하기, 퍼센트, 단위 형식 표시하기** 같은 것 등을 들 수 있다. 다양한 국가에서 가격을 표시하거나 결제가 지원되는 경우 이 API가 굉장히 유용할 것 같다.

그럼 먼저 주요 옵션에 대해 알아보고 그다음 실사용 예제를 알아보자!

- NumberFormat의 옵션들

  ```javascript
  interface NumberFormatOptions {
    localeMatcher?: string | undefined;
    style?: 'decimal' | 'currency' | 'percent' | 'unit' | undefined;
    // 읿반 숫자 형식인지, 통화인지, 퍼센트인지, 단위 형식인지를 지정한다.
    currency?: string | undefined;
    // 국가별 통화 단위를 지정한다.
  }
  ```

1.  가격을 통화에 맞게 간결하게 나타내기

    ```javascript
    // 영어 예시 1
    const price = 10000;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'usd',
    });
    console.log(formatter.format(price));
    // $10,000.00
    ```

    ```javascript
    // 한국어 예시 2
    const price = 10000;

    const formatter = new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    });
    console.log(formatter.format(price));
    // ₩10,000
    ```

2.  숫자 간결하게 나타내기

    ```javascript
    const views = 8000000;

    const formatter = new Intl.NumberFormat(navigator.language, {
      notation: 'compact',
      compactDisplay: 'long', // long은 Million / short는 M
    });

    console.log(formatter.format(views));
    // en-US -> 800 Million
    // ko-KR -> 800만
    ```

3.  퍼센트 형식으로 나타내기

    ```javascript
    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'percent',
    });

    console.log(formatter.format(1));
    // 100%
    ```

4.  특정 단위 형식으로 나타내기

    ```javascript
    const formatter = new Intl.NumberFormat(navigator.language, {
      style: 'unit',
      unit: 'kilometer-per-hour',
    });

    console.log(formatter.format(50));
    // 50km/h
    ```

    - 사용가능한 단위

      - 길이 (Length)
        "meter", "centimeter", "millimeter", "kilometer"

      - 질량 (Mass)
        "gram", "kilogram", "milligram"

      - 속도 (Speed)
        "meter-per-second", "kilometer-per-hour", "mile-per-hour"

      - 온도 (Temperature)
        "celsius", "fahrenheit"

      - 부피 (Volume)
        "liter", "milliliter"

      - 면적 (Area)
        "square-meter", "square-kilometer", "square-mile"

    한국에서 자주 사용될 같은 단위들을 가져와 보았다. 미국에서 사용하는 인치나, 야드 단위도 더 있으니 필요한 경우 찾아보면 될 것 같다.

여기까지 유용한 국제화 숫자 형식에 대해 알아보았다. 전세계에 서비스하는 경우 해당 API는 정말 유용하게 사용할 수 있을 듯하다. 이렇게 언어별로 숫자를 표시하는 것 이외에도 숫자의 범위를 나타낼 수도 있는데, 범위는 `formatRange` 메서드를 통해 나타낸다.

- `formatRange`

  ```javascript
  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  console.log(nf.formatRange(3, 5));
  // "$3 – $5"
  ```

  굉장히 간편하게 언어별로 범위를 나타낼 수 있었다!

  ```javascript
  console.log(nf.formatRange(2.9, 3.1)); // "~$3"
  ```

  만약 시작 범위와 마지막 범위의 값이 "대략적으로 같은 경우" 시작 범위는 표시되지 않는다.

## RelativeTimeFormat로 상대적인 시간 나타내기

언어별로 오늘을 기준으로 "1일 전", "일주일 전", "1년 후" 와 같은 상대적인 시간을 나타낼 수 있다. 만약 게시물에서 상대적 시간 데이터를 표시할 경우 유용할 것 같다.

```javascript
const koFormatter = new Intl.RelativeTimeFormat('ko-KR');

koFormatter.format(1, 'day'); // 1일 후
koFormatter.format(-1, 'day'); // 1일 전

const enFormatter = new Intl.RelativeTimeFormat('en-US');

enFormatter.format(1, 'day'); // in 1 day
enFormatter.format(-1, 'day'); // 1 day ago
```

이렇게 숫자로 상대적 표시를 할수도 있지만 두번째 인자의 옵션을 통해 "내일" 이나 "어제" 같은 단어로 표시할 수도 있다.

```javascript
// 설정
const enFormatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

enFormatter.format(1, 'day'); // tomorrow
enFormatter.format(-1, 'day'); // yesterday

const koFormatter = new Intl.RelativeTimeFormat('ko-KR', { numeric: 'auto' });

koFormatter.format(1, 'day'); // 내일
koFormatter.format(-1, 'day'); // 어제
```

## PluralRules로 단수/복수 구분하기

Intl.PluralRules는 다양한 언어와 지역에 따라 숫자를 복수형 규칙에 맞게 형식화하는 생성자이다. `NumberFormat`이나 다른 생성자와 다르게 비교적 최신인 ECMAScript 2018 표준에 도입되었다. 따라서 오래된 브라우저에서는 지원해주지 않는 경우가 있을 수 있다.

한국어는 사실 단수와 복수를 잘 구분하지 않기 때문에 해당 생성자는 비교적 잘 사용하지 않을 것 같지만 다양한 언어를 지원하게 되는 경우 알아두면 좋을 것 같다.

```javascript
// 영어의 기본 수량 복수형 규칙
const pluralRulesEn = new Intl.PluralRules('en-US');
console.log(pluralRulesEn.select(0)); // "other"
console.log(pluralRulesEn.select(1)); // "one"
console.log(pluralRulesEn.select(2)); // "other"
```

예를 들어 영어로 설정한 경우 select로 값을 출력해보면 1을 넣은 경우 "one" 아니면 "other"로 출력된다. 그런 특성을 활용해서 아래와 같이 메시지 알림 문구를 만들어볼 수 있다.

```javascript
const messages = {
  'en-US': {
    one: 'You have 1 new message.',
    other: 'You have {0} new messages.',
  },
};

function getMessage(locale, count) {
  const pluralRules = new Intl.PluralRules(locale);
  const messageKey = pluralRules.select(count);
  const messageTemplate =
    messages[locale][messageKey] || messages[locale].other;
  return messageTemplate.replace('{0}', count);
}

console.log(getMessage('en-US', 1)); // "You have 1 new message."
console.log(getMessage('en-US', 5)); // "You have 5 new messages."
```

단수 or 복수로 출력하게 만드는 것 이외에도 두번째 인자에 옵션을 설정해 순서를 나타내도록 만들 수 있다.

- PluralRules의 옵션

  - type

    복수형 규칙의 타입을 지정한다.

    - "cardinal"

      - 기본 수량을 나타내는 규칙 (예: 1 apple, 2 apples).

    - "ordinal"

      - 순서를 나타내는 규칙 (예: 1st, 2nd, 3rd).

```javascript
const ordinalRulesEn = new Intl.PluralRules('en-US', { type: 'ordinal' });

console.log(ordinalRulesEn.select(1)); // "one"
console.log(ordinalRulesEn.select(2)); // "two"
console.log(ordinalRulesEn.select(3)); // "few"
console.log(ordinalRulesEn.select(4)); // "other"

const messages = {
  'en-US': {
    cardinal: {
      one: 'You have 1 new message.',
      other: 'You have {0} new messages.',
    },
    ordinal: {
      one: 'You are 1st.',
      two: 'You are 2nd.',
      few: 'You are 3rd.',
      other: 'You are {0}th.',
    },
  },
};

function getMessage(locale, count, type = 'cardinal') {
  const pluralRules = new Intl.PluralRules(locale, { type });
  const messageKey = pluralRules.select(count);
  const messageTemplate =
    messages[locale][type][messageKey] || messages[locale][type].other;
  return messageTemplate.replace('{0}', count);
}

console.log(getMessage('en-US', 1)); // "You have 1 new message."
console.log(getMessage('en-US', 5)); // "You have 5 new messages."

console.log(getMessage('en-US', 1, 'ordinal')); // "You are 1st."
console.log(getMessage('en-US', 2, 'ordinal')); // "You are 2nd."
console.log(getMessage('en-US', 3, 'ordinal')); // "You are 3rd."
console.log(getMessage('en-US', 4, 'ordinal')); // "You are 4th."
```

위의 예시에서 알수 있듯이 옵션을 설정하지 않으면 `cardinal`이 기본값이다. `ordinal`에서도 한국어는 '~번쨰'로 모두 동일하기 때문에 자주 사용되지는 않을 것 같다.

## Intl.locale

로케일 정보를 보다 상세하게 제공하고 싶은 경우 직접 `Intl.locale`에 정보를 제공함으로써 다양한 정보를 처리할 수 있다.

```javascript
// MDN 예시
const korean = new Intl.Locale('ko', {
  script: 'Kore',
  region: 'KR',
  hourCycle: 'h23',
  calendar: 'gregory',
});

const japanese = new Intl.Locale('ja-Jpan-JP-u-ca-japanese-hc-h12');
// ('basename-')

console.log(korean.baseName, japanese.baseName);
// Expected output: "ko-Kore-KR" "ja-Jpan-JP"

console.log(korean.hourCycle, japanese.hourCycle);
// Expected output: "h23" "h12"
```

이런식으로 언어, 스크립트, 지역, 확장 등을 상세하게 설정하고 싶은 경우 해당 생성자를 사용하면 된다.

## + 추가

`Intl.DateTimeFormat`도 하나 더 있는데 이 API는 언어별로 날짜 및 시간 형식 나타내는 API이다. 근데 이 부분은 `toLocaleString()`함수로도 날짜/시간을 현지시간에 맞게 제대로 포맷할 수 있기 때문에 자세하게 적진 않겠다.

```javascript
const date = new Date(2019, 10, 12);
date.toLocaleDateString('ko-KR', {
  minute: 'numeric',
  hour: 'numeric',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  weekday: 'long',
});

// 2019년 11월 12일 화요일 오전 12:00
```

---

여기까지 Intl에서 제공하는 다양한 국제화 방법에 대해 알아보았다. 예전부터 Intl에 대해 알고 있었고 활용도 했었지만 한번쯤 여러가지 객체들에 대해 제대로 정리해보고 싶었는데 속이 시원하다😀 기존에 알았던 것도 있었지만 Collator이나 ListFormat 같이 몰랐던 것도 있어서 몰랐던 것들은 또 유용하게 활용해볼 수 있을 것 같다.

## 참고

[MDN:Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)  
[엘리의 드림코딩 유튜브: 자바스크립트로 코딩할때 꿀팁 🍯🐝](https://youtu.be/2AMRTAFSh98?si=GSmu8phuVVPhUJ5s)
