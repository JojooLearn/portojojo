import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Calendar, FolderOpen } from 'lucide-react';
import { cn } from '../../lib/utils';
import StarBackground from '../StarBackground';
import styles from './HighlightProjects.module.css';

const HighlightProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'http://portojohanieh.my.id/Portojohaniieh/api_controller/projects';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProjects(data.slice(0, 3)); // hanya 3 project terbaru
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'uiux': return styles.uiuxCategory;
      case 'website': return styles.websiteCategory;
      case 'mobile': return styles.mobileCategory;
      default: return styles.defaultCategory;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (loading) return (
    <section className={styles.highlightSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Highlight Projects</h2>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Loading project...</p>
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section className={styles.highlightSection}>
      <div className={styles.container}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <p className={styles.errorText}>Error: Gagal memuat data.</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Coba Lagi
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <section id="highlight-projects" className={styles.highlightSection}>
      <StarBackground />
      <StarBackground />
      <div className={styles.container}> 
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={`text-gradient-animate ${styles.title}`}>
            Highlight Projects</h2>
          <p className={styles.sectionSubtitle}>
            A collection of selected works that showcase my skills and passion in development and design.
          </p>
          <Link to="/projects" className={`${styles.seeAllButton} btn btn-gradient`}>
            See All <ExternalLink size={16} />
          </Link>
        </div>

        {/* Projects Row */}
        <div className={styles.projectsList}>
          {projects.map(project => (
            <div key={project.id} className={styles.projectRow}>
              {/* Folder Tab */} 
              <div className={styles.folderTab}>
                <FolderOpen size={16} className={styles.folderIcon} />
                <span className={cn(styles.categoryLabel, getCategoryColor(project.category))}>
                  {project.category.toUpperCase()}
                </span>
              </div>

              {/* Body */}
              <div className={styles.projectBody}> 
                {/* Image */}
                <div className={styles.imageWrapper}>
                  <img 
                    src={`http://portojohanieh.my.id/Portojohaniieh/${project.cover_image}`} 
                    alt={project.title}
                    className={styles.projectImage}
                  />
                </div>

                {/* Info */}
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.short_desc}</p>

                  <div className={styles.projectMeta}>
                    <div className={styles.dateInfo}>
                      <Calendar size={14} className={styles.calendarIcon} />
                      <span>{formatDate(project.created_at)}</span>
                    </div>
                  </div>

                  <Link to={`/projects/${project.slug}`} className={`${styles.detailButton} btn btn-gradient`}>
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📁</div>
            <h3 className={styles.emptyTitle}>Tidak ada proyek</h3>
            <p className={styles.emptyText}>Tidak ada proyek yang ditemukan.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HighlightProjects;
