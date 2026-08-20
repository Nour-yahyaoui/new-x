"use client";

import React, { useEffect } from "react";
import Particles from "@/bits/particles";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/types";

function ProjectsClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background particles */}
      <div className="absolute inset-0 w-full h-full">
        <Particles
          particleColors={["#FFD700", "#FFA500", "#B8860B"]}
          particleCount={
            typeof window !== "undefined" && window.innerWidth < 768 ? 300 : 600
          }
          particleSpread={12}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 z-10">
        {/* Section title */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">My </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600">
              Portfolio
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for
            development
          </p>

          {/* Decorative line */}
          <div className="w-20 h-1 bg-gradient-to-r from-amber-300 to-amber-600 rounded-full mx-auto mt-4" />
        </div>

        {/* Projects Grid - Clean 3 column layout on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-300 h-full"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [, setIsHovered] = React.useState(false);

  return (
    <div
      className="h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Main Tag Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-xs font-semibold rounded-full shadow-lg">
          {project.mainTag}
        </div>

        {/* Construction Badge */}
        {project.underConstruction && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-amber-600/90 text-white text-[10px] font-medium rounded-full backdrop-blur-sm">
            🚧 In Development
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
          {project.title}
        </h3>

        <p className="text-sm text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-white/10 text-gray-300 text-[10px] rounded-full border border-gray-700"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 bg-white/10 text-gray-400 text-[10px] rounded-full">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-lg text-center transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02]"
            >
              Live Demo
            </a>
          )}
          {project.code && !project.privateCode && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-white/10 text-white text-sm font-medium rounded-lg text-center border border-gray-700 transition-all duration-200 hover:bg-white/20 hover:border-amber-500/50"
            >
              Source Code
            </a>
          )}
          {project.privateCode && !project.code && (
            <div className="flex-1 px-3 py-2 bg-white/5 text-gray-500 text-sm font-medium rounded-lg text-center cursor-not-allowed">
              Private
            </div>
          )}
        </div>

        {/* Note */}
        {project.note && (
          <p className="text-xs text-amber-400/70 mt-3 italic flex items-center gap-1">
            <span className="text-amber-500">✨</span>
            {project.note}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectsClient;
