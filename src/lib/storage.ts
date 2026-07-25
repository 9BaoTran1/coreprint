import type { TestResult, TestType } from "./types";

const RESULT_PREFIX = "coreprint_result_";
const CONTACT_KEY = "coreprint_contact_draft";

export function saveResult(result: TestResult) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RESULT_PREFIX + result.type, JSON.stringify(result));
  const all = getCompletedTypes();
  if (!all.includes(result.type)) {
    all.push(result.type);
    localStorage.setItem("coreprint_completed", JSON.stringify(all));
  }
}

export function loadResult(type: TestType): TestResult | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(RESULT_PREFIX + type);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TestResult;
  } catch {
    return null;
  }
}

export function getCompletedTypes(): TestType[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("coreprint_completed");
    return raw ? (JSON.parse(raw) as TestType[]) : [];
  } catch {
    return [];
  }
}

export function loadAllResults(): Partial<Record<TestType, TestResult>> {
  const types: TestType[] = ["iq", "eq", "engage"];
  const out: Partial<Record<TestType, TestResult>> = {};
  for (const t of types) {
    const r = loadResult(t);
    if (r) out[t] = r;
  }
  return out;
}

export function saveContactDraft(data: Record<string, string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONTACT_KEY, JSON.stringify(data));
}

export function loadContactDraft(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : null;
  } catch {
    return null;
  }
}
