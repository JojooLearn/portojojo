import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowLeft, Calendar, Code2, Palette, Smartphone, Users, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import styles from './ProjectDetail.module.css';
import StarBackground from "../StarBackground";

const ProjectDetail = () => {
  const { slug } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `http://portojohanieh.my.id/Portojohaniieh/api_controller/projects/${slug}`;

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProject(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [slug, apiUrl]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'uiux': return <Palette size={20} />;
      case 'website': return <Code2 size={20} />;
      case 'mobile': return <Smartphone size={20} />;
      default: return <Code2 size={20} />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'uiux': return styles.uiuxCategory;
      case 'website': return styles.websiteCategory;
      case 'mobile': return styles.mobileCategory;
      default: return styles.defaultCategory;
    }
  };

  const getReadingTime = (content) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) return (
    <section className={styles.projectDetail}>
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Memuat detail proyek...</p>
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section className={styles.projectDetail}>
      <div className={styles.container}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3 className={styles.errorTitle}>Error Memuat Proyek</h3>
          <p className={styles.errorText}>{error}</p>
          <Link to="/projects" className={styles.backButton}>
            <ArrowLeft size={16} />
            Kembali ke Proyek
          </Link>
        </div>
      </div>
    </section>
  );

  if (!project) return (
    <section className={styles.projectDetail}>
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📄</div>
          <h3 className={styles.emptyTitle}>Proyek tidak ditemukan</h3>
          <p className={styles.emptyText}>Proyek yang Anda cari tidak ditemukan atau mungkin telah dihapus.</p>
          <Link to="/projects" className={styles.backButton}>
            <ArrowLeft size={16} />
            Kembali ke Daftar Proyek
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <section className={styles.projectDetail}>
      <StarBackground />
      <StarBackground />
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div>
      </div>

      <div className={styles.container}>
        {/* Back Button */}
        <div className={styles.backNavigation}>
          <Link to="/projects" className={styles.backLink}>
            <ArrowLeft size={20} />
            <span>Kembali ke Semua Proyek</span>
          </Link>
        </div>

        {/* Project Header */}
        <article className={styles.projectArticle}>
          {/* Category Badge */}
          <div className={styles.categorySection}>
            <span className={cn(styles.categoryBadge, getCategoryColor(project.category))}>
              <span className={styles.categoryIcon}>
                {getCategoryIcon(project.category)}
              </span>
              {project.category.toUpperCase()}
            </span>
          </div>

          {/* Project Title */}
          <h2 className={`text-gradient-animate ${styles.title}`}>
            {project.title}
          </h2>

          {/* Project Meta */}
          <div className={styles.projectMeta}>
            <div className={styles.metaItem}>
              <Calendar size={18} className={styles.metaIcon} />
              <span>{formatDate(project.created_at)}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={18} className={styles.metaIcon} />
              <span>{getReadingTime(project.content)}</span>
            </div>
            {project.team_size && (
              <div className={styles.metaItem}>
                <Users size={18} className={styles.metaIcon} />
                <span>{project.team_size} Team Members</span>
              </div>
            )}
          </div>

          {/* Short Description */}
          {project.short_desc && (
            <p className={styles.projectExcerpt}>
              {project.short_desc}
            </p>
          )}

          {/* Cover Image */}
          {project.cover_image && (
            <div className={styles.coverImageContainer}>
              <img 
                src={`http://portojohanieh.my.id/Portojohaniieh/${project.cover_image}`} 
                alt={project.title}
                className={styles.coverImage}
              />
              <div className={styles.imageOverlay}></div>
            </div>
          )}

          {/* Action Buttons */}
          {(project.link_demo || project.repo_link) && (
            <div className={styles.actionButtons}>
              {project.link_demo && (
                <a 
                  href={project.link_demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.demoButton}
                >
                  <ExternalLink size={18} />
                  Lihat Live Demo
                </a>
              )}
              {project.repo_link && (
                <a 
                  href={project.repo_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.githubButton}
                >
                  <Github size={18} />
                  Source Code
                </a>
              )}
            </div>
          )}

          {/* Project Content */}
          <div className={styles.projectContent}>
            {project.content ? (
              <div 
                className={styles.contentHTML}
                dangerouslySetInnerHTML={{ __html: project.content }} 
              />
            ) : (
              <div className={styles.noContent}>
                <p>Detail proyek sedang dalam proses penulisan...</p>
              </div>
            )}
          </div>

          {/* Technology Stack */}
          {project.technologies && (
            <div className={styles.techStack}>
              <h3 className={styles.techTitle}>Teknologi yang Digunakan</h3>
              <div className={styles.techTags}>
                {project.technologies.split(',').map((tech, index) => (
                  <span key={index} className={styles.techTag}>
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Gallery */}
          {project.images && project.images.length > 0 && (
            <div className={styles.projectGallery}>
              <h3 className={styles.galleryTitle}>Galeri Proyek</h3>
              <div className={styles.galleryGrid}>
                {project.images.map((image, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <img 
                      src={`http://portojohanieh.my.id/Portojohaniieh/${image.file_path}`} 
                      alt={image.caption || `Gambar ${index + 1} - ${project.title}`}
                      className={styles.galleryImage}
                    />
                    {image.caption && (
                      <p className={styles.galleryCaption}>{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Footer */}
          <div className={styles.projectFooter}>
            <div className={styles.footerActions}>
              <Link to="/projects" className={styles.backToProjects}>
                <ArrowLeft size={16} />
                Lihat Proyek Lainnya
              </Link>
              
              {(project.link_demo || project.repo_link) && (
                <div className={styles.externalLinks}>
                  {project.link_demo && (
                    <a 
                      href={project.link_demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.externalLink}
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                  {project.repo_link && (
                    <a 
                      href={project.repo_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.externalLink}
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProjectDetail;