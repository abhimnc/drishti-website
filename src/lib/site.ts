// Canonical public address; used for canonical links, social previews and the sitemap.
export const siteUrl = "https://www.drdrishtikalra.in";

export const links = {
  linkedin: "https://www.linkedin.com/in/dr-drishti-kalra-6a43b417b",
  builderLinkedin: "https://www.linkedin.com/in/abhishek-k-38810b174/",
  whatsapp: "whatsapp://send?phone=919821511909",
  telegram: "https://web.telegram.org/k/#@drdrishtikalra",
  ncertOrder: "https://forms.gle/3TqT9PrCTAwno5Br7",
  netNotesOrder: "https://forms.gle/LHY76o9umf6skL7ZA",
  uppcsRegister: "https://docs.google.com/forms/d/16YatgR-etY5_ib-foy3sxFsWQyZO05r1e6vD1DKVhB8/viewform",
  epfoRegister: "https://docs.google.com/forms/d/e/1FAIpQLSeq4WckL828C7K15i2KnCbyODTvIAvPlUIchKTSvCqCIYc60w/viewform",
};

export const upiId = "drishtikalra1@okaxis";

export const mentorshipPlans = [
  { id: "mentorship", name: "Full Plan", tagline: "8 classes a week", monthlyPrice: 4500, perDay: 150, description: "Explanatory classes almost every day, with your day reported to me every night.", features: ["8 explanatory classes a week", "1-hour 1:1 review every 3 days", "Nightly check-ins & daily worksheets", "Test series & daily answer writing, checked", "Notes review & voice-note doubts", "Personal timetable & book list"] },
  { id: "lite", name: "Lite Plan", tagline: "4 classes a week", monthlyPrice: 2500, perDay: 83, description: "A steadier pace with a weekly review, for aspirants who need fewer touchpoints.", features: ["4 explanatory classes a week", "1-hour 1:1 review once a week", "Test series & daily answer writing, checked", "Notes review & voice-note doubts", "Personal timetable & book list"] },
  { id: "daily-classes", name: "Daily classes", tagline: "Classes & study support", monthlyPrice: 20000, perDay: null, description: "Study with me through daily classes.", features: ["Daily classes", "Mentorship for your chosen examination", "Daily worksheets & test series", "My own notes on NCERT & standard books"] },
] as const;

export const planComparison = [
  ["Explanatory classes", "8 a week", "4 a week"],
  ["Gap between classes", "Almost none", "Up to 2–3 days"],
  ["1-hour 1:1 review session", "Every 3 days", "Once a week"],
  ["Nightly check-ins", true, false],
  ["Daily worksheets", true, false],
  ["Test series", true, true],
  ["Daily answer writing, checked", true, true],
  ["Notes review + voice-note doubts", true, true],
  ["Timetable + book list", true, true],
] as const;

export const trialSession = { price: 300, minutes: 30 } as const;

export const prepTiers = [
  { id: "test-series", name: "Test Series", price: 1500, summary: "Full-length mocks and sectional tests with solutions & PYQs." },
  { id: "tests-notes", name: "Tests + Notes + Worksheets", price: 3000, summary: "Study material and daily practice alongside the tests." },
  { id: "full-run", name: "Full Run", price: 5999, summary: "End-to-end preparation with daily current affairs and 1:1 guidance." },
] as const;

export const prepTierFeatures = [
  ["Test series", [true, true, true]],
  ["Solutions & PYQs", [true, true, true]],
  ["Complete notes", [false, true, true]],
  ["Daily worksheets", [false, true, true]],
  ["Daily current affairs", [false, false, true]],
  ["1:1 guidance", [false, false, true]],
] as const;

