import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ResultView } from "@/components/results/ResultView";
import { TESTS } from "@/lib/tests-meta";
import type { TestType } from "@/lib/types";

const VALID: TestType[] = ["iq", "eq", "engage"];

type Props = { params: Promise<{ type: string }> };

export async function generateStaticParams() {
  return VALID.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const meta = TESTS[type as TestType];
  if (!meta) return { title: "Kết quả" };
  return {
    title: `Kết quả ${meta.shortName}`,
    description: `Hồ sơ ${meta.name} của bạn trên CorePrint.`,
  };
}

export default async function ResultPage({ params }: Props) {
  const { type } = await params;
  if (!VALID.includes(type as TestType)) notFound();
  return <ResultView type={type as TestType} />;
}
