import { motion } from "framer-motion";
import { IoSparklesOutline } from "react-icons/io5";


const GlassButton = ({ children = "Generate", className = "" }) => {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`
        flex items-center justify-end
        h-[50px]
        min-w-[120px]
        px-10
        rounded-full
    
        bg-gradient-to-br
        from-cyan-500 to-blue-600
        dark:from-cyan-400 dark:to-blue-500

        text-[14px] sm:text-[15px]
        font-semibold

        text-white
        dark:text-slate-900

        shadow-[0_10px_30px_rgba(34,211,238,0.35),inset_0_0_0_1px_rgba(255,255,255,0.25)]
        hover:shadow-[0_14px_40px_rgba(34,211,238,0.5)]

        transition-all duration-150

        ${className}
      `}
    >
      {children}
      <IoSparklesOutline size={20} />
    </motion.button>
  );
};

export default GlassButton;
