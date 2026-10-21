import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';
import { CursorTrackingAvatar } from './cursorTrackingAvatar.js';
import emailjs from '@emailjs/browser';
import { injectSpeedInsights } from '@vercel/speed-insights';

gsap.registerPlugin(ScrollTrigger);

// Initialize Vercel Speed Insights
injectSpeedInsights();

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};
const EMAILJS_CONFIGURED = Object.values(EMAILJS_CONFIG).every(Boolean);

if (EMAILJS_CONFIGURED) {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

/* ==========================================================================
   CONFIGURABLE PORTFOLIO DATA (REPLACE WITH YOUR OWN DETAILS)
   ========================================================================== */
export const PORTFOLIO_DATA = {
  profile: {
    brandName: 'SOUMAJIT DUTTA',
    brandSurname: 'DUTTA',
    systemNode: null,
    locationCoordinates: null,
    operationalStatus: null,
    coreSystem: null,
    badgeText: null,
    timezoneLabel: 'IST',
    timeZone: 'Asia/Kolkata',
    resumeUrl: null,
    roles: [
      'Machine Learning | Deep Learning | RAG',
      'Exploring Retrieval-Augmented Generation',
      'Backend-Leaning Full-Stack Developer'
    ],
    heroH1Line1: 'Synthesizing',
    heroH1Hollow: 'Intelligent',
    heroH1Line3: 'Systems',
    heroTagline:
      'Building production-focused AI and backend systems using machine learning, deep learning, and retrieval-augmented generation — turning data into systems that make grounded decisions.',
    heroFooterStats: [
      { id: '01 //', label: 'MACHINE LEARNING' },
      { id: '02 //', label: 'NLP & LLM APPLICATIONS' },
      { id: '03 //', label: 'RETRIEVAL-AUGMENTED GENERATION' }
    ],
    biography: {
      lead:
        "Final-year Computer Science student building AI systems that turn data into decisions — accurate, explainable, and grounded in what's actually retrieved, not guessed.",
      paragraphs: [
        'I focus on machine learning, deep learning, and data science, and I\'m currently deep in Retrieval-Augmented Generation — how retrieval, embeddings, and LLMs combine into systems that stay grounded instead of hallucinating. I also have full-stack development experience, but backend is where I actually want to be: data pipelines, model serving, and API design over frontend styling.',
        "Right now that means building AutoML tooling, ML-driven risk prediction, and classification systems on my own, alongside a semester-long group project at the intersection of software engineering, testing, and speech processing — while preparing for technical interviews at competitive AI/ML engineering roles."
      ],
      quote:
        '"I don\'t ship a model until I can explain why it\'s right — that\'s what makes it trustworthy, not just accurate."'
    },
    contact: {
      email: 'soumajitdutta05@gmail.com',
      socials: [
        {
          id: 'linkedin',
          label: 'LINKEDIN',
          url: 'https://www.linkedin.com/in/soumajit-dutta-tech/'
        },
        {
          id: 'github',
          label: 'GITHUB',
          url: 'https://github.com/soumajit11'
        }
      ]
    }
  },

  projects: [
    {
      id: 'insight-ml',
      title: 'insight-ml',
      subtitle: 'AutoML Tool for Automated EDA and Model Comparison',
      challenge:
        "Making automated EDA and model comparison fast enough to be genuinely useful, without hiding the reasoning behind each model's score.",
      solution:
        'insight-ml ingests a dataset, runs automated exploratory data analysis, preprocesses it, and trains multiple models in parallel for direct comparison. Results are surfaced through a Flask interface, with a one-click export for the best-performing model — turning what used to be a notebook full of boilerplate into a repeatable tool.',
      architecture: [
        'Dataset Ingestion & Secure Validation (CSV / XLSX / XLS)',
        'Automated EDA & Correlation Analysis',
        'Dynamic Preprocessing (Imputation, Scaling, One-Hot Encoding)',
        'Problem-Type Detection & Multi-Model Training',
        'Best-Model Ranking, Feature Importance & ZIP Export'
      ],
      githubUrl: 'https://github.com/soumajit11/insight-ml',
      demoUrl: null,
      metrics: [
        { label: 'Max Dataset Upload', value: '50MB' },
        { label: 'Algorithms Compared (5 Classification + 5 Regression)', value: '10' },
        { label: 'REST API Endpoints', value: '16' }
      ],
      technologies: [
        'Python',
        'Flask',
        'scikit-learn',
        'Pandas',
        'NumPy',
        'Jinja2',
        'joblib',
        'openpyxl / xlrd',
        'JavaScript'
      ]
    },
    {
      id: 'hiresafe',
      title: 'HireSafe',
      subtitle: 'ML-Driven Human Risk Assessment for Hiring Stability',
      challenge:
        "Working with imbalanced data — stable companies vastly outnumber unstable ones — while still producing a score that's meaningfully accurate, not just biased toward the majority class.",
      solution:
        'HireSafe processes financial and layoff-related features through a preprocessing pipeline that addresses class imbalance with SMOTE, then trains and compares multiple classifiers before selecting the best-performing model. The trained model is served through a Flask API, returning a 0–100 hiring risk score for a given company profile.',
      technologies: [
        'Python',
        'scikit-learn',
        'Random Forest',
        'XGBoost',
        'Neural Network',
        'SMOTE',
        'Pandas',
        'NumPy',
        'Matplotlib / Seaborn',
        'Flask',
        'Docker',
        'Nginx'
      ],
      architecture: [
        'Data Collection & Cleaning (Financials, Layoffs, Market Signals)',
        'Feature & Label Engineering',
        'SMOTE Class Balancing',
        'Multi-Model Benchmarking & Selection (Random Forest)',
        'Probability-to-Risk Score Conversion (Low / Moderate / High)',
        'Flask /predict API & Analytics Dashboard'
      ],
      githubUrl: 'https://github.com/soumajit11/HireSafe',
      demoUrl: null,
      metrics: [
        { label: 'Classification Accuracy (3-Class, Random Forest)', value: '68%' },
        { label: 'Models Benchmarked (RF, XGBoost, Neural Net)', value: '3' },
        { label: 'Hiring Risk Score Scale', value: '0–100' }
      ]
    },
    {
      id: 'cosmic-classifier',
      title: 'cosmic-classifier',
      subtitle: 'Machine Learning–Driven Planetary Habitability Explorer',
      challenge:
        'Classifying planets into habitability categories from raw attributes, while keeping the results interpretable rather than a black-box label.',
      solution:
        'The pipeline processes planetary attribute data, trains an XGBoost classifier to predict habitability category, and surfaces the results through an interactive Streamlit dashboard with Plotly visualizations — so predictions can be explored, not just read off a table.',
      technologies: [
        'Python',
        'XGBoost',
        'scikit-learn',
        'Pandas',
        'NumPy',
        'Plotly',
        'Streamlit',
        'openpyxl',
        'Pickle'
      ],
      architecture: [
        'Excel Data Ingestion (33K+ Planetary Records)',
        'Stratified 80/20 Train-Test Split',
        'Baseline Benchmarking (Logistic Regression, Decision Tree, Random Forest, AdaBoost)',
        'XGBoost Training & Multi-Metric Evaluation',
        'Model Serialization (Pickle)',
        'Real-Time Inference & Interactive Plotly Dashboard (Streamlit)'
      ],
      githubUrl: 'https://github.com/soumajit11/cosmic-classifier',
      demoUrl: null,
      metrics: [
        { label: 'Test Accuracy (XGBoost, 10-Class)', value: '91.44%' },
        { label: 'Planetary Records Processed', value: '33,175' },
        { label: 'Input Planetary Attributes', value: '10' }
      ]
    },
    {
      id: 'machine-learning-journey',
      title: 'machine-learning-journey',
      subtitle: 'Ongoing ML/DL Implementations & Experiments',
      challenge:
        'Most tutorials teach one algorithm at a time, so it\'s easy to finish a course knowing how to call a model without knowing when to use it or why it works. The challenge was covering the full range of ML, from regression and classification to clustering, reinforcement learning, and deep learning, while keeping each implementation comparable and tied to the intuition behind it.',
      solution:
        'A growing collection of from-scratch and library-based implementations spanning regression, classification, clustering, and NLP basics — used as a personal reference and proof of fundamentals.',
      technologies: [
        'Python',
        'scikit-learn',
        'Pandas',
        'NumPy',
        'Matplotlib',
        'TensorFlow / Keras',
        'XGBoost'
      ],
      architecture: [
        'Regression Foundations (Linear, Polynomial, SVR, Decision Tree, Random Forest)',
        'Classification (Logistic, KNN, SVM, Kernel SVM, Naive Bayes, Tree, Forest)',
        'Clustering & Association Rules (K-Means, Hierarchical, Apriori, Eclat)',
        'Reinforcement Learning (UCB, Thompson Sampling)',
        'NLP & Deep Learning (ANN, CNN)',
        'Dimensionality Reduction & Model Tuning (PCA, LDA, Kernel PCA, K-Fold CV, Grid Search, XGBoost)'
      ],
      githubUrl: 'https://github.com/soumajit11/machine-learning-journey',
      demoUrl: null,
      metrics: [
        { label: 'Algorithms Implemented', value: '28' },
        { label: 'ML Domains Covered', value: '9' },
        { label: 'Regression & Classification Models', value: '13' }
      ]
    }
  ],

  experience: [
    {
      period: 'May 2026 – July 2026',
      role: 'Full-Stack Development Training',
      company: '3Skill',
      description: [
        'Completed a structured full-stack development program spanning six built projects, from frontend fundamentals through full-stack applications.',
        'Worked across the stack — HTML/CSS/JavaScript, React, and full-stack app patterns — building practical fluency beyond the ML/backend focus.',
        "Produced detailed documentation and a presentation covering each project's architecture and outcomes."
      ],
      skills: ['React', 'JavaScript', 'Full-Stack Development', 'Documentation']
    }
  ],

  skills: [
    {
      title: 'Machine Learning & AI Core',
      items: [
        'Supervised Learning (Classification & Regression)',
        'Ensemble Methods (Random Forest, XGBoost)',
        'Feature Engineering & Class Imbalance (SMOTE)',
        'Model Evaluation, Cross-Validation & Tuning'
      ]
    },
    {
      title: 'Natural Language Processing',
      items: [
        'Text Classification',
        'Text Preprocessing & Tokenization',
        'Semantic Similarity',
        'TF-IDF'
      ]
    },
    {
      title: 'Engineering & Deployment',
      items: [
        'Python, Java, C',
        'Flask REST API & Streamlit',
        'Model Deployment (Joblib, ML Pipelines)',
        'Git, GitHub, Linux & AWS'
      ]
    },
    {
      title: 'Data Analysis & Visualization',
      items: [
        'Pandas & NumPy',
        'Exploratory Data Analysis (EDA)',
        'Matplotlib, Seaborn, Plotly',
        'Data Cleaning & Multi-source Integration'
      ]
    },
    {
      title: 'Generative AI & LLMs — Learning',
      items: [
        'Retrieval-Augmented Generation (RAG)',
        'Vector Embeddings & Semantic Search',
        'LLM Fundamentals (from your coursework)',
        'Prompt Engineering'
      ]
    },
    {
      title: 'Full-Stack Development — Practicing',
      items: [
        'React, JavaScript, HTML/CSS',
        'Backend Development (Flask, Jinja2)',
        'Database Design (DBMS, SQL)',
        'Full-stack application structure (via 3Skill training)'
      ]
    }
  ],

  education: [
    {
      duration: '2023 – 2027',
      degree: 'B.Tech in CSE',
      institution: 'KIIT University · Bhubaneswar, Odisha'
    },
    {
      duration: '2021 – 2023',
      degree: 'Senior Secondary',
      institution: 'DAV Public School · Bistupur, Jharkhand'
    },
    {
      duration: '2010 – 2021',
      degree: 'Secondary',
      institution: 'Atomic Central Energy School · Turamdih, Jharkhand'
    }
  ],

  articles: [],

  certifications: [
    {
      name: 'Data Science Bootcamp',
      issuer: 'GeeksforGeeks',
      date: null,
      link: 'https://drive.google.com/file/d/1iaLRoc7SgRReIfESHRoG3Jc6IPPVMuKB/view?usp=sharing'
    },
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      date: null,
      link: 'https://drive.google.com/file/d/1fA4jZNBk6buT5BYSTtjPmVkPlZsbmyDE/view?usp=sharing'
    },
    {
      name: 'SAP Certified: Backend Developer – SAP Cloud Application Programming Model',
      issuer: 'SAP',
      date: null,
      link: 'https://drive.google.com/file/d/12Dv8cFwmcbbA0z2wIZzdPwDkRWqa1ATE/view?usp=sharing'
    },
    {
      name: 'Full-Stack Development Training',
      issuer: '3Skill',
      date: '2026',
      link: 'https://drive.google.com/file/d/1_dASTlOZc8HjnvqEzjVivflH2LJ0Qf4H/view?usp=sharing'
    }
  ]
};

