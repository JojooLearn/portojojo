import React from "react";
import {
  Code2,
  Palette,
  Smartphone,
  Globe,
  Award,
  Users,
  BookOpen,
  MapPin,
  Calendar,
  ArrowRight,
  Star,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
import StarBackground from "../StarBackground";
import profileImage from "../../assets/profilabout.png";
import LeadFusion from "../../assets/FusionTechKetua.jpg";
import hmsi from "../../assets/KepegHmsi.jpeg";
import ukm from "../../assets/KepegUKM.jpg";
import publicspeaking from "../../assets/PublicSpeaking.jpg";
import momentukm from "../../assets/momenukm.jpg";
import mengapdi from "../../assets/mengapdi.jpg";

import ngoceh from "../../assets/publicspeking2.jpg";
import waiters from "../../assets/waiters.jpg";
import plakat from "../../assets/penyerahanplaket.jpg";
import belajar from "../../assets/belajar.jpg";

const AboutSection = () => {
  const skills = [
    {
      icon: <Palette size={32} />,
      title: "UI/UX Design",
      description:
        "Mendesain pengalaman pengguna yang intuitif dan antarmuka yang menarik dengan tools Figma",
    },
    {
      icon: <Smartphone size={32} />,
      title: "Mobile Development",
      description:
        "Mengembangkan aplikasi Android menggunakan Java dengan fitur lengkap",
    },
    {
      icon: <Globe size={32} />,
      title: "Web Development",
      description: "Menguasai HTML, CSS, JavaScript dan teknologi web modern",
    },
    // {
    //   icon: <Award size={32} />,
    //   title: "Networking",
    //   description:
    //     "Instalasi dan konfigurasi jaringan komputer dengan sertifikasi BNSP",
    // },
  ];

  // const journey = {
  //   photos: [
  //     {
  //       src: ukm,
  //       size: "large",
  //       caption: "Belajar investasi saham pertama kali dan join komunitas",
  //     },
  //     {
  //       src: mengapdi,
  //       size: "small",
  //       caption: "Mengapdi kepada masyarakat sekitar",
  //     },
  //     {
  //       src: publicspeaking,
  //       size: "medium",
  //       caption: "Belajar  menjadi pemimpin dan public speaking",
  //     },
  //     {
  //       src: momentukm,
  //       size: "small",
  //       caption: "Belajar berorganisasi",
  //     },
  //     // {
  //     //   src: "../../assets/journey-5.jpg",
  //     //   size: "medium",
  //     //   caption: "Presentasi di depan publik"
  //     // }
  //   ],
  //   stories: [
  //     `Perjalanan saya di dunia teknologi dimulai dengan rasa penasaran yang besar terhadap bagaimana aplikasi dan website bekerja. Sebagai anak yang tumbuh di era digital, saya selalu tertarik dengan segala sesuatu yang berhubungan dengan komputer. Dimulai dari belajar otodidak melalui YouTube dan platform online, kemudian memutuskan untuk melanjutkan pendidikan formal di bidang Sistem Informasi untuk memperdalam pengetahuan.`,

  //     `Titik balik terjadi ketika saya mendapatkan kesempatan magang sebagai Teknisi Jaringan di CV Anding Multimedia. Pengalaman ini membuka mata saya tentang kompleksitas infrastktur teknologi dan pentingnya problem-solving skills. Bersamaan dengan itu, saya mulai menjelajahi dunia pemrograman dengan membuat aplikasi desktop sederhana untuk kantin kampus menggunakan Java.`,

  //     `Perjalanan terus berlanjut dengan eksplorasi di berbagai bidang. Saya belajar desain UI/UX melalui bootcamp intensif, mengembangkan aplikasi mobile untuk UMKM, dan aktif dalam organisasi kampus. Setiap project dan pengalaman mengajarkan saya bahwa teknologi bukan hanya tentang kode, tetapi tentang menyelesaikan masalah nyata dan menciptakan dampak positif bagi masyarakat.`,

  //     `Saat ini, saya terus mengasah skills dan mengeksplorasi teknologi terkini seperti cloud computing dan AI. Visi saya adalah menjadi full-stack developer yang dapat menghubungkan kebutuhan bisnis dengan solusi teknologi yang inovatif. Saya percaya bahwa dengan konsistensi dan passion, setiap tantangan dapat diubah menjadi peluang untuk tumbuh dan berkontribusi lebih besar.`,
  //   ],
  // };

  const journey = {
     photos: [
      {
        src: ukm,
        size: "large",
        caption: "Belajar investasi saham pertama kali dan join komunitas",
      },
      {
        src: mengapdi,
        size: "small",
        caption: "Mengapdi kepada masyarakat sekitar",
      },
      {
        src: publicspeaking,
        size: "medium",
        caption: "Belajar  menjadi pemimpin dan public speaking",
      },
      {
        src: momentukm,
        size: "small",
        caption: "Belajar berorganisasi",
      },
      // {
      //   src: "../../assets/journey-5.jpg",
      //   size: "medium",
      //   caption: "Presentasi di depan publik"
      // }
    ],
    photos2: [
      {
        src: belajar,
        size: "small",
        caption: "Mulai mendalami UI/UX Design",
      },
      {
        src: waiters,
        size: "large",
        caption: "Mengembangkan project aplikasi",
      },
      {
        src: plakat,
        size: "medium",
        caption: "Kolaborasi dalam tim",
      },
      {
        src: ngoceh,
        size: "small",
        caption: "Continuous learning",
      },
    ],
    stories: [
      `My journey in technology began during my vocational high school years (SMK), where I was first introduced to the basics of software development. At that time, I wasn’t only curious about how applications and websites worked, but also fascinated by how design and functionality could shape the way people interact with digital products. That curiosity became the spark that pushed me to explore more deeply beyond what was taught in class.`,

      `After graduating, life took me on a different path. I worked as a waiter for a while an experience that taught me discipline, patience, and how to communicate effectively with people from different backgrounds. Even though it wasn’t directly related to technology, that period shaped my mindset about the importance of user experience. Just like customers in a restaurant, users in a digital product also expect clarity, comfort, and satisfaction. Not long after, I decided to pursue a degree in Information Systems to strengthen my foundation in IT. Alongside formal education, I continued to learn independently through online platforms, experimenting with small projects, and sharpening my skills in both design and development. I realized that self-learning combined with academic knowledge gave me a strong advantage to keep growing in this fast-moving industry.`,

      `During college, I became actively involved in student organizations and communities. This was a turning point where I not only improved my technical skills, but also developed soft skills like leadership, teamwork, and project management. Collaborating with peers in various projects taught me that building a product is never a solo journey it’s about synergy, communication, and a shared vision. As time went on, I began to focus my passion on UI/UX design and development. I found excitement in turning ideas into interactive prototypes, designing user flows, and coding interfaces that are both functional and visually engaging. Every project, whether academic, organizational, or personal, became a valuable learning experience that sharpened my ability to connect design thinking with technical execution.`,

      `Today, I continue to expand my knowledge in modern technologies such as mobile development, cloud computing, and design systems — while still holding firmly to my main focus: becoming a UI/UX Designer and Developer who can bridge business needs with innovative digital solutions. I believe technology is not just about code or visuals; it’s about solving real problems, creating meaningful experiences, and making a positive impact on people’s lives. This journey is far from over. For me, every challenge is a chance to grow, and every idea is an opportunity to create. With consistency, passion, and a commitment to continuous learning, I strive to keep moving forward in the ever-evolving world of technology.`,
    ],
  };

  const organizations = [
    { 
      period: "Sep 2024 - Sep 2025",
      title: "Information Systems Student Association (HMSI)",
      position: "Research and Development Division",
      image: hmsi,
      activities: [
        "Coordinated logistics and technical needs during the HMSI UTY Comparative Study, ensuring smooth event execution.",
        "Served as Secretary in the HMSI Open Recruitment, managing administration and documentation to support transparent selection.",
        "Vice Chairman of HMSI Impact Community Service, leading team initiatives to provide sustainable solutions for local communities.",
      ],
    },
    {
      period: "Dec 2024 - Sep 2025",
      title: "Capital Market Study Group",
      position: "Investment Division",
      image: ukm,
      activities: [
        "Conducted in-depth analysis of capital markets and investment opportunities to strengthen members’ financial literacy.",
        "Led case studies on stock investment strategies, focusing on risk management and portfolio optimization.",
        "Engaged in economic discussions to evaluate global and national market trends and their impact on investments.",
      ],
    },
    {
      period: "Nov 2024 - Mar 2025",
      title: "FusionTech Challenge 2025",
      position: "Chief Executive",
      image: LeadFusion,
      activities: [
        "Planned and coordinated the overall event framework, including competition flow, timeline, and stakeholder engagement.",
        "Managed cross-functional teams and budgets to ensure effective collaboration and resource allocation.",
        "Oversaw the execution of the FusionTech competition, delivering a successful and impactful technology event.",
      ],
    },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <StarBackground />
      <StarBackground />
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h2 className={`text-gradient-animate ${styles.title}`}>
            About Me</h2>
          <p className={styles.subtitle}>
            The journey of an Information Systems student who is passionate
            about technology, design, and software development
          </p>
        </div>

        {/* Profile Overview */}
        <div className={styles.profileOverview}>
          <div className={styles.profileContent}>
            <div className={styles.textContent}>
              <h3 className={`text-gradient-animate ${styles.greeting}`}>
                Hello! I'm Johan Dwiyanto.</h3>
              <p className={styles.intro}>
                As an Information Systems student, I have a strong interest in
                combining technical logic with design aesthetics. My practical
                experience in building web and mobile applications and designing
                UI/UX has strengthened my ability to create digital solutions
                that are not only functional, but also intuitive and attractive.
              </p>

              <div className={styles.personalInfo}>
                <div className={styles.infoItem}>
                  <MapPin size={18} className={styles.infoIcon} />
                  <span>Central Java, Indonesia</span>
                </div>
                <div className={styles.infoItem}>
                  <BookOpen size={18} className={styles.infoIcon} />
                  <span>
                    Yogyakarta University of Technology - Diploma III in
                    Information Systems
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <Award size={18} className={styles.infoIcon} />
                  <span>10+ Achievement</span>
                </div>
              </div>

              <p className={styles.mission}>
                I believe that technology should be accessible and beneficial to
                everyone. Through a combination of technical skills and
                creativity, I am committed to creating impactful and
                user-friendly digital solutions.
              </p>
            </div>

            <div className={styles.profileImage}>
              <img
                src={profileImage}
                alt="Portojojo Logo"
                className={styles.image}
              />
              <div className={styles.imageGlow}></div>
            </div>
          </div>
        </div>

        {/* Skills Section
        <div className={styles.skillsSection}>
          <h3 className={styles.sectionTitle}>Interest in Expertise</h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div key={index} className={styles.skillCard}>
                <div className={styles.skillIcon}>{skill.icon}</div>
                <h4 className={styles.skillTitle}>{skill.title}</h4>
                <p className={styles.skillDescription}>{skill.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* My Journey Section */}
        <div className={styles.journeySection}>
          <h3 className={`text-gradient-animate ${styles.sectionTitle}`}>My Journey</h3>

          {/* Integrated Photo Collage and Stories */}
          <div className={styles.journeyStories}>
            {/* Photo Collage pertama di bagian atas */}
            <div className={styles.photoCollage}>
              {journey.photos.map((photo, index) => (
                <div
                  key={index}
                  className={`${styles.photoItem} ${styles[photo.size]}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className={styles.collageImage}
                  />
                  <div className={styles.photoOverlay}>
                    <span className={styles.photoCaption}>{photo.caption}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Storytelling */}
            <div className={styles.storiesContainer}>
              {/* Paragraf 1 */}
              <div className={styles.storyItem}>
                <p className={styles.storyText}>{journey.stories[0]}</p>
                <div className={styles.storyDivider}>
                  <div className={styles.dividerDot}></div>
                  <div className={styles.dividerLine}></div>
                  <div className={styles.dividerDot}></div>
                </div>
              </div>

              {/* Paragraf 2 */}
              <div className={styles.storyItem}>
                <p className={styles.storyText}>{journey.stories[1]}</p>
                <div className={styles.storyDivider}>
                  <div className={styles.dividerDot}></div>
                  <div className={styles.dividerLine}></div>
                  <div className={styles.dividerDot}></div>
                </div>
              </div>

              {/* Paragraf 3 */}
              <div className={styles.storyItem}>
                <p className={styles.storyText}>{journey.stories[2]}</p>

                {/* Photo Collage kedua sebelum paragraf terakhir */}
                <div className={styles.photoCollageSecond}>
                  {journey.photos2.map((photo, index) => (
                    <div
                      key={index}
                      className={`${styles.photoItemSecond} ${
                        styles[photo.size]
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className={styles.collageImageSecond}
                      />
                      <div className={styles.photoOverlaySecond}>
                        <span className={styles.photoCaptionSecond}>
                          {photo.caption}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.storyDivider}>
                  <div className={styles.dividerDot}></div>
                  <div className={styles.dividerLine}></div>
                  <div className={styles.dividerDot}></div>
                </div>
              </div>

              {/* Paragraf 4 */}
              <div className={styles.storyItem}>
                <p className={styles.storyText}>{journey.stories[3]}</p>
              </div>
            </div>

            {/* Journey Highlights */}
            <div className={styles.journeyHighlights}>
              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>🚀</div>
                <h4>Real-Life Experience & Growth</h4>
                <p>
                  Worked as a waiter after graduation, gaining discipline,
                  patience, and communication skills — valuable lessons that
                  shaped the way I understand user experience and customer
                  satisfaction.
                </p>
              </div>
              {/* <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>💼</div>
                <h4>Pengalaman Profesional</h4>
                <p>Magang sebagai teknisi jaringan dan barista</p>
              </div> */}
              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>🎓</div>
                <h4>Academic Pursuit & Community Involvement</h4>
                <p>
                  Continued studies in Information Systems while learning
                  independently online, actively participating in campus
                  organizations to build leadership, teamwork, and project
                  management skills.
                </p>
              </div>
              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}>🌟</div>
                <h4>Focus on UI/UX & Development</h4>
                <p>
                  Developed a strong passion for turning ideas into interactive
                  designs and functional applications, aiming to bridge business
                  needs with innovative, user-centered digital solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization & Leadership */}
        <div className={styles.organizationSection}>
          <h3 className={`text-gradient-animate ${styles.sectionTitle}`}>Organization & Leadership</h3>
          <div className={styles.organizationGrid}>
            {organizations.map((org, index) => (
              <div key={index} className={styles.orgCard}>
                <img
                  src={org.image}
                  alt={org.title}
                  className={styles.orgImage}
                />
                <div className={styles.orgContent}>
                  <h4>{org.title}</h4>
                  <p className={styles.orgPosition}>{org.position}</p>
                  <p className={styles.orgPeriod}>{org.period}</p>
                  <ul className={styles.orgActivities}>
                    {org.activities.map((activity, idx) => (
                      <li key={idx}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>Interested in working together?</h3>
          <p className={styles.ctaDescription}>
            Let's collaborate to create impactful technology solutions!
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/projects" className={styles.primaryButton}>
              View Full Portfolio
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className={styles.secondaryButton}>
              Contact Me
            </Link> 
          </div>
        </div>
      </div>
      <StarBackground />
      <StarBackground />
    </section>
  );
};

export default AboutSection;
