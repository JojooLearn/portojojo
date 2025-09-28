import React, { useState, useEffect } from "react";
import {
  X,
  ZoomIn,
  ExternalLink,
  MapPin, 
  Calendar,
  Filter,
} from "lucide-react";
import { cn } from "../../lib/utils";
import styles from "./GallerySection.module.css";
import StarBackground from "../StarBackground";

const GallerySection = () => {
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const apiUrl = "http://portojohanieh.my.id/Portojohaniieh/api_controller/galleries";

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGalleries(data);
        setFilteredGalleries(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredGalleries(galleries);
    } else {
      const filtered = galleries.filter(
        (gallery) => gallery.category === category
      );
      setFilteredGalleries(filtered);
    }
  };

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredGalleries.length;
    } else {
      newIndex =
        (currentIndex - 1 + filteredGalleries.length) %
        filteredGalleries.length;
    }
    setSelectedImage(filteredGalleries[newIndex]);
    setCurrentIndex(newIndex);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "work":
        return "💼";
      case "organization":
        return "👥";
      case "other":
        return "📸";
      default:
        return "📁";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "work":
        return styles.workCategory;
      case "organization":
        return styles.orgCategory;
      case "other":
        return styles.otherCategory;
      default:
        return styles.defaultCategory;
    }
  };

  // Function untuk menentukan ukuran card secara acak (mosaic layout)
  const getCardSize = (index) => {
    // Pattern untuk kolase yang seimbang
    const patterns = {
      3: ["small", "medium", "large"], // 3 kolom per baris
      4: ["small", "medium", "large", "small"], // 4 kolom per baris
    };

    // Tentukan pola berdasarkan lebar layar
    const getColumnsCount = () => {
      if (typeof window === "undefined") return 3;
      const width = window.innerWidth;
      if (width >= 1200) return 4; // 4 kolom
      if (width >= 768) return 3; // 3 kolom
      return 1; // 1 kolom (mobile)
    };

    const columns = getColumnsCount();
    const pattern = patterns[columns] || ["medium"]; // fallback

    return pattern[index % pattern.length];
  };

  if (loading)
    return (
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading gallery...</p>
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>⚠️</div>
            <h3 className={styles.errorTitle}>Error Memuat Galeri</h3>
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

  return (
    <section id="gallery" className={styles.gallerySection}>
      <StarBackground />
      <StarBackground />
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={`text-gradient-animate ${styles.title}`}>
            Documentation Gallery</h2>
          <p className={styles.sectionSubtitle}>
            A collection of precious moments from work experiences, organizational activities, and other activities
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterSection}>
          <div className={styles.filterTabs}>
            {[
              { id: "all", label: "Semua", icon: "📁" },
              { id: "work", label: "Pengalaman Kerja", icon: "💼" },
              { id: "organization", label: "Organisasi", icon: "👥" },
              { id: "other", label: "Lainnya", icon: "📸" },
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
        </div>

        {/* Gallery Grid - Mosaic Layout */}
        <div className={styles.galleryGrid}>
          {filteredGalleries.map((image, index) => (
            <div
              key={image.id}
              className={cn(styles.galleryItem, styles[getCardSize(index)])}
              onClick={() => openModal(image, index)}
            >
              <div className={styles.galleryCard}>
                {/* Image Container */}
                <div className={styles.imageContainer}>
                  <img
                    src={`http://portojohanieh.my.id/Portojohaniieh/${image.file_path}`}
                    alt={image.title}
                    className={styles.galleryImage}
                  /> 
                  <div className={styles.imageOverlay}>
                    <div className={styles.imageActions}>
                      <div className={styles.viewButton}>
                        <ZoomIn size={20} />
                        <span>Lihat Detail</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className={styles.categoryBadge}>
                    <span
                      className={cn(
                        styles.badge,
                        getCategoryColor(image.category)
                      )}
                    >
                      <span className={styles.badgeIcon}>
                        {getCategoryIcon(image.category)}
                      </span>
                      {image.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{image.title}</h3>
                    {image.year && (
                      <span className={styles.year}>{image.year}</span>
                    )}
                  </div>

                  {image.description && (
                    <p className={styles.cardDescription}>
                      {image.description}
                    </p>
                  )}

                  {/* Additional Info */}
                  {(image.location || image.date) && (
                    <div className={styles.additionalInfo}>
                      <div className={styles.infoItems}>
                        {image.location && (
                          <div className={styles.infoItem}>
                            <MapPin size={12} className={styles.infoIcon} />
                            <span>{image.location}</span>
                          </div>
                        )}
                        {image.date && (
                          <div className={styles.infoItem}>
                            <Calendar size={12} className={styles.infoIcon} />
                            <span>{image.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGalleries.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🖼️</div>
            <h3 className={styles.emptyTitle}>
              {activeCategory === "all"
                ? "Belum ada foto di galeri"
                : `Tidak ada foto dalam kategori ${activeCategory}`}
            </h3>
            <p className={styles.emptyText}>
              {activeCategory === "all"
                ? "Foto akan ditambahkan segera"
                : "Coba pilih kategori lain"}
            </p>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className={styles.resetButton}
              >
                Tampilkan Semua Foto
              </button>
            )}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className={styles.lightbox}>
            <div className={styles.lightboxBackdrop} onClick={closeModal}></div>

            <div className={styles.lightboxContainer}>
              {/* Navigation Arrows */}
              {filteredGalleries.length > 1 && (
                <>
                  <button
                    className={styles.lightboxNavPrev}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("prev");
                    }}
                  >
                    ‹
                  </button>
                  <button
                    className={styles.lightboxNavNext}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage("next");
                    }}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Close Button */}
              <button className={styles.lightboxClose} onClick={closeModal}>
                <X size={24} />
              </button>

              {/* Image */}
              <div className={styles.lightboxImageWrapper}>
                <img
                  src={`http://portojohanieh.my.id/Portojohaniieh/${selectedImage.file_path}`}
                  alt={selectedImage.title}
                  className={styles.lightboxImage}
                />
              </div>

              {/* Image Info */}
              <div className={styles.lightboxInfo}>
                <div className={styles.lightboxHeader}>
                  <h3 className={styles.lightboxTitle}>
                    {selectedImage.title}
                  </h3>
                  <div className={styles.lightboxMeta}>
                    <span
                      className={cn(
                        styles.badge,
                        getCategoryColor(selectedImage.category)
                      )}
                    >
                      {getCategoryIcon(selectedImage.category)}{" "}
                      {selectedImage.category}
                    </span>
                    {selectedImage.year && (
                      <span className={styles.lightboxYear}>
                        {selectedImage.year}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.lightboxDetails}>
                  {(selectedImage.location || selectedImage.date) && (
                    <div className={styles.detailRow}>
                      <div className={styles.detailItems}>
                        {selectedImage.location && (
                          <div className={styles.detailItem}>
                            <MapPin size={14} className={styles.detailIcon} />
                            <span>{selectedImage.location}</span>
                          </div>
                        )}
                        {selectedImage.date && (
                          <div className={styles.detailItem}>
                            <Calendar size={14} className={styles.detailIcon} />
                            <span>{selectedImage.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedImage.description && (
                    <div className={styles.detailRow}>
                      <p className={styles.lightboxDescription}>
                        {selectedImage.description}
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.lightboxFooter}>
                  <span className={styles.imageCounter}>
                    {currentIndex + 1} from  {filteredGalleries.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
