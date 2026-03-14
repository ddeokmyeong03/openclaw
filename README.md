# OpenClaw — Instagram 카드뉴스 메이커

> 줄글을 입력하면 AI가 다중 페이지 카드뉴스로 자동 변환해주는 Electron 데스크톱 앱

**웹 버전 (모바일)**: https://ddeokmyeong03.github.io/openclaw/

---

## 전체 서비스 흐름

사용자가 경험하는 완성된 서비스의 흐름은 다음과 같다. 이 흐름을 기준으로 개발 타임라인이 설계되었다.

```
1. 줄글 작성
   사용자가 카드뉴스로 만들고 싶은 내용을 자유롭게 텍스트로 작성한다.

2. 템플릿 선택 (카드 만들기 버튼)
   저장된 줄글 카드의 우측 하단 '카드 만들기' 버튼을 누르면
   기존 템플릿 목록에서 선택하거나, 직접 템플릿을 생성하거나,
   인스타그램 사진을 업로드해 해당 스타일로 자동 생성할 수 있다.

3. AI 분석 및 카드 자동 생성
   - 줄글을 분석하여 1페이지(표지)의 제목과 나머지 페이지의 본문으로 분리
   - 소재의 주제를 파악하고 각 페이지에 어울리는 이미지·이모티콘을 배정
   - 선택한 템플릿에 내용과 이미지를 넣어 여러 장의 카드뉴스를 생성
   - 생성 중에는 iPhone 목업에 "템플릿 제작 중..." 표시

4. 편집
   - 목업 하단의 << < N/M > >> 네비게이션으로 페이지 탐색
   - 좌측 편집 패널: 카테고리 / 제목 / 소제목 / 내용 / 색상 프리셋 /
     레이아웃 / 첨부 이미지 (업로드·생성·검색)를 페이지별로 수정

5. 내보내기 / 저장
   - '내보내기': 전체 페이지를 1080×1080 PNG로 일괄 다운로드 또는 공유
   - '업로드하기': 인스타그램 게시글로 직접 업로드 (추후 구현)

6. 대시보드 저장
   최종 완성된 카드뉴스를 저장하면 대시보드에 썸네일 카드로 표시된다.

7. 사용자 시스템
   브랜드명·색상 등 개인 설정을 저장하는 로컬 프로필 (단일 사용자 우선).
```

---

## 현재 구현 상태

### Phase 0 — 기반 완성 (구현됨)

| 기능 | 파일 |
|------|------|
| 5가지 템플릿 렌더링 (Minimal / Bold / Elegant / Gradient / Magazine) | `src/components/templates/` |
| 단일 카드 실시간 편집 (제목·본문·해시태그·브랜드명) | `src/components/LeftPanel/` |
| 색상 프리셋 6종 + 개별 색상 선택 (배경·강조·텍스트) | `LeftPanel/ColorPicker.tsx` |
| 폰트 5종 + 크기 3단계 (Pretendard, Noto Sans/Serif KR, Black Han Sans, Gowun Dodum) | `LeftPanel/FontSelector.tsx` |
| iPhone 15 SVG 목업 + 실시간 미리보기 | `src/components/RightPanel/` |
| PNG 내보내기 (1080×1080, html2canvas) | `src/hooks/useExport.ts` |
| 다크 모드 (TopBar 토글) | `src/components/TopBar.tsx` |
| 모바일 햄버거 드로어 | `src/App.tsx` |
| Electron IPC 파일 저장 (네이티브 저장 다이얼로그) | `electron/main/index.ts` |
| 웹 버전 GitHub Pages 배포 | `vite.web.config.ts` |

### Phase 1~7 — 미구현

