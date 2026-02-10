"use client";
import { useAuth } from "@/context/AuthContext";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsBar from "@/components/landing/BenefitsBar";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import TraditionSection from "@/components/landing/TraditionSection";
import CraftsmanshipSection from "@/components/landing/CraftsmanshipSection";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";

function HomePage() {
  const { setModalOpen, setShowRegisterForm } = useAuth();

  const handleRegisterClick = () => {
    setModalOpen(true);
    setShowRegisterForm(true);
  };

  return (
    <>
      <HeroSection onRegisterClick={handleRegisterClick} />
      <BenefitsBar />
      <FeaturedProducts />
      <TraditionSection />
      <CraftsmanshipSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection onRegisterClick={handleRegisterClick} />
    </>
  );
}

export default HomePage;
