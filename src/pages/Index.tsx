import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
// import Portfolio from "@/components/Portfolio";
// import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// import { MarqueeDemo } from "@/components/MarqueeDemo";
// import { GlobeDemo } from "@/components/GlobeDemo";
// import { Globe } from "@/components/magicui/globe";
// import { HeroParallaxDemo } from "@/components/HeroParallaxDemo";
// import { SpotlightNewDemo } from "@/components/SpotlightNewDemo";
// import { TabsDemo } from "@/components/TabsDemo";
import ModalDemo from "@/components/Modal";
// import { Alert, Button } from "flowbite-react";
// import { Variants } from "motion/react";
import Carousel from "../components/Carousel";
// import { BackgroundGradientAnimationDemo } from "../components/BackgroundGradientAnimationDemo";
/* import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/magicui/scroll-based-velocity"; */
// import Bento from "@/components/Bento";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader"; // ✅ Import your preloader

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., fetching data or waiting for assets)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3s

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="min-h-screen">
          <Navigation />
          <main>
            <Hero />
            {/* <Bento /> */}
            <Carousel />
            {/* <BackgroundGradientAnimationDemo /> */}
            {/* <HeroParallaxDemo /> */}
            {/* <MarqueeDemo /> */}
            {/* <TabsDemo /> */}
            <Services />

            {/* <Portfolio /> */}
            {/* <Team /> */}
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
