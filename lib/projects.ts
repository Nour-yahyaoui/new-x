import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "bacplus - Plateforme d'entraide pour le Bac Tunisien",
    description:
      "Complete social learning platform for Tunisian Baccalaureate students. Features include Q&A system, interactive courses (HTML, CSS, JavaScript, PHP, SQL), code playground, project tracker, gamification (XP/levels), real-time notifications, and content moderation. Built with Next.js 16, Neon PostgreSQL, and Vercel KV for caching.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: [
      "Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL", "Neon DB",
      "Vercel KV", "NextAuth.js", "JWT", "TanStack Query",
      "Education", "Social Platform", "Gamification", "Real-time"
    ],
    mainTag: "Full Stack",
    liveDemo: "https://bac-plus.vercel.app/",
    code: "https://github.com/alphaa-pixel/bacplus-web",
    note: "Complete learning platform with gamification and real-time features",
  },
  {
    title: "Matjari - Multi-Tenant E-commerce Platform",
    description:
      "A comprehensive multi-tenant e-commerce platform designed specifically for small shops. Handles everything from inventory management, order processing, payment integration, and customer management to analytics and reporting. Features include multi-store support (tenant-based), product variants, stock management, order tracking, invoice generation, customer loyalty system, and real-time dashboard analytics. Built with a Next.js backend (serverless), React Native mobile app, and a Vite React admin dashboard.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: [
      "Next.js 16", "React Native", "Vite", "React", "TypeScript",
      "Tailwind CSS", "PostgreSQL", "Neon DB", "Serverless",
      "Multi-Tenant", "E-commerce", "Mobile App", "Admin Dashboard",
      "Payment Integration", "Analytics"
    ],
    mainTag: "Multi-Tenant",
    liveDemo: "https://matjari-dashboard.vercel.app/",
    note: "Multi-tenant platform for small shops with mobile app and admin dashboard",
  },
  {
    title: "Nextgen - Full Stack E-commerce Platform",
    description:
      "Complete e-commerce platform with admin dashboard, product management, offers system, wishlist, cart, and secure checkout. Features include product variants (sizes/stock), image uploads via ImageBB, order management, low stock alerts, restock system, and a beautiful storefront. Built with PostgreSQL and Neon DB for serverless data.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: [
      "Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL", "Neon DB",
      "E-commerce", "Serverless", "ImgBB API", "Zustand", "Admin Dashboard"
    ],
    mainTag: "Full Stack",
    liveDemo: "https://v4-nextgen.vercel.app/",
    note: "Full-featured e-commerce with admin panel and offers system",
  },
  {
    title: "Grafspee - Next.js Component Library",
    description:
      "A modern, open-source component library built with Next.js 16 and Tailwind CSS. Ready-to-use components for rapid development including buttons, cards, modals, forms, navigation, and more. Perfect for speeding up frontend development with pre-built, customizable components. The site itself serves as interactive documentation with live examples and code snippets.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: [
      "Next.js 16", "TypeScript", "Tailwind CSS", "Component Library",
      "Open Source", "Documentation", "UI Components", "Headless UI"
    ],
    mainTag: "Open Source",
    code: "https://github.com/nour-yahyaoui/grafspee",
    note: "Open source component library for Next.js 16",
  },
  {
    title: "env-sentry - .env Drift & Secrets Scanner",
    description:
      "Open-source Python library that catches .env drift and hardcoded secrets before they ship. Scans a codebase for environment variables referenced in code but missing from .env files, and flags hardcoded secrets/API keys, closing a security gap most teams handle manually (or not at all). Designed to plug into local dev workflows and CI pipelines.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: [
      "Python", "Security", "CLI Tool", "Open Source", "DevSecOps",
      "CI/CD", "Secrets Detection", "Developer Tools"
    ],
    mainTag: "Open Source",
    code: "https://github.com/nour-yahyaoui/env-sentry",
    note: "Security tool that catches secret leaks and .env drift before they ship",
  },
  {
    title: "DevDash - Developer Dashboard",
    description:
      "Developer dashboard with courses, playground, UI components, and AI prompts. A comprehensive toolkit for developers to access resources, test code, and manage projects.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS"],
    mainTag: "Next.js",
    liveDemo: "https://devdash-ten.vercel.app/",
    code: "https://github.com/nour-yahyaoui/devdash-online-tools",
  },
  {
    title: "ButtonCraft - UI Component Library",
    description:
      "Collection of ready-to-use button components with HTML/CSS and Tailwind CSS implementations. Perfect for developers looking for pre-styled, customizable buttons for their projects.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    mainTag: "Next.js",
    liveDemo: "https://button-gen.vercel.app/",
    code: "https://github.com/nour-yahyaoui/button-gen",
  },
  {
    title: "Ghassen Studio - Designer Portfolio",
    description: "Modern, visually striking portfolio website for a designer. Showcases creative work with a clean, minimalist aesthetic and smooth animations.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    tags: ["Vite", "React", "Portfolio", "Modern UI"],
    mainTag: "Vite",
    liveDemo: "https://ghassen-studio.vercel.app/",
    note: "Designer portfolio",
  },
];
