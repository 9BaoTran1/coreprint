import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { QuizEngine } from "@/components/quiz/QuizEngine";
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
  if (!meta) return { title: "Bài đánh giá" };
  return {
    title: meta.name,
    description: meta.description,
  };
}

export default async function TestPage({ params }: Props) {
  const { type } = await params;
  if (!VALID.includes(type as TestType)) notFound();
  return <QuizEngine type={type as TestType} />;
}
