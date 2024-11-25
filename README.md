# Chat Bot Practice: 챗봇 기능 구현 예제

# Scripts

- 프로젝트 실행을 위해서 루트 디렉토리 `.env.sample`의 양식에 맞게 `.env` 파일을 생성해야 합니다.

## Install Dependencies
```bash
$npm install
# or
$pnpm install
```

## dev start
```bash
$npm run dev
# or
$pnpm dev
```

## build
```bash
$npm run build
# or
$pnpm build
```

# 요구사항

## 필수 요구사항

1. [x] Chatbot 기본 기능
    1. [x] OpenAI Chat API와 통신하여 사용자의 질문에 대해 실시간으로 답변을 제공합니다.
    2. [x] Chat API의 응답은 사용자에게 표시됩니다.

2. [x] 입력 및 전송 기능
    1. [x] 다중 줄 입력 지원
        - 사용자가 `Shift+Enter` 키를 입력하면 여러 줄의 텍스트를 입력할 수 있어야 합니다.
    2. [x] 자동 전송
        - `Enter` 키 입력 시 입력된 텍스트가 자동으로 전송되며, Chat API에 요청됩니다.

3. [x] 텍스트 스트리밍 렌더링
    1. [x] 실시간 텍스트 스트리밍
        - OpenAI Chat API로부터 받아온 답변은 텍스트 스트림 형태로 전달되며, 사용자는 실시간으로 텍스트 출력을 확인할 수 있어야 합니다. 즉, 답변이 모두 완료되기 전에 텍스트가 순차적으로 화면에 표시됩니다.

4. [x] 대화 기록 조회
    1. [x] 사용자는 언제든지 이전 대화 내용을 조회할 수 있어야 합니다.
    2. [x] 대화 이력은 메모리에 저장되고, 브라우저나 서버에 저장할 필요는 없습니다.

## 선택 요구사항

1. [x] 대화 관리 기능
    1. [x] 답변 취소 기능
        - 사용자는 요청한 질문에 대한 Chatbot의 응답을 취소할 수 있어야 합니다. 이 기능은 응답 중에 동작해야 합니다.
    2. [x] 질문 수정 및 재요청
        - 사용자는 이전에 입력한 질문을 수정하여 다시 요청할 수 있어야 합니다. 이때, 수정된 질문은 기존 대화 흐름에 통합되어야 합니다.
    3. [x] 대화 이력 관리
        - 질문을 수정했을 때, 수정 전의 대화 흐름을 history로 관리하고, 이전 대화 흐름으로 돌아갈 수 있어야 합니다.

2. [x] Markdown 포맷팅 지원
    1. [x] 질문 및 답변의 Markdown 포맷팅 지원
        - 사용자가 입력한 질문과 Chatbot의 응답은 모두 Markdown 포맷팅을 지원해야 합니다. 이를 통해 사용자는 텍스트를 굵게, 기울임, 코드 블록, 리스트 등으로 포맷팅할 수 있습니다.
    2. [x] 렌더링
        - Chatbot 인터페이스는 Markdown으로 포맷된 텍스트를 정확하게 렌더링하여 표시해야 합니다.

# 의존성

## Dependencies

```json
// 스타일 적용을 위한 패키지
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^6.1.7",
    "@mui/material": "^6.1.7",

// openAI API 호출을 위한 패키지
    "openai": "^4.72.0",

// 프론트엔드 UI 패키지: React
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",

// 마크다운 문자열 포맷팅을 위한 패키지
    "react-markdown": "8.0.6",

// 마크다운 코드블럭 포맷팅을 위한 패키지
    "react-syntax-highlighter": "^15.6.1",

// id 등 난수 생성을 위한 패키지
    "uuid": "^11.0.3",

// tsconfig와 vite.config의 sync를 위한 패키지
    "vite-tsconfig-paths": "^5.1.3"
```

## DEV Dependencies

```json
// linter
    "@eslint/js": "^9.13.0",
    "eslint": "^9.13.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "typescript-eslint": "^8.11.0",

// type 모듈
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/react-syntax-highlighter": "^15.5.13",

// vite 관련 패키지
    "vite": "^5.4.10"
    "@vitejs/plugin-react": "^4.3.3",
    "globals": "^15.11.0",

// TypeScript
    "typescript": "~5.6.2",
```

# Directory Architecture

