export type TestType = "iq" | "eq" | "engage";

/** binary = IQ; likert = Engage UWES 0–6; sjt = EQ situational (0–2 pts) */
export type ItemFormat = "binary" | "likert" | "sjt";

export type QuestionOption = {
  id: string;
  label: string;
  /**
   * binary: true/false
   * likert: raw scale value (0–6), reverse applied in scorer
   * sjt: points 0 | 1 | 2 (expert key)
   */
  value: number | boolean;
};

export type Question = {
  id: string;
  prompt: string;
  /** EQ SJT: tình huống trước câu hỏi */
  scenario?: string;
  hint?: string;
  options: QuestionOption[];
  dimension?: string;
  /** Tên phần thi (IQ subtest) */
  subtest?: string;
  reverse?: boolean;
  /** IQ difficulty weight */
  weight?: number;
  format?: ItemFormat;
};

export type TestProtocol = {
  format: ItemFormat;
  /** null = không giới hạn */
  timeLimitSeconds: number | null;
  /** Max điểm 1 item (trước weight): binary=1, sjt=2, likert=6 */
  itemPointMax: number;
  likertMax?: number;
  allowBack: boolean;
  estimatedMinutes: string;
  instructions: string[];
  rules: string[];
  standardizationNote: string;
};

export type TestMeta = {
  type: TestType;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  duration: string;
  questionCount: number;
  color: string;
  accent: string;
  icon: "brain" | "heart" | "flame";
  audienceNote: string;
  benefits: string[];
  framework?: string;
};

export type AnswerMap = Record<string, string>;

export type DimensionScore = {
  key: string;
  label: string;
  score: number;
  max: number;
  percent: number;
  /** UWES-style mean on 0–6 when applicable */
  mean?: number;
  /** WAIS/MSCEIT-style index estimate (mean 100, SD 15) */
  indexScore?: number;
};

export type TestResult = {
  type: TestType;
  completedAt: string;
  rawScore: number;
  maxScore: number;
  percent: number;
  band: string;
  bandLabel: string;
  summary: string;
  insights: string[];
  growthTips: string[];
  dimensions: DimensionScore[];
  displayScore: string;
  frameworkNote?: string;
  /** Seconds used; null if untimed */
  timeUsedSeconds?: number | null;
  timedOut?: boolean;
  protocolLabel?: string;
};

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  ageRange: string;
  goal: string;
  preferredChannel: string;
  note: string;
  testsTaken: TestType[];
};
