import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, User, Eye, Share2, Bookmark } from 'lucide-react';
import { cn } from '../../lib/utils';
import styles from './ArticleDetail.module.css';
import StarBackground from "../StarBackground";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const apiUrl = `https://portojohanieh.my.id/Portojohaniieh/api_controller/articles/${slug}`;

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticle(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [slug]);

  const getReadingTime = (content) => {
    if (!content) return '0 min baca';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min baca`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel disalin ke clipboard!');
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality
  };

  if (loading) return (
    <section className={styles.articleDetail}>
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Memuat artikel...</p>
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section className={styles.articleDetail}>
      <div className={styles.container}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3 className={styles.errorTitle}>Error Memuat Artikel</h3>
          <p className={styles.errorText}>{error}</p>
          <Link to="/articles" className={styles.backButton}>
            <ArrowLeft size={16} />
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    </section>
  );

  if (!article) return (
    <section className={styles.articleDetail}>
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📄</div>
          <h3 className={styles.emptyTitle}>Artikel tidak ditemukan</h3>
          <p className={styles.emptyText}>Artikel yang Anda cari mungkin telah dihapus atau dipindahkan.</p>
          <Link to="/articles" className={styles.backButton}>
            <ArrowLeft size={16} />
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <section className={styles.articleDetail}>
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
          <Link to="/articles" className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className={styles.articleHeader}>
          {/* Category Badge */}
          {article.category && (
            <div className={styles.categoryBadgeContainer}>
              <span className={cn(styles.categoryBadge, getCategoryColor(article.category))}>
                <Tag size={14} />
                {article.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h2 className={`text-gradient-animate ${styles.title}`}>
            {article.title}</h2>

          {/* Excerpt */}
          {article.excerpt && (
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
          )}

          {/* Meta Information */}
          <div className={styles.articleMeta}>
            <div className={styles.metaGroup}>
              <div className={styles.metaItem}>
                <User size={16} className={styles.metaIcon} />
                <span>By {article.author || 'Admin'}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={16} className={styles.metaIcon} />
                <span>{formatDate(article.created_at)}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={16} className={styles.metaIcon} />
                <span>{getReadingTime(article.content)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button 
                onClick={toggleBookmark}
                className={cn(styles.actionButton, isBookmarked && styles.bookmarked)}
              >
                <Bookmark size={18} />
                {isBookmarked ? 'Saved' : 'Save'}
              </button>
              <button onClick={handleShare} className={styles.actionButton}>
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {article.cover_image && (
          <div className={styles.coverImageContainer}>
            <img 
              src={`https://portojohanieh.my.id/Portojohaniieh/${article.cover_image}`} 
              alt={article.title}
              className={styles.coverImage}
            />
          </div>
        )}

        {/* Article Content */}
        <article className={styles.articleContent}>
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
        </article>

        {/* Article Footer */}
        <footer className={styles.articleFooter}>
          <div className={styles.footerMeta}>
            <div className={styles.updateInfo}>
              <span>Last updated: {formatDate(article.updated_at || article.created_at)}</span>
            </div>
            
            {/* Tags */}
            {article.tags && (
              <div className={styles.tagsContainer}>
                <span className={styles.tagsLabel}>Tag:</span>
                <div className={styles.tags}>
                  {article.tags.split(',').map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className={styles.navigationButtons}>
            <Link to="/articles" className={styles.primaryButton}>
              <ArrowLeft size={16} />
              Back to All Articles
            </Link>
            {/* <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={styles.secondaryButton}>
              Ke Atas
            </button> */}
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ArticleDetail;