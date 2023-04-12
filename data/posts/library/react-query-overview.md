## 개요

> React에 대한 누락된 데이터 가져오기 라이브러리. React에서 서버 상태 가져오기, 캐싱, 동기화 및 업데이트를 수행한다.

보통 React에서 개발자는 자신만의 데이터 가져오기 방법을 구축하게 된다. 기존의 상태 관리 라이브러리는 클라이언트 상태를 작업하는 데에 유용한 것이지 **서버 상태의 특징** 때문에 비동기 또는 서버 상태를 작업하는 데는 적합하지 않다.

애플리케이션은 서버 상태의 어떤 특성으로 발생하는 여러가지 문제를 해결해야 하는데, 클라이언트 단에서 모든 서버 문제를 해결하기는 어렵고 복잡하기 때문에 React Query가 이 서버 문제를 도와주는 것이다.

그러니까, React Query는 **복잡한 코드를 제거**해주고, **유지보수**를 쉽게 해주며, **서버에 대한 걱정 없이** 새로운 기능을 더 쉽게 추가해준다. 유저가 더 빠르고 반응적이라고 느껴지도록 즉각적으로 효과를 주며, 대역폭을 줄이고 **메모리 성능을 향상**시킨다.

### React Query 설치

React Query를 사용할 곳에 client를 생성하고 감싼다. 보통 앱의 최상단에 사용한다.

```tsx
import { QueryClient, QueryClientProvider } from 'react-query';
import Todos from './Todos';

// ✅ client 생성
const queryClient = new QueryClient();

function App() {
  return (
    // ✅ client로 감싸기
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}
```

하위 컴포넌트에서 데이터를 fetching할 곳에 useQuery등 다양한 API를 사용한다.

```tsx
import { useQuery, useMutation } from 'react-query'
import { getTodos, postTodo } from '../my-api'

function Todos() {
   // ✅ Queries
  const query = useQuery('todos', getTodos)

   // ✅ Mutations
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
    },
  })

	return ...
}
```

## React Query의 핵심 개념

1. Queries
2. Mutations
3. Query Invalidation

오늘은 1번 Queries만 살펴보고, 또 다른 기능들에 대해 더 알아볼 것이다.

### React Query의 기본 설정

`useQuery`나 `useInfiniteQuery`를 사용할 경우 기본적으로 캐시된 데이터가 오래된 것으로 간주한다.

## Queries

```typescript
const queryData = useQuery(Query Keys, Query Function);
```

서버를 통해 클라이언트에서 데이터를 가져오는데에는 Query Keys와 Query Function이 필요하다. 아래에서 이 둘에 대해 알아보자!

### Query Keys

React-Query는 **Query Keys를 기반으로 쿼리 캐싱을 관리**한다.

Query Keys 형식

1. **단순한 문자열**  
   문자열 쿼리 키가 전달되면 해당 문자열이 유일한 항목인 배열로 변환된다.

   ```tsx
   // ✅ queryKey === ['todos']와 같다.
   useQuery('todos', ...)
   ```

2. **배열**  
    데이터를 고유한 값으로 묘사하기 위해 쿼리에 더 많은 정보가 필요한 경우 문자열과 숫자, 객체를 넣은 배열로 만들 수 있다.
   계층적이거나 중첩된 자원일 경우 항목을 식별하기 위해 id나 인덱스를 전달한다.
   식별하는데 id나 인덱스를 사용하므로 순서가 굉장히 중요하다.

   ```tsx
   useQuery(['todo', 5], ...)

   // preview 형식이 있는 개별 투두
   useQuery(['todo', 5, { preview: true }], ...)

   // done 타입인 투두 리스트
   useQuery(['todos', { type: 'done' }], ...)
   ```

   - **중첩된 객체** 형식  
     주의할 점은 쿼리 키는 해시되기 때문에 객체 안의 키 순서는 관계 없이 같은 것으로 간주한다. 그러니까 배열은 순서가 중요하지만, 객체는 순서가 중요하지 않고, 같은 필드가 있는 경우 같은 값으로 취급된다.

   - 추가 파라미터가 있는 쿼리인 경우 Query keys에 포함한다.

     ```tsx
     function Todos({ todoId }) {
       const result = useQuery(['todos', todoId], () => fetchTodoById(todoId));
     }
     ```

### Query Functions

쿼리 함수는 반드시 프로미스를 반환하는 함수여야 한다.

- 다른 라이브러리(axios, graphql-request)와 달리 `fetch`는 HTTP 실패에 대해 디폴트로 에러를 던져주지 않는다. 직접 에러 케이스를 작성해주어야 한다.
  ```tsx
  useQuery(['todos', todoId], async () => {
    const response = await fetch('/todos/' + todoId);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
  ```
