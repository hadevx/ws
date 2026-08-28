import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import About from "@/components/site/About";
import Approach from "@/components/site/Approach";
import CallToAction from "@/components/site/CallToAction";
import Contact from "@/components/site/Contact";
import Cursor from "@/components/site/Cursor";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Nav from "@/components/site/Nav";
import Preloader from "@/components/site/Preloader";
import ScrollProgress from "@/components/site/ScrollProgress";
import Services from "@/components/site/Services";
import Tech from "@/components/site/Tech";
import Work from "@/components/site/Work";

const SEEN_KEY = "ws-intro-seen";

const Index = () => {
  // The intro plays once per browser session, not on every soft navigation.
  const [loading, setLoading] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem(SEEN_KEY),
  );

  useSmoothScroll(!loading);

  // Scroll-linked sections don't survive a restored scroll position, so start
  // every load at the top instead of letting the browser guess.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  const finish = useCallback(() => {
    sessionStorage.setItem(SEEN_KEY, "1");
    setLoading(false);
  }, []);

  // Hold the page still behind the intro.
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    if (loading) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Preloader key="intro" onDone={finish} />}</AnimatePresence>

      <Cursor />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />
        <Services />
        <Approach />
        <Work />
        <Tech />
        <About />
        <CallToAction />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default Index;
