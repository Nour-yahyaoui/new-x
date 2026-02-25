import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Particles from "../bits/particles";
import SpotlightCard from "../bits/SpotlightCard";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  mainTag: string;
  liveDemo?: string;
  code?: string;
  underConstruction?: boolean;
  privateCode?: boolean;
  note?: string;
  loginInstructions?: string;
  isPrivate?: boolean;
}

const projects: Project[] = [
  {
    title: "DevDash",
    description:
      "Developer dashboard with courses, playground, UI components, and AI prompts.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    mainTag: "Next.js",
    liveDemo: "https://devdash-ten.vercel.app/",
    code: "https://github.com/nour-yahyaoui/devdash-online-tools",
  },
  {
    title: "ButtonCraft",
    description:
      "Collection of ready-to-use button components with HTML/CSS and Tailwind CSS implementations.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    mainTag: "Next.js",
    liveDemo: "https://button-gen.vercel.app/",
    code: "https://github.com/nour-yahyaoui/button-gen",
  },
  {
    title: "Apex - Full Stack E-commerce",
    description:
      "Fully functional e-commerce with admin dashboard, product management, and secure checkout.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    tags: ["Vite", "React", "E-commerce", "Admin Dashboard"],
    mainTag: "Vite",
    liveDemo: "https://apex-plague.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/apex",
  },
  {
    title: "Commerce ASP",
    description:
      "Modern e-commerce frontend with product listings and shopping cart functionality.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "E-commerce", "Shopping Cart", "Responsive"],
    mainTag: "React",
    liveDemo: "https://commerce-asp.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/commerce-asp",
  },
  {
    title: "ShopOn - Demo",
    description:
      "E-commerce demo HTML page showcasing product layout and design.",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["HTML", "CSS", "Demo", "Static Page", "Prototype"],
    mainTag: "HTML/CSS",
    liveDemo: "https://nour-yahyaoui.github.io/shopon/",
    code: "https://github.com/Nour-yahyaoui/shopon",
    underConstruction: true,
    note: "Static demo - React version in development",
  },
  {
    title: "FakeShop",
    description:
      "Basic e-commerce demo with product listing and shopping cart.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "E-commerce", "Demo", "Shopping Cart"],
    mainTag: "React",
    liveDemo: "https://fake-shop-demo.vercel.app/",
    note: "Basic demo version",
  },
  {
    title: "ExpertComptable",
    description:
      "Static HTML/TailwindCSS design concept for an accounting professional.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["HTML", "Tailwind CSS", "Design", "Prototype"],
    mainTag: "HTML/CSS",
    liveDemo: "https://nour-yahyaoui.github.io/expert/",
    code: "https://github.com/Nour-yahyaoui/expert",
    underConstruction: true,
    note: "Design concept only",
  },
  {
    title: "Ghassen Studio",
    description:
      "Modern, visually striking portfolio website for a designer.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Vite", "React", "Portfolio", "Modern UI"],
    mainTag: "Vite",
    liveDemo: "https://ghassen-studio.vercel.app/",
    note: "Designer portfolio",
  },
  {
    title: "Todo App",
    description:
      "Basic todo application for task management with CRUD operations.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    tags: ["JavaScript", "Todo App", "CRUD", "Task Management"],
    mainTag: "JavaScript",
    code: "https://github.com/Nour-yahyaoui/todo",
    note: "No live demo",
  },
  {
    title: "Password Generator",
    description:
      "Secure, random password generator with customizable options.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["JavaScript", "Password Generator", "Tool", "Utility"],
    mainTag: "JavaScript",
    liveDemo: "https://generator-one-ecru.vercel.app/",
    code: "https://github.com/Nour-yahyaoui/generator",
  },
  {
    title: "NF-Team",
    description:
      "Collaborative web development team project with modern UI/UX.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "Next.js", "Team Project", "tailwindcss"],
    mainTag: "Team",
    liveDemo: "https://nf-team-pi.vercel.app/",
    privateCode: true,
    note: "Private team project",
  },
  {
    title: "Musify",
    description:
      "Modern music player with playlist functionality.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "Vite", "Tailwind CSS", "Frontend"],
    mainTag: "React",
    liveDemo: "https://musify-tau-sepia.vercel.app/",
    code: "https://github.com/nour-yahyaoui/musify",
  },
  {
    title: "Ultra-Vuk",
    description:
      "Personal dashboard with news, weather, calendar, AI tools, and tracking.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
    tags: ["Next.js", "API Integration", "AI", "Dashboard"],
    mainTag: "Next.js",
    liveDemo: "https://ultra-vuk.vercel.app/",
    privateCode: true,
    isPrivate: true,
    note: "Demo access upon request",
  },
  {
    title: "Portfolio Templates",
    description:
      "Collection of 5 professional portfolio templates with modern designs.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Templates"],
    mainTag: "Next.js",
    liveDemo: "https://portfolio-templates-store.vercel.app/",
    code: "https://github.com/nour-yahyaoui/portfolio-templates/",
  },
];

