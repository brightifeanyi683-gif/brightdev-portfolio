
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Admin from "./admin/Admin";
import "./App.css";

const WHATSAPP = "2349048889338";
const EMAIL = "brightifeany683@gmail.com";


const projects = [
  {
    number: "01",
    title: "NEXTIN Finance App",
    category: "Fintech",
    image: "/images/nextin.png",
    description:
      "A budgeting app concept designed to help salary earners and business owners organize and manage their finances.",
    tags: ["UI/UX", "Figma", "Fintech"],
    links: [{ label: "View Project", href: "https://www.figma.com/proto/DFhjav02XymLlRNIHviZXa/Group-7--NEXTIN-?node-id=309-182&t=4XtX91aq3Z4Oplfd-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=558%3A357" }],
  },
  {
    number: "02",
    title: "EduCore School Management",
    category: "Education",
    image: "/images/educore.png",
    description:
      "A school management interface designed to organize student records and simplify administrative tasks.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "View Project", href: "#contact" }],
  },
  {
    number: "03",
    title: "BrightDev Portfolio",
    category: "Portfolio",
    image: "/images/portfolio.png",
    description:
      "My personal portfolio showcasing my web development, UI/UX design and creative digital projects.",
    tags: ["React", "CSS", "JavaScript"],
    links: [
      {
        label: "Live Website",
        href: "https://brightdev-portfolio.netlify.app/",
      },
    ],
  },
  {
    number: "04",
    title: "Paragon Concepts",
    category: "Business",
    image: "/images/paragon.png",
    description:
      "A business website concept for digital services, computer training and professional business support.",
    tags: ["Web Design", "Development"],
    links: [{ label: "View Project", href: "https://paragonconcepts.netlify.app/" }],
  },
  {
    number: "05",
    title: "STEV Boutique",
    category: "Fashion",
    image: "/images/stev.png",
    description:
      "A fashion website designed to showcase men's clothing collections and connect customers with the boutique.",
    tags: ["JavaScript", "Web Design", "Fashion"],
    links: [{ label: "View Project", href: "#contact" }],
  },
  {
    number: "06",
    title: "XX Large Boutique",
    category: "Fashion & E-commerce",
    image: "/images/xx-large-boutique.png",
    description:
      "A live boutique website project showcasing a fashion brand and its online shopping experience.",
    tags: ["Web Development", "Fashion", "E-commerce"],
    links: [
      {
        label: "Visit Live Website",
        href: "https://xxlargeboutique.com",
      },
    ],
  },
  {
    number: "07",
    title: "AurelMotors.com",
    category: "Automotive",
    image: "/images/aurel-motors.png",
    description:
      "A premium automotive website concept for showcasing vehicles and helping customers explore available cars.",
    tags: ["React", "Web Design", "Automotive"],
    links: [
      {
        label: "Visit Live Website",
        href: "https://aurelmotors.netlify.app/",
      },
    ],
  },
  {
    number: "08",
    title: "Chophouse",
    category: "Food & Restaurant",
    image: "/images/chophouse.png",
    description:
      "A restaurant website project designed to present a food brand and provide visitors with a convenient online experience.",
    tags: ["Web Development", "Restaurant", "Responsive Design"],
    links: [
      {
        label: "Visit Live Website",
        href: "https://chophouse-nigeria.netlify.app/",
      },
    ],
  },
  {
    number: "09",
    title: "Barbershop Website",
    category: "Grooming",
    image: "/images/barbershop.png",
    description:
      "A website concept for a barbershop, focused on presenting services and building a professional online presence.",
    tags: ["UI/UX", "Web Design", "Responsive"],
    links: [{ label: "View Project", href: "https://williams-kingsley-barbershop.netlify.app/" }],
  },
];


const services = [
  {
    number: "01",
    icon: "</>",
    title: "Web Development",
    description:
      "Modern, responsive and high-performing websites built for businesses, brands and personal projects.",
    features: ["Responsive websites", "Interactive interfaces", "Clean development"],
  },
  {
    number: "02",
    icon: "✣",
    title: "UI/UX Design",
    description:
      "User-focused interfaces designed to make digital products simple, attractive and enjoyable to use.",
    features: ["Wireframes", "High-fidelity UI", "User experience"],
  },
  {
    number: "03",
    icon: "◉",
    title: "Graphic Design",
    description:
      "Creative visual designs that help brands communicate clearly and make a stronger impression.",
    features: ["Social media graphics", "Promotional designs", "Creative visuals"],
  },
  {
    number: "04",
    icon: "✎",
    title: "Logo & Branding",
    description:
      "Distinctive logos and visual identities that give businesses a professional and memorable presence.",
    features: ["Logo design", "Brand identity", "Visual direction"],
  },
  {
    number: "05",
    icon: "▣",
    title: "Landing Pages",
    description:
      "Focused landing pages designed to present your product, service or campaign clearly and professionally.",
    features: ["Modern layouts", "Mobile responsive", "Conversion focused"],
  },
  {
    number: "06",
    icon: "▦",
    title: "Business Websites",
    description:
      "Professional websites that help businesses establish credibility and reach customers online.",
    features: ["Business profiles", "Service showcases", "Contact integration"],
  },
];

