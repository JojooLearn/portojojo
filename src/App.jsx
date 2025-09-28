import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import komponen Navbar
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ToastProvider from './components/ToastProvider';

// Import halaman-halaman
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import CertificatesPage from "./pages/CertificatesPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetail from './pages/ArticleDetail'; // Tambahkan ini
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage"; // Tambahkan ini
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <ToastProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/gallery" element={<GalleryPage />} />{" "}
        {/* Tambahkan ini */}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
    </ToastProvider>
  );
}

export default App;
