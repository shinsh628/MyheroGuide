# MyheroGuide — Claude 세션 가이드

## 세션 시작 시 반드시 확인
1. `handover.md` — 구현 순서, 주의사항, 의사결정 기준
2. `game-guide-spec.md` — 데이터 스키마 전체 (탭별 DB/빌드 구조)
3. `progress/2026-05-21.md` — 현재까지 완료된 작업

## 현재 상태 (2026-05-21)
- **Phase 2 Step 1 완료** (인트로 페이지 index.html, style.css, main.js)
- **다음**: Phase 2 Step 2 — guide.html 공략 페이지 레이아웃 + 13탭 UI

## 핵심 규칙 (어기면 설계 붕괴)
- `data/db.js`와 `data/builds/*.json` 분리 유지 — 빌드 JSON에 텍스트 직접 저장 금지, 항상 DB id 참조
- `data/db.js`는 ES 모듈 (`export const DB`) — HTML은 `<script type="module">`
- 환경변수: `GITHUB_TOKEN`, `WHITELIST_PASSWORD` — 코드에 절대 하드코딩 금지
- 모바일 우선 설계

## 배포 정보
- GitHub: `shinsh628/MyheroGuide` (main 브랜치: master)
- Netlify: `myheroguide.netlify.app` (master push → 자동 배포)

## 도구 설정
- Serena 사용: `mcp__plugin_serena_serena__activate_project` → `C:\dev\MyheroGuide`
- 계획 파일: `docs/superpowers/plans/`
