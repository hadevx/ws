import { useAnimate, useInView, stagger } from "motion/react";
import { useEffect } from "react";

const Test = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: false });
  const chars = "WEBSCHEMA".split("");

  useEffect(() => {
    if (isInView) {
      animate(
        ".one",
        {
          x: [0, 100, 0],

          opacity: [1, 0, 1],
        },
        { repeat: 1, repeatType: "loop", duration: 1, delay: stagger(0.2) }
      );
    }
  }, [animate, isInView]);
  return (
    <div
      ref={scope}
      dir="ltr"
      className="min-h-screen flex justify-center items-center bg-neutral-900 gap-2">
      {chars?.map((char, index) => (
        <span key={index} className="one text-white text-7xl">
          {char}
        </span>
      ))}
    </div>
  );
};

export default Test;
