/**
 * contentMap.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Central data store for all mode-specific content.
 * Edit this file to update text per mode — no JSX changes needed.
 *
 * Modes: "dev" | "design" | "marketing"
 *
 * TODO items are clearly marked — fill in your real data there.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────────
//  SHARED "OTHER SKILLS" (same across all modes)
// ─────────────────────────────────────────────
const sharedOtherSkills = [
  { name: "Problem Solving",  pct: "90%" },
  { name: "Communication",    pct: "95%" },
  { name: "Time Management",  pct: "85%" },
  { name: "Teamwork",         pct: "92%" },
];

// ─────────────────────────────────────────────
//  PROJECT PLACEHOLDERS FOR DESIGN MODE
//  TODO: Replace title/description/image/liveLink with your real design projects
// ─────────────────────────────────────────────
export const designModeProjects = [
  {
    id: 1,
    title: "Brand Identity — Project A",
    description:
      "TODO: Describe your design project here. What was the brief, what did you deliver, and what was the impact?",
    techStack: ["Figma", "Illustrator", "Photoshop"],
    liveLink: "https://www.behance.net/yonas_ayele", // TODO: direct Behance link
    image: "/projects/ethiolottery.png", // TODO: replace with your design project image
  },
  {
    id: 2,
    title: "UI/UX Design — Project B",
    description:
      "TODO: Describe this UI/UX project — user research, wireframes, final screens, outcomes.",
    techStack: ["Figma", "After Effects"],
    liveLink: "https://www.behance.net/yonas_ayele",
    image: "/projects/moha.png", // TODO: replace with your design project image
  },
  {
    id: 3,
    title: "Social Media Campaign — Project C",
    description:
      "TODO: Describe the social media campaign — platform, audience, content strategy, visuals.",
    techStack: ["Photoshop", "Canva", "Illustrator"],
    liveLink: "https://www.behance.net/yonas_ayele",
    image: "/projects/qedamawi.png", // TODO: replace with your design project image
  },
];

// ─────────────────────────────────────────────
//  PROJECT PLACEHOLDERS FOR MARKETING MODE
//  TODO: Replace with your real marketing projects
// ─────────────────────────────────────────────
export const marketingModeProjects = [
  {
    id: 1,
    title: "Digital Marketing Campaign — Project A",
    description:
      "TODO: Describe the campaign — platform, goals, KPIs, results achieved.",
    techStack: ["Google Ads", "Meta Ads", "Analytics"],
    liveLink: "#", // TODO: add live case study or report link
    image: "/projects/ethiolottery.png", // TODO: replace with marketing project image
  },
  {
    id: 2,
    title: "SEO & Content Strategy — Project B",
    description:
      "TODO: Describe the SEO project — target keywords, content plan, ranking improvements.",
    techStack: ["SEMrush", "Google Search Console", "WordPress"],
    liveLink: "#",
    image: "/projects/moha.png", // TODO: replace
  },
  {
    id: 3,
    title: "Brand Growth — Project C",
    description:
      "TODO: Describe your brand growth work — channels, strategies, measurable outcomes.",
    techStack: ["Mailchimp", "HubSpot", "Canva"],
    liveLink: "#",
    image: "/projects/qedamawi.png", // TODO: replace
  },
];

// ─────────────────────────────────────────────
//  MAIN CONTENT MAP
// ─────────────────────────────────────────────
export const CONTENT_MAP = {
  /* ══════════════════════════════════════════
     DEV MODE  (default — #dev or no hash)
  ══════════════════════════════════════════ */
  dev: {
    // ── Hero ──────────────────────────────
    heroTitle:   "Developer / Designer",
    heroTagline: "Front-End Development | UI/UX Design | Branding",
    heroBio:
      "I'm a Developer & Designer with a strong passion for building responsive, high-performance web applications and visually compelling brand experiences. " +
      "Turning complex ideas into clean, functional, and user-centered interfaces.",

    // ── Skills section ───────────────────
    skillsHeading:       "My Skills",
    programmingHeading:  "Development & AI",
    skills: [
      { name: "FrontEnd",            pct: "92%" },
      { name: "MERN",                pct: "88%" },
      { name: "Python",              pct: "82%" },
      { name: "Prompt Engineering",  pct: "90%" },
      { name: "AI Automation",       pct: "86%" },
    ],
    otherSkillsHeading: "Design & Creative",
    otherSkills: [
      { name: "Product Design",      pct: "92%" },
      { name: "UI/UX Design",        pct: "90%" },
      { name: "Branding",            pct: "88%" },
      { name: "Higgsfield AI",       pct: "85%" },
    ],

    // ── Works section ────────────────────
    worksLabel:    "Developer / Designer Portfolio",
    worksHeading:  "Selected Development Work",
    worksSubtitle:
      "A curated selection of front-end development projects showcasing " +
      "clean code, responsive design, and user-focused experiences.",

    // Projects: uses the imported devProjects array (passed in from home.jsx)
    useDevProjects: true,
  },

  /* ══════════════════════════════════════════
     DESIGN MODE  (#design)
  ══════════════════════════════════════════ */
  design: {
    // ── Hero ──────────────────────────────
    heroTitle:   "Graphic & UI/UX Designer",
    heroTagline: "Figma | Illustrator | Photoshop | After Effects",
    heroBio:
      "I'm a creative designer with a deep passion for visual communication. " +
      "I craft brand identities, UI/UX experiences, and digital assets that are " +
      "both aesthetically compelling and strategically effective.",

    // ── Skills section ───────────────────
    // TODO: Replace these placeholder skill names and percentages with your actual ones
    skillsHeading:      "My Skills",
    programmingHeading: "Design Tools",
    skills: [
      { name: "Figma",           pct: "92%" }, // TODO: adjust
      { name: "Illustrator",     pct: "88%" }, // TODO: adjust
      { name: "Photoshop",       pct: "85%" }, // TODO: adjust
      { name: "After Effects",   pct: "80%" }, // TODO: adjust
      { name: "Canva",           pct: "90%" }, // TODO: adjust
    ],
    otherSkillsHeading: "Other Skills",
    otherSkills: sharedOtherSkills,

    // ── Works section ────────────────────
    worksLabel:    "Design Portfolio",
    worksHeading:  "Selected Design Work",
    worksSubtitle:
      "A collection of brand identities, UI/UX projects, and visual design work " +
      "crafted with attention to detail and purpose.",
    useDevProjects: false,
    projects: designModeProjects,
  },

  /* ══════════════════════════════════════════
     MARKETING MODE  (#marketing)
  ══════════════════════════════════════════ */
  marketing: {
    // ── Hero ──────────────────────────────
    heroTitle:   "Digital Marketing Specialist",
    heroTagline: "SEO | Social Media | Content Strategy | Analytics",
    heroBio:
      "I help brands grow their digital presence through data-driven marketing strategies. " +
      "From SEO and paid campaigns to content marketing and social media — " +
      "I deliver measurable results and meaningful audience connections.",

    // ── Skills section ───────────────────
    // TODO: Replace these placeholder skill names and percentages with your actual ones
    skillsHeading:      "My Skills",
    programmingHeading: "Marketing Skills",
    skills: [
      { name: "SEO / SEM",      pct: "88%" }, // TODO: adjust
      { name: "Social Media",   pct: "92%" }, // TODO: adjust
      { name: "Copywriting",    pct: "85%" }, // TODO: adjust
      { name: "Analytics",      pct: "80%" }, // TODO: adjust
      { name: "Email Marketing",pct: "75%" }, // TODO: adjust
    ],
    otherSkillsHeading: "Other Skills",
    otherSkills: sharedOtherSkills,

    // ── Works section ────────────────────
    worksLabel:    "Marketing Portfolio",
    worksHeading:  "Selected Marketing Campaigns",
    worksSubtitle:
      "A curated set of digital marketing campaigns and growth strategies " +
      "that delivered real, measurable results.",
    useDevProjects: false,
    projects: marketingModeProjects,
  },
};
