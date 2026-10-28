import { useEffect, useState, useRef } from "react";
import "../components/style.css";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";
import { LuPhone, LuExternalLink, LuCalendar, LuMapPin } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import cpuImage from "../assets/cpu.png";
import cpuShadowImage from "../assets/cpu_shadow.png";
import devProjects from "../components/devProjects";
import projects from "../components/projects";
import projects_part from "../components/projects_part";
import experiences from "../components/experienceData";
import { useHashMode } from "../hooks/useHashMode";
import { CONTENT_MAP } from "../components/contentMap";

const mayaRadiologyProject = projects.find((project) =>
  project.title.includes("Maya Radiology")
);

const brandingProjects = [
  {
    title: "Klik Delivery Branding",
    behanceLink: "https://www.behance.net/gallery/253733435/klik",
    link: "/projects/Klik Delivery Branding.jpeg",
  },
  {
    title: "Nubian Branding",
    behanceLink: "https://www.behance.net/gallery/257493965/NUBIAN-BRANDING",
    link: "/projects/Nubian Branding.jpeg",
  },
  { 
    title: "Velocity Branding",
    link: "/projects/Velocity Branding.jpeg",
  },
  {
    title: "Maya Radiology Branding",
    link: mayaRadiologyProject?.link,
    detailTitle: mayaRadiologyProject?.title,
  },
  { 
    title: "Share Water Branding",
    link: "/projects/Share Water Branding.jpeg",
  },
  {
    title: "Hanuk Poultry Branding",
    behanceLink: "https://www.behance.net/gallery/253732845/Hanuk-Poultry",
    link: "/projects/hanuk_poultry_brand.jpg",
  },
  ...projects
    .filter(
      (project) =>
        project.type === "brand" && !project.title.includes("Maya Radiology")
    )
    .map((project) => ({
      title: project.title,
      link: project.link,
      detailTitle: project.title,
    })),
];

const portfolioVariants = {
  enter: (direction) => ({ opacity: 0, x: `${direction * 100}%` }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: `${direction * -100}%` }),
};