| 기능 | Phase |
|------|-------|
| 줄글 입력 화면, 프로젝트 목록 대시보드 | Phase 1 |
| 로컬 저장소 (electron-store / IndexedDB) | Phase 1 |
| AI 텍스트 분석 (Claude API) → 다중 페이지 자동 생성 | Phase 2 |
| "템플릿 제작 중" 로딩 상태 표시 | Phase 2 |
| 다중 페이지 데이터 구조 (CardPage[]) | Phase 3 |
| 페이지 네비게이션 UI (`<< < N/M > >>`) | Phase 3 |
| 페이지별 독립 편집 패널 | Phase 3 |
| 이미지 업로드 / 검색 (Unsplash·Pixabay) / AI 생성 (DALL-E) | Phase 4 |
| 카테고리·소제목·레이아웃 편집 필드 | Phase 5 |
| 사용자 커스텀 템플릿 생성 | Phase 6 |
| Instagram 사진 분석 → 템플릿 자동 생성 (Claude Vision) | Phase 6 |
| 다중 페이지 PNG 일괄 내보내기 (ZIP) | Phase 7 |
| 로컬 사용자 프로필 | Phase 7 |
| 인스타그램 직접 업로드 | 미정 (placeholder만 구현) |

---

## 개발 타임라인

### Phase 1 — 프로젝트 구조 & 대시보드

**목표**: 앱 진입점을 '대시보드'로 전환하고, 프로젝트 단위 저장 구조 구축

- [ ] 라우팅 추가 (react-router-dom): 대시보드 ↔ 편집기
- [ ] 데이터 모델 설계: `Project { id, title, rawText, pages[], createdAt, updatedAt }`
- [ ] 로컬 저장소 연동: Electron → `electron-store`, 웹 → `IndexedDB` (idb)
- [ ] 대시보드 화면: 저장된 카드뉴스 썸네일 그리드, 새로 만들기 버튼
- [ ] 줄글 입력 화면: 새 프로젝트 생성 모달 또는 전용 페이지

수정 파일: `src/App.tsx`, `src/types/index.ts`, `src/store/useCardStore.ts`,
신규: `src/store/useProjectStore.ts`, `src/pages/Dashboard.tsx`, `src/pages/Editor.tsx`

---

### Phase 2 — AI 텍스트 분석 (Claude API)

**목표**: 줄글을 AI로 분석해 다중 페이지 카드뉴스 구조 자동 생성

- [ ] Claude API 연동 (Electron: 메인 프로세스에서 직접 호출, 웹: 사용자 API 키 입력)
- [ ] 프롬프트 설계 — 출력 JSON 형식:
  ```json
  {
    "pages": [
      {
        "pageType": "cover | body | closing",
        "title": "...",
        "subtitle": "...",
        "body": "...",
        "suggestedEmoji": "...",
        "suggestedImageKeyword": "..."
      }
    ]
  }
  ```
- [ ] 목업에 "템플릿 제작 중..." 로딩 화면 표시
- [ ] AI 응답을 다중 페이지 데이터 구조로 변환

수정 파일: `electron/main/index.ts`, `src/components/RightPanel/CardPreview.tsx`,
신규: `src/hooks/useAIGenerate.ts`

---

### Phase 3 — 다중 페이지 시스템

**목표**: 1페이지 → N페이지 구조 전환, 페이지 네비게이션 구현

- [ ] 타입 확장: `CardPage[]`, 페이지별 `templateId`, `layout` 독립 설정
- [ ] `useCardStore` 다중 페이지 지원: `currentPageIndex`, `pages[]`, 페이지 CRUD
- [ ] 페이지 네비게이션 UI: `<< < N/M > >>` (첫장·앞장·현재/총·뒷장·맨뒷장)
- [ ] 선택된 페이지만 편집 패널에 반영
- [ ] 템플릿 자동 배정: 1페이지=표지, 중간=본문, 마지막=마무리

수정 파일: `src/types/index.ts`, `src/store/useCardStore.ts`, `src/components/RightPanel/index.tsx`,
신규: `src/components/PageNavigation.tsx`

---

### Phase 4 — 이미지 시스템

**목표**: 페이지별 이미지 첨부·검색·AI 생성 기능

- [ ] 이미지 업로드: 파일 선택 → base64 인코딩 → 페이지 데이터에 저장
- [ ] 이미지 검색: Unsplash API 또는 Pixabay API (무료 플랜)
- [ ] AI 이미지 생성: OpenAI DALL-E API (선택적)
- [ ] AI 추천 이모지를 템플릿에 직접 렌더링
- [ ] 편집 패널에 '첨부 이미지' 섹션 추가 (업로드·생성·검색 탭)

