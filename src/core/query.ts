import type { ParsedQs } from "qs";

export function getQueryString(
  value: string | ParsedQs | (string | ParsedQs)[] | undefined
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  return value.replace(/-/g, " ").trim() || null;
}