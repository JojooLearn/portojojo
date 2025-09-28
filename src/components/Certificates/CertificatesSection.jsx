import React, { useState, useEffect } from "react";
import { FileText, ExternalLink, Calendar, Award, X, Eye, Download } from "lucide-react";
import { cn } from "../../lib/utils";
import styles from './CertificatesSection.module.css';
import StarBackground from "../StarBackground";

const CertificatesSection = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const apiUrl = "http://portojohanieh.my.id/Portojohaniieh/api_controller/certificates";

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCertificates(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const openModal = (certificate) => {
    setSelectedCert(certificate);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  };

  const getFilteredCertificates = () => {
    if (activeFilter === "all") return certificates;
    return certificates.filter(cert => cert.issuer?.toLowerCase().includes(activeFilter.toLowerCase()));
  };

  const getIssuers = () => {
    const issuers = [...new Set(certificates.map(cert => cert.issuer).filter(Boolean))];
    return ["all", ...issuers];
  };

  const getIssuerColor = (issuer) => {
    // Berikan warna berbeda berdasarkan issuer
    const colors = [
      styles.issuer1, styles.issuer2, styles.issuer3, 
      styles.issuer4, styles.issuer5, styles.issuer6
    ];
    const issuers = getIssuers().filter(iss => iss !== 'all');
    const index = issuers.indexOf(issuer);
    return colors[index % colors.length] || styles.defaultIssuer;
  };

  if (loading)
    return (
      <section className={styles.certificatesSection}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Memuat sertifikat...</p>
          </div>
        </div>
      </section>
    );

  if (error)
    return (
      <section className={styles.certificatesSection}>
        <div className={styles.container}>
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>⚠️</div>
            <h3 className={styles.errorTitle}>Error Memuat Sertifikat</h3>
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

  const filteredCertificates = getFilteredCertificates();

  return (
    <section id="certificates" className={styles.certificatesSection}>
      <StarBackground />
      <StarBackground />
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div> 
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={`text-gradient-animate ${styles.title}`}>
            Certificates & Achievements</h2>
          <p className={styles.sectionSubtitle}>
            A collection of certificates and achievements that demonstrate my dedication to learning and development
          </p>
        </div>

        {/* Filter Tabs */}
        {getIssuers().length > 1 && (
          <div className={styles.filterSection}>
            <div className={styles.filterTabs}>
              {getIssuers().map((issuer) => (
                <button
                  key={issuer}
                  onClick={() => setActiveFilter(issuer)}
                  className={cn(
                    styles.filterTab,
                    activeFilter === issuer && styles.activeTab
                  )}
                >
                  {issuer === "all" ? "Semua" : issuer}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Count */}
        <div className={styles.certificatesInfo}>
          <p>
            Displaying <strong>{filteredCertificates.length}</strong> certificates
            {activeFilter !== "all" && ` dari ${activeFilter}`}
          </p>
        </div>

        {/* Certificates Grid */}
        <div className={styles.certificatesGrid}>
          {filteredCertificates.map((cert) => (
            <div key={cert.id} className={styles.certificateCard}>
              {/* Certificate Preview */}
              <div 
                className={styles.certificatePreview}
                onClick={() => openModal(cert)}
              >
                {cert.file_path && cert.file_path.toLowerCase().endsWith(".pdf") ? (
                  <div className={styles.pdfPreview}>
                    <FileText size={48} className={styles.pdfIcon} />
                    <span className={styles.pdfBadge}>PDF</span>
                    <div className={styles.previewOverlay}>
                      <div className={styles.viewButton}>
                        <Eye size={20} />
                        <span>View Certificate</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.imagePreview}>
                    <img
                      src={`http://portojohanieh.my.id/Portojohaniieh/${cert.file_path}`}
                      alt={cert.title}
                      className={styles.certificateImage}
                    />
                    <div className={styles.previewOverlay}>
                      <div className={styles.viewButton}>
                        <Eye size={20} />
                        <span>See Details</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Issuer Badge */}
                {cert.issuer && (
                  <div className={styles.issuerBadge}>
                    <span className={cn(styles.badge, getIssuerColor(cert.issuer))}>
                      {cert.issuer}
                    </span>
                  </div>
                )}
              </div>

              {/* Certificate Content */}
              <div className={styles.certificateContent}>
                <div className={styles.certificateMeta}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} className={styles.metaIcon} />
                    <span>{cert.year}</span>
                  </div>
                </div>

                <h3 className={styles.certificateTitle}>
                  {cert.title}
                </h3>

                {cert.description && (
                  <p className={styles.certificateDescription}>
                    {cert.description}
                  </p>
                )}

                <div className={styles.certificateActions}>
                  <button 
                    onClick={() => openModal(cert)}
                    className={styles.detailButton}
                  >
                    <Eye size={16} />
                    Detail
                  </button>
                  {cert.file_path && (
                    <a
                      href={`http://portojohanieh.my.id/Portojohaniieh/${cert.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadButton}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏆</div>
            <h3 className={styles.emptyTitle}>
              {activeFilter === "all" 
                ? "Belum ada sertifikat" 
                : `Tidak ada sertifikat dari ${activeFilter}`
              }
            </h3>
            <p className={styles.emptyText}>
              {activeFilter === "all" 
                ? "Sertifikat akan ditambahkan segera" 
                : "Coba pilih filter lain"
              }
            </p>
            {activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className={styles.resetButton}
              >
                Show All Certificates
              </button>
            )}
          </div>
        )}

        {/* Certificate Modal */}
        {selectedCert && (
          <div className={styles.modal}>
            <div className={styles.modalBackdrop} onClick={closeModal}></div>
            
            <div className={styles.modalContent}>
              {/* Close Button */}
              <button 
                className={styles.modalClose}
                onClick={closeModal}
              >
                <X size={24} />
              </button>

              {/* Modal Header */}
              <div className={styles.modalHeader}>
                <div className={styles.modalIcon}>
                  <Award size={32} className={styles.awardIcon} />
                </div>
                <div className={styles.modalTitleSection}>
                  <h3 className={styles.modalTitle}>{selectedCert.title}</h3>
                  <div className={styles.modalMeta}>
                    <span className={cn(styles.badge, getIssuerColor(selectedCert.issuer))}>
                      {selectedCert.issuer}
                    </span>
                    <span className={styles.modalYear}>
                      <Calendar size={14} className={styles.metaIcon} />
                      {selectedCert.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className={styles.modalBody}>
                {/* Certificate Image/PDF Preview */}
                <div className={styles.modalPreview}>
                  {selectedCert.file_path && selectedCert.file_path.toLowerCase().endsWith(".pdf") ? (
                    <div className={styles.modalPdfPreview}>
                      <FileText size={64} className={styles.pdfIcon} />
                      <span className={styles.pdfBadge}>PDF Document</span>
                      <p className={styles.pdfText}>Click the button below to view the PDF file.</p>
                    </div>
                  ) : (
                    <img
                      src={`http://portojohanieh.my.id/Portojohaniieh/${selectedCert.file_path}`}
                      alt={selectedCert.title}
                      className={styles.modalImage}
                    />
                  )}
                </div>

                {/* Certificate Details */}
                <div className={styles.modalDetails}>
                  {selectedCert.description && (
                    <div className={styles.detailSection}>
                      <h4 className={styles.detailTitle}>Description</h4>
                      <p className={styles.detailText}>{selectedCert.description}</p>
                    </div>
                  )}

                  <div className={styles.detailSection}>
                    <h4 className={styles.detailTitle}>Information</h4>
                    <div className={styles.detailGrid}>
                      <div className={styles.detailItem}>
                        <Award size={16} className={styles.detailIcon} />
                        <span className={styles.detailLabel}>Organizer:</span>
                        <span className={styles.detailValue}>{selectedCert.issuer}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <Calendar size={16} className={styles.detailIcon} />
                        <span className={styles.detailLabel}>Year:</span>
                        <span className={styles.detailValue}>{selectedCert.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className={styles.modalFooter}>
                {selectedCert.file_path && (
                  <a
                    href={`http://portojohanieh.my.id/Portojohaniieh/${selectedCert.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadLink}
                  >
                    <ExternalLink size={18} />
                    {selectedCert.file_path.toLowerCase().endsWith(".pdf") 
                      ? "Buka File PDF" 
                      : "Lihat File Sertifikat"
                    }
                  </a>
                )}
                <button
                  onClick={closeModal}
                  className={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;