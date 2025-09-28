import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import StarBackground from "../components/StarBackground";
import SkillsSection from "../components/HeroSection/SkillsSection";
import HighlightProjects from "../components/HeroSection/HighlightProjects";
import SisipanSection from "../components/HeroSection/SisipanSection";
import HighlightBlog  from "../components/HeroSection/HighlightBlog";

const HomePage = () => {
  return (
    <>
      <StarBackground />
      <HeroSection />
      <SkillsSection />
      <HighlightProjects />
      <SisipanSection />
      <HighlightBlog />

    </>
  );
};

export default HomePage;