// Golden Leach Component - Hidden on mobile
const GoldenTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 z-10 pointer-events-none">
      {/* Main golden line */}
      <motion.div
        className="absolute left-0 w-1 bg-gradient-to-b from-amber-300 via-yellow-500 to-amber-700"
        style={{
          height: "100%",
          boxShadow: "0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,200,0,0.3)",
          filter: "blur(1px)",
        }}
      />

      {/* Animated golden particle */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-300"
        style={{
          top: useTransform(pathProgress, [0, 1], ["0%", "100%"]),
          boxShadow: "0 0 20px #FFD700, 0 0 40px #FFA500",
          filter: "blur(2px)",
        }}
      />

      {/* Flowing particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400/70"
          style={{
            top: useTransform(
              scrollYProgress,
              [0, 1],
              [`${-20 + i * 20}%`, `${120 + i * 20}%`]
            ),
            boxShadow: "0 0 15px rgba(255,215,0,0.6)",
            filter: "blur(1px)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Golden nodes */}
      {projects.map((_, index) => {
        const nodePosition = (index / (projects.length - 1)) * 100;
        return (
          <motion.div
            key={`node-${index}`}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4"
            style={{ top: `${nodePosition}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-50" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 to-yellow-600 shadow-lg"
                 style={{ boxShadow: "0 0 20px #FFD700" }} />
            <div className="absolute inset-1 rounded-full bg-white animate-pulse" />
          </motion.div>
        );
      })}
    </div>
  );
};

// Liquid golden divider - Hidden on mobile
const GoldenDivider: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="hidden lg:block absolute left-0 right-0 h-32 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B8860B" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={`M0,32 C${progress * 100},0 ${progress * 200},64 100%,32 L100%,0 L0,0 Z`}
          fill="url(#goldGradient)"
          filter="url(#glow)"
          animate={{
            d: [
              "M0,32 C200,0 400,64 100%,32 L100%,0 L0,0 Z",
              "M0,32 C300,64 500,0 100%,32 L100%,0 L0,0 Z",
              "M0,32 C200,0 400,64 100%,32 L100%,0 L0,0 Z",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
};

// Golden floating particles - Responsive count
const GoldenParticles: React.FC = () => {
  const [particleCount, setParticleCount] = React.useState(20);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setParticleCount(8);
      } else if (window.innerWidth < 1024) {
        setParticleCount(12);
      } else {
        setParticleCount(20);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px #FFD700",
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Projects: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        delay: index * 0.1,
      },
    }),
    hover: (index: number) => ({
      x: index % 2 === 0 ? 5 : -5,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background particles */}
      <div className="-z-5 h-screen bg-transparent w-full fixed top-0 left-0 min-h-screen">
        <Particles
          particleColors={["#FFD700", "#FFA500", "#B8860B"]}
          particleCount={window.innerWidth < 768 ? 400 : 900}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>

      {/* Golden floating particles */}
      <GoldenParticles />

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        {/* Golden timeline - hidden on mobile */}
        <GoldenTimeline />

        {/* Section title */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 relative px-2"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-white">My </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600">
               Projects
            </span>
            {/* Animated underline - responsive width */}
            <motion.div
              className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-1 bg-gradient-to-r from-amber-300 to-amber-600 rounded-full"
              style={{ width: "clamp(120px, 50vw, 200px)" }}
              animate={{
                width: ["clamp(120px, 40vw, 200px)", "clamp(180px, 60vw, 300px)", "clamp(120px, 40vw, 200px)"],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base lg:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            whileHover={{ scale: 1.01 }}
          >
            Each project is a golden milestone in my journey of crafting digital experiences
          </motion.p>
        </motion.div>

        {/* Projects grid - responsive layout */}
        <div className="relative">
          {/* Mobile/Tablet: Grid layout */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={index}
                whileHover={{ y: -3 }}
                className="h-full"
              >
                <CompactProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Timeline layout */}
          <div className="hidden lg:block">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center mb-16 ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover="hover"
                >
                  <div className={`w-5/12 ${isEven ? "pr-8" : "pl-8"}`}>
                    <CompactProjectCard project={project} />
                  </div>
                  <div className="w-2/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Golden divider */}
        <GoldenDivider progress={1} />
      </div>
    </div>
  );
};

// Compact Project Card Component
const CompactProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <SpotlightCard
        className="p-3 sm:p-4 bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-xl sm:rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300"
        spotlightColor="rgba(255, 215, 0, 0.15)"
      >
        {/* Project image - smaller */}
        <div className="relative h-32 sm:h-28 lg:h-32 mb-2 sm:mb-3 rounded-lg overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Golden tag - smaller */}
          <motion.div
            className="absolute bottom-1.5 left-1.5 px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-[10px] sm:text-xs font-medium rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            style={{ boxShadow: "0 0 10px rgba(255,215,0,0.3)" }}
          >
            {project.mainTag}
          </motion.div>

          {/* Construction badge - smaller */}
          {project.underConstruction && (
            <motion.div
              className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-amber-600/90 text-white text-[8px] sm:text-[10px] font-medium rounded-full backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 5px rgba(255,215,0,0.3)",
                  "0 0 10px rgba(255,215,0,0.6)",
                  "0 0 5px rgba(255,215,0,0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚧 Dev
            </motion.div>
          )}
        </div>

        {/* Content - condensed */}
        <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-1 text-white flex items-center gap-1">
          {project.title.length > 20 ? project.title.substring(0, 18) + "..." : project.title}
          <motion.span
            className="text-amber-400 text-xs"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ✦
          </motion.span>
        </h3>
        
        <p className="text-xs sm:text-sm text-gray-300 mb-2 line-clamp-2">
          {project.description}
        </p>

        {/* Tags - scrollable on mobile */}
        <div className="flex flex-wrap gap-1 mb-2 max-w-full overflow-x-auto pb-1 hide-scrollbar">
          {project.tags.slice(0, 3).map((tag, i) => (
            <motion.span
              key={i}
              className="px-1.5 py-0.5 bg-white/10 text-gray-200 text-[8px] sm:text-[10px] rounded-full backdrop-blur-sm border border-amber-500/20 whitespace-nowrap"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,215,0,0.2)" }}
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1.5 py-0.5 bg-white/10 text-gray-200 text-[8px] sm:text-[10px] rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Buttons - compact */}
        <div className="flex gap-1.5">
          {project.liveDemo && (
            <motion.a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-[10px] sm:text-xs font-medium rounded-lg text-center"
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(255,215,0,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Live
            </motion.a>
          )}
          {project.code && !project.privateCode && (
            <motion.a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-2 py-1 bg-white/10 text-white text-[10px] sm:text-xs font-medium rounded-lg text-center border border-amber-500/30"
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,215,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              Code
            </motion.a>
          )}
          {project.privateCode && !project.code && (
            <div className="flex-1 px-2 py-1 bg-white/5 text-gray-400 text-[10px] sm:text-xs font-medium rounded-lg text-center">
              Private
            </div>
          )}
        </div>

        {/* Note - if exists */}
        {project.note && (
          <motion.p
            className="text-[8px] sm:text-[10px] text-amber-300/70 mt-1.5 italic flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-amber-400">✦</span> 
            {project.note.length > 30 ? project.note.substring(0, 28) + "..." : project.note}
          </motion.p>
        )}
      </SpotlightCard>
    </motion.div>
  );
};

// Add this CSS to hide scrollbar but keep functionality
const styles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Projects;