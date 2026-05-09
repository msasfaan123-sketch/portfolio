import { motion } from "framer-motion";
import { Github, ExternalLink, Cpu } from "lucide-react";
import { SectionTitle } from "./experience";

const projects = [
  {
    name: "VConnect",
    tag: "REAL-TIME / SAAS",
    desc: "A modern, real-time collaboration platform built with WebSockets, edge functions, and a custom presence engine.",
    stack: ["Next.js", "WebRTC", "Postgres", "Redis", "TypeScript"],
    github: "https://github.com/msasfaan123-sketch",
    live: "https://msa-bruce.vercel.app/",
  },
  {
    name: "AI Nurse Triage",
    tag: "AI VOICE / HEALTH",
    desc: "Voice-first AI assistant that performs symptom triage and routes patients with clinical-grade safety guards.",
    stack: ["Python", "LangGraph", "OpenAI", "Whisper", "FastAPI"],
    github: "https://github.com/msasfaan123-sketch",
    live: "https://ainurse.netlify.app/",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionTitle eyebrow="Case Files" title="Projects Showcase" />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="group relative overflow-hidden rounded-lg border border-bat/20 bg-card/50 p-6 backdrop-blur-md transition hover:border-bat/60"
      style={{
        backgroundImage:
          "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(245,197,24,0.10), transparent 60%)",
      }}
    >
      {/* Animated border */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 rounded-lg [background:conic-gradient(from_0deg,transparent,rgba(245,197,24,0.6),transparent_30%)] [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[1px]" />
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-bat">
          <Cpu className="h-3 w-3" /> {p.tag}
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          0{i + 1} / 0{projects.length}
        </span>
      </div>

      <h3 className="mt-3 text-2xl font-bold text-foreground group-hover:text-bat transition">
        {p.name}
      </h3>
      <p className="mt-2 text-sm text-foreground/75">{p.desc}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-bat/25 bg-bat/5 px-2.5 py-0.5 font-mono text-[10px] text-bat/90"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded border border-bat/30 px-3 py-1.5 text-xs hover:bg-bat hover:text-black transition"
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded bg-bat px-3 py-1.5 text-xs font-medium text-black hover:opacity-90"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Live
        </a>
      </div>
    </motion.article>
  );
}
