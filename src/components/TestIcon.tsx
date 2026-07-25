import { Brain, Flame, Heart } from "lucide-react";
import type { TestMeta } from "@/lib/types";

export function TestIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon: TestMeta["icon"];
  className?: string;
}) {
  if (icon === "brain") return <Brain className={className} />;
  if (icon === "heart") return <Heart className={className} />;
  return <Flame className={className} />;
}