const skills = [
  { name: "HTML", icon: "5" },
  { name: "CSS", icon: "3" },
  { name: "JavaScript", icon: "JS" },
  { name: "React", icon: "⚛" },
  { name: "Git", icon: "◆" },
  { name: "GitHub", icon: "◉" },
  { name: "Figma", icon: "◈" },
  { name: "VS Code", icon: "›_" },
];

const strengths = [
  {
    icon: "⌘",
    title: "Web Development",
    description:
      "Building responsive and interactive websites with a strong focus on structure, usability and performance.",
  },
  {
    icon: "▧",
    title: "UI/UX Design",
    description:
      "Designing interfaces that balance visual quality with simple and intuitive user experiences.",
  },
  {
    icon: "✣",
    title: "Creative Design",
    description:
      "Creating visual assets, branding concepts and digital graphics for individuals and businesses.",
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description:
      "We discuss your goals, audience, requirements and the problem you want to solve.",
  },
  {
    number: "02",
    title: "Plan & Design",
    description:
      "I organize the content, plan the experience and create a clear visual direction.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "I turn the approved direction into a responsive, functional digital experience.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We review the result, make final improvements and prepare the project for launch.",
  },
];

function SectionHeading({ eyebrow, first, accent, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        {first} <span>{accent}</span>
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("brightdev-theme") === "dark";
    } catch {
      return false;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [databaseProjects, setDatabaseProjects] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem("brightdev-theme", dark ? "dark" : "light");
    } catch {
      // The theme still works if browser storage is unavailable.
    }
  }, [dark]);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );

    
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  
  useEffect(() => {
    let cancelled = false;

    async function loadDatabaseProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        console.error("Could not load projects:", error.message);
        return;
      }

      setDatabaseProjects(data ?? []);
        }

    loadDatabaseProjects();

    return () => {
      cancelled = true;
    };
  }, []);


  // Admin login page
  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  // Your existing code continues below...


  const closeMenu = () => setMenuOpen(false);

  const navigation = [
    ["Home", "home"],
    ["About", "about"],
    ["Services", "services"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Process", "process"],
    ["Contact", "contact"],
  ];

  const hireLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Hello BrightDev, I would like to discuss a project with you."
  )}`;

  return (
    <div className={`portfolio ${dark ? "dark" : "light"}`}>
      <header className="site-header">
        <div className="nav-container">
          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-mark">BD</span>
            <span>
              Bright<span className="brand-accent">Dev</span>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
              onClick={() => setDark(!dark)}
            >
              {dark ? "☀" : "☾"}
            </button>
            <a
              className="button button-primary hire-button"
              href={hireLink}
              target="_blank"
              rel="noreferrer"
            >
              Hire Me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <span className="eyebrow">HELLO, I'M</span>
            <h1>
              Bright <span>Dev.</span>
            </h1>
            <h2>Web Developer &amp; UI/UX Designer</h2>
            <p>
              I design and build modern, responsive and user-friendly digital
              experiences that transform ideas into real products.
            </p>

            <div className="hero-buttons">
              <a className="button button-primary" href="#projects">
                View My Work <span aria-hidden="true">→</span>
              </a>
              <a className="button button-secondary" href="#contact">
                Let's Talk
              </a>
            </div>

            <div className="hero-specialties">
              <span>UI/UX Design</span>
              <span>Web Development</span>
              <span>Creative Solutions</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="portrait-frame">
              <img
                src="/images/bright-dev.jpg"
                alt="BrightDev — web developer and UI/UX designer"
                className="hero-portrait"
              />
            </div>

            <div className="floating-card floating-code">
              <span className="floating-icon">{"</>"}</span>
              <div>
                <strong>Clean Code</strong>
                <small>Built with purpose</small>
              </div>
            </div>

            <div className="floating-card floating-design">
              <span className="floating-icon">✣</span>
              <div>
                <strong>Creative Design</strong>
                <small>Designed for people</small>
              </div>
            </div>

            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
          </div>
        </section>

        <section className="about-section section" id="about">
          <div className="about-copy">
            <span className="eyebrow">ABOUT ME</span>
            <h2>
              Turning ideas into <span>digital experiences.</span>
            </h2>
            <p>
              I'm Bright Dev, a web developer and UI/UX designer passionate
              about turning ideas into modern digital experiences.
            </p>
            <p>
              I enjoy combining design and development to create websites and
              interfaces that don't just look good, but also feel intuitive
              and work effectively.
            </p>
            <p>
              My goal is simple — create digital products that help people,
              businesses and brands communicate better online.
            </p>
            <div className="about-buttons">
              <a className="button button-primary" href="#contact">
                Work With Me <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#projects">
                Explore Projects <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-card-heading">
              <span className="profile-icon">♟</span>
              <div>
                <small>Profile</small>
                <h3>Bright Dev</h3>
              </div>
            </div>
            {[
              ["Role", "Web Developer"],
              ["Specialization", "UI/UX Design"],
              ["Location", "Owerri, Imo State, Nigeria"],
              ["Status", "Available"],
            ].map(([label, value]) => (
              <div className="profile-row" key={label}>
                <span>{label}</span>
                <strong className={label === "Status" ? "status-online" : ""}>
                  {value}
                </strong>
              </div>
            ))}
            <a className="profile-card-link" href="#contact">
              Let's build something meaningful. <span>↗</span>
            </a>
          </div>
        </section>

        <section className="services-section section" id="services">
          <SectionHeading
            eyebrow="WHAT I DO"
            first="Services designed to"
            accent="move your idea forward."
            description="From design to development, I create digital solutions that are practical, modern and built around your goals."
          />

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <span className="service-number">{service.number}</span>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section section" id="skills">
          <div className="skills-intro">
            <span className="eyebrow">MY EXPERTISE</span>
            <h2>
              Tools I use to <span>bring ideas to life.</span>
            </h2>
            <p>
              I combine design thinking with development skills to create
              complete digital experiences.
            </p>
          </div>

          <div className="skills-layout">
            <div className="strength-list">
              {strengths.map((strength) => (
                <article className="strength-card" key={strength.title}>
                  <span className="strength-icon">{strength.icon}</span>
                  <div>
                    <h3>{strength.title}</h3>
                    <p>{strength.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="tech-card">
              <div className="tech-heading">
                <span className="eyebrow">TECH STACK</span>
                <span aria-hidden="true">▤</span>
              </div>
              <div className="tech-grid">
                {skills.map((skill) => (
                  <div className="tech-item" key={skill.name}>
                    <span className="tech-symbol">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
              <p className="tech-note">
                Tools and technologies I use across my projects.
              </p>
            </div>
          </div>
        </section>

        <section className="projects-section section" id="projects">
          <SectionHeading
            eyebrow="SELECTED WORK"
            first="Projects I've"
            accent="worked on."
            description="A selection of digital products, websites and interfaces I've designed and developed."
          />

          <div className="projects-grid">
           
{[
  ...projects,
  ...databaseProjects.map((project, index) => ({
    number: String(projects.length + index + 1).padStart(2, "0"),
    title: project.title,
    category: "Project",
    image: project.image_url,
    description: project.description,
    tags: project.technologies ?? [],
    links: project.project_url
      ? [{ label: "View Project", href: project.project_url }]
      : [],
  })),
].map((project) => (

              <article className="project-card" key={project.number}>
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    loading="lazy"
                  />
                  <span className="project-image-label">{project.category}</span>
                </div>

                <div className="project-content">
                  <div className="project-meta">
                    <span>{project.number}</span>
                    <span className="project-category">{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.label}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {link.label} <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="projects-cta">
            <span>Have a project in mind?</span>
            <a className="button button-primary" href="#contact">
              Start a Project <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="process-section section" id="process">
          <SectionHeading
            eyebrow="HOW I WORK"
            first="A simple process."
            accent="Meaningful results."
            description="A clear and collaborative process keeps every project focused from the first conversation to launch."
          />

          <div className="process-grid">
            {process.map((step) => (
              <article className="process-card" key={step.number}>
                <span className="process-number">{step.number}</span>
                <div className="process-line" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>
              Let's create something <span>great together.</span>
            </h2>
            <p>
              Have a website idea, design project or digital product you want
              to bring to life? Send me a message and let's talk about it.
            </p>

            <div className="contact-details">
              <a className="contact-detail" href={`mailto:${EMAIL}`}>
                <span className="contact-icon">✉</span>
                <span>
                  <small>Email</small>
                  <strong>{EMAIL}</strong>
                </span>
                <span className="contact-external">↗</span>
              </a>

              <a
                className="contact-detail"
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-icon whatsapp-icon">◉</span>
                <span>
                  <small>WhatsApp</small>
                  <strong>Let's chat</strong>
                </span>
                <span className="contact-external">↗</span>
              </a>
            </div>
          </div>

          <div className="contact-panel">
            <div className="contact-panel-top">
              <span className="eyebrow">START A PROJECT</span>
              <span className="contact-send-icon">➤</span>
            </div>
            <h3>Tell me what you're building.</h3>
            <p>
              Whether you already have everything planned or you're still
              figuring things out, I'm happy to discuss your idea.
            </p>
            <a
              className="button whatsapp-button"
              href={`${hireLink}`}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">◉</span> Chat on WhatsApp
            </a>
            <a className="button email-button" href={`mailto:${EMAIL}`}>
              Send an Email <span aria-hidden="true">→</span>
            </a>
            <div className="availability">
              <span className="availability-dot" />
              Currently available for selected projects
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand footer-logo" href="#home">
              <span className="brand-mark">BD</span>
              <span>
                Bright<span className="brand-accent">Dev</span>
              </span>
            </a>
            <p>
              Building modern digital experiences through web development,
              UI/UX and creative design.
            </p>
          
<div className="social-links">
  <a
    href="https://github.com/brightifeanyi683-gif"
    aria-label="GitHub"
    title="GitHub"
    target="_blank"
    rel="noreferrer"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.65-1.23-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3.01 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.02.75 2.06v3.11c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
      />
    </svg>
  </a>

  <a
    href="https://www.facebook.com/profile.php?id=61591589502308"
    aria-label="Facebook"
    title="Facebook"
    target="_blank"
    rel="noreferrer"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 21v-8.2h2.76l.41-3.2H13.5V7.56c0-.93.26-1.57 1.6-1.57h1.7V3.13A22.1 22.1 0 0 0 14.32 3c-2.46 0-4.14 1.5-4.14 4.26V9.6H7.4v3.2h2.78V21h3.32Z"
      />
    </svg>
  </a>

  <a
    href="https://x.com/Bri24645Bright"
    aria-label="X"
    title="X"
    target="_blank"
    rel="noreferrer"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.4L5.58 22H2.45l7.25-8.3L1.9 2h6.4l4.43 6.78L18.9 2Zm-1.1 17.8h1.73L7.36 4.1H5.5L17.8 19.8Z"
      />
    </svg>
  </a>

  <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </a>
</div>
</div>

<div className="footer-column">
  <h4>NAVIGATION</h4>
  {navigation
    .filter(([, id]) =>
      ["home", "about", "services", "projects"].includes(id)
    )
    .map(([label, id]) => (
      <a href={`#${id}`} key={id}>
        {label}
      </a>
    ))}
