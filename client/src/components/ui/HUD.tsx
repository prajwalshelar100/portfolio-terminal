import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HUD() {
  const [time, setTime] = useState(new Date());
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toUpperCase().trim();
    if (!cmd) return;
    
    if (cmd === "HELP") {
      setActivePage("HELP");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> ACCESSING MANUAL..."]);
    } else if (cmd === "IDENTITY") {
      setActivePage("IDENTITY");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> RETRIEVING PROFILE..."]);
    } else if (cmd === "PROJECTS") {
      setActivePage("PROJECTS");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> ARCHIVE SYNCING..."]);
    } else if (cmd === "EXIT") {
      setActivePage(null);
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> SYSTEM IDLE."]);
    } else if (cmd === "CLEAR") {
      setOutput([]);
    } else if (cmd === "PORTFOLIO") {
      window.open("https://www.prajwalshelar.online/", "_blank");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> REDIRECTING TO PORTFOLIO..."]);
    } else {
      setOutput(prev => [...prev.slice(-3), `> ${input}`, `> UNKNOWN CMD: ${cmd}`]);
    }

    setInput("");
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-between p-4 md:p-8 text-[#00f3ff] font-rajdhani uppercase tracking-widest pointer-events-none z-50">
      
      {/* Side Screen Overlay (Right Side) */}
      <AnimatePresence>
        {activePage && (
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[45%] bg-black/90 border-l-2 border-[#00f3ff] p-8 md:p-12 z-[60] pointer-events-auto backdrop-blur-xl"
          >
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-8 border-b border-[#00f3ff]/30 pb-4">
                <h2 className="text-2xl font-orbitron">SYSTEM_{activePage}</h2>
                <button 
                  onClick={() => setActivePage(null)}
                  className="text-[#00f3ff] border border-[#00f3ff] px-4 py-1 hover:bg-[#00f3ff] hover:text-black transition-all"
                >
                  TERMINATE
                </button>
              </div>

              <div className="flex-1 overflow-y-auto font-rajdhani text-xl space-y-8 pr-2">
                {activePage === "HELP" && (
                  <div className="space-y-4 font-mono text-sm">
                    <p>AVAILABLE COMMANDS:</p>
                    <p>IDENTITY : SUBJECT DATA</p>
                    <p>PROJECTS : RESEARCH LOGS</p>
                    <p>PORTFOLIO : REDIRECT TO WEB</p>
                    <p>EXIT : CLOSE TERMINAL</p>
                  </div>
                )}
                {/* ... existing pages content ... */}
                {activePage === "IDENTITY" && (
                  <div className="space-y-6">
                    <p className="text-3xl font-orbitron">PRAJWAL SHELAR</p>
                    <p>SYSTEMS ENGINEER | JAVA DEVELOPER</p>
                    <div className="mt-8 p-4 border border-[#00f3ff]/20">
                      <p className="text-[#ff00a0] mb-2">PRIMARY_UPLINK</p>
                      <p className="font-mono text-white">PRAJWALSHELAR.DEV@SYSTEM.LOCAL</p>
                    </div>
                  </div>
                )}
                {activePage === "PROJECTS" && (
                  <div className="space-y-6">
                    <div className="border-l-4 border-[#00f3ff] pl-4">
                      <p className="text-xl font-bold">IMD RAINFALL ANALYZER</p>
                      <p className="text-sm opacity-60">PATENTED RESEARCH SYSTEM</p>
                    </div>
                    <div className="border-l-4 border-[#ff00a0] pl-4">
                      <p className="text-xl font-bold">VISION RECOGNITION</p>
                      <p className="text-sm opacity-60">COMPUTER VISION CORE</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <header className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-1">
          <div className="text-2xl md:text-4xl font-orbitron font-bold border-l-4 border-[#00f3ff] pl-4">
            PRAJWAL SHELAR
          </div>
          <div className="text-[10px] md:text-sm opacity-70">SYSTEMS ENGINEER // ARCHIVE_01</div>
        </div>
        <div className="text-right">
          <div className="text-lg md:text-2xl font-mono">{time.toLocaleTimeString()}</div>
        </div>
      </header>

      <footer className="flex justify-between items-end w-full">
        <div className="flex flex-col gap-2 w-full max-w-md pointer-events-auto">
            <div className="text-[10px] opacity-60 font-mono h-16 overflow-hidden flex flex-col justify-end">
                {output.map((line, i) => <div key={i}>{line}</div>)}
            </div>
            <form onSubmit={handleCommand} className="flex gap-2 items-center bg-black/90 border-2 border-[#00f3ff] p-3 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                <span className="text-[#00f3ff] font-bold">&gt;</span>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-[#00f3ff] font-mono text-sm w-full uppercase"
                    placeholder="TYPE 'PORTFOLIO'..."
                    autoFocus
                />
            </form>
        </div>
        
        <div className="hidden md:block text-xs border border-[#00f3ff]/30 px-4 py-2 bg-black/50">
          CLICK_SCREEN_TO_UPLINK
        </div>
      </footer>
      
      <div className="scanline" />
    </div>
  );
}
