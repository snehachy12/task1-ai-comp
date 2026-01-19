// components/GlassTextarea.jsx
import { motion } from "framer-motion";

export default function GlassTextarea({
  placeholder,
  className = "",
  ...props
}) {
  return (
    <motion.textarea
      {...props}
      placeholder={placeholder}
      
      className={`
        w-full
        min-h-[200px] 
        rounded-2xl
        px-4 py-3 sm:px-5 sm:py-4
        mt-2

        bg-[rgba(20,25,32,0.65)]
        backdrop-blur-xl
        border border-white/10

        text-slate-100
        placeholder:text-slate-400/40

        resize-none outline-none
        transition-all duration-200

        focus:border-cyan-400/60
        ${className}
      `}
    />
  );
}
