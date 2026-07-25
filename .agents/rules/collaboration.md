# Collaboration rules (Grok · Codex · Antigravity)

- Single source of tasks: `/TASK_BOARD.md`
- CRT consult URL only in `src/lib/constants.ts` — never hardcode elsewhere for new code
- Prefer small PRs / small commits per agent
- Do not commit secrets, tokens, or personal form dumps
- Static export: `output: "export"` — no server routes / no Node APIs at runtime
- Production path prefix when `GH_PAGES=true`: `/coreprint`
