import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Folder,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsScrolled] = useState(false);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(event.target as Element).closest(".mobile-menu-container")
      ) {
        setIsMenuOpen(false);
      }
    };

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "About", href: "/about", icon: <User size={20} /> },
    { name: "Projects", href: "/projects", icon: <Folder size={20} /> },
    { name: "Contact", href: "/contact", icon: <Mail size={20} /> },
  ];

  const socialIcons = [
    { icon: <Github size={20} />, href: "https://github.com/nour-yahyaoui" },
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com/nourr_yahyaouiii",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/nourr-yahyaoui-86987b36b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    { icon: <Mail size={20} />, href: "mailto:nourryahyaoui@gmail.com" },
  ];

  const menuVariants = {
    open: {
      opacity: 1,
      y: "0",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        when: "beforeChildren" as const,
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        when: "afterChildren" as const,
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  const iconVariants = {
    hover: { scale: 1.2, rotate: [0, -10, 10, 0] },
    tap: { scale: 0.9 },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMenuOpen ? "bg-black backdrop-blur-lg  h-screen" : "bg-black/80 "
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="hidden md:flex items-center justify-between"
        >
          <motion.div className="flex space-x-8 items-center">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                <a href={item.href} tabIndex={-1} className="sr-only">
                  {item.name}
                </a>
                <motion.span
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.icon}
                </motion.span>
                <span>
                  <Link to={item.href}>{item.name}</Link>
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="flex space-x-6">
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center mt-0">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-300 focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>

          <motion.div className="flex space-x-4">
            {socialIcons.slice(0, 2).map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="mobile-menu-container md:hidden fixed inset-0 bg-black bg-opacity-95 backdrop-blur-lg pt-24 px-6 z-40"
            >
              <motion.div className="flex flex-col space-y-8 items-center mt-8">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-4 text-gray-300 hover:text-white text-xl font-medium w-full justify-center"
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 w-full justify-center"
                    >
                      <motion.span
                        variants={iconVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {item.icon}
                      </motion.span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="flex space-x-8 mt-12"
                  variants={itemVariants}
                >
                  {socialIcons.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={iconVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
