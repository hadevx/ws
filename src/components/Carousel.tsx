import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
const Example = () => {
  return (
    <div className="">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [scrollRange, setScrollRange] = useState(["90%", "-5%"]);

  useEffect(() => {
    const updateRange = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setScrollRange(["86%", "-5%"]);
      } else if (width < 1024) {
        // Tablet
        setScrollRange(["80%", "-15%"]);
      } else {
        // Desktop
        setScrollRange(["42%", "-20%"]);
      }
    };

    updateRange(); // Initial call
    window.addEventListener("resize", updateRange); // Recalculate on resize

    return () => window.removeEventListener("resize", updateRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], scrollRange);

  return (
    <>
      <section id="portfolio" className="py-20  bg-gray-900 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">أعمالنا</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              هذه قائمه بأهم الاعمال التي قمنا بها خلال الفتره الماضيه وتتضمن متاجر الكترونيه و
              مواقع شخصيه
            </p>
          </div>
        </div>

        <section ref={targetRef} className="relative mt-[-100px] lg:mt-[-200px]  h-[300vh] ">
          <div className="sticky  top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex  gap-4">
              {cards.map((card) => {
                return <Card card={card} key={card.id} />;
              })}
            </motion.div>
          </div>
        </section>
      </section>
    </>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group  relative h-[450px] w-[450px] overflow-hidden bg-neutral-200">
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute   inset-0 z-0 transition-transform duration-300 group-hover:scale-110"></div>
      <div className="absolute inset-0 z-10 grid place-content-center"></div>
    </div>
  );
};

export default Example;

const cards = [
  {
    url: "/folio.jpeg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/image.png",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/terra.png",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/admin.png",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/Products.png",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/services.png",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/ecomm.webp",
    title: "Title 7",
    id: 7,
  },
];
