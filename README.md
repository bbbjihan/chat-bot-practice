# Chat Bot Practice

- 챗봇 기능 구현 예제

- streaming flag를 어떻게 설정할 것인가?
  - chat array state를 의존성으로 하는 useMemo boolean값으로 관리
  - chat array와 object로 묶어서 state로 함께 관리

- histories state 내부에 현재 스트리밍 중인 챗을 포함한다면, 스트리밍을 통해 챗이 갱신되면 histories state가 갱신되어 모든 챗 로그가 리렌더링될 수 있다.