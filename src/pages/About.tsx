
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Home from "../components/BG";
import { useMediaQuery } from "react-responsive";

const AboutPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const timelineData = [
    {
      year: "2023",
      title: "The Beginning",
      description: "Started with Python basics and web fundamentals (HTML/CSS)",
      icon: "🐍",
      milestone: "seed",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      year: "Early 2024",
      title: "JavaScript Awakening",
      description: "Learned JavaScript fundamentals and created my first GitHub account",
      icon: "📜",
      milestone: "sprout",
      color: "from-blue-400 to-blue-600"
    },
    {
      year: "Mid 2024",
      title: "First React Project",
      description: "Built my first React application with TailwindCSS",
      icon: "⚛️",
      milestone: "sapling",
      color: "from-purple-400 to-purple-600"
    },
    {
      year: "Late 2024",
      title: "Portfolio Launch",
      description: "Deployed my first portfolio using React CRA + Tailwind on Vercel",
      icon: "🚀",
      milestone: "flower",
      color: "from-pink-400 to-pink-600"
    },
    {
      year: "2025",
      title: "Full Stack Mastery",
      description: "Mastered Supabase, Git/GitHub, Next.js and modern web technologies",
      icon: "🌳",
      milestone: "tree",
      color: "from-amber-400 to-amber-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4
      }
    }
  };

  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
       
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        
      }
    }
  };

  // Mobile Timeline - Vertical Cards with Connection Dots
  if (isMobile) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <Header />
        <div className="fixed top-0 left-0 -z-10 w-full h-full">
          <Home />
        </div>

        <motion.section
          id="about"
          className="py-16 px-6"
          initial="hidden"
          animate="visible"
          variants={mobileContainerVariants}
        >
          <div className="container mx-auto">
            <motion.div
              variants={mobileItemVariants}
              className="text-center mb-12"
            >
              <motion.h2
                className="text-4xl font-bold mb-4 text-white"
                whileHover={{ scale: 1.02 }}
              >
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Journey</span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-300"
                whileHover={{ scale: 1.01 }}
              >
                The evolution of my development skills
              </motion.p>
            </motion.div>

            <div className="relative">
              {/* Vertical connection line */}
              <div className="absolute left-8 top-4 h-[calc(100%-2rem)] w-1 bg-gradient-to-b from-emerald-400 via-blue-500 to-amber-400 z-0"></div>
              
              <div className="space-y-8 pl-12">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={mobileItemVariants}
                    className="relative"
                  >
                    {/* Connection dot */}
                    <div className={`absolute -left-9 top-4 w-6 h-6 rounded-full bg-gradient-to-br ${item.color} shadow-md z-10 flex items-center justify-center text-white`}>
                      {item.icon}
                    </div>
                    
                    {/* Timeline card */}
                    <motion.div 
                      className={`p-6 rounded-xl border border-white/10 bg-gradient-to-br ${item.color}/10 backdrop-blur-sm`}
                      whileHover={{ 
                        x: 5,
                        boxShadow: `0 8px 20px -5px rgba(var(--${item.color.split('-')[1]}-500), 0.15)`
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-br ${item.color} text-white`}>
                          {item.year}
                        </span>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-gray-200">{item.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Status */}
            <motion.div
              variants={mobileItemVariants}
              className="mt-12 text-center"
            >
              <div className="inline-block px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-full">
                <span className="text-cyan-400">Now:</span>{" "}
                <span className="text-white">Building with Next.js, Supabase & modern stack</span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    );
  }

  // Desktop Timeline - Alternating Sides
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      <div className="fixed top-0 left-0 -z-10 w-full h-full">
        <Home />
      </div>

      <motion.section
        id="about"
        className="py-24 px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Development Path</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              From foundational skills to full-stack proficiency
            </motion.p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="relative min-h-[600px]">
            {/* Center Line with Growth Visualization */}
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 via-blue-500 to-amber-400 transform -translate-x-1/2">
              {/* Growth milestones */}
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute left-1/2 w-8 h-8 -ml-4 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}
                  style={{
                    top: `${(index / (timelineData.length - 1)) * 90}%`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                >
                  {item.icon}
                </motion.div>
              ))}
            </div>
            
            {/* Timeline Items */}
            <AnimatePresence>
              {timelineData.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`absolute w-5/12 ${isLeft ? 'left-0' : 'right-0'}`}
                    style={{
                      top: `${(index / (timelineData.length - 1)) * 90}%`,
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div 
                      className={`p-6 rounded-xl border border-white/10 bg-gradient-to-br ${item.color}/10 backdrop-blur-sm ${isLeft ? 'mr-16' : 'ml-16'}`}
                      whileHover={{ 
                        y: -5,
                        x: isLeft ? 5 : -5,
                        boxShadow: `0 10px 25px -5px rgba(var(--${item.color.split('-')[1]}-500), 0.2)`
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-br ${item.color} text-white`}>
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-gray-200">{item.description}</p>
                      
                      {/* Milestone indicator */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 ${isLeft ? 'right-[-8px]' : 'left-[-8px]'} bg-gradient-to-br ${item.color}/80 border-t border-r border-white/20`}></div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Current Status */}
          <motion.div
            variants={itemVariants}
            className="mt-32 text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-full">
              <div className="w-3 h-3 mr-3 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-cyan-400 font-medium">Current Focus:</span>{" "}
              <span className="text-white ml-2">Building cutting-edge web applications with Next.js, Supabase, and modern web technologies</span>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;