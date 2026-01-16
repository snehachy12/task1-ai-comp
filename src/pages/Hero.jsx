import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaStar,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FiArrowRight, FiCheck, FiMinus, FiPlus } from "react-icons/fi";

/* ------------------ DATA ------------------ */
const tech = [
  { icon: FaReact, name: "React" },
  { icon: FaNodeJs, name: "Node.js" },
  { icon: FaPython, name: "Python" },
  { icon: FaHtml5, name: "HTML5" },
  { icon: FaCss3Alt, name: "CSS3" },
  { icon: FaJs, name: "JavaScript" },
];

const reviews = [
  { name: "Alice", rating: 5, comment: "Amazing UI generator. Super premium results!" },
  { name: "Bob", rating: 5, comment: "Saved me hours. Clean code and great layout." },
  { name: "Charlie", rating: 4, comment: "Perfect for landing pages and dashboards." },
];

const pricing = [
  {
    title: "Free",
    price: "₹0",
    subtitle: "For students & testing",
    features: ["10 generations/day", "Basic UI blocks", "Copy-paste code", "Community support"],
    highlight: false,
  },
  {
    title: "Pro",
    price: "₹499/mo",
    subtitle: "For serious builders",
    features: ["Unlimited generations", "Premium templates", "Faster output", "Export clean code", "Priority support"],
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    subtitle: "For teams & startups",
    features: ["Team workspace", "Private templates", "API access", "Dedicated support", "Custom design system"],
    highlight: false,
  },
];

const faqs = [
  {
    q: "Does it generate responsive components?",
    a: "Yes. All components are responsive and built with Tailwind utility classes.",
  },
  {
    q: "Can I edit the generated code?",
    a: "Yes. The output is clean React code and fully editable.",
  },
  {
    q: "Is it production ready?",
    a: "Yes. It’s designed to generate premium UI blocks that you can use in real projects.",
  },
  {
    q: "Can I use it in MERN projects?",
    a: "Yes. You can directly paste it into your React frontend.",
  },
];

/* ------------------ ANIMATION VARIANTS ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ------------------ COMPONENTS ------------------ */
const Section = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="max-w-6xl mx-auto px-5 py-14">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-extrabold">
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={fadeUp} className="mt-2 text-white/70 max-w-2xl">
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="mt-8">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

