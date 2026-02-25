import { motion } from "framer-motion";
import { Code, Cpu, Database, Terminal, ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import SmallUniverse from "./SmallUniverse";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const universeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = [
    {
      name: "Frontend",
      technologies: ["React", "Next.js", "Vite", "Tailwind CSS", "TypeScript"],
      icon: <Code className="w-5 h-5" />,
    },
    {
      name: "Backend",
      technologies: ["Neon db", "Python", "SQL"],
      icon: <Database className="w-5 h-5" />,
    },
    {
      name: "Tools",
      technologies: ["Git", "GitHub", "Vercel", "Framer Motion"],
      icon: <Terminal className="w-5 h-5" />,
    },
    {
      name: "Design",
      technologies: ["UI/UX", "Figma", "Responsive Design", "Animations"],
      icon: <Cpu className="w-5 h-5" />,
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* SmallUniverse Foreground - On top of everything */}
      <div 
        ref={universeRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ 
          width: '100vw', 
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <SmallUniverse />
      </div>

      {/* Content overlay - Semi-transparent to see universe through it */}
      <div className="relative z-10 bg-black/40 backdrop-blur-[2px] min-h-screen">
        {/* Hero Section - Full Screen with Image Left & Text Right */}
        <motion.section
          className="min-h-screen flex items-center px-6 lg:px-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left side - Image */}
              <motion.div 
                variants={itemVariants}
                className="lg:w-5/12 flex justify-center"
              >
                <motion.div
                  className="relative mt-24 sm:mt-2 md-mt-4 lg:mt-4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-4 border-white/15 shadow-2xl backdrop-blur-sm bg-black/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 mix-blend-overlay" />
                  <img 
                    src="/image.png" 
                    alt="Nour Yahyaoui"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>
              </motion.div>

              {/* Right side - Brief Intro */}
              <motion.div 
                variants={itemVariants}
                className="lg:w-7/12 text-center lg:text-left"
              >
                <motion.h1 
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-white drop-shadow-lg">Hi, I'm </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg">
                    Nour
                  </span>
                </motion.h1>
                
                <motion.h2 
                  className="text-2xl sm:text-3xl lg:text-4xl text-gray-200 mb-8 drop-shadow-lg"
                  variants={itemVariants}
                >
                  Web Developer & Problem Solver
                </motion.h2>
                
                <motion.p 
                  className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow"
                  variants={itemVariants}
                >
                  I craft beautiful, responsive web applications with modern technologies. 
                  Turning complex problems into simple, elegant solutions.
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-4 justify-center lg:justify-start mt-10"
                  variants={itemVariants}
                >
                  <Link to={'/projects'}> 
                    <motion.button
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View My Work
                    </motion.button>
                  </Link>
                   <Link to={'/contact'}> 
                    <motion.button
                      className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Me
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-6 h-6 text-gray-300 drop-shadow" />
            </motion.div>
          </div>
        </motion.section>

        {/* Detailed About Section */}
        <motion.section
          id="about"
          className="py-24 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div variants={itemVariants} className="text-center mb-20">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                More{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  About Me
                </span>
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow"
                whileHover={{ scale: 1.01 }}
              >
                Passionate developer crafting exceptional digital experiences
              </motion.p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Journey Card */}
              <motion.div variants={itemVariants} className="lg:w-1/2">
                <motion.div
                  className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-8 h-full shadow-2xl"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 drop-shadow">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                    My Journey
                  </h3>
                  <p className="text-gray-200 mb-4 leading-relaxed text-lg drop-shadow">
                    I began my coding journey in 2023 with Python and web
                    development fundamentals. Since then, I've progressed through
                    JavaScript, React, and modern full-stack development with
                    Next.js and Supabase.
                  </p>
                  <p className="text-gray-200 leading-relaxed text-lg drop-shadow">
                    What drives me is creating beautiful, functional applications
                    that solve real problems. I'm constantly learning and pushing
                    my skills to new levels.
                  </p>
                </motion.div>
              </motion.div>

              {/* Skills Grid */}
              <motion.div variants={itemVariants} className="lg:w-1/2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">
                          {skill.icon}
                        </div>
                        <h4 className="text-xl font-semibold text-white drop-shadow">
                          {skill.name}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-100 border border-white/20 hover:bg-cyan-500/30 hover:border-cyan-500/70 transition-all duration-300 shadow-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;