import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Code, Cpu, Database, GitBranch, Github, Rocket, Sparkles, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export default function Hero() {
  const ref = useRef(null);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Coding meme phrases
  const memes = [
    "// TODO: Add more memes",
    "const bugs = features;",
    "async await my coffee",
    "git commit -m 'fix previous commit'",
    "404: Sleep Not Found",
    "NaN hours of debugging",
    "!important",
    "hacking microsoft",
    "mining crypto",
    "10/0 bugs fixed",
    "left: 50%; transform: translateX(-50%);",
    "console.log('why is this not working?')",
    "margin: 0 auto; /* magic */",
  ];

  // All skills with matching icons
  const skills = [
    { name: "HTML", icon: <Code className="h-4 w-4 text-orange-500" /> },
    { name: "CSS", icon: <Code className="h-4 w-4 text-blue-500" /> },
    { name: "JavaScript", icon: <Code className="h-4 w-4 text-yellow-400" /> },
    { name: "TypeScript", icon: <Terminal className="h-4 w-4 text-cyan-400" /> },
    { name: "Python", icon: <Code className="h-4 w-4 text-emerald-400" /> },
    { name: "SQL", icon: <Database className="h-4 w-4 text-blue-400" /> },
    { name: "TailwindCSS", icon: <Sparkles className="h-4 w-4 text-cyan-300" /> },
    { name: "Git", icon: <GitBranch className="h-4 w-4 text-orange-400" /> },
    { name: "GitHub", icon: <Github className="h-4 w-4 text-gray-100" /> },
    { name: "Next.js", icon: <Cpu className="h-4 w-4 text-white" /> },
    { name: "React", icon: <Code className="h-4 w-4 text-blue-400" /> },
    { name: "Vite", icon: <Rocket className="h-4 w-4 text-purple-400" /> },
    { name: "Supabase", icon: <Database className="h-4 w-4 text-emerald-400" /> }
  ];

  // Primary skills to show on mobile initially
  const primarySkills = skills.filter(skill => 
    ["Next.js", "TailwindCSS", "React", "Vite", "Supabase"].includes(skill.name)
  );

  // Secondary skills (shown when expanded)
  const secondarySkills = skills.filter(skill => 
    !["Next.js", "TailwindCSS", "React", "Vite", "Supabase"].includes(skill.name)
  );

  return (
    <section 
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-transparent"
    >
      {/* Parallax background elements */}
      <motion.div 
        style={{ y: yBg, opacity: opacityBg }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-20" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl opacity-20" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 blur-xl opacity-20" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl opacity-20" />
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Animated greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-lg md:text-xl font-mono text-cyan-400">
              {"<NourYahyaouiiiiii />"}
            </span>
          </motion.div>

          {/* Name/title with tech stack animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            <span className="inline-block">
              I build{" "}
              <motion.span 
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                animate={{ 
                  rotate: [0, .5, -.5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 4 
                }}
              >
                pixel-perfect
              </motion.span>
            </span>
            <br />
            <span className="inline-flex items-center gap-2">
              web experiences
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 3 
                }}
              >
                <Rocket className="text-yellow-400" size={32} />
              </motion.span>
            </span>
          </motion.h1>

          {/* Tech stack badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto"
          >
            {/* Always show primary skills */}
            {primarySkills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -3 }}
                className="px-3 py-1.5 rounded-full bg-black bg-opacity-40 backdrop-blur-sm border border-gray-700 flex items-center gap-2 min-w-[100px]"
              >
                {skill.icon}
                <span className="text-sm font-medium text-gray-100">{skill.name}</span>
              </motion.div>
            ))}

            {/* Show secondary skills conditionally */}
            <AnimatePresence>
              {showAllSkills && secondarySkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ y: -3 }}
                  className="px-3 py-1.5 rounded-full bg-black bg-opacity-40 backdrop-blur-sm border border-gray-700 flex items-center gap-2 min-w-[100px]"
                >
                  {skill.icon}
                  <span className="text-sm font-medium text-gray-100">{skill.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Show more/less toggle on mobile */}
            <div className=" w-full flex justify-center mt-3">
              <motion.button
                onClick={() => setShowAllSkills(!showAllSkills)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 rounded-full bg-black bg-opacity-60 backdrop-blur-sm border border-gray-700 text-sm text-gray-300 flex items-center gap-1"
              >
                {showAllSkills ? (
                  <>
                    <span>Show Less</span>
                    <motion.span
                      animate={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      ↑
                    </motion.span>
                  </>
                ) : (
                  <>
                    <span>Show More</span>
                    <motion.span
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ↓
                    </motion.span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Floating coding memes */}
          <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
            {memes.map((meme, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: Math.random() > 0.5 ? -100 : 100,
                  y: Math.random() * 100 - 50
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  x: Math.random() > 0.5 ? [-100, 0, 100] : [100, 0, -100],
                  y: Math.random() * 100 - 50
                }}
                transition={{
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                className="absolute font-mono text-xs text-gray-400 whitespace-nowrap"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`
                }}
              >
                {meme}
              </motion.div>
            ))}
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative group"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundPosition: "100% 0%"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium relative overflow-hidden z-10"
              style={{
                backgroundSize: "200% 100%",
                transition: "background-position 0.5s"
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Link to={'/contact'}>
                Let's Build Something Awesome
                </Link>
                <motion.span
                  animate={{ 
                    x: [0, 4, -4, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2
                  }}
                >
                  <Rocket size={18} />
                </motion.span>
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.button>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}