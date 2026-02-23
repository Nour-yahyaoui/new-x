import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "DevDash",
      description:
        "A comprehensive developer dashboard featuring HTML/CSS/JavaScript courses, interactive code playground, UI components library, themes gallery, and AI prompts - all built with Next.js 14, TypeScript, and Tailwind CSS.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: [
        "Next.js 14",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "React Icons",
        "Dashboard",
        "Educational",
        "Interactive",
      ],
      mainTag: "Next.js",
      liveDemo: "https://devdash-ten.vercel.app/",
      code: "https://github.com/nour-yahyaoui/devdash-online-tools",
    },
    {
      title: "ButtonCraft",
      description:
        "A collection of beautifully designed, ready-to-use button components with HTML/CSS and Tailwind CSS implementations, featuring a visual editor (coming soon).",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: [
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Component Library",
        "TypeScript",
      ],
      mainTag: "Next.js",
      liveDemo: "https://button-gen.vercel.app/",
      code: "https://github.com/nour-yahyaoui/button-gen",
    },
    {
      title: "Apex - Full Stack E-commerce",
      description:
        "A fully functional e-commerce application built with Vite, featuring a separate admin dashboard, product management, shopping cart, and secure checkout process.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
      tags: [
        "Vite",
        "React",
        "E-commerce",
        "Admin Dashboard",
        "Full Stack",
        "Shopping Cart",
      ],
      mainTag: "Vite",
      liveDemo: "https://apex-plague.vercel.app/",
      code: "https://github.com/Nour-yahyaoui/apex",
    },
    {
      title: "Commerce ASP - E-commerce Frontend",
      description:
        "A modern e-commerce frontend application with product listings, shopping cart functionality, and responsive design built with React.",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: [
        "React",
        "E-commerce",
        "Frontend",
        "Shopping Cart",
        "Responsive",
      ],
      mainTag: "React",
      liveDemo: "https://commerce-asp.vercel.app/",
      code: "https://github.com/Nour-yahyaoui/commerce-asp",
    },
    {
      title: "ShopOn - E-commerce Demo",
      description:
        "An e-commerce demo HTML page showcasing product layout and design. Currently a static prototype awaiting full React implementation with enhanced functionality.",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: [
        "HTML",
        "CSS",
        "Demo",
        "Static Page",
        "E-commerce",
        "Prototype",
        "Under Development",
      ],
      mainTag: "HTML/CSS",
      liveDemo: "https://nour-yahyaoui.github.io/shopon/",
      code: "https://github.com/Nour-yahyaoui/shopon",
      underConstruction: true,
      note: "Static demo page - Full React version in development",
    },
    {
      title: "NF-Team",
      description:
        "A collaborative web development team project featuring modern UI/UX design and full-stack functionality.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["React", "Next.js", "Team Project", "tailwindcss", "typescript"],
      mainTag: "Team Project",
      liveDemo: "https://nf-team-pi.vercel.app/",
      privateCode: true,
      note: "Code repository is private as it's a team project",
    },
    {
      title: "Musify",
      description:
        "A modern music player application with playlist functionality built with React and Vite.",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["React", "Vite", "Tailwind CSS", "Only frontend"],
      mainTag: "React",
      liveDemo: "https://musify-tau-sepia.vercel.app/",
      code: "https://github.com/nour-yahyaoui/musify",
    },
    {
      title: "Ultra-Vuk",
      description:
        "A comprehensive personal dashboard featuring news, weather, calendar, AI tools, school and gym tracking (Private access only).",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
      tags: [
        "Next.js",
        "API Integration",
        "AI",
        "Dashboard",
        "Authentication",
        "supabase DB",
      ],
      mainTag: "Next js",
      liveDemo: "https://ultra-vuk.vercel.app/",
      privateCode: true,
      loginInstructions: "Contact me for demo access credentials",
      isPrivate: true,
      note: "Personal project with sensitive data - demo access available upon request",
    },
    {
      title: "Free Portfolio Templates",
      description:
        "A collection of 5 professional portfolio templates with modern designs, animations, and responsive layouts.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: [
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Templates",
        "TypeScript",
        "source code",
      ],
      mainTag: "Next.js",
      liveDemo: "https://portfolio-templates-store.vercel.app/",
      code: "https://github.com/nour-yahyaoui/portfolio-templates/",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="-z-5 h-screen bg-transparent w-full fixed top-0 left-0 min-h-screen">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={900}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>

      <motion.section
        id="projects"
        className="py-24 px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.h2
              className="text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
            >
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Projects
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              Crafting digital experiences with modern technologies and
              innovative solutions
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  className="h-full"
                >
                  <SpotlightCard
                    className="h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                    spotlightColor="rgba(0, 229, 255, 0.15)"
                  >
                    <div className="h-full flex flex-col">
                      {/* Project Image */}
                      <motion.div
                        className="relative h-48 mb-6 rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.03 }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <motion.div
                          className="absolute bottom-3 left-3 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-lg"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {project.mainTag}
                        </motion.div>
                        {project.underConstruction && (
                          <motion.div
                            className="absolute top-3 right-3 px-3 py-1 bg-amber-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            🚧 In Development
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Project Content */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-3 text-white">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-5">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <motion.span
                              key={i}
                              className="px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full backdrop-blur-sm"
                              whileHover={{
                                scale: 1.1,
                                backgroundColor: "rgba(255,255,255,0.2)",
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        {project.liveDemo && (
                          <motion.a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium flex-grow text-center shadow-lg hover:shadow-cyan-500/20 transition-all"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Live Demo
                          </motion.a>
                        )}
                        {project.code && !project.privateCode && (
                          <motion.a
                            href={project.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium flex-grow text-center hover:bg-white/20 transition-all"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Code
                          </motion.a>
                        )}
                        {project.privateCode && (
                          <motion.div
                            className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg font-medium flex-grow text-center text-sm"
                            whileHover={{ scale: 1.01 }}
                          >
                            Code Private
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Optional note */}
                      {project.note && (
                        <motion.p
                          className="text-xs text-gray-400 mt-3 italic"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          ℹ️ {project.note}
                        </motion.p>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Projects;