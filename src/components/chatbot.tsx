import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Zap, Loader2 } from "lucide-react";
import { BatIcon } from "./bat-icon";
import { getBotReply } from "../lib/knowledgeBase";

type Msg = { from: "bot" | "user"; text: string; timestamp?: string };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [thinkingStage, setThinkingStage] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Batcomputer online. How may I assist you, Detective?", timestamp: new Date().toLocaleTimeString() },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgs, typing]);

  const typeMessage = (text: string) => {
    setTyping(true);
    let index = 0;
    let charIndex = 0;
    const textArray = text.split('');

    const typeChar = () => {
      if (charIndex < textArray.length) {
        setMsgs((prev) => {
          const newMsgs = [...prev];
          const lastMsg = newMsgs[newMsgs.length - 1];
          if (lastMsg.from === "bot") {
            newMsgs[newMsgs.length - 1] = { ...lastMsg, text: text.slice(0, charIndex + 1) };
          }
          return newMsgs;
        });
        charIndex++;
        // Variable typing speed for more natural feel
        const speed = Math.random() * 20 + 10;
        setTimeout(typeChar, speed);
      } else {
        setTyping(false);
      }
    };

    typeChar();
  };

  const send = async (t?: string) => {
    const text = (t ?? input).trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "user", text, timestamp: new Date().toLocaleTimeString() }]);
    setInput("");
    setLoading(true);
    setThinkingStage(0);

    // Simulate AI thinking with stages
    const stages = ['Initializing neural core...', 'Accessing knowledge base...', 'Processing query...', 'Generating response...'];
    for (let i = 0; i < stages.length; i++) {
      setThinkingStage(i);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    const reply = getBotReply(text);
    setMsgs((m) => [...m, { from: "bot", text: "", timestamp: new Date().toLocaleTimeString() }]);
    setLoading(false);
    setThinkingStage(0);
    typeMessage(reply);
  };

  const quick = [
    { label: "Who are you?", icon: "👤" },
    { label: "Your skills", icon: "⚡" },
    { label: "Your projects", icon: "🚀" },
    { label: "Contact info", icon: "📧" },
    { label: "Education", icon: "🎓" },
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[200] grid h-14 w-14 place-items-center rounded-full bg-bat text-black glow-bat"
        aria-label="Open Batcomputer chat"
      >
        {open ? <X className="h-6 w-6" /> : <BatIcon className="h-7 w-7" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200]"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 22 }}
              className="glass hud-corners absolute left-1/2 top-1/2 flex h-[min(78vh,560px)] w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-md overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-bat/20 bg-black/40 px-4 py-3">
                <div className="flex items-center gap-2">
                  <BatIcon className="h-5 w-10 text-bat" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-bat">Batcomputer AI</div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      SECURE CHANNEL
                    </div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-bat">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-3">
                {msgs.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div>
                      <div
                        className={`max-w-[80%] rounded px-3 py-2 ${
                          m.from === "user"
                            ? "bg-bat text-black"
                            : "border border-bat/30 bg-black/40 text-bat/90"
                        }`}
                      >
                        {m.from === "bot" && <span className="mr-1 text-bat/60">[AI]</span>}
                        {m.text}
                        {typing && i === msgs.length - 1 && m.from === "bot" && (
                          <span className="inline-block w-2 h-4 ml-1 bg-bat animate-pulse" />
                        )}
                      </div>
                      {m.timestamp && (
                        <div className={`mt-1 text-[10px] text-muted-foreground ${m.from === "user" ? "text-right" : ""}`}>
                          {m.timestamp}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="border border-bat/30 bg-black/40 rounded px-3 py-2 text-bat/90">
                      <span className="mr-1 text-bat/60">[AI]</span>
                      <span className="animate-pulse">
                        {thinkingStage === 0 && "Initializing neural core..."}
                        {thinkingStage === 1 && "Accessing knowledge base..."}
                        {thinkingStage === 2 && "Processing query..."}
                        {thinkingStage === 3 && "Generating response..."}
                      </span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-bat/20 bg-black/40 p-3">
                <div className="mb-2 flex flex-wrap gap-1">
                  {quick.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => send(q.label)}
                      disabled={loading}
                      className="flex items-center gap-1 rounded border border-bat/30 px-2 py-1 text-[10px] uppercase tracking-wider text-bat/80 hover:bg-bat/10 disabled:opacity-50 transition"
                    >
                      <span>{q.icon}</span> {q.label}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="> Enter command..."
                    className="flex-1 rounded border border-bat/30 bg-black/60 px-3 py-2 font-mono text-sm text-bat placeholder:text-bat/40 focus:outline-none focus:ring-1 focus:ring-bat"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="grid h-9 w-9 place-items-center rounded bg-bat text-black hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