- 쿼리 키는 고유한 값을 식별하기 위한 것뿐만 아니라 쿼리 함수에 쉽게 전달되며, 필요에 따라 쿼리 함수에서 쿼리 키를 추출할 수 있다.

  ```tsx
  function Todos({ status, page }) {
    const result = useQuery(['todos', { status, page }], fetchTodoList);
  }

  // ✅ 쿼리 함수에서 쿼리 키에 접근!
  function fetchTodoList({ queryKey }) {
    const [_key, { status, page }] = queryKey;
    return new Promise();
  }
  ```

- 모든 React-Query API들은 `[queryKey, queryFn, config]` 시그니처를 가진다.

  ```tsx
  import { useQuery } from 'react-query';

  useQuery({
    queryKey: ['todo', 7],
    queryFn: fetchTodo,
    ...config,
  });
  ```

### Queries | useQuery

Promise 기반 메서드와 함께 사용하여 서버에서 데이터를 가져올 경우 Query를 사용하면 된다. Query는 **고유 키에 연결된 비동기 데이터에 대해 종속성**을 갖고 있음을 나타낸다.

✅ 사용중인 메서드가 서버의 데이터를 수정하는 경우에는 Query 대신 Mutation 사용하는 것을 권장한다.

구독하고자하는 쿼리가 있는 컴포넌트에 `useQuery` 훅을 부른다.

```tsx
import { useQuery } from 'react-query';

function App() {
  const info = useQuery('todos', fetchTodoList);
}
```

Query에 대한 고유한 키를 제공하면 함수가 프로미스를 반환한다.

- 여기서 사용자가 제공하는 고유한 키는 애플리케이션 전체에서 쿼리를 재요청, 캐싱, 공유하기 위해 사용된다.
- 이 반환된 값은 여러가지 주요 정보를 포함하고 있다.
  - `isLoading` | `isError` | `isSuccess` | `isIdle` \*쿼리 비활성화 상태
- 쿼리 상태에 따라 더 많은 정보를 제공한다.

  - `error` | `data` | `isFetching` \*어떤 상태이든 쿼리는 언제든지 fetching되며 true가 기본이다.

  ```tsx
  function Todos() {
    const { status, data, error } = useQuery('todos', fetchTodoList);

    if (status === 'loading') {
      return <span>Loading...</span>;
    }

    if (status === 'error') {
      return <span>Error: {error.message}</span>;
    }

    return (
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    );
  }
  ```

### Parallel Queries | useQueries

“병렬” 쿼리는 가져오기 **동시성을 최대화**하기 위해 **병렬로 또는 동시에 실행**되는 쿼리이다.

- 기본 `useQuery`를 사용한 수동 병렬 쿼리

  **쿼리의 개수가 변하지 않는 경우** 그저 아래와 같이 순서대로 적어주기만 해도 된다.

  ```tsx
  function App () {
     // The following queries will execute in parallel
     const usersQuery = useQuery('users', fetchUsers)
     const teamsQuery = useQuery('teams', fetchTeams)
     const projectsQuery = useQuery('projects', fetchProjects)
     ...
  }
  ```

- `useQueries`을 사용한 동적 병렬 쿼리

  **렌더링마다 실행되어야 하는 쿼리의 수가 다른 경우**에 사용한다. map을 사용하며 Query key에 고유한 키를 넣고 함수의 파라미터로 전달하면 된다.

  ```tsx
  function App({ users }) {
    const userQueries = useQueries(
      users.map((user) => {
        return {
          queryKey: ['user', user.id],
          queryFn: () => fetchUserById(user.id),
        };
      })
    );
  }
  ```

### Dependant Queries | enable 설정

- 종속 쿼리는 실행 전에 완료해야 하는 이전 쿼리에 의존한다.
- `useQuery`의 세번째 시그니처인 config의 `enabled` 설정을 통해 컨트롤할 수 있다.

  ```tsx
  const { data: user } = useQuery(['user', email], getUserByEmail);

  const userId = user?.id;

  // ... 유저의 프로젝트 데이터를 얻었다.
  const { isIdle, data: projects } = useQuery(
    ['projects', userId],
    getProjectsByUser,
    {
      enabled: !!userId, // userId가 없다면 쿼리가 실행되지 않는다.
    }
  );
  ```

## Query로 무한 스크롤하기

React-Query는 `useInfiniteQuery` 기능을 통해 무한 스크롤 UI를 지원한다.

`useInfiniteQuery`가 다른 점