</div>

<div className="footer-column">
  <h4>SERVICES</h4>
  {services.slice(0, 4).map((service) => (
    <a href="#services" key={service.title}>
      {service.title}
    </a>
  ))}
</div>

<div className="footer-column">
  <h4>CONTACT</h4>
  <a href={`mailto:${EMAIL}`}>Email Me</a>
  <a
    href={`https://wa.me/${WHATSAPP}`}
    target="_blank"
    rel="noreferrer"
  >
    WhatsApp
  </a>
  <a href="#contact">Start a Project</a>
</div>
</div>

<div className="footer-bottom">
  <span>
    © {new Date().getFullYear()} Bright Dev. All rights reserved.
  </span>
  <span>
    Designed &amp; Built by <strong>BrightDev</strong>
  </span>
</div>
</footer>

<a className="back-to-top" href="#home" aria-label="Back to top">
  ↑
</a>

<a
  className="floating-whatsapp"
  href={`https://wa.me/${WHATSAPP}`}
  target="_blank"
  rel="noreferrer"
  aria-label="Chat with me on WhatsApp"
  title="Chat on WhatsApp"
>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20.52 3.48A11.83 11.83 0 0 0 12.09 0C5.53 0 .19 5.33.19 11.89c0 2.1.55 4.15 1.6 5.96L.1 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.48-8.42ZM12.1 21.78a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.84 9.84 0 0 1-1.51-5.26c0-5.45 4.43-9.88 9.89-9.88a9.82 9.82 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.44-4.44 9.87-9.9 9.87Zm5.42-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z"
    />
  </svg>
</a>
    </div>
  );
}

export default App;