import React, { useState } from "react";
import { Linkedin, Github, Mail, Instagram, MapPin, Send, Phone, Shield, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import styles from './ContactSection.module.css';
import StarBackground from "../StarBackground";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [errors, setErrors] = useState({});
  const [securityToken, setSecurityToken] = useState(generateSecurityToken());

  // Generate security token untuk CSRF protection
  function generateSecurityToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Validasi input
  const validateInput = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Nama wajib diisi';
        } else if (value.length < 2) {
          newErrors.name = 'Nama minimal 2 karakter';
        } else if (value.length > 50) {
          newErrors.name = 'Nama maksimal 50 karakter';
        } else if (!/^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF]+$/.test(value)) {
          newErrors.name = 'Nama hanya boleh mengandung huruf dan spasi';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Format email tidak valid';
        } else if (value.length > 100) {
          newErrors.email = 'Email maksimal 100 karakter';
        } else {
          delete newErrors.email;
        }
        break;

      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Pesan wajib diisi';
        } else if (value.length < 10) {
          newErrors.message = 'Pesan minimal 10 karakter';
        } else if (value.length > 1000) {
          newErrors.message = 'Pesan maksimal 1000 karakter';
        } else if (detectMaliciousContent(value)) {
          newErrors.message = 'Pesan mengandung konten yang tidak diperbolehkan';
        } else {
          delete newErrors.message;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Deteksi konten berbahaya
  const detectMaliciousContent = (text) => {
    const maliciousPatterns = [
      // SQL Injection patterns
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|ALTER|CREATE|TRUNCATE)\b)/i,
      /(\b(OR|AND)\s+['"]?[0-9]+\s*=\s*[0-9]+)/i,
      /(--|\/\*|\*\/|;)/,
      
      // XSS patterns
      /(<script|javascript:|onload=|onerror=|onclick=|onmouseover=)/i,
      /(<\/?script|<\/?iframe|<\/?object|<\/?embed)/i,
      /(alert\(|prompt\(|confirm\(|document\.cookie|window\.location)/i,
      
      // File path patterns
      /(\.\.\/|\.\.\\|\.exe|\.php|\.js|\.html|\.htm)/i,
      
      // Command injection
      /(\|&|;|`|\$\(|\|\||&&)/,
      
      // Excessive special characters (potential obfuscation)
      /([!$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,})/,
    ];

    return maliciousPatterns.some(pattern => pattern.test(text));
  };

  // Sanitasi input
  const sanitizeInput = (input) => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;')
      .replace(/\//g, '&#x2F;')
      .replace(/\\/g, '&#x5C;')
      .replace(/\n/g, '<br>')
      .replace(/\r/g, '')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validasi real-time
    validateInput(name, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateInput(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi final sebelum submit
    const isNameValid = validateInput('name', formData.name);
    const isEmailValid = validateInput('email', formData.email);
    const isMessageValid = validateInput('message', formData.message);
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      setToastMessage('Harap perbaiki error pada form sebelum mengirim');
      setToastType('error');
      setShowToast(true);
      return;
    }

    // Rate limiting check (simpan di localStorage)
    const lastSubmission = localStorage.getItem('lastContactSubmission');
    const now = Date.now();
    
    if (lastSubmission && (now - parseInt(lastSubmission)) < 30000) { // 30 detik cooldown
      setToastMessage('Harap tunggu 30 detik sebelum mengirim pesan lagi');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitasi data sebelum dikirim
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message),
        security_token: securityToken,
        timestamp: now.toString()
      };

      const response = await fetch("http://portojohanieh.my.id/Portojohaniieh/api_controller/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(sanitizedData),
        credentials: 'same-origin'
      });

      // Cek content type untuk memastikan response valid
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response tidak valid dari server");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      // Simpan timestamp submission untuk rate limiting
      localStorage.setItem('lastContactSubmission', now.toString());
      
      // Generate token baru untuk permintaan berikutnya
      setSecurityToken(generateSecurityToken());

      setToastMessage("Pesan berhasil terkirim! Saya akan membalas secepatnya.");
      setToastType("success");
      setShowToast(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setToastMessage(error.message || "Terjadi kesalahan. Silakan coba lagi.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "johandwiyanto23klaten@gmail.com",
      href: "mailto:johandwiyanto23klaten@gmail.com",
      color: styles.emailColor
    },
    // {
    //   icon: Phone,
    //   label: "Telepon",
    //   value: "+62 812-3456-7890",
    //   href: "tel:+6281234567890",
    //   color: styles.phoneColor
    // },
    // {
    //   icon: MapPin,
    //   label: "Lokasi",
    //   value: "Yogyakarta, Indonesia",
    //   color: styles.locationColor
    // },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/johandwiyanto",
      href: "https://www.linkedin.com/in/johandwiyanto",
      color: styles.linkedinColor
    },
    {
      icon: Github,
      label: "GitHub",
      value: "/JojooLearn",
      href: "https://github.com/JojooLearn/",
      color: styles.githubColor
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@jojohandwytn_",
      href: "https://instagram.com/jojohandwytn_",
      color: styles.instagramColor
    }
  ];

  return (
    <section id="contact" className={styles.contactSection}>
      <StarBackground />
      <StarBackground />
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div>
        <div className={styles.glowCircle3}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={`text-gradient-animate ${styles.title}`}>
            Contact Me</h2>
          <p className={styles.sectionSubtitle}>
            Let's collaborate! Please contact me to discuss projects or opportunities for cooperation.
          </p>
        </div>

        <div className={styles.contactContent}>
          {/* Contact Form */}
          <div className={styles.formColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <div className={styles.formIcon}>
                  <Send size={24} />
                </div>
                <h3 className={styles.formTitle}>Send Message</h3>
                <p className={styles.formDescription}>
                  Fill out the form below and I will reply as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
                {/* Security Token (Hidden) */}
                <input type="hidden" name="security_token" value={securityToken} />

                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={cn(styles.formInput, errors.name && styles.inputError)}
                    placeholder="Enter your full name"
                    maxLength="50"
                    pattern="[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF]+"
                  />
                  {errors.name && (
                    <div className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={cn(styles.formInput, errors.email && styles.inputError)}
                    placeholder="email@example.com"
                    maxLength="100"
                  />
                  {errors.email && (
                    <div className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Your message *
                    <span className={styles.charCount}>
                      {formData.message.length}/1000
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    rows={5}
                    className={cn(styles.formTextarea, errors.message && styles.inputError)}
                    placeholder="Write your detailed message here..."
                    maxLength="1000"
                  />
                  {errors.message && (
                    <div className={styles.errorMessage}>
                      <AlertCircle size={14} />
                      {errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  className={cn(
                    styles.submitButton, 
                    isSubmitting && styles.loading,
                    (Object.keys(errors).length > 0) && styles.buttonDisabled
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Secure Messages
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <div className={styles.infoIcon}>
                  <MapPin size={24} />
                </div>
                <h3 className={styles.infoTitle}>Contact Information</h3>
                <p className={styles.infoDescription}>
                  Please feel free to contact me through various platforms.
                </p>
              </div>

              <div className={styles.contactList}>
                {contactInfo.map((contact, index) => (
                  <div key={index} className={styles.contactItem}>
                    <div className={cn(styles.contactIcon, contact.color)}>
                      <contact.icon size={18} />
                    </div>
                    <div className={styles.contactDetails}>
                      <span className={styles.contactLabel}>{contact.label}</span>
                      {contact.href ? (
                        <a 
                          href={contact.href} 
                          target={contact.href.startsWith('http') ? "_blank" : undefined}
                          rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                          className={styles.contactValue}
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <span className={styles.contactValue}>{contact.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <div className={styles.quickActions}>
                <a 
                  href="mailto:johandwiyanto23klaten@gmail.com" 
                  className={styles.quickButton}
                >
                  <Mail size={16} />
                  Direct Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={cn(styles.toast, toastType === 'success' ? styles.success : styles.error)}>
          <div className={styles.toastContent}>
            <div className={styles.toastIcon}>
              {toastType === 'success' ? '✓' : '⚠'}
            </div>
            <div className={styles.toastMessage}>
              <span className={styles.toastTitle}>
                {toastType === 'success' ? 'Berhasil!' : 'Peringatan Keamanan'}
              </span>
              <p>{toastMessage}</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className={styles.toastClose}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;