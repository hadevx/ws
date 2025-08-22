import { motion } from "framer-motion";

const Shine = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="relative p-[2px] rounded-2xl"
      animate={{
        background: [
          "linear-gradient(90deg, #A07CFE, #FE8FB5, #FFBE7B)",
          "linear-gradient(90deg, #FE8FB5, #FFBE7B, #A07CFE)",
          "linear-gradient(90deg, #FFBE7B, #A07CFE, #FE8FB5)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
      <div className="bg-background rounded-2xl lg:p-5">{children}</div>
    </motion.div>
  );
};

export default Shine;
