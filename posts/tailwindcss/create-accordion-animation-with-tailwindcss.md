## React에서 TailwindCss로 아코디언 만들기

사이드 프로젝트를 진행하면서 아코디언 애니메이션을 구현할 일이 생겼다.

**아코디언**이란 긴 박스 형태의 아이템 리스트가 있고 아이템 하나에 대한 자세한 정보가 필요할 때 펼쳐서 안의 정보를 보고 닫을 수 있는 UI 용어이다.

그런데 예전에 한번 이 아코디언을 구현했던 적이 있는데 지금 다시 만드려니까 또 어떻게 만들지 바로 생각이 안났다😂. 그래서 지금 바로 기록해두면서 다시 한번 복습해보려고 한다.

![아코디언 애니메이션 GIF](/public/images/tailwindcss/create-accordion-animation-with-tailwindcss/accordion-animation-with-tailwindcss.gif)

일단 위와 같이 완성해보았고, 전체 코드는 아래와 같다.

## 전체 코드

```tsx:Accordian.tsx
export default function Accordian({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <li className='rounded-md bg-white pl-5'>
      <div className='flex items-center justify-between'>
        <h3 className='py-5 text-lg'>{title}</h3>

        {/* 🕹️ expansion button */}
        <button
          type='button'
          aria-label={isOpen ? '아코디언 접기' : '아코디언 펼치기'}
          onClick={toggleAccordion}
        >
          {/* rotate 애니메이션 */}
          <BsChevronDown
            className={`size-5 transition-transform duration-300 ${
              isOpen && 'rotate-180'
            }`}
          />
        </button>
      </div>

      {/* 🕹️ detail content box */}
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <p className='pb-4 pr-5'>{content}</p>
      </div>
    </li>
  );
}
```

## 부분적으로 CSS 뜯어보기

이제 어떻게 만들어진건지 tailwindcss 속성들을 하나씩 이해해보자

아코디언에서 가장 중요한 애니메이션은 두가지이다.

1. Expansion 버튼은 세부 정보가 펼쳐지면 위를 향해야 하고, 세부 정보가 닫혀져 있으면 아래를 향해야 한다.

2. 아래 세부 정보가 담긴 박스는 펼쳐지면 부드럽게 높이가 커지면서 내려가야하고, 닫히면 부드럽게 높이가 작아지면서 올라가야한다.

CSS만을 사용해서 어떻게 이 두가지 애니메이션을 구현할 수 있을까?

### Expansion Button

```tsx
<button
  type='button'
  aria-label={isOpen ? '아코디언 접기' : '아코디언 펼치기'}
  onClick={toggleAccordion}
>
  {/* rotate 애니메이션 */}
  <BsChevronDown
    className={`size-5 transition-all duration-300 ${isOpen && 'rotate-180'}`}
  />
</button>
```

사실 이 부분의 애니메이션은 쉬운편이다. 상태값에 따라 `rotate` 애니메이션을 통해 회전시켜주면 되기 때문이다. 그리고 `transition-all`은 `duration`의 속도가 150ms인데 너무 회전하는 속도가 너무 빨라서 300ms으로 조정해주었다.

### Detail Content Box

```tsx
<div
  className={`overflow-hidden transition-[max-height] duration-300 ${
    isOpen ? 'max-h-[1000px]' : 'max-h-0'
  }`}
>
  <p className='pb-4 pr-5'>{content}</p>
</div>
```

이 부분은 아이템을 펼쳤을 때 나타나는 세부 내용을 나타내는 코드이다. 이 세부 내용이 담겨져 있는 박스의 높이를 부드럽게 조절하려면 어떤 속성을 적용해야할까?

코드에도 나타나 있듯이 상태값에 따라 열리고 닫혀야 하기 때문에 삼항 연산자로 높이값을 지정해준다. 안의 담긴 콘텐츠 값에 따라 유동적으로 바뀌어야 하기 때문에 `max-height`로 설정해준다. 닫혀 있어야 한다면 당연히 높이값은 `max-h-0`으로 0으로 설정해주고, 열려있는 상태라면, 일단 넉넉하게 `max-h-[1000px]`로 설정해보았다. 그런 다음, 이 바뀌는 높이값을 애니메이션적으로 바뀌도록 설정한다. 그리고 이 변화를 부드럽게 변화시키기 위해 `transition`을 설정해준다. `transition`에 arbitrary-values로 `[max-height]`를 붙이면 해당 css 속성이 부드럽게 변화된다. 그리고 당연 높이값이 0이더라도 세부 내용이 보여지기 때문에 `overflow-hidden` 클래스를 적용해준다.

## CSS로 변환해서 보기

```tsx:Accordion.tsx
import styles from './AccordionItem.module.css';
import { BsChevronDown } from 'react-icons/bs';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <li className={styles.accordionItem}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>

        {/* 🕹️ expansion button */}
        <button
          type='button'
          aria-label={isOpen ? '아코디언 접기' : '아코디언 펼치기'}
          onClick={toggleAccordion}
        >
          {/* rotate 애니메이션 */}
          <BsChevronDown
            className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`}
          />
        </button>
      </div>

      {/* 🕹️ detail content box */}
      <div
        className={`${styles.contentBox} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        <p className={styles.content}>{content}</p>
      </div>
    </li>
  );
};

export default AccordionItem;
```

```css:AccordionItem.module.css
.accordionItem {
  border-radius: 0.375rem;
  background-color: white;
  padding-left: 1.25rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  padding: 1.25rem 0;
  font-size: 1.125rem;
}

.chevron {
  font-size: 1.25rem;
  transition: transform 0.3s;
}

.rotate {
  transform: rotate(180deg);
}

.contentBox {
  overflow: hidden;
  transition: max-height 0.5s ease-in-out; /* 높이 변화에 따른 부드러운 전환 애니메이션 적용! */
}

.open {
  max-height: 1000px;
}

.closed {
  max-height: 0;
}

.content {
  padding-bottom: 1rem;
  padding-right: 1.25rem;
}
```

## 참고

[tailwindcss-docs/transition-property](https://tailwindcss.com/docs/transition-property#arbitrary-values)  
[MDN-transition](https://developer.mozilla.org/ko/docs/Web/CSS/transition)
