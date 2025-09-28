import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen, Tag, Eye, User, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import styles from './ArticlesSection.module.css';
import StarBackground from "../StarBackground";

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const apiUrl = "https://portojohanieh.my.id/Portojohaniieh/api_controller/articles";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
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
    return `${minutes} min baca`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategories = () => {
    const categories = [
      ...new Set(articles.map((article) => article.category)),
    ];
    return ["all", ...categories.filter(Boolean)];
  };

  const getFilteredArticles = () => {
    let filtered = articles;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((article) => article.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "tutorial":
        return styles.tutorialCategory;
      case "tips":
        return styles.tipsCategory;
      case "teknologi":
        return styles.techCategory;
      case "design":
        return styles.designCategory;
      case "uiux":
        return styles.uiuxCategory;
      default:
        return styles.defaultCategory;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "tutorial": return <BookOpen size={16} />;
      case "tips": return <Tag size={16} />;
      case "teknologi": return <Code2 size={16} />;
      case "design": return <Palette size={16} />;
      case "uiux": return <Palette size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  if (loading)
    return (
      <section className={styles.articlesSection}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Memuat artikel...</p>
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className={styles.articlesSection}>
        <div className={styles.container}>
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>📝</div>
            <h3 className={styles.errorTitle}>Error Memuat Artikel</h3>
            <p className={styles.errorText}>{error}</p>
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

  const filteredArticles = getFilteredArticles();

  return (
    <section id="articles" className={styles.articlesSection}>
      <StarBackground />
      <StarBackground />
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={`text-gradient-animate ${styles.title}`}>
            Blog & Articles</h2>
          <p className={styles.sectionSubtitle}>
            Discover articles, thoughts, and insights on technology, design, and development.
          </p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className={styles.clearSearch}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        {getCategories().length > 1 && (
          <div className={styles.filterSection}>
            <div className={styles.filterTabs}>
              {getCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    styles.filterTab,
                    activeCategory === category && styles.activeTab
                  )}
                >
                  <span className={styles.tabIcon}>
                    {getCategoryIcon(category)}
                  </span>
                  {category === "all" ? "Semua" : category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles Count */}
        <div className={styles.articlesInfo}>
          <p>
            Displaying <strong>{filteredArticles.length}</strong> Articles
            {activeCategory !== "all" && ` dalam kategori ${activeCategory}`}
            {searchQuery && ` untuk pencarian "${searchQuery}"`}
          </p>
        </div>

        {/* Articles Grid */}
        <div className={styles.articlesGrid}>
          {filteredArticles.map((article) => (
            <article key={article.id} className={styles.articleCard}>
              {/* Article Image */}
              {article.cover_image && (
                <div className={styles.articleImageContainer}>
                  <img
                    src={`https://portojohanieh.my.id/Portojohaniieh/${article.cover_image}`}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                  <div className={styles.imageOverlay}>
                    <div className={styles.articleActions}>
                      <Link
                        to={`/articles/${article.slug}`}
                        className={styles.readButton}
                      >
                        <Eye size={20} />
                        Read Article
                      </Link>
                    </div>
                  </div>
                  
                  {/* Category Badge on Image */}
                  {article.category && (
                    <div className={styles.imageCategoryBadge}>
                      <span className={cn(styles.categoryBadge, getCategoryColor(article.category))}>
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Article Content */}
              <div className={styles.articleContent}>
                {/* Meta Information */}
                <div className={styles.articleMeta}>
                  <div className={styles.metaLeft}>
                    <div className={styles.metaItem}>
                      <Calendar size={14} className={styles.metaIcon} />
                      <span>{formatDate(article.created_at)}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Clock size={14} className={styles.metaIcon} />
                      <span>{getReadingTime(article.content)}</span>
                    </div>
                  </div>
                  {article.author && (
                    <div className={styles.metaItem}>
                      <User size={14} className={styles.metaIcon} />
                      <span>{article.author}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className={styles.articleTitle}>
                  <Link to={`/articles/${article.slug}`} className={styles.titleLink}>
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className={styles.articleExcerpt}>
                  {article.excerpt || article.content.substring(0, 120) + "..."}
                </p>

                {/* Read More Button */}
                <div className={styles.articleFooter}>
                  <Link
                    to={`/articles/${article.slug}`}
                    className={styles.readMoreButton}
                  >
                    Read More
                    <ArrowRight size={16} className={styles.arrowIcon} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h3 className={styles.emptyTitle}>
              {searchQuery 
                ? `Tidak ada artikel ditemukan untuk "${searchQuery}"`
                : activeCategory === "all" 
                  ? "Belum ada artikel yang diterbitkan"
                  : `Tidak ada artikel dalam kategori "${activeCategory}"`
              }
            </h3>
            <p className={styles.emptyText}>
              {searchQuery 
                ? "Coba gunakan kata kunci lain atau hapus pencarian"
                : "Silakan kembali lagi nanti untuk membaca artikel terbaru"
              }
            </p>
            {(searchQuery || activeCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className={styles.resetFiltersButton}
              >
                Show All Articles
              </button>
            )}
          </div>
        )}

        {/* View All Button */}
        {articles.length > 8 && filteredArticles.length > 0 && (
          <div className={styles.viewAllSection}>
            <Link to="/articles" className={styles.viewAllButton}>
              Show All Articles
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;