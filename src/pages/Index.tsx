import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import { GlobeDemo } from "@/components/GlobeDemo";
import { Globe } from "@/components/magicui/globe";
import { HeroParallaxDemo } from "@/components/HeroParallaxDemo";
import { SpotlightNewDemo } from "@/components/SpotlightNewDemo";
import { TabsDemo } from "@/components/TabsDemo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <HeroParallaxDemo />
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
  );
};

export default Index;
