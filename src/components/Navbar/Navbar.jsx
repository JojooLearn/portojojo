import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import logoImage from "../../assets/LogoPorto.png"; // ✅ logo dari assets

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Project", href: "/projects" },
    { name: "Articles", href: "/articles" },
    { name: "Gallery", href: "/gallery" },
    { name: "Sertificate", href: "/certificates" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* ✅ Logo */}
        <Link to="/" className={styles.logo}>
          <img src={logoImage} alt="Portojojo Logo" className={styles.logoImg} />
        </Link>

        {/* ✅ Desktop Menu */}
        <div className={styles.menu}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${styles.navLink} ${
                isActive(item.href) ? styles.active : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
         <Link to="/contact" className={`${styles.ctaButton} btn btn-gradient`}>
          Contact me
        </Link>

        </div>

        {/* ✅ Mobile Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ✅ Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${styles.mobileNavLink} ${
                isActive(item.href) ? styles.active : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
            <Link
              to="/contact"
              className={`${styles.mobileCtaButton} btn btn-gradient`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact me
            </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