export const examTestSeries = [
  {
    id: "uppcs", exam: "UPPCS Prelims 2026", examDate: "2026-12-06", registerUrl: links.uppcsRegister,
    summary: "12 full-length mocks (GS + CSAT, exact exam pattern) and 75 subject-wise sectional tests.",
    highlights: ["Detailed solutions", "PYQ practice", "UP special GK", "Hindi & English medium"],
    offer: { name: "Complete UPPCS Test Series", price: 500, was: 1500, inclusions: [["69", "Sectional tests"], ["66", "Daily worksheets"], ["12", "Full-length mocks"], ["6", "Revision tests"], ["CSAT", "Practice tests"], ["46", "Day schedule"]] },
  },
  {
    id: "epfo", exam: "EPFO exam preparation", examDate: null, registerUrl: links.epfoRegister,
    summary: "Complete practice tests with solutions & PYQs, with notes, worksheets and guidance in the higher tiers.",
    highlights: ["Solutions & PYQs", "Complete notes", "Daily worksheets", "Regular guidance"],
    offer: null,
  },
] as const;

export const credentialDocuments = [
  { id: "upsc", issuer: "Union Public Service Commission", title: "Civil Services (Main) Examination, 2019", headline: "1010", headlineLabel: "Final marks · Recommended", details: [["Written total", "838"], ["Personality test", "172"], ["History optional", "150 + 118"], ["Essay", "125"]] },
  { id: "phd", issuer: "University of Delhi", title: "Doctor of Philosophy (Ph.D.), History", headline: "Ph.D.", headlineLabel: "Awarded September 2025", details: [["Thesis", "Contested Landscapes, Enduring Memory: Bodhgaya and the Entangled Histories of Sacred Space"], ["Department", "History"]] },
  { id: "jrf", issuer: "National Testing Agency · UGC", title: "Junior Research Fellowship award letter", headline: "JRF", headlineLabel: "UGC-NET History · 2022", details: [["Session", "December 2020 & June 2021 (merged)"], ["Dated", "12 March 2022"]] },
  { id: "net", issuer: "National Testing Agency · UGC", title: "NET e-certificate for Assistant Professor", headline: "NET", headlineLabel: "Assistant Professor eligibility", details: [["Subject", "History"], ["Eligible from", "19 February 2022"]] },
] as const;

export const examTracks = [
  { name: "UPSC", detail: "Civil Services preparation", description: "Mentorship informed by my own experience of writing UPSC Mains twice and appearing for the interview." },
  { name: "State PCS", detail: "State Civil Services preparation", description: "Personal guidance for your PCS preparation, supported by worksheets, a test series and study notes." },
  { name: "UGC NET-JRF", detail: "Your path into academia", description: "Learn with a JRF-qualified professor who understands both examination preparation and academic life." },
] as const;

export const formatMonthlyPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export const studyProducts = [
  { id: "ncert-notes", name: "All NCERT notes", price: 2000, unit: "37 books · PDF bundle", category: "Foundation", description: "Chapter-wise notes on all 37 NCERT books from Class 6 to 12, with prelims pointers, mains angles, maps, revision grids and self-check MCQs.", orderUrl: links.ncertOrder },
  { id: "upsc-notes", name: "All UPSC notes", price: 6000, unit: "Complete collection", category: "Civil Services", description: "My complete UPSC notes collection for your preparation.", orderUrl: null },
  { id: "history-optional", name: "History optional mentorship", price: 3000, unit: "Per month", category: "Optional subject", description: "A Mains-first programme: a weekly timetable with daily questions, one answer evaluated every day and a 1-hour 1:1 session every week.", orderUrl: null },
  { id: "mains-writing", name: "UPSC Mains answer writing", price: 1500, unit: "Per subject", category: "Mains practice", description: "Subject-wise guidance for your Mains answer-writing practice.", orderUrl: null },
  { id: "net-history", name: "UGC NET-JRF History notes", price: 1500, unit: "All 10 PDFs", category: "NET-JRF", description: "My History notes for UGC NET-JRF preparation, delivered as 10 PDFs.", orderUrl: links.netNotesOrder },
] as const;

