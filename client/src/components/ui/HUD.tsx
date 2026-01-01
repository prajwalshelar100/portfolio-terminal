import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HUD() {
  const [time, setTime] = useState(new Date());
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> MANUAL OPENED"]);
    } else if (cmd === "IDENTITY") {
      setActivePage("IDENTITY");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> IDENTITY ACCESSED"]);
    } else if (cmd === "PROJECTS") {
      setActivePage("PROJECTS");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> ARCHIVES RETRIEVED"]);
    } else if (cmd === "CONTACT") {
      setActivePage("CONTACT");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> CONTACT LINK OPENED"]);
    } else if (cmd === "EXIT") {
      setActivePage(null);
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> OVERLAY CLOSED"]);
    } else if (cmd === "CLEAR") {
      setOutput([]);
    } else {
      setOutput(prev => [...prev.slice(-3), `> ${input}`, `> UNRECOGNIZED: ${cmd}`]);
    }

    setInput("");
  };

  const PageOverlay = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto bg-black/70 backdrop-blur-md"
      onClick={() => setActivePage(null)}
    >
      <div 
        className="bg-black border-2 border-[#00f3ff] w-full max-w-4xl max-h-[80vh] overflow-y-auto p-6 md:p-10 shadow-[0_0_50px_rgba(0,243,255,0.3)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setActivePage(null)}
          className="absolute top-4 right-4 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black px-3 py-1 border border-[#00f3ff] transition-colors font-mono text-sm"
        >
          [X] CLOSE
        </button>
        <h2 className="text-2xl md:text-3xl font-orbitron text-[#00f3ff] mb-6 border-b border-[#00f3ff]/30 pb-4">{title}</h2>
        <div className="text-[#00f3ff] font-rajdhani text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex flex-col justify-between p-4 md:p-8 text-[#00f3ff] font-rajdhani uppercase tracking-widest pointer-events-none">
      
      <AnimatePresence>
        {activePage && (
          <PageOverlay key={activePage} title={activePage}>
            {activePage === "HELP" && (
              <div className="space-y-4 font-mono text-sm">
                <p>COMMAND LIST:</p>
                <p>IDENTITY - SUBJECT DOSSIER</p>
                <p>PROJECTS - RESEARCH ARCHIVES</p>
                <p>CONTACT - UPLINK INFO</p>
                <p>CLEAR - WIPE BUFFER</p>
                <p>EXIT - CLOSE OVERLAY</p>
                <p className="mt-8 opacity-60">SCROLL MOUSE TO NAVIGATE 3D WORLD.</p>
              </div>
            )}
            {activePage === "IDENTITY" && (
              <div className="space-y-6">
                <p>PRAJWAL SHELAR - SYSTEMS ENGINEER</p>
                <p className="text-sm opacity-80">JAVA DEVELOPER | RESEARCH-ORIENTED SOFTWARE ENGINEER</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <p className="text-[#ff00a0]">EDUCATION</p>
                    <p className="text-sm">MCA - 9.41 CGPA (DSCE)</p>
                    <p className="text-sm">B.SC PHYSICS - 9.40 CGPA (AMITY)</p>
                  </div>
                  <div>
                    <p className="text-[#ff00a0]">STACK</p>
                    <p className="text-sm">JAVA, SPRING, PYTHON, AWS, SQL</p>
                  </div>
                </div>
              </div>
            )}
            {activePage === "PROJECTS" && (
              <div className="space-y-8">
                <div className="border-l-2 border-[#00f3ff] pl-4">
                  <p className="text-xl">IMD RAINFALL ANALYZER</p>
                  <p className="text-sm opacity-80">PATENTED SYSTEM FOR LARGE-SCALE DATA ANALYSIS.</p>
                </div>
                <div className="border-l-2 border-[#ff00a0] pl-4">
                  <p className="text-xl">VISION RECOGNITION</p>
                  <p className="text-sm opacity-80">AUTOMATED COMPUTER VISION SECURITY SYSTEM.</p>
                </div>
              </div>
            )}
            {activePage === "CONTACT" && (
              <div className="text-center py-8">
                <p className="text-xl mb-4">UPLINK ADDRESS:</p>
                <p className="text-2xl md:text-3xl font-mono text-white select-all">PRAJWALSHELAR.DEV@SYSTEM.LOCAL</p>
              </div>
            )}
          </PageOverlay>
        )}
      </AnimatePresence>
      
      <header className="flex justify-between items-start w-full pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="text-2xl md:text-4xl font-orbitron font-bold border-l-4 border-[#00f3ff] pl-4">
            PRAJWAL SHELAR
          </div>
          <div className="text-[10px] md:text-sm opacity-70 pl-5">SYSTEMS ENGINEER</div>
        </div>
        <div className="text-right text-lg md:text-2xl font-mono">
          {time.toLocaleTimeString()}
        </div>
      </header>

      <footer className="flex justify-between items-end w-full pointer-events-none">
        <div className="flex flex-col gap-2 w-full max-w-sm md:max-w-md pointer-events-auto">
            <div className="text-[10px] md:text-xs opacity-60 font-mono h-16 md:h-20 overflow-hidden flex flex-col justify-end">
                {output.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="flex gap-2 items-center bg-black/90 border-2 border-[#00f3ff] p-2 md:p-3">
                <span className="text-[#00f3ff] font-bold">&gt;</span>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-[#00f3ff] font-mono text-sm w-full uppercase"
                    placeholder="TYPE 'HELP'..."
                />
            </form>
        </div>
        <div className="hidden md:block border border-[#00f3ff]/30 px-4 py-2 text-sm bg-black/50 animate-pulse">
          NAV_ACTIVE
        </div>
      </footer>
      <div className="scanline" />
    </div>
  );
}
