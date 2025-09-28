import React from "react";
import { ArrowUp, Heart, Coffee, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../context/ThemeContext";
import styles from './Footer.module.css';
import footerImage from "../../assets/FooterImage.png";

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/JojooLearn",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/in/johandwiyanto",
      label: "LinkedIn",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:johandwiyanto@gmail.com",
      label: "Email",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "./" },
    { name: "About", href: "./about" },
    { name: "Projects", href: "./projects" },
    { name: "Blog", href: "./articles" },
    { name: "Contact", href: "./contact" }
  ];

  return (
    <footer className={cn(styles.footer, isDarkMode ? styles.dark : styles.light)}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div>
        <div className={styles.glowCircle3}></div>
      </div>

      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Left Section - Photo & Info */}
          <div className={styles.leftSection}>
            <div className={styles.photoContainer}>
              <img src={footerImage} alt="Portojojo Logo" className={styles.profilePhoto} />
              <div className={styles.photoGlow}></div>
            </div>
            
            <div className={styles.personalInfo}>
              <h3 className={styles.name}>Johan Dwiyanto</h3>
              <p className={styles.title}>Full Stack Developer & UI/UX Designer</p>
              
              <div className={styles.location}>
                <MapPin size={16} className={styles.locationIcon} />
                <span>Indonesian</span>
              </div>
              
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div className={styles.middleSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.quickLinks}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className={styles.quickLink}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Contact Info */}
          <div className={styles.rightSection}>
            <h4 className={styles.sectionTitle}>Get In Touch</h4>
            <div className={styles.contactInfo}>
              <a href="mailto:johandwiyanto23klaten@gmail.com" className={styles.contactLink}>
                <Mail size={18} />
                johandwiyanto23klaten@gmail.com
              </a>
              <p className={styles.availability}>
                Available for freelance work
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          {/* Made with love */}
          <div className={styles.madeWith}>
            <span className={styles.madeWithText}>Made with</span>
            <Heart size={16} className={styles.heartIcon} />
            <span className={styles.madeWithText}>and</span>
            <Coffee size={16} className={styles.coffeeIcon} />
            <span className={styles.madeWithText}>by Johan Dwiyanto</span>
          </div>

          {/* Copyright */}
          <div className={styles.copyright}>
            <p>&copy; {currentYear} JojooLearn. All rights reserved.</p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label="Kembali ke atas"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;