export const whatsappEnquiry = (offering: string) => `${links.whatsapp}&text=${encodeURIComponent(`Hello Dr. Drishti Kalra, I am interested in ${offering}. Please share the details.`)}`;

export const education = [
  ["2015–2018", "B.A. in History", "Shyama Prasad Mukherji College for Women, University of Delhi"],
  ["2018–2020", "M.A. in Ancient Indian History", "Ramjas College, University of Delhi"],
  ["2019–2020", "Associate's Degree in Sanskrit & Classical Indian Languages", "St. Stephen's College, Delhi"],
  ["2022", "M.Phil in Gender and Social Work", "University of Bristol"],
  ["2025", "PhD in History", "University of Delhi · thesis on Bodhgaya and the entangled histories of sacred space"],
];

export const timeline = [
  ["2015–2016", "Editorial Assistant at BookTrust (5 months) · Editor at Hindu Business Lines (3 months) and The Telegraph (4 months)"],
  ["2016–2018", "Public Speaking Faculty at PlanetSpark (2 years 1 month)"],
  ["2017–2021", "Assistant Project Manager at Legends of Itihasa and Purana (4 years 1 month)"],
  ["2018–2019", "High School Social Studies Teacher at Edzym (1 year 2 months)"],
  ["2020–2021", "Subject Matter Expert at Testbook (1 year 6 months)"],
  ["2020–2023", "Research Assistant at Max Planck Institute for Multidisciplinary Sciences (2 years 10 months) — Best Researcher Award"],
  ["2021–2024", "Assistant Professor at School of Open Learning, DU (3 years 1 month)"],
  ["2022–2026", "Assistant Professor at Delhi College of Arts and Commerce (4 years 1 month)"],
  ["2023", "Associate Research Fellow at Delhi University — authored 100 years of DU history"],
  ["2023–2024", "Research Study Assistant at JNU (1 year 5 months)"],
  ["2024–2025", "Research Assistant at Jio Institute (2 months) and Department of Anthropology, DU (11 months)"],
  ["2024–2025", "Content Manager at Weaving Thoughts (9 months)"],
  ["2025–2026", "UPSC Faculty at Plutus IAS (5 months) and Bano IAS (9 months)"],
  ["2026–Present", "Assistant Professor at Shivaji College, University of Delhi"],
];

export const expertise = [
  ["Historical Periods", ["Ancient Indian History", "Medieval History", "Modern Indian History", "World History"]],
  ["Specialised Research", ["Buddhism Studies", "Cultural Memory", "Gender History", "Emotional Histories"]],
  ["Teaching Methods", ["UPSC Coaching", "Undergraduate Instruction", "Curriculum Development", "EdTech Content Creation"]],
] as const;

export const languages = [
  ["English", "Full professional — academic writing, teaching and research"],
  ["Hindi", "Full professional — teaching and content for Indian audiences"],
  ["Punjabi", "Full professional — regional language expertise"],
  ["Sanskrit", "Professional working — classical Indian languages and literature"],
  ["French", "Limited working — research and academic purposes"],
];

export const competencies = [
  "Academic Research and Publication", "Curriculum and Content Development", "Classroom and Online Teaching",
  "UPSC Examination Guidance", "Historical Analysis and Interpretation", "Public Speaking and Communication",
  "Editorial and Content Writing", "SEO and Digital Content Strategy", "Research Methodology", "Anthropological Perspectives",
];

export const awards = [
  ["Max Planck Best Researcher Award", "Max Planck Institute for Multidisciplinary Sciences — international recognition for research on emotional histories"],
  ["Principal's Medal", "Shyama Prasad Mukherji College, University of Delhi"],
  ["Shakuntala Gupta Memorial Award", "Academic excellence in historical studies"],
  ["BR Grover Memorial Award", "Outstanding research contributions"],
  ["Narayani Devi Parashar Award", "Excellence in academic performance"],
  ["Swami Dayanand Memorial Award & Hansraj Medal", "Honours recognising academic achievement and scholarly merit"],
];
