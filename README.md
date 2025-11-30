## 요구사항 
- [x] Payment 테이블 UI를 구현
- [x] consumptions를 [salesOrder.id] 기준으로 그룹핑, 그룹별 Sub Total 표시
- [x] 컬럼별 검색 토글과 조건 선택으로 목록을 필터링 기능 추가
- [x] payment, paymentBreakdowns와 consumptions 간 매핑을 화면에서 식별 가능하도록 표시

## 실행 방법과 스크립트, 사용 버전
### 실행 방법
```
pnpm install
pnpm run dev
```

### 사용 버전
- React 19
- React Router DOM 7
- Vite 7
- TypeScript 5.9
- Tailwind CSS 4
- @tailwindcss/vite plugin
- Lucide Icons / Day.js / Lodash
- ESLint 9
- TypeScript ESLint 8
- PostCSS 8 / autoprefixer

## 폴더구조
```
src
├── images/                 # 프로젝트에서 사용하는 이미지 에셋
│   └── sije-logo.png
│
├── payment-table/          # 결제 테이블 관련 전체 기능 모듈
│   ├── components/         # 테이블을 이루는 UI 컴포넌트
│   │   ├── DataRow.tsx         # 각 데이터 행(row)
│   │   ├── Payment.tsx         # Payment 데이터 컴포넌트
│   │   ├── PaymentHeader.tsx   # 페이먼트 테이블 페이지 헤더 - 타이틀, 검색 토글버튼 포함
│   │   ├── SearchRow.tsx       # 검색 행(row) 컴포넌트
│   │   ├── SearchSelect.tsx    # 검색셀렉트 컴포넌트
│   │   └── TotalsRow.tsx       # 총합/subTotal 행(row) 컴포넌트
│   │
│   ├── mockdata.ts          # 테스트용 mock 데이터
│   ├── PaymentTable.tsx     # 페이먼트 테이블 전체 구조 구성 컴포넌트
│   ├── types.ts             # Payment 관련 타입 정의
│   └── utils.ts             # PaymentTable 전용 유틸 함수 모음
│
├── utils/                   # 전역 유틸 함수
│   ├── cn.ts                # 클래스 네이밍 유틸 (Tailwind class merge 등)
│   └── formatDate.ts        # 날짜 포맷팅 유틸(dayjs 기반)
│
├── App.tsx                  # 라우팅 및 전체 애플리케이션 구성
├── Home.tsx                 # 홈 화면(첫 페이지)               
├── index.css                
├── main.tsx                
└── index.html               
```

## 설계 의도
**1. 확장 가능 하도록 컴포넌트 단위 분리**
- Payment 수가 1개에서 10개로 늘어도 UI 구조와 로직이 절대로 깨지지 않음
- 동적 헤더 / 동적 SearchRow / 동적 DataRow / 동적 TotalsRow 조합
- 컴포넌트 분리를 통해 읽기 쉽고 유지보수가 쉬움

**2. 뷰 모델 중심 설계**
- API → RawData → ViewModel 변환되도록 구조화
- UI는 ViewModel만 바라보도록 최소 의존성 구조로 설계

**3. 사용자 중심 UI**
- 검색 영역의 켜고 끄는 UX를 더 직관적으로 보이도록 토글 디자인 적용

### 트레이드오프
**1. 동적 Payment 컬럼 렌더링**
- Payment count 무제한 확장 가능하도록 구조화했으나, 테이블 구조가 전체적으로 복잡해짐.
- 스크롤 영역을 전체로 잡았으나, Payment가 늘어날 수록 품목 단위에 대한 정보를 보기가 어려워짐 -> 스크롤 영역을 변경하러면 구조 변경이 필요함.

**2. PaymentInfoCard는 테이블이 아닌 Grid로 구현**
- key-value 정보에 맞춰 테이블이 아닌 Grid로 구현 - Semantic 태그의 의미에 맞춤
- 테이블과는 정렬이 분리되어 별도의 스타일 적용, 그러나 독립 컴포넌트로 유지보수는 더 쉬워짐