수정 파일: `src/types/index.ts`,
신규: `src/components/LeftPanel/ImageEditor.tsx`, `src/hooks/useImageSearch.ts`

---

### Phase 5 — 편집 패널 확장

**목표**: 페이지별 카테고리·소제목·레이아웃 편집 지원

- [ ] 카테고리 필드 추가 (예: 건강, 여행, 뷰티)
- [ ] 소제목(subtitle) 필드 추가
- [ ] 레이아웃 선택 UI (텍스트 위치, 이미지 비율 등)
- [ ] 색상: 전체 일괄 적용 vs 페이지별 개별 설정 옵션

수정 파일: `src/types/index.ts`, `src/components/LeftPanel/ContentEditor.tsx`,
신규: `src/components/LeftPanel/LayoutSelector.tsx`

---

### Phase 6 — 템플릿 시스템 확장

**목표**: 사용자 정의 템플릿 & Instagram 사진 분석

- [ ] 템플릿 생성 UI: 기존 템플릿 기반으로 커스터마이징 후 저장
- [ ] 커스텀 템플릿 로컬 저장 (electron-store / IndexedDB)
- [ ] Instagram 사진 분석: Claude Vision API → 색상·레이아웃 추출 → 템플릿 자동 생성

수정 파일: `src/components/LeftPanel/TemplateSelector.tsx`,
신규: `src/store/useTemplateStore.ts`, `src/hooks/useInstagramAnalyze.ts`

---

### Phase 7 — 내보내기 & 사용자 시스템

**목표**: 다중 페이지 일괄 내보내기, 로컬 사용자 프로필

- [ ] 다중 페이지 PNG 일괄 내보내기 (ZIP 또는 순번 파일명)
- [ ] 완성 프로젝트 '저장' → 대시보드 썸네일 표시
- [ ] 로컬 사용자 프로필: 이름·브랜드명 기본값 저장
- [ ] 인스타그램 업로드 버튼 (placeholder, 기능 미구현)

수정 파일: `src/hooks/useExport.ts`, `electron/main/index.ts`,
신규: `src/store/useUserStore.ts`

---

## 기술 결정 사항

| 항목 | 결정 | 이유 |
|------|------|------|
| **배포** | Electron (GitHub Releases) + 웹 (GitHub Pages) | 외부 플랫폼 의존 없음 |
| **AI — 텍스트 분석** | Claude API (claude-sonnet-4-6 기준) | 한국어 품질, 구조화 JSON 출력 |
| **AI — 이미지 생성** | OpenAI DALL-E API (선택적) | 필요 시 도입, 없으면 이모지·검색으로 대체 |
| **AI — 이미지 설명** | Claude Vision API | Instagram 사진 분석 |
| **DB — Electron** | `electron-store` (소규모) 또는 `better-sqlite3` (구조적) | 순수 로컬, 서버 없음 |
| **DB — 웹** | `IndexedDB` (idb 라이브러리) | 브라우저 내장, 서버 없음 |
| **이미지 검색** | Unsplash API 또는 Pixabay API | 무료 플랜 존재 |

---

## 기술 스택

```
Electron 31          — 데스크톱 앱 패키징
electron-vite 2      — 빌드 오케스트레이터
React 18             — UI 프레임워크
TypeScript           — 타입 안전성
Tailwind CSS         — 스타일링 (다크 모드, 반응형)
Zustand              — 전역 상태 관리
Framer Motion        — 애니메이션
html2canvas          — 오프스크린 1080×1080 → PNG 캡처
```

---

## 프로젝트 구조