const SOCIAL_ICON_MARKUP = {
  linkedin:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
  github:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>'
};

/* ==========================================================================
   DOM GENERATION (PRESERVES EXACT STRUCTURE, CSS HOOKS & CLASSES)
   ========================================================================== */
function buildPortfolioDOM() {
  const root = document.getElementById('root');
  if (!root) return;
  root.innerHTML = '';

  const data = PORTFOLIO_DATA;

  // 1. Fullscreen Loader Screen
  const loader = document.createElement('div');
  loader.id = 'loader-screen';
  loader.className = 'loader-screen';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-brand font-heading">${data.profile.brandName}</div>
      <div class="loader-title font-body">${data.profile.roles[0]}</div>
      <div class="loader-progress-container">
        <div class="loader-progress-bar" id="loader-bar"></div>
      </div>
      <div class="loader-percentage font-mono" id="loader-percent">00%</div>
    </div>
  `;
  root.appendChild(loader);

  // 2. Global Scroll Progress Indicator
  const progress = document.createElement('div');
  progress.id = 'scroll-progress';
  progress.className = 'scroll-progress';
  root.appendChild(progress);

  // 3. Custom Cursor & Follower Dot
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.className = 'custom-cursor';
  const cursorDot = document.createElement('div');
  cursorDot.id = 'custom-cursor-dot';
  cursorDot.className = 'custom-cursor-dot';
  root.appendChild(cursor);
  root.appendChild(cursorDot);

  // 4. Main Content Wrapper
  const main = document.createElement('main');
  main.id = 'main-content';
  main.className = 'main-content invisible';

  // 5. Header / Navbar
  const header = document.createElement('header');
  header.id = 'portfolio-header';
  header.className = 'portfolio-header';
  header.innerHTML = `
    <div class="header-container">
      <a href="#" class="header-logo font-heading" id="nav-logo">
        ${data.profile.brandName.replace(data.profile.brandSurname, '').trim()}
        <span class="text-gold">${data.profile.brandSurname}</span>
      </a>
      
       <nav class="header-nav">
         <a href="#hero" class="nav-link font-body">Home</a>
         <a href="#about" class="nav-link font-body">About</a>
         <a href="#projects" class="nav-link font-body">Projects</a>
         <a href="#experience" class="nav-link font-body">Experience</a>
         <a href="#skills" class="nav-link font-body">Skills</a>
         <a href="#education" class="nav-link font-body">Education</a>
         ${data.articles?.length ? '<a href="#blog" class="nav-link font-body">Blog</a>' : ''}
         <a href="#contact" class="nav-link font-body">Contact</a>
       </nav>

       ${
         data.profile.timezoneLabel
           ? `<div class="header-time font-mono">
         <span class="time-dot"></span>
         <span id="current-utc-time">${data.profile.timezoneLabel} 00:00:00</span>
       </div>`
           : ''
       }

      <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle navigation">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu" id="mobile-menu">
      <nav class="mobile-nav-links">
        <a href="#hero" class="mobile-link font-heading">Home</a>
        <a href="#about" class="mobile-link font-heading">About</a>
        <a href="#projects" class="mobile-link font-heading">Projects</a>
        <a href="#experience" class="mobile-link font-heading">Experience</a>
        <a href="#skills" class="mobile-link font-heading">Skills</a>
         <a href="#education" class="mobile-link font-heading">Education</a>
         ${data.articles?.length ? '<a href="#blog" class="mobile-link font-heading">Blog</a>' : ''}
         <a href="#contact" class="mobile-link font-heading">Contact</a>
       </nav>
       <div class="mobile-menu-footer font-mono">
         <div>${data.profile.brandName} // PORTFOLIO</div>
         ${data.profile.systemNode ? `<div class="text-gold">${data.profile.systemNode}</div>` : ''}
       </div>
    </div>
  `;
  main.appendChild(header);

  // 6. Hero Section
  const hero = document.createElement('section');
  hero.id = 'hero';
  hero.className = 'hero-section';
  hero.innerHTML = `
    <div class="hero-container container">
      <div class="hero-grid">
        <div class="hero-text-col">
          <div class="hero-eyebrow font-mono text-gold animate-text-reveal">
            <span id="typewriter-text"></span><span class="typewriter-cursor">|</span>
          </div>
          <h1 class="hero-title font-heading animate-text-reveal">
            ${data.profile.heroH1Line1} <br>
            <span class="title-hollow">${data.profile.heroH1Hollow}</span> <br>
            ${data.profile.heroH1Line3}
          </h1>
          <p class="hero-tagline font-body animate-text-reveal">
            ${data.profile.heroTagline}
          </p>
          <div class="hero-actions animate-text-reveal">
            <a href="#projects" class="btn btn-primary font-body" id="btn-hero-projects">
              Explore Projects
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="btn-arrow"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path></svg>
            </a>
             <a href="#contact" class="btn btn-secondary font-body" id="btn-hero-contact">
               Contact
             </a>
             ${
               data.profile.resumeUrl
                 ? `<a href="${data.profile.resumeUrl}" class="btn font-body" id="btn-resume-download" download style="border:1px solid var(--border); color:var(--accent);">
               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                 <polyline points="7 10 12 15 17 10"></polyline>
                 <line x1="12" y1="15" x2="12" y2="3"></line>
               </svg>
               <span>Download Resume</span>
             </a>`
                 : ''
             }
          </div>
        </div>

        <div class="hero-visual-col">
          <div class="portrait-container" id="interactive-portrait">
            <div class="portrait-frame">
              <div class="portrait-mesh"></div>
               <img class="portrait-image avatar-fallback" src="/IMG/profile-photo.png" alt="${data.profile.brandName}" />
               <canvas class="portrait-canvas" role="img" aria-label="Interactive animated avatar of ${data.profile.brandName}"></canvas>
             
               <div class="portrait-glow"></div>
                <div class="portrait-data font-mono">
                  ${data.profile.systemNode ? `<div class="data-row"><span>SYSTEM:</span> <span class="text-gold">${data.profile.systemNode}</span></div>` : ''}
                  ${data.profile.locationCoordinates ? `<div class="data-row"><span>LOC:</span> <span>${data.profile.locationCoordinates}</span></div>` : ''}
                  ${data.profile.operationalStatus ? `<div class="data-row"><span>OP:</span> <span class="text-green-active">${data.profile.operationalStatus}</span></div>` : ''}
                  ${data.profile.coreSystem ? `<div class="data-row"><span>CORE:</span> <span>${data.profile.coreSystem}</span></div>` : ''}
                </div>
                <div class="portrait-status font-mono">
                  <span class="online-dot">●</span>
                  <span>SOUMAJIT.DEV // ONLINE</span>
                </div>
                ${data.profile.badgeText ? `<div class="portrait-logo font-heading">${data.profile.badgeText}</div>` : ''}
            </div>
          </div>
        </div>
      </div>
      <div class="hero-footer-stats font-mono">
        ${data.profile.heroFooterStats
          .map(
            (stat) =>
              `<div class="stat-item"><span class="text-gold">${stat.id}</span> ${stat.label}</div>`
          )
          .join('')}
      </div>
    </div>
  `;
  main.appendChild(hero);

  // 7. About Section (01 / BIOGRAPHY)
  const about = document.createElement('section');
  about.id = 'about';
  about.className = 'about-section';
  about.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="about-title-col">
          <div class="section-number font-mono text-gold">01 / BIOGRAPHY</div>
          <h2 class="section-title font-heading">About Me</h2>
          <div class="about-signature font-heading text-gold">${data.profile.brandName}</div>
        </div>
        <div class="about-content-col font-body">
          <p class="about-lead">${data.profile.biography.lead}</p>
          ${data.profile.biography.paragraphs.map((p) => `<p>${p}</p>`).join('')}
          <p class="about-quote font-heading text-gold">
            ${data.profile.biography.quote}
          </p>
        </div>
      </div>
    </div>
  `;
  main.appendChild(about);

  // 8. Projects Section (02 / SELECTED WORK)
  const projects = document.createElement('section');
  projects.id = 'projects';
  projects.className = 'projects-section';
  let projectsHtml = `
    <div class="container">
      <div class="section-header">
        <div class="section-number font-mono text-gold">02 / SELECTED WORK</div>
        <h2 class="section-title font-heading">Featured AI & Backend Projects</h2>
        <p class="section-subtitle font-body">A collection of machine learning, backend, and AutoML projects built to solve real problems — from automated model comparison to risk prediction.</p>
      </div>
      <div class="projects-list">
  `;

  data.projects.forEach((proj, idx) => {
    const isNormal = idx % 2 === 0;
    const metrics = proj.metrics ?? [];
    const architecture = proj.architecture ?? [];
    const narrativeSections = [
      ['THE CHALLENGE', proj.challenge],
      ['THE SOLUTION', proj.solution]
    ].filter(([, content]) => content);
    projectsHtml += `
      <article class="project-showcase ${isNormal ? 'layout-normal' : 'layout-reversed'}" id="project-${proj.id}">
        <div class="project-content-col">
          <div class="project-num font-mono text-gold">PROJECT // 0${idx + 1}</div>
          <h3 class="project-title font-heading">${proj.title}</h3>
          <div class="project-subtitle font-body">${proj.subtitle}</div>
          
           <div class="project-narrative">
             ${narrativeSections
               .map(
                 ([label, content]) => `
             <div class="narrative-section">
               <h4 class="font-mono text-gold">${label}</h4>
               <p class="font-body">${content}</p>
             </div>`
               )
               .join('')}
           </div>

          <div class="project-actions">
            <a href="${proj.githubUrl}" class="btn btn-primary font-body" target="_blank" rel="noopener noreferrer" id="btn-github-${proj.id}">
              GitHub Repository
            </a>
             ${
               proj.demoUrl
                 ? `<a href="${proj.demoUrl}" class="btn btn-secondary font-body" target="_blank" rel="noopener noreferrer" id="btn-demo-${proj.id}">Live Demonstration</a>`
                 : ''
             }
          </div>
        </div>

        <div class="project-technical-col">
          <div class="technical-card">
             ${
               metrics.length
                 ? `<div class="technical-header font-mono">SYSTEM METRICS & TELEMETRY</div>
             <div class="project-metrics">
               ${metrics
                 .map(
                   (m) => `
                 <div class="metric-block">
                   <div class="metric-value font-heading text-gold">${m.value}</div>
                   <div class="metric-label font-mono">${m.label}</div>
                 </div>
               `
                 )
                 .join('')}
             </div>
             <div class="technical-divider"></div>`
                 : ''
             }

             ${
               architecture.length
                 ? `<details class="architecture-dropdown">
               <summary class="technical-header font-mono">
                 <span>PIPELINE ARCHITECTURE</span>
                 <span class="architecture-toggle" aria-hidden="true">+</span>
               </summary>
               <ol class="architecture-list font-body">
                 ${architecture
                   .map((step, sIdx) => `<li><span class="step-num font-mono">0${sIdx + 1}</span> ${step}</li>`)
                   .join('')}
               </ol>
             </details>

             <div class="technical-divider"></div>`
                 : ''
             }

            <div class="technical-header font-mono">CORE TECH STACK</div>
            <div class="technologies-container">
              ${proj.technologies
                .map((tech) => `<span class="tech-tag font-mono">${tech}</span>`)
                .join('')}
            </div>
          </div>
        </div>
      </article>
    `;
  });

  projectsHtml += `
      </div>
    </div>
  `;
  projects.innerHTML = projectsHtml;
  main.appendChild(projects);

  // 9. Experience Section (03 / EXPERIENCE)
  const experience = document.createElement('section');
  experience.id = 'experience';
  experience.className = 'experience-section';
  let expHtml = `
    <div class="container">
      <div class="section-header">
        <div class="section-number font-mono text-gold">03 / EXPERIENCE</div>
        <h2 class="section-title font-heading">Professional Record</h2>
        <p class="section-subtitle font-body">A timeline of building and learning across machine learning, software engineering, and full-stack development.</p>
      </div>
      
      <div class="timeline-container">
        <div class="timeline-line"></div>
  `;

  data.experience.forEach((exp, idx) => {
    expHtml += `
      <div class="timeline-item" id="experience-item-${idx}">
        <div class="timeline-dot"></div>
        <div class="timeline-header-col">
          <div class="timeline-period font-mono text-gold">${exp.period}</div>
          <h3 class="timeline-role font-heading">${exp.role}</h3>
          <div class="timeline-company font-mono">${exp.company}</div>
        </div>
        <div class="timeline-content-col font-body">
          <ul class="timeline-bullets">
            ${exp.description.map((b) => `<li>${b}</li>`).join('')}
          </ul>
          <div class="timeline-skills">
            ${exp.skills.map((s) => `<span class="timeline-skill-tag font-mono">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  });

  expHtml += `
      </div>
    </div>
  `;
  experience.innerHTML = expHtml;
  main.appendChild(experience);

  // 10. Skills Section (04 // ARCHITECTURE & SYNTAX)
  const skills = document.createElement('section');
  skills.id = 'skills';
  skills.className = 'skills-section';
  let skillsHtml = `
    <div class="container">
      <div class="section-header">
        <div class="section-number font-mono text-gold">04 // ARCHITECTURE & SYNTAX</div>
        <h2 class="section-title font-heading">Technical Toolkit</h2>
        <p class="section-subtitle font-body">The languages, frameworks, and tools I work with day to day.</p>
      </div>

      <div class="bento-grid">
  `;

  data.skills.forEach((cat, idx) => {
    skillsHtml += `
      <div class="bento-card${cat.title === 'Natural Language Processing' ? ' bento-card-nlp' : ''}" id="skills-cat-${idx}">
        <div class="bento-card-header font-heading">
          <span class="card-num font-mono text-gold">0${idx + 1} //</span>
          ${cat.title}
        </div>
        <div class="bento-card-body">
          <div class="tech-tags-cloud">
            ${cat.items
              .map(
                (item) => `
              <div class="interactive-tag font-mono">
                <span class="tag-glow"></span>
                <span class="tag-text">${item}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  });

  skillsHtml += `
      </div>
    </div>
  `;
  skills.innerHTML = skillsHtml;
  main.appendChild(skills);

  // 11. Education Section (05 / QUALIFICATIONS)
  const education = document.createElement('section');
  education.id = 'education';
  education.className = 'education-section';
  const educationEntries = Array.isArray(data.education) ? data.education : [data.education];
  education.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-number font-mono text-gold">05 / QUALIFICATIONS</span>
        <h2 class="section-title font-heading">Education</h2>
        <p class="section-subtitle font-body">Academic foundations behind my engineering and machine learning work.</p>
      </div>
      
      <div class="education-grid">
        ${educationEntries
          .map(
            (entry, idx) => `
        <div class="education-card reveal" id="education-academic-${idx}">
          <div class="education-icon">
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.5"><path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
          </div>
          <div class="education-details">
            <span class="education-duration">${entry.duration}</span>
            <h3 class="education-degree">${entry.degree}</h3>
            <p class="education-institution">${entry.institution}</p>
            ${entry.description ? `<p class="education-desc">${entry.description}</p>` : ''}
          </div>
        </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
  main.appendChild(education);

  // 12. Blog Section (06 / RECENT PUBLISHINGS)
  if (data.articles?.length) {
    const blog = document.createElement('section');
    blog.id = 'blog';
    blog.className = 'blog-section';
    blog.innerHTML = `
    <div class="container">
      <div class="blog-header-row">
        <div class="section-header">
          <div class="section-number font-mono text-gold">06 / RECENT PUBLISHINGS</div>
          <h2 class="section-title font-heading">Writing & Research</h2>
          <p class="section-subtitle font-body">Architectural notes, system breakdowns, and empirical lessons learned deploying machine learning runtimes.</p>
        </div>
      </div>
         
      <div class="magazine-index" id="magazine-index-container">
        ${data.articles
          .map(
            (art, idx) => `
          <a href="${art.url}" class="magazine-row" id="blog-row-${idx}" target="_blank" rel="noopener noreferrer">
            <div class="magazine-meta font-mono">
              <span class="magazine-date font-mono text-gold" style="font-size:0.75rem;">${art.date}</span>
              <span class="magazine-read font-mono">${art.readTime}</span>
            </div>
            <div class="blog-thumb-container">
              <img class="blog-thumbnail-img" src="${art.imageUrl}" alt="${art.title}" />
            </div>
            <div class="magazine-title-wrap">
              <span class="magazine-category font-mono text-gold" style="font-size:0.65rem;">${art.category}</span>
              <h3 class="magazine-title font-heading" style="font-size:1.45rem;">${art.title}</h3>
              <p class="magazine-excerpt font-body">${art.excerpt}</p>
            </div>
            <div class="magazine-arrow font-mono">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="mag-arrow-svg"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </a>
        `
          )
          .join('')}
      </div>
    </div>
    `;
    main.appendChild(blog);
  }

  // 13. Certifications Section (06 / ACCREDITATIONS)
  const certs = document.createElement('section');
  certs.id = 'certifications';
  certs.className = 'certifications-section';
  let certsHtml = `
    <div class="container">
      <div class="section-header">
        <div class="section-number font-mono text-gold">06 / ACCREDITATIONS</div>
        <h2 class="section-title font-heading">Verified Competence</h2>
        <p class="section-subtitle font-body">Certifications across data science, cloud, and backend development.</p>
      </div>

      <div class="certs-grid">
  `;

  data.certifications.forEach((cert, idx) => {
    certsHtml += `
      <a href="${cert.link}" class="cert-card" id="cert-card-${idx}" target="_blank" rel="noopener noreferrer" aria-label="Verify ${cert.name}">
        <div class="cert-icon-container">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="cert-details">
          <h3 class="cert-name font-heading">${cert.name}</h3>
          <div class="cert-issuer font-body">${cert.issuer}</div>
           ${cert.date ? `<div class="cert-date font-mono text-gold">${cert.date}</div>` : ''}
        </div>
        <span class="cert-link" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
        </span>
      </a>
    `;
  });

  certsHtml += `
      </div>
    </div>
  `;
  certs.innerHTML = certsHtml;
  main.appendChild(certs);

  // 14. Contact Section (08 / TRANSMISSION & CONTACT)
  const contact = document.createElement('section');
  contact.id = 'contact';
  contact.className = 'contact-section';
  contact.innerHTML = `
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info-col">
           <div class="section-number font-mono text-gold">07 / CONTACT</div>
           <h2 class="section-title font-heading">Let's Connect</h2>
           <p class="contact-desc font-body">
             Always open to connecting with people who are building, innovating, and solving meaningful problems in AI/ML engineering and backend development. Whether you’re hiring, collaborating on an exciting idea, or simply up for a great technical conversation, I’d love to connect.
           </p>
          <div class="contact-channels">
            <div class="channel-item">
              <span class="channel-label font-mono text-gold">EMAIL:</span>
              <a href="mailto:${data.profile.contact.email}" class="channel-value font-heading" id="contact-email">${data.profile.contact.email}</a>
            </div>
             <div class="channel-item">
              <span class="channel-label font-mono text-gold">CHANNELS:</span>
              <div class="social-links-grid">
                 ${data.profile.contact.socials
                   .map(
                     (social) => `
                 <a href="${social.url}" class="social-card-link" target="_blank" rel="noopener noreferrer" id="contact-${social.id}">
                   <div class="social-logo-box">
                     ${SOCIAL_ICON_MARKUP[social.id] ?? ''}
                   </div>
                   <div class="social-details">
                     <span class="social-platform font-mono">${social.label}</span>
                   </div>
                 </a>`
                   )
                   .join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-col">
          <form class="contact-form" id="contact-form-element">
            <div class="form-group">
               <input type="text" id="contact-name-input" class="form-input font-body" required minlength="2" maxlength="80" autocomplete="name" placeholder=" " />
              <label for="contact-name-input" class="form-label font-mono">NAME</label>
              <span class="input-line"></span>
            </div>

            <div class="form-group">
               <input type="email" id="contact-email-input" class="form-input font-body" required maxlength="254" autocomplete="email" placeholder=" " />
              <label for="contact-email-input" class="form-label font-mono">EMAIL</label>
              <span class="input-line"></span>
            </div>

            <div class="form-group">
               <textarea id="contact-message-input" class="form-textarea font-body" required minlength="10" maxlength="2000" rows="4" placeholder=" "></textarea>
              <label for="contact-message-input" class="form-label font-mono">MESSAGE</label>
              <span class="input-line"></span>
            </div>

            <button type="submit" class="btn btn-primary btn-submit font-body" id="btn-submit-contact">
               Send Message
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="btn-arrow"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path></svg>
            </button>
             <div id="form-feedback-message" class="form-feedback font-mono" role="status" aria-live="polite"></div>
          </form>
        </div>
      </div>
    </div>
  `;
  main.appendChild(contact);

  // 15. Footer
  const footer = document.createElement('footer');
  footer.id = 'portfolio-footer';
  footer.className = 'portfolio-footer';
  footer.innerHTML = `
    <div class="container footer-container">
      <div class="footer-left font-mono">
        &copy; ${new Date().getFullYear()} ${data.profile.brandName}. ALL RIGHTS RESERVED.
      </div>
      <div class="footer-center font-heading">
        MACHINE LEARNING // BACKEND ENGINEERING
      </div>
      <div class="footer-right">
        <button class="back-to-top font-mono" id="btn-back-to-top">
          RETURN TO TOP
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="back-to-top-arrow"><path d="M6 1.5L1.5 6L2.2 6.7L5.5 3.4V10.5H6.5V3.4L9.8 6.7L10.5 6L6 1.5Z" fill="currentColor"></path></svg>
        </button>
      </div>
    </div>
  `;
  main.appendChild(footer);

  root.appendChild(main);
}

/* ==========================================================================
   AMBIENT BACKGROUND WITH NOISE, FLOATING ORBS & ROTATING SQUARES
   ========================================================================== */
function initAmbientBackground() {
  const bg = document.createElement('div');
  bg.id = 'ambient-bg';
  bg.className = 'ambient-background';
  bg.setAttribute('aria-hidden', 'true');
  bg.style.backgroundColor = '#070203';
  bg.style.width = '100%';
  bg.style.height = '100vh';
  bg.style.position = 'fixed';
  bg.style.top = '0';
  bg.style.left = '0';

  const orbPalette = ['#241018', '#1a070d', '#2B0A12', '#4a1422', '#1f0811'];
  const orbs = [];

  for (let i = 0; i < 4; i++) {
    const orb = document.createElement('div');
    orb.className = 'ambient-orb';
    const size = gsap.utils.random(280, 450);
    const left = gsap.utils.random(-10, 80);
    const top = gsap.utils.random(-10, 80);
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.left = `${left}%`;
    orb.style.top = `${top}%`;
    orb.style.backgroundColor = orbPalette[i % orbPalette.length];
    orb.style.willChange = 'transform';
    bg.appendChild(orb);
    orbs.push(orb);
  }

  const squareElements = [];
  const squares = [
    {
      size: 'min(48vw, 36rem)',
      left: '-25%',
      top: '-31%',
      rotation: '-24deg',
      color: 'rgba(99, 31, 48, 0.36)'
    },
    {
      size: 'min(32vw, 23rem)',
      left: '0%',
      top: '35%',
      rotation: '33deg',
      color: 'rgba(72, 20, 34, 0.32)'
    },
    {
      size: 'min(44vw, 31rem)',
      left: '5%',
      top: '74%',
      rotation: '4deg',
      color: 'rgba(99, 22, 42, 0.22)'
    }
  ];
  squares.forEach(({ size, left, top, rotation, color }) => {
    const square = document.createElement('div');
    square.className = 'ambient-square';
    square.style.width = size;
    square.style.left = left;
    square.style.top = top;
    square.style.transform = `rotate(${rotation})`;
    square.style.backgroundColor = color;
    bg.appendChild(square);
    squareElements.push(square);
  });

  // Monochromatic procedural noise canvas overlay
  const noiseLayer = document.createElement('div');
  noiseLayer.className = 'ambient-noise';
  noiseLayer.style.position = 'absolute';
  noiseLayer.style.width = '100%';
  noiseLayer.style.height = '100%';

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    noiseLayer.style.backgroundImage = `url(${canvas.toDataURL()})`;
    noiseLayer.style.backgroundRepeat = 'repeat';
  }
  bg.appendChild(noiseLayer);
  document.body.insertBefore(bg, document.body.firstChild);

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  orbs.forEach((orb) => {
    const dur = gsap.utils.random(25, 45);
    const del = gsap.utils.random(0, -15);
    gsap.to(orb, {
      xPercent: () => gsap.utils.random(-40, 40),
      yPercent: () => gsap.utils.random(-40, 40),
      scale: () => gsap.utils.random(0.8, 1.35),
      rotation: () => gsap.utils.random(-180, 180),
      duration: dur,
      delay: del,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });

  squareElements.forEach((square) => {
    const direction = Math.random() < 0.5 ? '+=' : '-=';
    gsap.to(square, {
      rotation: `${direction}360`,
      duration: gsap.utils.random(90, 150),
      repeat: -1,
      ease: 'none'
    });
  });

  // Mousemove subtle parallax on ambient background
  let mouseX = 0,
    mouseY = 0,
    currX = 0,
    currY = 0;
  window.addEventListener('mousemove', (e) => {
    const normX = e.clientX / window.innerWidth - 0.5;
    const normY = e.clientY / window.innerHeight - 0.5;
    mouseX = normX * -25;
    mouseY = normY * -25;
  });

  gsap.ticker.add(() => {
    currX += (mouseX - currX) * 0.05;
    currY += (mouseY - currY) * 0.05;
    gsap.set(bg, { x: currX, y: currY });
  });
}

/* ==========================================================================
   SMOOTH SCROLL INITIALIZATION (LENIS HOOKED TO GSAP TICKER)
   ========================================================================== */
function initLenis() {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const lenis = new Lenis({
    duration: reducedMotion ? 0 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !reducedMotion
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/* ==========================================================================
   LOADER PROGRESS SEQUENCE & HERO ENTRANCE CHOREOGRAPHY
   ========================================================================== */
function initLoader(lenis) {
  lenis.stop();

  const loaderScreen = document.getElementById('loader-screen');
  const mainContent = document.getElementById('main-content');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');

  if (!loaderScreen || !mainContent) return;

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    if (loaderBar) loaderBar.style.width = '100%';
    if (loaderPercent) loaderPercent.textContent = '100%';
    loaderScreen.remove();
    mainContent.className = 'main-content';
    lenis.start();
    return;
  }

  const progressObj = { value: 0 };

  gsap.to(progressObj, {
    value: 100,
    duration: 2.0,
    ease: 'power2.out',
    onUpdate: () => {
      const pct = Math.floor(progressObj.value);
      if (loaderPercent) loaderPercent.textContent = `${pct.toString().padStart(2, '0')}%`;
      if (loaderBar) loaderBar.style.width = `${pct}%`;
    },
    onComplete: () => {
      const introTl = gsap.timeline({
        onComplete: () => {
          loaderScreen.remove();
          lenis.start();
        }
      });

      // 1. Loader screen slides up smoothly
      introTl.to(loaderScreen, {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut'
      });

      // 2. Reveal main content
      introTl.set(mainContent, { className: 'main-content' }, '-=0.85');

      // 3. Header drops in
      introTl.from(
        '.portfolio-header',
        {
          y: -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        },
        '-=0.2'
      );

      // 4. Hero Title 3D Character Stagger Reveal
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        const split = new SplitType(heroTitle, { types: 'words,chars' });
        introTl.from(
          split.chars,
          {
            y: 60,
            rotateX: -40,
            opacity: 0,
            duration: 0.85,
            stagger: 0.02,
            ease: 'power4.out'
          },
          '-=0.7'
        );
      }

      // 5. Eyebrow, Tagline, Actions, Portrait Frame & Stat Items
      introTl.from(
        '.hero-eyebrow',
        { opacity: 0, x: -20, duration: 0.6, ease: 'power2.out' },
        '-=0.6'
      );
      introTl.from(
        '.hero-tagline',
        { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );
      introTl.from(
        '.hero-actions',
        { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
      introTl.from(
        '.portrait-frame',
        { scale: 0.95, opacity: 0, duration: 1.0, ease: 'power4.out' },
        '-=0.6'
      );
      introTl.from(
        '.hero-footer-stats .stat-item',
        { opacity: 0, y: 10, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }
  });
}

/* ==========================================================================
   CUSTOM CURSOR & MAGNETIC BUTTON ATTRACTION
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  if (
    !cursor ||
    !cursorDot ||
    !window.matchMedia?.('(pointer: fine)').matches ||
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  ) return;

  const moveCursor = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power2.out' });
  const moveCursorY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power2.out' });

  window.addEventListener('mousemove', (e) => {
    gsap.set(cursorDot, { x: e.clientX, y: e.clientY });
    moveCursor(e.clientX);
    moveCursorY(e.clientY);
  });

  // Hover detection and magnetic pull
  document
      .querySelectorAll(
        'a, button, .interactive-tag, .magazine-row, .cert-link, .architecture-dropdown summary'
      )
    .forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover-dot');
        if (el.classList.contains('btn') || el.classList.contains('back-to-top')) {
          gsap.to(el, { scale: 1.04, duration: 0.3, ease: 'power2.out' });
        }
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover-dot');
        if (el.classList.contains('btn') || el.classList.contains('back-to-top')) {
          gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out', x: 0, y: 0 });
        }
      });

      if (el.classList.contains('btn') || el.classList.contains('back-to-top')) {
        const moveX = gsap.quickTo(el, 'x', { duration: 0.2, ease: 'power1.out' });
        const moveY = gsap.quickTo(el, 'y', { duration: 0.2, ease: 'power1.out' });
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.35;
          const deltaY = (e.clientY - centerY) * 0.35;
          moveX(deltaX);
          moveY(deltaY);
        });
      }
    });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
}

/* ==========================================================================
   DYNAMIC MOUSE SPOTLIGHT ON CARDS
   ========================================================================== */
function initCardSpotlights() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  document
    .querySelectorAll(
      '.bento-card, .technical-card, .education-card, .cert-card, .portrait-frame'
    )
    .forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
}

/* ==========================================================================
   CANVAS AVATAR: PRELOADED SOURCE FRAMES + CURSOR TRACKING
   ========================================================================== */
function initCursorTrackingAvatar() {
  const container = document.getElementById('interactive-portrait');
  if (!container) return null;
  const isCompactOrTouch =
    window.matchMedia?.('(max-width: 768px)').matches ||
    window.matchMedia?.('(pointer: coarse)').matches;
  if (isCompactOrTouch) return null;

  const avatar = new CursorTrackingAvatar(container, {
    frameCount: 64,
    framePath: (index) => `/frames/frame-${String(index).padStart(3, '0')}.webp`,
    centerPath: '/frames/center.webp',
    // The source artwork keeps the face near the upper middle of its 9:16 frame.
    facePoint: { x: 0.5, y: 0.34 },
    deadZoneRatio: 0.12,
    smoothing: 0.26,
    // The source sequence starts near neutral, turns through the available
    // gaze movement, and returns to neutral; this offset aligns its middle
    // trajectory with the right side of the cursor ring.
    frameAngleOffset: -Math.PI / 2
  });
  avatar.mount();
  return avatar;
}

/* ==========================================================================
   SCROLLTRIGGER ANIMATIONS & TIMELINES
   ========================================================================== */
function initScrollAnimations() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  // 1. Global scroll progress bar scrub
  gsap.to('#scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });

  // 2. Sticky header background blur toggle
  ScrollTrigger.create({
    start: 'top -50px',
    onEnter: () => document.getElementById('portfolio-header')?.classList.add('sticky-active'),
    onLeaveBack: () =>
      document.getElementById('portfolio-header')?.classList.remove('sticky-active')
  });

  // 3. Section Titles SplitType Word Reveal
  document.querySelectorAll('.section-title').forEach((title) => {
    const split = new SplitType(title, { types: 'words' });
    gsap.from(split.words, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // 4. Project Showcases Horizontal & Vertical Slide-in
  document.querySelectorAll('.project-showcase').forEach((proj) => {
    const contentCol = proj.querySelector('.project-content-col');
    const techCol = proj.querySelector('.project-technical-col');

    if (contentCol) {
      gsap.from(contentCol, {
        opacity: 0,
        x: proj.classList.contains('layout-normal') ? -60 : 60,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: proj,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    if (techCol) {
      gsap.from(techCol, {
        opacity: 0,
        y: 40,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: proj,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    }
  });

  // 5. Timeline Scrub Line
  gsap.from('.timeline-line', {
    scaleY: 0,
    transformOrigin: 'top center',
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline-container',
      start: 'top 70%',
      end: 'bottom 80%',
      scrub: true
    }
  });

  // 6. Timeline Items Stagger & Dot Pop
  document.querySelectorAll('.timeline-item').forEach((item) => {
    const dot = item.querySelector('.timeline-dot');
    const headerCol = item.querySelector('.timeline-header-col');
    const contentCol = item.querySelector('.timeline-content-col');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    if (dot) tl.from(dot, { scale: 0, backgroundColor: '#3a1824', duration: 0.4, ease: 'back.out(2)' });
    if (headerCol) tl.from(headerCol, { opacity: 0, x: -30, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    if (contentCol) tl.from(contentCol, { opacity: 0, x: 30, duration: 0.6, ease: 'power2.out' }, '-=0.5');
  });

  // 7. Bento Grid Cards Stagger
  gsap.from('.bento-card', {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.85,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.bento-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // 8. Education Card Reveal
  if (document.querySelector('.education-grid')) {
    gsap.from('.education-card', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.education-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  // 9. Magazine / Blog Rows Stagger
  if (document.querySelector('.magazine-index')) {
    gsap.from('.magazine-row', {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.magazine-index',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  // 10. Certifications Stagger
  gsap.from('.cert-card', {
    opacity: 0,
    y: 40,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.certs-grid',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
}

/* ==========================================================================
   NAVIGATION, TIME TICKER & INTERACTIVE CONTACT HANDLERS
   ========================================================================== */
function initInteractions(lenis) {
  // Live profile time overlay, with an optional header clock when configured.
  const timeElems = [
    document.getElementById('current-utc-time')
  ].filter(Boolean);
  if (timeElems.length) {
    const pad = (n) => String(n).padStart(2, '0');
    const updateTime = () => {
      const now = new Date();
      let dateParts;

      if (PORTFOLIO_DATA.profile.timeZone) {
        dateParts = Object.fromEntries(
          new Intl.DateTimeFormat('en-GB', {
            timeZone: PORTFOLIO_DATA.profile.timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23'
          })
            .formatToParts(now)
            .filter(({ type }) => type !== 'literal')
            .map(({ type, value }) => [type, value])
        );
      } else {
        dateParts = {
          year: now.getFullYear(),
          month: pad(now.getMonth() + 1),
          day: pad(now.getDate()),
          hour: pad(now.getHours()),
          minute: pad(now.getMinutes()),
          second: pad(now.getSeconds())
        };
      }

      const timestamp = `${PORTFOLIO_DATA.profile.timezoneLabel ?? 'LOCAL'} ${dateParts.year}-${dateParts.month}-${dateParts.day} ${dateParts.hour}:${dateParts.minute}:${dateParts.second}`;
      timeElems.forEach((timeElem) => {
        timeElem.textContent = timestamp;
      });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Smooth Lenis Anchor Navigation
  document
    .querySelectorAll('.nav-link, .header-logo, .mobile-link, .btn[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href') || '#';

        // Close mobile drawer if active
        const menu = document.getElementById('mobile-menu');
        const toggle = document.getElementById('mobile-toggle');
        if (menu?.classList.contains('menu-active')) {
          menu.classList.remove('menu-active');
          toggle?.classList.remove('active');
          toggle?.setAttribute('aria-expanded', 'false');
        }

        if (targetId === '#') {
          lenis.scrollTo('top');
        } else {
          const target = document.querySelector(targetId);
          if (target) lenis.scrollTo(target, { offset: -80 });
        }
      });
    });

  // Mobile Toggle Button
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('menu-active');
      mobileToggle.setAttribute(
        'aria-expanded',
        String(mobileToggle.classList.contains('active'))
      );
    });
  }

  // Return to Apex Button
  const backToTop = document.getElementById('btn-back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      lenis.scrollTo('top');
    });
  }

  // Contact Form EmailJS Transmission
  const form = document.getElementById('contact-form-element');
  const feedback = document.getElementById('form-feedback-message');
  if (form && feedback) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('btn-submit-contact');
      const nameInput = document.getElementById('contact-name-input');
      const emailInput = document.getElementById('contact-email-input');
      const messageInput = document.getElementById('contact-message-input');

      if (!nameInput || !emailInput || !messageInput || !form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!EMAILJS_CONFIGURED) {
        feedback.textContent = 'Unable to send your message right now. Please try again.';
        feedback.classList.remove('text-success-active');
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const msg = messageInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const validationError =
        !name
          ? 'Please enter your name.'
          : name.length < 2
            ? 'Name must contain at least 2 characters.'
            : name.length > 80
              ? 'Name must be 80 characters or fewer.'
              : !email
                ? 'Please enter your email address.'
                : email.length > 254
                  ? 'Email must be 254 characters or fewer.'
                  : !emailPattern.test(email)
                    ? 'Please enter a valid email address.'
                    : !msg
                      ? 'Please enter a message.'
                      : msg.length < 10
                        ? 'Message must contain at least 10 characters.'
                        : msg.length > 2000
                          ? 'Message must be 2000 characters or fewer.'
                          : '';

      if (validationError || submitBtn?.disabled) {
        if (validationError) {
          feedback.textContent = validationError;
          feedback.classList.remove('text-success-active');
        }
        return;
      }

      if (submitBtn) {
        submitBtn.dataset.defaultContent ??= submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending Message...';
        submitBtn.disabled = true;
      }

      /*

           submitBtn.innerHTML = `Send Message <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="btn-arrow"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path></svg>`;


      */
      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          { name, email, message: msg }
        );

        feedback.textContent = 'Message sent successfully! Thank you for reaching out.';
        feedback.classList.add('text-success-active');
        form.reset();
      } catch (error) {
        console.error('EmailJS contact form submission failed.', error);
        feedback.textContent = 'Unable to send your message right now. Please try again.';
        feedback.classList.remove('text-success-active');
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = submitBtn.dataset.defaultContent ?? 'Send Message';
          submitBtn.disabled = false;
        }
      }
    });
  }
}

/* ==========================================================================
   TYPEWRITER CYBER EFFECT IN HERO EYEBROW
   ========================================================================== */
function initTypewriter() {
  const elem = document.getElementById('typewriter-text');
  if (!elem) return;

  const roles = PORTFOLIO_DATA.profile.roles;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    elem.textContent = roles[0];
    return;
  }
  let roleIdx = 0,
    charIdx = 0,
    isDeleting = false,
    delay = 100;

  function typeTick() {
    const current = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      delay = 60;
    } else {
      charIdx++;
      delay = 120;
    }

    elem.textContent = current.substring(0, charIdx);

    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 500;
    }

    setTimeout(typeTick, delay);
  }

  typeTick();
}

/* ==========================================================================
   APP INITIALIZATION ORCHESTRATOR
   ========================================================================== */
function bootstrapApp() {
  try {
    buildPortfolioDOM();
    initAmbientBackground();

    const lenis = initLenis();
    initLoader(lenis);
    initCustomCursor();
    initCardSpotlights();
    initCursorTrackingAvatar();
    initScrollAnimations();
    initInteractions(lenis);
    initTypewriter();

    console.log('SYSTEM: Reconstructed Creative Engine initialized successfully.');
  } catch (err) {
    console.error('SYSTEM ERROR: Failed to bootstrap creative engine:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
