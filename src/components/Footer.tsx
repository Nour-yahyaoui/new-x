import { motion } from "framer-motion";
import { Github, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const socialIcons = [
    { icon: <Github size={16} />, href: "https://github.com/nour-yahyaoui" },
    { icon: <Instagram size={16} />, href: "https://instagram.com/nourr_yahyaouiii" },
    { icon: <Mail size={16} />, href: "mailto:nourryahyaoui@gmail.com" }
  ];

  return (
    <motion.footer 
      className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Nour Yahyaoui. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;