```
openclaw/
├── electron/
│   ├── main/index.ts          # 메인 프로세스 (IPC, 파일 저장, Claude API 호출)
│   └── preload/index.ts       # contextBridge API 노출
├── src/
│   ├── App.tsx                # 루트 레이아웃 (라우팅, 모바일 드로어)
│   ├── types/index.ts         # CardData, CardPage, Project 타입
│   ├── store/
│   │   ├── useCardStore.ts    # 현재 편집 중인 카드 상태
│   │   ├── useProjectStore.ts # 프로젝트 목록 관리 (Phase 1)
│   │   ├── useTemplateStore.ts # 커스텀 템플릿 (Phase 6)
│   │   └── useUserStore.ts    # 사용자 프로필 (Phase 7)
│   ├── hooks/
│   │   ├── useExport.ts       # PNG 내보내기
│   │   ├── useAIGenerate.ts   # AI 카드 생성 (Phase 2)
│   │   ├── useImageSearch.ts  # 이미지 검색 (Phase 4)
│   │   └── useInstagramAnalyze.ts # Instagram 사진 분석 (Phase 6)
│   ├── pages/
│   │   ├── Dashboard.tsx      # 대시보드 (Phase 1)
│   │   └── Editor.tsx         # 편집기 화면 (Phase 1)
│   └── components/
│       ├── TopBar.tsx         # 상단 바 (햄버거, 다크모드)
│       ├── PageNavigation.tsx # 페이지 네비게이션 << < N/M > >> (Phase 3)
│       ├── LeftPanel/         # 편집 패널
│       │   ├── ContentEditor.tsx
│       │   ├── TemplateSelector.tsx
│       │   ├── ColorPicker.tsx
│       │   ├── FontSelector.tsx
│       │   ├── LayoutSelector.tsx  # (Phase 5)
│       │   ├── ImageEditor.tsx     # (Phase 4)
│       │   └── ExportButton.tsx
│       ├── RightPanel/        # iPhone 목업 + 카드 미리보기
│       └── templates/         # 5가지 카드 템플릿
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages 자동 배포
├── electron.vite.config.ts
├── vite.web.config.ts         # 웹 버전 빌드 설정
└── package.json
```

---

## 개발 환경 설정

### 사전 요구 사항

- Node.js 18+
- npm 9+

**Linux / GitHub Codespaces** 추가 패키지:

```bash
sudo apt-get install -y \
  libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0 \
  libgbm1 libasound2t64 libdrm2 libxkbcommon0 \
  libxcomposite1 libxdamage1 libxfixes3 libxrandr2
```

### 실행

```bash
npm install

# 웹 개발 서버 (브라우저)
npm run dev:web

# Electron 개발 서버 (macOS/Windows)
npm run dev

# Electron 개발 서버 (Linux/Codespaces)
npm run dev:linux
```

### 빌드

```bash
# 웹 정적 빌드 (GitHub Pages 배포용)
npm run build:web

# Electron 앱 빌드
npm run build

# 배포 패키지 생성
npm run dist:mac      # macOS .dmg
npm run dist:win      # Windows .exe
npm run dist:linux    # Linux .AppImage
```

---

## 내보내기 동작 방식

```
[PNG로 내보내기 클릭]
        │
        ▼
  1080×1080 오프스크린 렌더링 (left: -9999px)
        │
        ▼
  document.fonts.ready 대기 → html2canvas 캡처
        │
        ├─ Electron → 네이티브 저장 다이얼로그 → fs.writeFile
        └─ 브라우저 → <a download> 자동 다운로드
```

---

## Codespaces 실행 시 참고사항

| 이슈 | 원인 | 해결 |
|------|------|------|
| Electron이 Node.js처럼 실행됨 | `ELECTRON_RUN_AS_NODE=1` 환경변수 | `ELECTRON_RUN_AS_NODE=` 로 해제 |
| 창이 열리지 않음 | 가상 디스플레이 없음 | Xvfb로 가상 디스플레이 생성 |
| GPU 초기화 오류 | 컨테이너에 GPU 없음 | `--disable-gpu` 플래그 |

```bash
# Codespaces에서 실행
Xvfb :99 -screen 0 1280x800x24 &
DISPLAY=:99 npm run dev
# 또는
npm run dev:linux
```

---

## 라이선스

MIT © 2026 OpenClaw
