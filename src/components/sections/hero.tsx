import { motion } from "framer-motion";
import { ArrowRight, FolderGit2, Download } from "lucide-react";
import { BatIcon } from "../bat-icon";
import { Typewriter } from "../typewriter";
import resumePdf from "@/MS.ASFAAN_RESUME.pdf?url";

export function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 inline-flex items-center gap-3 rounded-full border border-bat/30 bg-black/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-bat backdrop-blur"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Batcomputer · Online
        <span className="text-muted-foreground">|</span>
        <span className="text-muted-foreground">v7.13</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <BatIcon className="mx-auto h-16 w-32 text-bat text-glow animate-flicker" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-4xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
      >
        <span className="block text-foreground">Mohamed Sathak</span>
        <span className="block text-bat text-glow">Asfaan</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 font-mono text-sm text-bat/90 sm:text-base"
      >
        <span className="text-muted-foreground">{">"} </span>
        <Typewriter
          words={["MCA Student", "Python Full-Stack Developer", "Building Web Solutions"]}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 max-w-xl text-sm text-foreground/70 sm:text-base"
      >
Developing full-stack web applications with Python and modern JavaScript frameworks.
        Passionate about building scalable backend systems and intuitive user interfaces.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded bg-bat px-5 py-3 text-sm font-semibold text-black glow-bat hover:opacity-95"
        >
          <FolderGit2 className="h-4 w-4" /> View Projects
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
        <button
          className="inline-flex items-center gap-2 rounded border border-bat/40 bg-black/40 px-5 py-3 text-sm font-semibold text-bat backdrop-blur hover:bg-bat/10"
        >
          <BatIcon className="h-4 w-8 text-bat" /> Open Batcomputer
        </button>
        <a
          href={resumePdf}
          download="MS.ASFAAN_RESUME.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded border border-bat/20 px-5 py-3 text-sm font-semibold text-foreground/80 hover:border-bat hover:text-bat"
        >
          <Download className="h-4 w-4" /> Resume
        </a>
      </motion.div>

      {/* HUD readouts */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-5xl items-center justify-between px-6 font-mono text-[10px] uppercase tracking-widest text-bat/60">
        <span>LAT 13.0827° N</span>
        <span className="hidden md:block">SECTOR · CHENNAI</span>
        <span>LON 80.2707° E</span>
      </div>
    </section>
  );
}
