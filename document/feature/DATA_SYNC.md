# HookLink Data Architecture: Transparency, Speed, and Safety

HookLink는 사용자의 데이터를 블랙박스(SQLite, Binary DB)에 가두지 않습니다.
우리는 **"Plain Text"**의 힘을 믿으며, 누구나 읽을 수 있고 어디서나 동기화 가능한 아키텍처를 설계했습니다.

이 문서는 HookLink가 어떻게 데이터를 저장하고, 보호하며, 클라우드 환경에서 충돌 없이 동기화하는지를 설명하는 기술 백서입니다.

---

## 1. Core Philosophy: Your Data is Yours

대부분의 앱은 효율성을 핑계로 데이터를 암호화된 바이너리 DB(SQLite 등)에 숨깁니다.
하지만 HookLink는 다릅니다.

*   **Human Readable:** 데이터는 단순한 텍스트 파일(`hooks.jsonl`)로 저장됩니다. 메모장으로 열어서 직접 읽거나 수정할 수 있습니다.
*   **Vendor Lock-in Free:** 언제든지 파이썬 스크립트나 쉘 명령어로 데이터를 가공하고 추출할 수 있습니다.
*   **Future Proof:** 앱이 없어져도 데이터는 남습니다.

## 2. Storage Format: JSONL (Line-delimited JSON)

우리는 일반적인 JSON 대신 **JSONL** 형식을 채택했습니다.

```jsonl
{"uuid":"...","title":"Design Trends","url":"...","tags":["design"],"updated_at":"2026-01-16T..."}
{"uuid":"...","title":"Rust Guide","url":"...","tags":["dev"],"updated_at":"2026-01-16T..."}
```

### Why JSONL?
1.  **Append Only Speed:** 데이터 추가 시 파일 끝에 한 줄만 붙이면 됩니다. O(1) 시간 복잡도를 가집니다.
2.  **Corruption Resistant:** 파일의 일부가 손상되어도, 손상된 라인만 무시하면 나머지 데이터는 100% 복구 가능합니다. 반면, JSON이나 SQLite는 파일이 조금만 깨져도 전체를 열 수 없습니다.
3.  **Git Friendly:** 라인 단위로 저장되므로 Git 같은 버전 관리 시스템과도 궁합이 좋습니다.

## 3. Safety Mechanisms: Never Lose a Byte

"텍스트 파일은 불안하지 않나요?"
시스템 레벨의 보호 장치 2가지를 통해 DB보다 안전하게 만들었습니다.

### A. Atomic Write (원자적 저장)
저장 도중 전원이 나가거나 배터리가 떨어지면 어떻게 될까요?
HookLink는 파일을 직접 덮어쓰지 않습니다.

1.  데이터를 `hooks.jsonl.tmp`라는 **임시 파일**에 먼저 기록합니다.
2.  기록이 완벽하게 끝난 후(Flush & Sync), 원본 파일과 **교체(Rename - Atomic Swap)**합니다.
3.  사용자는 **"완벽한 이전 버전"** 혹은 **"완벽한 새 버전"** 중 하나만 보게 되며, 절대 "쓰다가 만 깨진 파일"을 겪지 않습니다.

### B. File Locking (동시성 제어)
Rust의 `fs2` 라이브러리를 사용하여 **OS 레벨의 파일 락(Lock)**을 겁니다.
여러 개의 HookLink 인스턴스를 켜도, 하나의 프로세스만이 쓰기 권한을 가지며 데이터가 뒤섞이는 것을 원천 차단합니다.

## 4. Cloud Sync & Conflict Resolution

Dropbox, iCloud, Google Drive를 통해 데이터를 동기화할 때 가장 큰 문제는 **"충돌(Conflict)"**입니다.
HookLink는 충돌을 두려워하지 않고 포용하는 **"Auto-Merge"** 전략을 사용합니다.

### The Algorithm: Latest Wins
서로 다른 맥북에서 동시에 작업을 하여 `hooks (conflicted copy).jsonl` 파일이 생겨도 걱정하지 마세요.

1.  **Scan:** 앱 시작 시 충돌 파일들을 자동으로 감지하여 메모리로 로드합니다.
2.  **Union:** 메인 데이터와 충돌 데이터를 모두 합칩니다.
3.  **Resolve:** `updated_at` 타임스탬프를 비교합니다.
    *   같은 링크(UUID)가 있다면? -> **더 최신 수정본**이 자동으로 살아남습니다.
4.  **Clean:** 병합된 완벽한 데이터를 다시 저장하고, 충돌 파일은 아카이브 폴더로 이동시킵니다.

사용자는 기술적인 문제를 신경 쓸 필요 없이, **"그냥 쓰면"** 됩니다.

## 5. Performance at Scale

HookLink는 Rust의 강력한 성능을 활용하여 **In-Memory** 아키텍처로 동작합니다.
데이터베이스(Disk I/O)를 매번 읽는 것이 아니라, 시작 시 모든 데이터를 RAM에 올립니다.

*   **10,000 Links:** ~4MB RAM (Spotify 노래 한 곡보다 가벼움)
*   **100,000 Links:** ~40MB RAM (Chrome 탭 하나보다 가벼움)
*   **Search Latency:** **0ms** (Instant Fuzzy Search)

## Summary

| Feature | Legacy Apps (Hookmark etc.) | HookLink |
| :--- | :--- | :--- |
| **Storage** | SQLite (Binary, Encrypted) | **JSONL (Plain Text)** |
| **Sync** | Corruptible (깨질 수 있음) | **Conflict-Free Auto Merge** |
| **Speed** | Disk I/O Bottleneck | **In-Memory (Rust Powered)** |
| **Ownership** | Locked in App | **Yours Forever** |

HookLink is not just a tool; it's a commitment to **Data Sovereignty** and **Engineering Excellence**.
