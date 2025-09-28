import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Eye, Code2, Palette, Smartphone, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import StarBackground from "../StarBackground";
import styles from './ProjectsSection.module.css';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);

  const apiUrl = 'http://portojohanieh.my.id/Portojohaniieh/api_controller/projects';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'uiux': return <Palette size={18} />;
      case 'website': return <Code2 size={18} />;
      case 'mobile': return <Smartphone size={18} />;
      default: return <FolderOpen size={18} />;
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading) return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Memuat proyek...</p>
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <p className={styles.errorText}>Error: Gagal memuat data proyek.</p>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <section id="projects" className={styles.projectsSection}>
      <StarBackground />
      <StarBackground />
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={`text-gradient-animate ${styles.title}`}>
            My Projects</h2>
          <p className={styles.sectionSubtitle}>
            A collection of my best work that showcases my skills and passion in development and design.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          {[
            { id: 'all', label: 'Semua', icon: <FolderOpen size={18} /> },
            { id: 'uiux', label: 'UI/UX', icon: <Palette size={18} /> },
            { id: 'website', label: 'Website', icon: <Code2 size={18} /> },
            { id: 'mobile', label: 'Mobile', icon: <Smartphone size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleFilter(tab.id)}
              className={cn(
                styles.filterTab,
                activeCategory === tab.id && styles.activeTab
              )}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects List Horizontal */}
        <div className={styles.projectsList}>
          {currentProjects.map(project => (
            <div key={project.id} className={styles.projectCardHorizontal}>
              {/* Project Image */}
              <div className={styles.imageContainerHorizontal}>
                <img 
                  src={`http://portojohanieh.my.id/Portojohaniieh/${project.cover_image}`} 
                  alt={project.title}
                  className={styles.projectImageHorizontal}
                />
                <div className={styles.imageOverlayHorizontal}>
                  <div className={styles.projectActionsHorizontal}>
                    {/* Demo Link */}
                    {project.link_demo && (
                      <a
                        href={project.link_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionButtonHorizontal}
                        title="Lihat Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {/* GitHub Link */}
                    {project.repo_link && (
                      <a
                        href={project.repo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionButtonHorizontal}
                        title="Source Code"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {/* Detail Page Link */}
                    <Link
                      to={`/projects/${project.slug}`}
                      className={styles.actionButtonHorizontal}
                      title="Lihat Detail"
                    >
                      <Eye size={20} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className={styles.projectContentHorizontal}>
                {/* Category and Date */}
                <div className={styles.projectMetaHorizontal}>
                  <span className={cn(styles.categoryBadgeHorizontal, getCategoryColor(project.category))}>
                    <span className={styles.categoryIconHorizontal}>
                      {getCategoryIcon(project.category)}
                    </span>
                    {project.category.toUpperCase()}
                  </span>
                  <span className={styles.projectDateHorizontal}>
                    {formatDate(project.created_at)}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className={styles.projectTitleHorizontal}>
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className={styles.projectDescriptionHorizontal}>
                  {project.short_desc}
                </p>

                {/* Links Section */}
                <div className={styles.projectLinksHorizontal}>
                  {project.link_demo && (
                    <a
                      href={project.link_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.demoLinkHorizontal}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {project.repo_link && (
                    <a
                      href={project.repo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubLinkHorizontal}
                    >
                      <Github size={16} />
                      Source Code 
                    </a>
                  )}
                </div>

                {/* Detail Button */}
                <div className={styles.detailButtonContainerHorizontal}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className={styles.detailButtonHorizontal}
                  >
                    Lihat Detail Proyek
                    <Eye size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={cn(styles.paginationButton, styles.prevButton)}
            >
              <ChevronLeft size={18} />
              Prev
            </button>

            <div className={styles.pageNumbers}>
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={cn(
                    styles.pageNumber,
                    currentPage === number && styles.activePage
                  )}
                >
                  {number}
                </button>
              ))}
            </div>

            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={cn(styles.paginationButton, styles.nextButton)}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📁</div>
            <h3 className={styles.emptyTitle}>Tidak ada proyek</h3>
            <p className={styles.emptyText}>
              {activeCategory === 'all' 
                ? 'Belum ada proyek yang diterbitkan.' 
                : `Tidak ada proyek dalam kategori ${activeCategory}.`
              }
            </p>
          </div>
        )}

        {/* Projects Count Info */}
        <div className={styles.projectsInfo}>
          <p>
            Displaying {indexOfFirstProject + 1}-{Math.min(indexOfLastProject, filteredProjects.length)} from a total of {filteredProjects.length} project
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;