import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Home from "../components/BG";

const AboutPage = () => {
  const timelineData = [
    {
      year: "2020",
      title: "First Lines of Code",
      description: "Started learning HTML and CSS, building simple static websites",
      icon: "💻"
    },
    {
      year: "2021",
      title: "JavaScript Discovery",
      description: "Began exploring JavaScript and building interactive web elements",
      icon: "🧠"
    },
    {
      year: "2022",
      title: "React Journey",
      description: "Dived into React ecosystem and modern frontend development",
      icon: "⚛️"
    },
    {
      year: "2023",
      title: "Full Stack Exploration",
      description: "Expanded skills to include backend technologies and databases",
      icon: "🔗"
    },
    {
      year: "Present",
      title: "Continuous Growth",
      description: "Focusing on advanced concepts and building complex applications",
      icon: "🚀"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

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
        <div className="container mx-auto">
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-5xl font-bold mb-6 text-white"
              whileHover={{ scale: 1.02 }}
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Journey</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              From first lines of code to building modern web applications
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Profile Card */}
            <motion.div
              variants={cardVariants}
              animate="active"
              className="md:w-1/3 flex flex-col items-center"
            >
              <motion.div
                className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-white/20 mb-6"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
                  alt="Nour Yahyaoui"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-full"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-white">Nour Yahyaoui</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-cyan-400 mr-3 mt-1">📍</div>
                    <div>
                      <h4 className="font-medium text-white">Location</h4>
                      <p className="text-gray-300">Gassrin Sbiba, Tunisia</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-cyan-400 mr-3 mt-1">🎓</div>
                    <div>
                      <h4 className="font-medium text-white">Education</h4>
                      <p className="text-gray-300">Monji Slim Secondary School</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-cyan-400 mr-3 mt-1">💼</div>
                    <div>
                      <h4 className="font-medium text-white">Experience</h4>
                      <p className="text-gray-300">2+ years in Web Development</p>
                    </div>
                  </div>
                </div>

                <motion.a
                  href="https://github.com/nour-yahyaoui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-cyan-500/20 transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Profile
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Timeline */}
            <motion.div 
              className="md:w-2/3"
              variants={containerVariants}
            >
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600"></div>
                
                <AnimatePresence>
                  {timelineData.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative pl-16 pb-12 last:pb-0"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {item.icon}
                      </div>
                      
                      {/* Timeline content */}
                      <motion.div 
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
                        whileHover={{ y: -5 }}
                      >
                        <div className="text-sm font-semibold text-cyan-400 mb-1">{item.year}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;