# OpenClaw — Instagram 카드뉴스 메이커

> 인스타그램 1080×1080 카드뉴스를 즉시 제작하고 PNG로 내보내는 앱
> **Electron 데스크톱** + **웹 브라우저(모바일 포함)** 모두 지원

🌐 **웹 버전 (모바일)**: https://ddeokmyeong03.github.io/openclaw/

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **5가지 템플릿** | Minimal · Bold · Elegant · Gradient · Magazine |
| **실시간 미리보기** | 아이폰 15 SVG 목업 안에서 Instagram 피드 형태로 즉시 확인 |
| **콘텐츠 편집** | 제목 / 본문 / 해시태그 / 브랜드명 |
| **색상 커스텀** | 배경색 · 강조색 · 텍스트 색 |
| **폰트 선택** | Pretendard / Noto Sans KR / Noto Serif KR / Black Han Sans / Gowun Dodum |
| **PNG 내보내기** | 1080×1080 고해상도 PNG 자동 다운로드 |
| **다크 모드** | TopBar 버튼으로 라이트/다크 전환 |
| **모바일 지원** | 햄버거 메뉴로 편집 패널 열기/닫기, 미리보기 상시 표시 |

---

## 템플릿 종류

| 이름 | 특징 |
|------|------|
| **Minimal** | 흰 배경, 깔끔한 타이포그래피 |
| **Bold** | 강렬한 컬러 블록, 임팩트 폰트 |
| **Elegant** | 크림 배경, 세리프체, 세로선 포인트 |
| **Gradient** | 풀블리드 그라디언트, 글래스모피즘 |
| **Magazine** | 헤더 컬러 밴드, 에디토리얼 레이아웃 |

---

## 사용 방법

### 웹 버전 (브라우저 / 모바일)

브라우저에서 바로 사용 → **PNG 자동 다운로드**

```
https://ddeokmyeong03.github.io/openclaw/
```

**모바일 사용법**
1. 위 URL 접속
2. 기본 화면에서 아이폰 목업 미리보기 확인
3. 좌측 상단 햄버거(☰) 버튼 → 편집 패널 열기
4. 내용·템플릿·색상·폰트 수정 후 패널 닫기
5. "PNG로 내보내기" 버튼 → 1080×1080 PNG 다운로드

### Electron 데스크톱 설치

[Releases](https://github.com/ddeokmyeong03/openclaw/releases) 페이지에서 운영체제별 파일 다운로드:

| OS | 파일 |
|----|------|
| macOS | `카드뉴스 메이커-1.0.0.dmg` |
| Windows | `카드뉴스 메이커 Setup 1.0.0.exe` |
| Linux | `카드뉴스 메이커-1.0.0.AppImage` |

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

## 기술 스택

```
Electron 31          — 데스크톱 앱 패키징
electron-vite 2      — 빌드 오케스트레이터
React 18             — UI 프레임워크
TypeScript           — 타입 안전성
Tailwind CSS         — 스타일링 (다크 모드, 반응형)
Zustand              — 전역 상태 관리
Framer Motion        — 템플릿 전환 애니메이션
html2canvas          — 오프스크린 1080×1080 → PNG 캡처
```

---

## 프로젝트 구조

```
openclaw/
├── electron/
│   ├── main/index.ts          # 메인 프로세스 (IPC, 파일 저장)
│   └── preload/index.ts       # contextBridge API 노출
├── src/
│   ├── App.tsx                # 루트 레이아웃 (모바일 햄버거 드로어 포함)
│   ├── types/index.ts         # CardData, TemplateId 타입
│   ├── store/useCardStore.ts  # Zustand 전역 상태
│   ├── hooks/useExport.ts     # PNG 내보내기 훅
│   └── components/
│       ├── TopBar.tsx         # 상단 바 (햄버거 버튼, 다크모드 토글)
│       ├── LeftPanel/         # 편집 패널 (모바일: 드로어)
│       ├── RightPanel/        # 아이폰 목업 + 미리보기
│       └── templates/         # 5가지 카드 템플릿
├── .github/workflows/
│   └── deploy.yml             # GitHub Pages 자동 배포
└── package.json
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

## 모바일 레이아웃

| 상태 | 화면 |
|------|------|
| 기본 | 아이폰 목업 미리보기 전체 화면 |
| 햄버거 버튼 탭 | 편집 패널이 왼쪽에서 슬라이드인 |
| 백드롭 터치 | 편집 패널 자동 닫힘 |
| 데스크톱(md+) | 편집 패널 + 미리보기 양쪽 동시 표시 |

---

## Codespaces 실행 시 참고사항

| 이슈 | 원인 | 해결 |
|------|------|------|
| Electron이 Node.js처럼 실행됨 | `ELECTRON_RUN_AS_NODE=1` 환경변수 | `ELECTRON_RUN_AS_NODE=` 로 해제 |
| 창이 열리지 않음 | 가상 디스플레이 없음 | Xvfb로 가상 디스플레이 생성 |
| GPU 초기화 오류 | 컨테이너에 GPU 없음 | `--disable-gpu` 플래그 |

---

## 라이선스

MIT © 2026 OpenClaw
