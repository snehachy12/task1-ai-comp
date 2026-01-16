import React from 'react'
import { FaUser } from 'react-icons/fa'
import { HiSun } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'
import { motion } from 'framer-motion'

const iconMotion = {
  hover: {
    y: -4,
    scale: 1.15,
    transition: { type: 'spring', stiffness: 300 }
  },
  tap: {
    scale: 0.9
  }
}

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="
        relative h-[90px] px-[100px]
        flex items-center justify-between
        bg-black/60 backdrop-blur-xl
        border-b border-white/10
        shadow-[0_20px_40px_rgba(0,0,0,0.35)]
      "
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="cursor-pointer text-[28px] font-extrabold tracking-wide"
      >
        <span className="text-white">Gen</span>
        <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
          UI
        </span>
      </motion.div>

      {/* Icons */}
      <div className="flex items-center gap-[18px]">
        {[HiSun, FaUser, RiSettings3Fill].map((Icon, i) => (
          <motion.div
            key={i}
            variants={iconMotion}
            whileHover="hover"
            whileTap="tap"
            className="
              w-[42px] h-[42px]
              grid place-items-center
              rounded-full cursor-pointer
              text-[18px] text-slate-300
              bg-gradient-to-br from-white/10 to-white/5
              border border-white/10
              hover:text-white
              hover:shadow-[0_10px_30px_rgba(99,102,241,0.35)]
              transition-all
            "
          >
            <Icon />
          </motion.div>
        ))}
      </div>

      {/* Glow Line */}
      <div
        className="
          absolute bottom-0 left-1/4 w-1/2 h-[2px]
          bg-gradient-to-r from-transparent via-indigo-500 to-transparent
          blur-sm opacity-80
        "
      />
    </motion.nav>
  )
}

export default Navbar
