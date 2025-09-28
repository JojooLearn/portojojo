import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, User, Clock, FolderOpen } from 'lucide-react';
import styles from './HighlightBlog.module.css';
import StarBackground from '../StarBackground';

const HighlightBlog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'https://portojohanieh.my.id/Portojohaniieh/api_controller/articles';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ambil 3 artikel terbaru untuk highlight
        const highlightedArticles = data.slice(0, 3);
        setArticles(highlightedArticles);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'tutorial': return styles.tutorialCategory;
      case 'tips': return styles.tipsCategory;
      case 'teknologi': return styles.techCategory;
      case 'design': return styles.designCategory;
      case 'uiux': return styles.uiuxCategory;
      default: return styles.defaultCategory;
    }
  };

  if (loading) return (
    <section className={styles.highlightBlog}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Highlight Blog</h2>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Memuat artikel...</p>
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section className={styles.highlightBlog}>
      <div className={styles.container}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>📝</div>
          <p className={styles.errorText}>Error: Gagal memuat data blog.</p>
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
    <section id="highlight-blog" className={styles.highlightBlog}>
      <StarBackground />
      <StarBackground />
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={`text-gradient-animate ${styles.title}`}>
            Highlight Blog</h2>
          <p className={styles.sectionSubtitle}>
            The latest articles on technology, design, and development
          </p>
          <Link to="/articles" className={styles.seeAllButton}>
            See All <ExternalLink size={16} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className={styles.blogGrid}>
          {articles.map(article => (
            <div key={article.id} className={styles.folderCard}>
              {/* Folder Tab */}
              <div className={styles.folderTab}>
                <FolderOpen size={16} className={styles.folderIcon} />
                <span className={`${styles.categoryLabel} ${getCategoryColor(article.category)}`}>
                  {article.category ? article.category.toUpperCase() : 'BLOG'}
                </span>
              </div>

              {/* Blog Content */}
              <div className={styles.blogContent}>
                {/* Article Image */}
                {article.cover_image && (
                  <div className={styles.imageContainer}>
                    <img 
                      src={`https://portojohanieh.my.id/Portojohaniieh/${article.cover_image}`} 
                      alt={article.title}
                      className={styles.blogImage}
                    />
                    <div className={styles.imageOverlay}>
                      <div className={styles.blogActions}>
                        <Link
                          to={`/articles/${article.slug}`}
                          className={styles.readButton}
                        >
                          Baca Artikel
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Article Info */}
                <div className={styles.articleInfo}>
                  {/* Meta Information */}
                  <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                      <User size={14} className={styles.metaIcon} />
                      <span>{article.author || 'Johan Dwiyanto'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Calendar size={14} className={styles.metaIcon} />
                      <span>{formatDate(article.created_at)}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Clock size={14} className={styles.metaIcon} />
                      <span>{getReadingTime(article.content)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={styles.articleTitle}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={styles.articleExcerpt}>
                    {article.excerpt || article.content.substring(0, 120) + '...'}
                  </p>

                  {/* Read More Button */}
                  <Link
                    to={`/articles/${article.slug}`}
                    className={styles.readMoreButton}
                  >
                    Baca Selengkapnya
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h3 className={styles.emptyTitle}>Tidak ada artikel</h3>
            <p className={styles.emptyText}>
              Belum ada artikel yang diterbitkan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HighlightBlog;