import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Select, { components } from "react-select";
import GlassTextarea from "../components/GlassTextarea";
import GlassButton from "../components/GlassButton";
import { BiCodeCurly } from "react-icons/bi";
import Editor from "@monaco-editor/react";

/* =======================
   React Select Styles
======================= */
const glassSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: "rgba(20, 19, 25, 0.6)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: state.isFocused
      ? "1px solid rgba(255,255,255,0.18)"
      : "1px solid rgba(255,255,255,0.12)",
    boxShadow: "none",
    borderRadius: "10px",
    minHeight: "46px",
  }),
  menu: (base) => ({
    ...base,
    background: "rgba(20, 19, 25, 0.7)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "12px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "rgba(255,255,255,0.08)"
      : "transparent",
    color: "#e5e7eb",
  }),
  singleValue: (base) => ({ ...base, color: "#fff" }),
  placeholder: (base) => ({ ...base, color: "#a1a1aa" }),
  input: (base) => ({ ...base, color: "#fff" }),
  indicatorSeparator: () => ({ display: "none" }),
};

/* =======================
   Animated Select Menu
======================= */
const AnimatedMenu = (props) => (
  <AnimatePresence>
    {props.selectProps.menuIsOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.96 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <components.Menu {...props} />
      </motion.div>
    )}
  </AnimatePresence>
);

/* =======================
   Monaco Theme
======================= */
const darkGlassTheme = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment", foreground: "6B7280", fontStyle: "italic" },
    { token: "keyword", foreground: "C084FC" },
    { token: "number", foreground: "F472B6" },
    { token: "string", foreground: "34D399" },
    { token: "function", foreground: "A78BFA" },
  ],
  colors: {
    "editor.background": "#141319",
    "editor.foreground": "#E5E7EB",
    "editorCursor.foreground": "#C084FC",
    "editor.lineHighlightBackground": "#1F1B2E",
    "editorLineNumber.foreground": "#6B7280",
    "editorLineNumber.activeForeground": "#C084FC",
  },
};

/* =======================
   Home Component
======================= */
const Home = () => {
  const [outputScreen, setOutputScreen] = useState(true);
  const [tab, setTab] = useState("code");

  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
  ];

  return (
    <>
      <Navbar />

      <div className="flex px-[100px] gap-[30px] mt-5">

        {/* LEFT PANEL */}
        <div className="w-[50%] h-[80vh] bg-[#141319] rounded-xl p-5 flex flex-col">
          <h3 className="text-[20px] font-semibold">PromptUI</h3>
          <p className="text-gray-400 mt-2 text-[16px]">
            Transform your component ideas into production-ready code with AI.
          </p>

          <p className="text-[15px] font-bold mt-4">Framework</p>

          <Select
            className="mt-3"
            options={options}
            styles={glassSelectStyles}
            components={{ Menu: AnimatedMenu }}
            placeholder="Select option"
          />

          <p className="text-[15px] font-bold mt-5">
            Describe your component
          </p>

          <GlassTextarea
            placeholder="Explain your idea in detail..."
            className="min-h-[200px] mt-2"
          />

          <div className="flex justify-end mt-2">
            <GlassButton onClick={() => setOutputScreen(true)}>
              Generate
            </GlassButton>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[50%] h-[80vh] bg-[#141319] rounded-xl overflow-hidden">

          {!outputScreen ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-purple-600 text-white text-[30px] shadow-lg">
                  <BiCodeCurly />
                </div>
                <p className="text-slate-400 text-[14px] max-w-[260px]">
                  Your generated component code will appear here
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="h-[56px] flex items-center gap-3 px-3 bg-[#0f0f13] border-b border-white/10">
                <button
                  onClick={() => setTab("code")}
                  className={`w-1/2 py-2 rounded-lg text-sm transition-all ${tab === "code"
                      ? "bg-[#1f1f2a] text-white"
                      : "text-gray-400 hover:bg-[#1a1a24]"
                    }`}
                >
                  Code
                </button>

                <button
                  onClick={() => setTab("preview")}
                  className={`w-1/2 py-2 rounded-lg text-sm transition-all ${tab === "preview"
                      ? "bg-[#1f1f2a] text-white"
                      : "text-gray-400 hover:bg-[#1a1a24]"
                    }`}
                >
                  Preview
                </button>
              </div>

              {/* Content */}
              {tab === "code" ? (
                <div className="h-[calc(80vh-56px)]">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue={`// Your generated code will appear here`}
                    theme="dark-glass"
                    beforeMount={(monaco) => {
                      monaco.editor.defineTheme(
                        "dark-glass",
                        darkGlassTheme
                      );
                    }}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      padding: { top: 16 },
                    }}
                  />
                </div>
              ) : (
                <div className="h-[calc(80vh-56px)] flex items-center justify-center text-gray-400">
                  Live preview will appear here
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
