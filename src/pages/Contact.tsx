import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import Header from "../components/Header";
import Home from "../components/BG";

const ContactPage = () => {
  const socialIcons = [
    { icon: <Github size={20} />, href: "https://github.com/nour-yahyaoui" },
    { icon: <Instagram size={20} />, href: "https://instagram.com/nourr_yahyaouiii" },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/nourr-yahyaoui-86987b36b",
    },
    { icon: <Mail size={20} />, href: "mailto:nourryahyaoui@gmail.com" },
    { icon: <Phone size={20} />, href: "tel:+21625739896" },
    { icon: <MessageSquare size={20} />, href: "https://wa.me/21625739896" },
  ];

  const contactItems = [
    { 
      icon: <Mail size={20} />,
      title: 'Email', 
      value: 'nourryahyaoui@gmail.com',
      href: 'mailto:nourryahyaoui@gmail.com'
    },
    { 
      icon: <Phone size={20} />,
      title: 'Phone', 
      value: '+216 25 739 896',
      href: 'tel:+21625739896'
    },
    { 
      icon: <MessageSquare size={20} />,
      title: 'WhatsApp', 
      value: '+216 25 739 896',
      href: 'https://wa.me/21625739896'
    },
    { 
      icon: <Github size={20} />,
      title: 'GitHub', 
      value: 'github.com/nour-yahyaoui',
      href: 'https://github.com/nour-yahyaoui/'
    },
    { 
      icon: <MapPin size={20} />,
      title: 'Location', 
      value: 'Gassrin Sbiba, Tunisia'
    }
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
    <div className="h-auto relative overflow-hidden">
      <Header />
      <div className="fixed top-0 left-0 -z-10 w-full h-full">
        <Home />
      </div>

      <motion.section
        id="contact"
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
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              Have a project in mind or want to collaborate? Reach out through any of these channels.
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2"
            >
              <motion.div
                className="bg-white/5 text-white backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold mb-8 text-white">Contact Details</h3>
                
                <div className="space-y-6">
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      variants={itemVariants}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-cyan-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-300">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12">
                  <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                  <div className="flex flex-wrap gap-4">
                    {socialIcons.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold mb-8 text-white">Send a Message</h3>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Project Inquiry"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;