- `data` : 이제 infinite 쿼리 데이터를 포함한 객체
- `data.pages` : 요청된 페이지들을 포함한 배열
- `data.pageParams` : 페이지 요청에 사용될 페이지 파라미터를 포함한 배열
- `fetchNextPages`, `fetchPreviousPage`, `getNextPageParam`, `getPreviousPageParam`
- `hasNextPage`(boolean), `hasPreviousPage`
- `isFetchingNextPage`, `isFetchingPreviousPage`

## Query로 페이지네이션하기

페이지네이션 UI는 쿼리 키에 넣어 그냥 `useQuery` 자체에서 작동시킬수 있다.

하지만 이 경우 페이지를 이동할 때마다 success나 loading 과정에서 UI가 점프를 하는 경우가 있다. 왜냐하면 각각의 새로운 페이지는 새로운 쿼리 요청으로 다뤄지기 때문이다. 이 UI 점프를 방지하기 위해 React-Query는 `keepPreviousData` 기능을 제공하고 있다.

`keepPreviousData`

- 쿼리 키가 변경되었더라도 새 데이터가 요청되는 동안 마지막으로 가져온 데이터를 사용할 수 있다.

- 새로운 데이터가 도착하면 이전 데이터는 매끄럽게 swap된다.

- `isPreviousData` 로 현재 제공하는 데이터를 알 수 있다.

- `data.hasMore` 으로 더 데이터를 갖고 있는지 알 수 있다.

```tsx
function Todos() {
  const [page, setPage] = React.useState(0);

  const fetchProjects = (page = 0) =>
    fetch('/api/projects?page=' + page).then((res) => res.json());

  // ✅ isPreviousData
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(['projects', page], () => fetchProjects(page), {
      keepPreviousData: true, // ✅ 페이지네이션
    });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && data.hasMore) {
            setPage((old) => old + 1);
          }
        }}
        // ✅ 다음 데이터가 나타날 때까지 다음 버튼이 활성화되지 않는다.
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
}
```

## 알아두면 좋은 설정

### 재요청 표시자

`isLoading`도 충분하지만, 쿼리가 재요청되고 있음을 나타내는 추가 indicator를 원하는 경우 사용한다. `isFetching`을 이용하며 indicator를 나타내면 된다.

```tsx
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching, // ✅
  } = useQuery('todos', fetchTodos);

  return (
    <>
      {status === 'loading' ? (
        <span>Loading...</span>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : isFetching ? ( // ✅ 재요청시 다른 indicator 나타낼 수 있다
        <div>Refreshing...</div>
      ) : null}
    </>
  );
}
```

- 개별 쿼리 로딩 상태가 아니라 어떤 쿼리든 간에 fetching되고 있음을 나타내는 글로벌 로딩 indicator을 나타내고 싶은 경우 `useIsFetching` 훅을 쓰면 된다.

  ```tsx
  import { useIsFetching } from 'react-query';

  function GlobalLoadingIndicator() {
    const isFetching = useIsFetching();

    return isFetching ? (
      <div>Queries are fetching in the background...</div>
    ) : null;
  }
  ```

### Window Focus Refetching

애플리케이션을 떠나 다시 애플리케이션에 재접속하는 경우 React Query는 자동으로 데이터를 stale 하다고 판단하고 새 데이터를 요청한다. 해당 설정은 기본으로 설정되어 있고 해제할 수도 있다.

- 기본 설정 해제하기: `refetchOnWindowFocus`

  ```tsx
  // ✅ 전역 해제
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  function App() {
    return <QueryClientProvider client={queryClient}>...</QueryClientProvider>;
  }

  // ✅ 쿼리별 해제
  useQuery('todos', fetchTodos, { refetchOnWindowFocus: false });
  ```

- 그리고 이 Window Focus Event를 커스텀할 수도 있다. React Query는 `focusManager.setEventListener`로 기본 핸들러를 제공하고 있는데 이것을 자체 이벤트로 설정할 수도 있다고 한다. iframe 포커스 이벤트를 무시할 수도 있고 React Native의 포커스를 관리할수도 있다고 한다.

### 쿼리 비활성화, 일시정지

- 쿼리가 자동으로 실행되는 것을 막으려면 enabled 설정을 false로 설정한다.

  - 쿼리에 캐시된 데이터가 있는 경우

    `status === "success"` 로 초기화

  - 쿼리에 캐시된 데이터가 없는 경우

    `status === "idle"` 됨 \*쿼리가 현재 비활성화되었음을 나타냄

  - 쿼리는 자동적으로 요청되거나 재요청되지 않음
  - query client의 `invalidateQueries`나 `refetchQueries`를 무시함
  - `refetch`로 쿼리 패치를 수동적으로 일으킬수 있음

### 쿼리 재시도

