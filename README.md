# Soumajit Dutta — Portfolio

Personal portfolio for showcasing my work in machine learning, backend development, and AI systems. Built as a responsive single-page site with interactive motion, project and experience sections, verified certifications, and a contact form.

## Built with

- [Vite](https://vite.dev/) for local development and production builds
- Vanilla JavaScript and CSS
- [GSAP](https://gsap.com/) and ScrollTrigger for animation
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- [SplitType](https://github.com/lukePeavey/SplitType) for text animation
- [EmailJS](https://www.emailjs.com/) for contact form delivery

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually <http://localhost:5173/>.

## Configure the contact form

The rest of the site works without EmailJS configuration. To enable contact form delivery, create a `.env` file in the project root with the following values:

```dotenv
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Use an EmailJS template configured with `name`, `email`, and `message` fields. The public key is intended for client-side use; never put private keys, SMTP passwords, or other server-side secrets in `VITE_` variables. `.env` is excluded from Git; `.env.example` documents the required variable names.

## Build and preview

```bash
npm run build
npm run preview
```

The production site is written to `dist/`.