/* ─────────────────  Animated Project Row  ───────────────── */
const ProjectRow = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className={`project-row ${isEven ? "project-row--reverse" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 }}
    >
      {/* Info Side */}
      <div className="project-info">
        <span className="project-number">0{index + 1}</span>
        <h2 className="project-title">{project.title}</h2>
        <p className="project-description">{project.description}</p>
        <div className="tech-stack">
          {project.techStack.map((tech, i) => (
            <span key={i} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="view-btn"
        >
          <span>View Project</span>
          <LuExternalLink />
        </a>
      </div>

      {/* Image Side */}
      <div className="project-image-wrapper">
        <div className="project-image-glow"></div>
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="project-image"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

/* ─────────────────  Main Home Component  ───────────────── */
const Home = () => {
  const [cloudPosition, setCloudPosition] = useState({ x: 0, y: 0 });
  const [activePortfolio, setActivePortfolio] = useState("development");
  const [portfolioDirection, setPortfolioDirection] = useState(-1);

  /* ── Hash-based mode routing ── */
  const mode = useHashMode();
  const content = CONTENT_MAP[mode];

  /* Determine the active project list for the Works section */
  const activeProjects = content.useDevProjects ? devProjects : content.projects;

  /* Refs for scroll navigation */
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const worksRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const showPortfolio = (tab) => {
    if (tab !== activePortfolio) {
      setPortfolioDirection(tab === "branding" ? 1 : -1);
      setActivePortfolio(tab);
    }
    scrollTo(worksRef);
  };

  /* Cloud background glow */
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Background glow position
      setCloudPosition({
        x: e.clientX + window.pageXOffset,
        y: e.clientY + window.pageYOffset,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* Mobile menu */
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* Skills animation */
  const [isTriggered, setIsTriggered] = useState(false);
  const [skills, setSkills] = useState({
    skill1: "0%",
    skill2: "0%",
    skill3: "0%",
    skill4: "0%",
    skill5: "0%",
    skill6: "0%",
    skill7: "0%",
    skill8: "0%",
    skill9: "0%",
  });

  const skillsAnimRef = useRef(null);
  // NOTE: once:true is removed so animation can re-fire when mode changes
  const skillsInView = useInView(skillsAnimRef, { once: false, margin: "-100px" });

  /* Reset + re-run skill bar animation on mode change */
  useEffect(() => {
    setIsTriggered(false);
    setSkills({
      skill1: "0%",
      skill2: "0%",
      skill3: "0%",
      skill4: "0%",
      skill5: "0%",
      skill6: "0%",
      skill7: "0%",
      skill8: "0%",
      skill9: "0%",
    });
  }, [mode]);

  useEffect(() => {
    if (skillsInView && !isTriggered) {
      setIsTriggered(true);
      // Programming skills (5) from content map
      const ps = content.skills;
      // Other skills (4) from content map
      const os = content.otherSkills;
      setSkills({
        skill1: ps[0]?.pct ?? "0%",
        skill2: ps[1]?.pct ?? "0%",
        skill3: ps[2]?.pct ?? "0%",
        skill4: ps[3]?.pct ?? "0%",
        skill5: ps[4]?.pct ?? "0%",
        skill6: os[0]?.pct ?? "0%",
        skill7: os[1]?.pct ?? "0%",
        skill8: os[2]?.pct ?? "0%",
        skill9: os[3]?.pct ?? "0%",
      });
    }
  }, [skillsInView, isTriggered, content]);

  /* Design Projects Logic */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProjectTitle, setCurrentProjectTitle] = useState("");

  const openLightbox = (title) => {
    setCurrentProjectTitle(title);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentProjectTitle("");
  };

  const lightboxImages = projects_part.filter(p => p.title === currentProjectTitle);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && lightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="background">
      {/* Cursor cloud glow */}
      <div
        className="cloud"
        style={{
          top: `${cloudPosition.y - 200}px`,
          left: `${cloudPosition.x - 200}px`,
        }}
      ></div>

      <div className="continer">
        <div className="contanier_div">
          {/* ═══════════════════  NAV  ═══════════════════ */}
          <nav className="first_div" id="nav-bar">
            <div className="nav-logo" onClick={() => scrollTo(heroRef)}>
              <span className="nav-logo-text">Yonas</span>
            </div>
            <div className="menu">
              <h2 id="link" onClick={() => scrollTo(heroRef)}>About Me</h2>
              <h2 id="link" onClick={() => scrollTo(skillsRef)}>Skills</h2>
              <h2 id="link" onClick={() => scrollTo(experienceRef)}>Experience</h2>
              <h2 id="link" onClick={() => scrollTo(worksRef)}>Portfolio</h2>
              <h2 id="link" onClick={() => showPortfolio("branding")}>Branding</h2>
              <h2 id="link" onClick={() => scrollTo(contactRef)}>Contact</h2>
            </div>

            <div className="mobile_menu">
              <button
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div className={`side-menu ${menuOpen ? "open" : ""}`}>
                <ul>
                  <li><button onClick={() => scrollTo(heroRef)}>Home</button></li>
                  <li><button onClick={() => scrollTo(skillsRef)}>Skills</button></li>
                  <li><button onClick={() => scrollTo(experienceRef)}>Experience</button></li>
                  <li><button onClick={() => scrollTo(worksRef)}>Portfolio</button></li>
                  <li><button onClick={() => showPortfolio("branding")}>Branding</button></li>
                  <li><button onClick={() => scrollTo(contactRef)}>Contact</button></li>
                </ul>
              </div>
              <div className={`overlay ${menuOpen ? "show" : ""}`} onClick={toggleMenu}></div>
            </div>
          </nav>

          {/* ═══════════════════  HERO  ═══════════════════ */}
          <section className="second_div" ref={heroRef}>
            <div id="main_view">
              <div id="mv">
                <div id="cpu">
                  <img
                    className="image_of_cpu"
                    src={cpuImage}
                    id="cpu_img"
                    alt="Illustrated laptop"
                  />
                  <img
                    className="image_of_shdow"
                    src={cpuShadowImage}
                    id="cpu_shdow"
                    alt=""
                  />
                </div>
              </div>
              <div id="mv">
                <h1 id="my_name">Yonas Ayele</h1>
                <h3 id="skill_text">{content.heroTitle}</h3>
                <motion.p 
                  className="hero-tagline"
                  key={mode} /* re-animate when mode changes */
                  initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                  animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                  transition={{ duration: 2, ease: "anticipate", delay: 0.2 }}
                >
                  {content.heroTagline}
                </motion.p>
                <p id="par">{content.heroBio}</p>
              </div>
            </div>
          </section>

          {/* ═══════════════════  SKILLS  ═══════════════════ */}
          <section className="fourth_div" ref={skillsRef}>
            <div id="skill" ref={skillsAnimRef}>
              <h1 id="journey_heading">{content.skillsHeading}</h1>
              <div id="journey_1">
                <h1 id="j_e">{content.programmingHeading}</h1>
                <div id="edu_text">
                  <div id="skill_n">
                    <h2 id="skill_name">{content.skills[0]?.name}</h2>
                    <h2 className="sk_1" id="skill_percentage">{content.skills[0]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill1"] }}></div>
                    </div>
                  </div>
                  <div id="skill_n">
                    <h2 id="skill_name">{content.skills[1]?.name}</h2>
                    <h2 className="sk_2" id="skill_percentage">{content.skills[1]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill2"] }}></div>
                    </div>
                  </div>
                  <div id="skill_n">
                    <h2 id="skill_name">{content.skills[2]?.name}</h2>
                    <h2 className="sk_3" id="skill_percentage">{content.skills[2]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill3"] }}></div>
                    </div>
                  </div>
                  <div id="skill_n">
                    <h2 id="skill_name">{content.skills[3]?.name}</h2>
                    <h2 className="sk_4" id="skill_percentage">{content.skills[3]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill4"] }}></div>
                    </div>
                  </div>
                  <div id="skill_n">
                    <h2 id="skill_name">{content.skills[4]?.name}</h2>
                    <h2 className="sk_5" id="skill_percentage">{content.skills[4]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill5"] }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="journey_1">
                <h1 id="j_e">{content.otherSkillsHeading}</h1>
                <div id="edu_text">
                  <div id="skill_n">
                    <h2 id="skill_name">{content.otherSkills[0]?.name}</h2>
                    <h2 className="sk_6" id="skill_percentage">{content.otherSkills[0]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill6"] }}></div>
                    </div>
                  </div>
                  <div id="skill_n">
                    <h2 id="skill_name">{content.otherSkills[1]?.name}</h2>
                    <h2 className="sk_7" id="skill_percentage">{content.otherSkills[1]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill7"] }}></div>
                    </div>
                  </div>
                  <div id="skill_n">
                    <h2 id="skill_name">{content.otherSkills[2]?.name}</h2>
                    <h2 className="sk_8" id="skill_percentage">{content.otherSkills[2]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill8"] }}></div>
                    </div>
                  </div>
                  <div id="skill_n">
                    <h2 id="skill_name">{content.otherSkills[3]?.name}</h2>
                    <h2 className="sk_9" id="skill_percentage">{content.otherSkills[3]?.pct}</h2>
                    <div id="percentage_border">
                      <div id="percentage_bar" style={{ width: skills["skill9"] }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════  EXPERIENCE  ═══════════════════ */}
          <section className="experience-section" ref={experienceRef}>
            <motion.div
              className="experience-header"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="works-label">Experience</span>
              <h1 className="works-heading">Work Experience</h1>
              <p className="works-subtitle">
                A timeline of my professional journey across design, development, and digital marketing.
              </p>
            </motion.div>

            <div className="experience-timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="experience-card"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="exp-card-left">
                    <div className="exp-logo-wrapper">
                      <img src={exp.logo} alt={exp.company} className="exp-logo" />
                    </div>
                  </div>
                  <div className="exp-card-content">
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">
                      {exp.company} · <span className="exp-type">{exp.type}</span>
                    </p>
                    <div className="exp-meta">
                      <span className="exp-meta-item">
                        <LuCalendar /> {exp.period} · {exp.duration}
                      </span>
                      <span className="exp-meta-item">
                        <LuMapPin /> {exp.location}
                      </span>
                    </div>
                    {exp.description && <p className="exp-description">{exp.description}</p>}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="exp-skills">
                        {exp.skills.map((skill, i) => (
                          <span key={i} className="tech-tag">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ═══════════════════  PORTFOLIO  ═══════════════════ */}
          <AnimatePresence mode="wait">
            {mode !== "marketing" && (
              <motion.section
                key="portfolio"
                className="works-section portfolio-section"
                ref={worksRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.div
                  className="works-header"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="works-label">{content.worksLabel || "Developer / Designer Portfolio"}</span>
                  <h1 className="works-heading">Selected Work</h1>
                  <p className="works-subtitle">
                    Explore my development projects and branding work.
                  </p>
                </motion.div>
                <div className="portfolio-tabs" role="tablist" aria-label="Portfolio sections">
                  {[
                    { id: "development", label: "Development" },
                    { id: "branding", label: "Branding" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      id={`portfolio-tab-${tab.id}`}
                      className={`portfolio-tab ${activePortfolio === tab.id ? "active" : ""}`}
                      role="tab"
                      aria-selected={activePortfolio === tab.id}
                      aria-controls="portfolio-panel"
                      onClick={() => showPortfolio(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div
                  id="portfolio-panel"
                  role="tabpanel"
                  aria-labelledby={`portfolio-tab-${activePortfolio}`}
                  className="portfolio-panel"
                >
                  <AnimatePresence initial={false} custom={portfolioDirection} mode="wait">
                    {activePortfolio === "development" ? (
                      <motion.div
                        key="development"
                        custom={portfolioDirection}
                        variants={portfolioVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="projects-container"
                      >
                        {devProjects.map((project, index) => (
                          <ProjectRow key={project.id} project={project} index={index} />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="branding"
                        custom={portfolioDirection}
                        variants={portfolioVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="design-grid"
                      >
                        {brandingProjects.map((project, index) => (
                          <motion.article
                            key={`${project.title}-${index}`}
                            className={`design-card ${project.link ? "" : "branding-card-placeholder"}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, delay: index * 0.04 }}
                            onClick={
                              project.detailTitle
                                ? () => openLightbox(project.detailTitle)
                                : undefined
                            }
                          >
                            <div className="design-image-wrapper">
                              {project.link ? (
                                <img src={project.link} alt={project.title} loading="lazy" />
                              ) : (
                                <div className="branding-placeholder" aria-hidden="true">
                                  <span>Brand Identity</span>
                                  <strong>{project.title}</strong>
                                </div>
                              )}
                              {project.behanceLink && (
                                <a
                                  className="branding-behance-link"
                                  href={project.behanceLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View on Behance <LuExternalLink aria-hidden="true" />
                                </a>
                              )}
                              {(project.detailTitle || project.link) && (
                                <div className="design-card-overlay">
                                  <h3>{project.title}</h3>
                                  {project.detailTitle && (
                                    <span className="view-design-btn">View Details</span>
                                  )}
                                </div>
                              )}
                            </div>
                            {!project.link && <h3 className="branding-placeholder-title">{project.title}</h3>}
                          </motion.article>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>
            )}

            {/* ── MARKETING WORKS ── */}
            {mode === "marketing" && (
              <motion.section
                key="marketing-works"
                className="works-section"
                ref={worksRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.div
                  className="works-header"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="works-label">{content.worksLabel}</span>
                  <h1 className="works-heading">{content.worksHeading}</h1>
                  <p className="works-subtitle">{content.worksSubtitle}</p>
                </motion.div>
                <div className="projects-container">
                  {activeProjects.map((project, index) => (
                    <ProjectRow key={project.id} project={project} index={index} />
                  ))}
                </div>
              </motion.section>
            )}

          </AnimatePresence>

          {/* ═══════════════════  CONTACT  ═══════════════════ */}
          <section className="six_div" ref={contactRef}>
            <p className="project-mind">HAVE A PROJECT IN MIND?</p>
            <h1 className="main-title">
              Let&apos;s <span>work</span>
              <br />
              <span className="together">together</span>
            </h1>
            <div className="contact_info_div">
              <a href="tel:+251963155856" className="contact-2">
                <LuPhone /> +251963155856
              </a>
              <a href="mailto:yonasayele11@gmail.com" className="contact-1">
                <MdOutlineEmail /> yonasayele11@gmail.com
              </a>
            </div>
          </section>

          {/* ═══════════════════  FOOTER  ═══════════════════ */}
          <footer className="footer">
            <div className="footer-brand">YONAS.</div>
            <div className="footer-sections">
              <div>
                <h4 className="footer-header">Profile</h4>
                <ul className="footer-list">
                  <li><a href="https://www.linkedin.com/in/yonas-ayele-030b03286" className="footer-link">LinkedIn</a></li>
                  <li><a href="https://www.behance.net/yonas_ayele" className="footer-link">Behance</a></li>
                  <li><a href="https://github.com/yonas1a" className="footer-link">Github</a></li>
                  <li><a href="https://t.me/John_Ay1" className="footer-link">Telegram</a></li>
                </ul>
              </div>
              <div className="footer_pages">
                <h4 className="footer-header">Pages</h4>
                <ul className="footer-list">
                  <li><a className="footer-link" onClick={() => scrollTo(heroRef)}>About Me</a></li>
                  <li><a className="footer-link" onClick={() => scrollTo(skillsRef)}>Skills</a></li>
                  <li><a className="footer-link" onClick={() => scrollTo(experienceRef)}>Experience</a></li>
                  <li><a className="footer-link" onClick={() => scrollTo(worksRef)}>Portfolio</a></li>
                  <li><a className="footer-link" onClick={() => showPortfolio("branding")}>Branding</a></li>
                  <li><a className="footer-link" onClick={() => scrollTo(contactRef)}>Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-header">Contact</h4>
                <ul className="footer-list">
                  <li><a href="mailto:yonasayele11@gmail.com" className="footer-link">Email</a></li>
                  <li><a href="tel:+251963155856" className="footer-link">Call</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-note">
              Yonas Ayele — Developer / Designer Portfolio
            </div>
          </footer>
        </div>
      </div>

      {/* ═══════════════════  LIGHTBOX  ═══════════════════ */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={e => e.stopPropagation()}>
            <div className="lightbox-header">
              <h2>{currentProjectTitle}</h2>
              <div className="lightbox-actions">
                <a 
                  href="https://www.behance.net/yonas_ayele" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="behance-link"
                >
                  <span className="behance-icon">Bē</span>
                  View on Behance
                </a>
                <button className="lightbox-close" onClick={closeLightbox}>
                  <MdOutlineClose />
                </button>
              </div>
            </div>
            <div className="lightbox-content">
              {lightboxImages.length > 0 ? (
                lightboxImages.map((img, i) => (
                  <img key={i} src={img.link} alt={`${currentProjectTitle} detail ${i + 1}`} loading="lazy" className="lightbox-img" />
                ))
              ) : (
                <div className="no-images-msg">
                  <p>Detailed images coming soon.</p>
                  <a href="https://www.behance.net/yonas_ayele" target="_blank" rel="noopener noreferrer" className="view-btn">
                    <span>Check Behance instead</span>
                    <LuExternalLink />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