```
.
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── router/
│   ├── types/
│   ├── utils/
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.sample
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

# Notes

전체 요구사항을 모두 만족시키는 것을 목적으로 초기 설계를 했습니다.
본 항목에서는 예제 구현 과정에서의 고려 사항 중 특이점들을 남깁니다.

## 1. `UI`와 `Data`의 분리

- 한 번에 모든 요구사항을 만족하도록 구현하는 것은 힘들기 때문에, 구현이 용이한 피쳐부터 구현하였습니다.
- 그 과정에서 `UI`와 `Data`를 최대한 분리하였습니다. 예를 들어, 모든 `tsx` 파일은 컴포넌트의 렌더링에 관심사를 두도록 작성하였고, 데이터의 변환과 상태 관리 등의 코드는 최대한 `custom hook`으로 작성하여 이를 이루려 했습니다.
- `Data`를 처리하는 `custom hook`에서는 `Data`의 `source`를 기준으로 하여 인터페이스 결합을 통한 `combine`이 가능한 패턴으로 작성하려 했습니다. `custom hook` 중에서 `useChatbot`의 경우 그 안에서도 접근하는 데이터의 `source`를 기준으로 내부 로직을 분리하였습니다.(외부와 통신하는 `useOpenAI hook`과 클라이언트 상태를 관리하는 `useChatTree hook`)
- 하나의 `Data` 흐름에서도 그 필요성에 따라 내부적인 레이어를 두어 인터페이스를 분리하였습니다. `useChatTree`의 경우 `React State`로 관리되는 `userChat state`에 대한 영역, 즉 `React Life Cycle`에 의존할 수 밖에 없는 수준만을 다루게 하였습니다. 그리고 `chatNodeUtils`에서 `chat tree` 자료구조를 다루는 일종의 `Low level method`를 정의하는 방식으로 분류하였습니다.
- 이를 통해 구현이 용이한 피쳐를 구현한 뒤, 추가적인 구현이 이루어지는 과정에서 **관심사를 공유하는 부분만을 수정**하는 식으로 코드 수정이 이루어질 수 있었습니다.

## 2. `Chat Data`의 자료 구조의 변화과정

1. `openAI API`에 전송하는 `Message Array`인 `messages`와 같은 형태
    - 초기에는 `[{user, 'hi'}, {assistant, 'hi'}]`와 같은, `API`에 전송하기 위한 최소한의 데이터만을 담은 `Array`로 구현하려 했습니다.
2. 메시지의 수정과 삽입, 메시지 흐름별 조회가 용이한 `Tree` 형태
    - 이전에 전송한 메시지를 수정해야한다거나, 원하는 메시지 흐름으로 컴포넌트를 전환할 수 있도록 하기 위해서는 기존의 1차원 배열 형태로는 무리가 있었습니다. 그래서 메시지 흐름별 조회라는 요구사항에 가장 적절해보이는 `branch`를 구현할 수 있는 `Tree`형태의 자료구조로 `chat`을 다루도록 구현하였습니다.
    - `children`과 `selectedIndex`를 두고, `getChatData(tree:ChatTree)` 함수를 구현하였는데 이는 상태 관리는 `Tree` 자료구조로 하되 `view`에 보여지는 것과 `openAI API`에 전송하는 정보는 1차원 배열이어야 했기 때문에 일종의 어댑터 형식을 적용한 것입니다.
3. 기존의 `Tree`를 `children`으로 하는 `Wrapped Tree` 형태
    - 가장 첫 메시지도 수정이 가능하고, 거기서 `branch` 탐색이 가능하게 하기 위해 하나의 뎁스를 더 두었어야 했습니다. 두 가지 방법이 떠올랐습니다.
        1. `Tree`를 배열에 담는 `root` 위의 뎁스를 추가
        2. `root` 뎁스를 렌더링하지 않고 그 아래를 `Data`의 `root`로 변환
    - 1의 경우 코드의 `Data` 부분을 수정하면 되고, 2의 경우 `UI` 부분을 수정해야 합니다. `UI`는 여러 데이터소스의 흐름이 통합되는 형태인데 현재 테스트 코드를 작성하면서 구현하지 못하고 있기 때문에 안정성이 높은 1번 방법을 선택하여, 기존 `Tree`의 `root`를 `children` 배열에 저장하는 `Wrapped Tree` 형태로 구현하게 되었습니다.

## Chores

- `streaming flag`를 어떻게 설정할 것인가?
    1. `chat tree state`를 의존성으로 하는 `useMemo` `boolean`값으로 관리
    2. `chat tree`의 가장 높은 `depth`에 `property`로 묶어서 `state`로 함께 관리
    - 1번 선택, 그리고 각 `chat node` 내부에 `streaming flag`를 둠. 실제 데이터와 자료구조 사이의 간극을 최소화하기 위함.

- 최적화 관련
    - 현재 구현 형태는 하나의 노드만 갱신되더라도 `chat tree`가 모두 갱신되면서 불필요한 리렌더링이 많이 발생할 수 있는 형태입니다. 이를 방지하기 위해서는 `Data Layer`에서는 `Node`의 `meta data`만을 관리하도록 하고, `component` 내부에서 각 `Node`의 `id` 등을 통해 값들을 관리하는 `custom hook instance`를 `create`하도록 하는 등, 각 `Message Component`가 의존하는 값들을 최소화하고 내부에서 정의하도록 하는 방향으로 리팩토링이 필요해 보입니다.