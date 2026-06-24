import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Carousel from "../components/Carousel";
import { ScrollProgress } from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import Preloader from "@/components/Preloader";
import { useEffect, useState } from "react";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="min-h-screen">
          <ScrollProgress />
          <FloatingCTA />
          <Navigation />
          <main>
            <Hero />
            <Features />
            <Carousel />
            <Services />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
