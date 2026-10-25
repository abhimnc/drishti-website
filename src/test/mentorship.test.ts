import { describe, expect, it } from "vitest";
import { mentorshipPlans, studyProducts, links, whatsappEnquiry, trialSession, prepTiers, examTestSeries } from "@/lib/site";

describe("Confirmed monthly programme fees", () => {
  it("charges ₹4,500 per month for mentorship", () => {
    expect(mentorshipPlans.find((plan) => plan.id === "mentorship")?.monthlyPrice).toBe(4500);
  });
  it("charges ₹20,000 per month for daily classes", () => {
    expect(mentorshipPlans.find((plan) => plan.id === "daily-classes")?.monthlyPrice).toBe(20000);
  });
  it("charges ₹2,500 per month for the Lite Plan", () => {
    expect(mentorshipPlans.find((plan) => plan.id === "lite")?.monthlyPrice).toBe(2500);
  });
  it("offers a ₹300 trial session of 30 minutes", () => expect(trialSession).toEqual({ price: 300, minutes: 30 }));
});

describe("Confirmed UPPCS and EPFO test series prices", () => {
  it("prices the prep tiers at ₹1,500, ₹3,000 and ₹5,999", () => expect(prepTiers.map((tier) => tier.price)).toEqual([1500, 3000, 5999]));
  it("offers the complete UPPCS test series at ₹500 until the 6 December exam", () => {
    expect(examTestSeries.find((exam) => exam.id === "uppcs")).toMatchObject({ examDate: "2026-12-06", offer: { price: 500, was: 1500 } });
  });
});

describe("Confirmed supplementary offering prices", () => {
  it("prices all NCERT notes at ₹2,000", () => expect(studyProducts.find((p) => p.id === "ncert-notes")?.price).toBe(2000));
  it("prices all UPSC notes at ₹6,000", () => expect(studyProducts.find((p) => p.id === "upsc-notes")?.price).toBe(6000));
  it("prices History optional mentorship at ₹3,000", () => expect(studyProducts.find((p) => p.id === "history-optional")?.price).toBe(3000));
  it("prices Mains answer writing at ₹1,500 per subject", () => {
    expect(studyProducts.find((p) => p.id === "mains-writing")).toMatchObject({ price: 1500, unit: "Per subject" });
  });
  it("prices UGC NET-JRF History notes at ₹1,500", () => expect(studyProducts.find((p) => p.id === "net-history")?.price).toBe(1500));
});

describe("Confirmed contact destinations", () => {
  it("opens WhatsApp for the supplied Indian phone number", () => {
    expect(links.whatsapp).toBe("whatsapp://send?phone=919821511909");
    const url = new URL(whatsappEnquiry("All NCERT notes"));
    expect(url.protocol).toBe("whatsapp:");
    expect(url.searchParams.get("phone")).toBe("919821511909");
    expect(url.searchParams.get("text")).toContain("All NCERT notes");
  });
  it("opens the supplied channel in Telegram Web", () => expect(links.telegram).toBe("https://web.telegram.org/k/#@drdrishtikalra"));
});