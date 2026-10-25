import { describe, it, expect } from "vitest";
import { postSchema, youtubeId } from "@/lib/publishing";
const base = { title: "Study", slug: "study", kind: "article", category: "UPSC", excerpt: "", body: "", media: [], youtube_id: "", status: "published" };
describe("Publishing formats", () => {
  it("does not publish an empty article", () => expect(postSchema.safeParse(base).success).toBe(false));
  it("allows saving an unfinished draft", () => expect(postSchema.safeParse({ ...base, status: "draft" }).success).toBe(true));
  it("requires multiple carousel slides", () => { expect(postSchema.safeParse({ ...base, kind: "carousel", media: ["one"] }).success).toBe(false); expect(postSchema.safeParse({ ...base, kind: "carousel", media: ["one", "two"] }).success).toBe(true); });
  it("accepts a YouTube watch link", () => expect(youtubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ"));
  it("rejects lookalike video hosts", () => expect(youtubeId("https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ")).toBe(""));
});