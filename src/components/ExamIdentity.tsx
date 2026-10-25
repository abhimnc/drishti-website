import { GraduationCap, Landmark, BookOpen } from "lucide-react";

export function ExamIdentity({ exam }: { exam: "UPSC" | "PCS" | "JRF" | "NCERT" }) {
  const Icon = exam === "JRF" ? GraduationCap : exam === "NCERT" ? BookOpen : Landmark;
  return <span className={`exam-identity exam-${exam.toLowerCase()}`} aria-label={`${exam} study pathway`}><Icon aria-hidden="true" strokeWidth={1.5} /><span>{exam}</span><span className="exam-identity-detail">{exam === "JRF" ? "UGC NET" : exam === "NCERT" ? "STUDY NOTES" : "CIVIL SERVICES"}</span></span>;
}