`useQuery`로 데이터를 가져오는데 실패해 오류가 발생하는 경우 자동으로 쿼리를 재시도한다. 그리고 이 재시도 횟수도 설정 가능하다.

```tsx
import { useQuery } from 'react-query';

const result = useQuery(['todos', 1], fetchTodoListPage, {
  retry: 10, // ✅ 재시도 횟수 설정
});
```

## 여러가지 Data fetching 라이브러리와 비교하기

[공식문서: Comparison | React Query vs SWR vs Apollo vs RTK Query vs React Router](https://tanstack.com/query/v4/docs/react/comparison)

이부분 제일 궁금했는데 문서에 있었다. 데이터 fetching 라이브러리에는 여러가지가 있지만 특히 양대 축이라고 하는 SWR과 비교해서 어떤 차이가 있는 걸까?

Apollo와 RTK-Query도 비교하고 있지만 아직 제대로 써본적은 없기 때문에 경험이 있는 React-Query와 SWR 이 두가지만 비교해보았다.

React Query와 SWR둘이 차이나는 부분만 뽑아보았다.

✅ : 최고 수준의 내장. 추가 구성이나 코드 없이 사용 가능  
🟡 : 지원되지만 비공식적 커뮤니티 라이브러리로 제공  
🔶 : 지원되고 문서화되지만 추가 사용자 코드가 필요  
🛑 : 지원하지 않음

|                          | React Query           | SWR                      |
| ------------------------ | --------------------- | ------------------------ |
| 캐싱 전략                | 계층적 키 → 값        | 유니크한 키 → 값         |
| 데이터 변화 감지         | 깊은 비교 + 구조 공유 | dequal을 통한 깊은 비교? |
| 데이터 메모이제이션      | 완전한 구조 공유      | 동일성                   |
| 번들 사이즈              | 13.0KB                | 4.2KB                    |
| API 정의 위치            | 컴포넌트, 외부 설정   | 컴포넌트                 |
| Devtools                 | ✅                    | 🟡                       |
| 양방향 무한 쿼리         | ✅                    | 🔶                       |
| Lagged Query Data        | ✅                    | 🔶                       |
| Selectors                | ✅                    | 🛑                       |
| Render Batching & 최적화 | ✅                    | 🛑                       |
| 자동 가비지 컬렉션       | ✅                    | 🛑                       |
| Mutation Hooks           | ✅                    | 🟡                       |
| Prefetching APIs         | ✅                    | 🔶                       |
| Query Cancellation       | ✅                    | 🛑                       |
| Partial Query Matching   | ✅                    | 🛑                       |
| Stale Time 설정          | ✅                    | 🛑                       |
| Offline Mutation Support | ✅                    | 🛑                       |
| Offline Caching          | ✅(Experimental)      | 🛑                       |
| Mutation 후 자동 refetch | 🔶                    | 🔶                       |

일단 이해되는 차이만 추려보았는데, 딱봐도 React Query에 ✅ 마크가 더 많이 찍힌 것을 볼 수 있었다. Devtool도 제공하고 있고, offline caching 기능도 제공하며, mutation된 후 자동 refetch 기능도 제공해준다. 확실히 React Query가 서버에서 데이터를 가져오는 기능적인 부분에서 더 많은 것들을 제공하고 있었다.

그렇다면 React Query가 장땡인 걸까? 그렇진 않은 것 같다. 일단 기능이 많은 만큼 SWR보다 번들 사이즈가 3배나 된다. 그리고 캐싱 전략에도 차이가 있어서 React Query는 계층적 키로 값을 캐싱하는 반면 SWR은 고유한 키로 값을 캐싱하니, React Query는 좀더 규모가 있고 복잡하며 많은 데이터를 처리해야하는 경우에 유용할 것 같고, SWR은 보다 더 단순한 데이터를 처리하지만 좀더 빠른 인터렉션을 주고 싶을 때 알맞은 것 같다. 뭔가 단순한 프로젝트에 React Query는 약간 과한 느낌이 있다.

(더 많은 차이를 보고 싶으신 분은 위의 [공식문서](https://tanstack.com/query/v4/docs/react/comparison) 링크 클릭!)

## 정리

오늘 포스트에서는 크게 5가지를 알아보았다.

- React Query의 중요한 컨셉 3가지중 하나인 Queries
- Query로 무한 스크롤하는 법
- Query로 페이지네이션하는 법
- React Query의 다양한 기능
- React Query와 SWR의 차이

공식문서를 읽고 하나의 포스트에 다 정리하는 건 너무 많은 것 같긴 하다. React Query에서 나머지 두가지 중요한 컨셉인 Mutation과 Invalidation은 다음 포스트에 작성해야겠다.
