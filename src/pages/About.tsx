import { motion } from "framer-motion";
import Header from "../components/Header";
// import Home from "../components/BG";
import { Code, Cpu, Database, Terminal } from "lucide-react";

const AboutPage = () => {
  const skills = [
    { name: "Frontend", technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"], icon: <Code className="w-5 h-5" /> },
    { name: "Backend", technologies: ["Supabase", "Python", "SQL"], icon: <Database className="w-5 h-5" /> },
    { name: "Tools", technologies: ["Git", "GitHub", "Vercel", "Framer Motion"], icon: <Terminal className="w-5 h-5" /> },
    { name: "Design", technologies: ["UI/UX", "Figma", "Responsive Design", "Animations"], icon: <Cpu className="w-5 h-5" /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      }
    }
  };

  return (
    <div className="md:h-[calc(100vh-50px)] h-auto relative overflow-hidden">
      <Header />
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
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              Passionate developer crafting exceptional digital experiences
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              variants={itemVariants}
              className="lg:w-1/3 flex justify-center"
            >
              <motion.div
                className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-white/20"
                whileHover={{ scale: 1.03 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-20">👨‍💻</div>
                </div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">Nour Yahyaoui</h3>
                  <p className="text-gray-300 text-sm">Web Developer</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:w-2/3"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">My Journey</h3>
                <p className="text-gray-300 mb-4">
                  I began my coding journey in 2023 with Python and web development fundamentals. 
                  Since then, I've progressed through JavaScript, React, and modern full-stack 
                  development with Next.js and Supabase.
                </p>
                <p className="text-gray-300">
                  What drives me is creating beautiful, functional applications that solve real problems. 
                  I'm constantly learning and pushing my skills to new levels.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
                        {skill.icon}
                      </div>
                      <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded-full bg-white/5 text-gray-200 border border-white/10"
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
      {/* <div className="fixed top-0 left-0 -z-10 w-full h-full">
        <Home />
      </div> */}
    </div>
  );
};

export default AboutPage;