/* (moving animation/marquee) */
const LanguageTrain = () => {
  const items = useMemo(
    () => [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "MongoDB",
      "Express",
      "Vite",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "UI Components",
      "Landing Pages",
      "Login Pages"
    ],
    []
  );

  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070A12] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070A12] to-transparent z-10" />

      <motion.div
        className="flex gap-3 py-4 px-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className="shrink-0 px-4 py-2 rounded-2xl border border-white/10 bg-black/25 text-white/70 text-sm hover:text-white hover:bg-white/10 transition"
          >
            {t}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Smooth scroll progress
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse glow
  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const glowStyle = useMemo(() => {
    // safe values (no white screen)
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const x = (mouse.x / w) * 100;
    const y = (mouse.y / h) * 100;

    return {
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(124,58,237,0.25), transparent 55%),
                   radial-gradient(circle at ${100 - x}% ${100 - y}%, rgba(59,130,246,0.22), transparent 50%)`,
    };
  }, [mouse]);

  return (
    <div className="min-h-screen bg-[#070A12] text-white relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0" style={glowStyle} />

      {/* Soft animated orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-violet-600/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 -right-40 w-[560px] h-[560px] rounded-full bg-blue-600/18 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-pink-500/10 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-600"
          style={{ width: `${Math.min(100, scrollY / 8)}%` }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold shadow-lg">
              AI
            </div>
            <div>
              <p className="font-extrabold leading-none">GENU AI</p>
            
            </div>
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-white/70">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#reviews" className="hover:text-white transition">Reviews</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/home")}
              className="hidden sm:block px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 hover:opacity-95 transition text-sm font-semibold shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 pt-16 pb-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80">
            <span className="px-2 py-1 rounded-full bg-gradient-to-r from-blue-500/30 to-violet-600/30 border border-white/10">
              New
            </span>
            Premium AI Landing Page Generator
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
            Build{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              premium UI
            </span>{" "}
            components instantly.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-white/70 text-base md:text-lg max-w-xl">
            Generate responsive React + Tailwind components like login pages, pricing sections, dashboards,
            and landing pages in seconds.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/home")}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 font-semibold shadow-lg flex items-center justify-center gap-2 hover:shadow-2xl transition"
            >
              Start Generating <FiArrowRight />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#pricing"
              className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-semibold text-white/90 flex items-center justify-center"
            >
              View Pricing
            </motion.a>
          </motion.div>

          {/* Tech Icons */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            {tech.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition shadow-md"
                >
                  <Icon className="text-xl" />
                  <span className="text-sm text-white/80">{t.name}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Language Train */}
          <motion.div variants={fadeUp}>
            <LanguageTrain />
          </motion.div>
        </motion.div>

        {/* Right (Preview Card) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl hover:bg-white/10 transition relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-600/10 opacity-60" />

          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-sm text-white/70 font-semibold">AI Component Preview</p>
              <span className="text-xs text-white/50">GeneratedComponent.jsx</span>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-5">
              <h3 className="text-xl font-bold">Premium Sign In</h3>
              <p className="mt-2 text-sm text-white/60">Modern glass UI with clean spacing.</p>

              <div className="mt-5 grid gap-3">
                <div className="h-10 rounded-xl bg-white/10" />
                <div className="h-10 rounded-xl bg-white/10" />
                <div className="h-11 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600" />
              </div>
            </div>

            <p className="mt-5 text-xs text-white/50">
              Tip: You can copy & paste this into your React app instantly.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <Section
        id="features"
        title="Features"
        subtitle="Everything you need to generate modern landing pages and components quickly."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Instant Generation", desc: "Create premium UI blocks in seconds." },
            { title: "Responsive Design", desc: "Mobile-first layouts with Tailwind classes." },
            { title: "Clean React Code", desc: "Editable code that works in real projects." },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition shadow-lg"
            >
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-white/70 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section
        id="reviews"
        title="What Users Say"
        subtitle="Trusted by developers building fast, premium UIs."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg hover:bg-white/10 transition"
            >
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <FaStar key={idx} className="text-yellow-400" />
                ))}
              </div>
              <p className="mt-4 text-white/80">“{r.comment}”</p>
              <p className="mt-4 text-white/50 text-sm font-semibold">— {r.name}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section
        id="pricing"
        title="Pricing"
        subtitle="Choose the best plan for your workflow."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`rounded-3xl border p-7 shadow-lg transition relative overflow-hidden ${
                p.highlight
                  ? "border-violet-400/40 bg-gradient-to-b from-violet-500/15 to-blue-500/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-600/5 opacity-70" />
              <div className="relative z-10">
                <p className="text-white/60 text-sm">{p.subtitle}</p>
                <h3 className="mt-2 text-2xl font-extrabold">{p.title}</h3>
                <p className="mt-3 text-4xl font-extrabold">{p.price}</p>

                <div className="mt-6 grid gap-3">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white/75 text-sm">
                      <span className="h-6 w-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <FiCheck />
                      </span>
                      {f}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/home")}
                  className={`mt-7 w-full py-3 rounded-2xl font-semibold transition shadow-lg ${
                    p.highlight
                      ? "bg-gradient-to-r from-blue-500 to-violet-600 hover:opacity-95"
                      : "border border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {p.highlight ? "Go Pro" : "Choose Plan"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ" subtitle="Quick answers to common questions.">
        <div className="grid gap-4">
          {faqs.map((f, i) => {
            const active = openFAQ === i;
            return (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <button
                  onClick={() => setOpenFAQ(active ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <span className="text-white/70">{active ? <FiMinus /> : <FiPlus />}</span>
                </button>

                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-white/70 text-sm">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30 relative z-10">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} genuAI • AI Components Generator
          </p>

          <div className="flex items-center gap-4 text-white/60">
            <a href="#!" className="hover:text-white transition" aria-label="Twitter">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#!" className="hover:text-white transition" aria-label="LinkedIn">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="#!" className="hover:text-white transition" aria-label="GitHub">
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
