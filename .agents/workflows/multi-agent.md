# Multi-agent workflow — CorePrint / CRT

## Ai làm gì (mặc định)

| Agent | Vai trò | Lệnh / chỗ mở | Việc phù hợp |
|-------|---------|---------------|--------------|
| **Grok** (CLI này) | Orchestrator | Grok Build | Deploy, git/gh, quyết định product, merge, QA cuối, link Tally |
| **Codex** | Worker code song song | `codex exec "..."` trong repo | Feature UI, refactor, unit/smoke scripts, review diff |
| **Antigravity** | IDE + chat (Hermes) | Mở folder `Page_Crt_Onl` | Edit trực quan, debug UI, chat free khi Grok/Codex bận |

## Quy tắc tránh đụng file

1. Mỗi task **claim** 1 cụm path trong `TASK_BOARD.md` (status: claimed / done).
2. Không 2 agent cùng sửa 1 file.
3. Grok **merge** và push; Codex/Antigravity commit nhánh riêng nếu làm dài.
4. CRT form URL chỉ sửa ở `src/lib/constants.ts`.

## Lệnh nhanh

```powershell
cd D:\Other\congviec\Page_Crt_Onl

# Codex: 1 task (non-interactive)
codex exec "Read TASK_BOARD.md. Do only task C1. Do not touch deploy/git remote."

# Smoke local
npm run build

# Deploy: push master → GitHub Actions Pages
git push origin master
```

## URL production (GitHub Pages)

- Site: https://9baotran1.github.io/coreprint/
- Repo: https://github.com/9BaoTran1/coreprint
- CRT form: https://tally.so/r/81WAjP
