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
    
    // Check if the command is already active to prevent "blinking"
    if (cmd === "HELP") {
      if (activePage !== "HELP") {
        setActivePage("HELP");
        setOutput(prev => [...prev.slice(-4), `> ${input}`, "> SYSTEM MANUAL OPENED."]);
      }
    } else if (cmd === "IDENTITY") {
      if (activePage !== "IDENTITY") {
        setActivePage("IDENTITY");
        setOutput(prev => [...prev.slice(-4), `> ${input}`, "> IDENTITY DOSSIER OPENED."]);
      }
    } else if (cmd === "PROJECTS") {
      if (activePage !== "PROJECTS") {
        setActivePage("PROJECTS");
        setOutput(prev => [...prev.slice(-4), `> ${input}`, "> PROJECT ARCHIVES OPENED."]);
      }
    } else if (cmd === "CONTACT") {
      if (activePage !== "CONTACT") {
        setActivePage("CONTACT");
        setOutput(prev => [...prev.slice(-4), `> ${input}`, "> CONTACT UPLINK OPENED."]);
      }
    } else if (cmd === "EXIT") {
      setActivePage(null);
      setOutput(prev => [...prev.slice(-4), `> ${input}`, "> INTERFACE CLOSED."]);
    } else if (cmd === "CLEAR") {
      setOutput([]);
    } else {
      setOutput(prev => [...prev.slice(-4), `> ${input}`, `> COMMAND NOT RECOGNIZED: ${cmd}`]);
    }

    setInput("");
  };

  const PageOverlay = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-auto bg-black/60 backdrop-blur-md"
      onClick={() => setActivePage(null)}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-black border-2 border-[#00f3ff] w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 md:p-12 shadow-[0_0_50px_rgba(0,243,255,0.2)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => setActivePage(null)}
          className="absolute top-4 right-4 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black px-3 py-1 border border-[#00f3ff] transition-colors font-mono text-sm z-10"
        >
          [X] CLOSE
        </button>
        <h2 className="text-3xl md:text-4xl font-orbitron text-[#00f3ff] mb-8 border-b border-[#00f3ff]/30 pb-4">{title}</h2>
        <div className="text-[#00f3ff] font-rajdhani text-lg md:text-xl leading-relaxed">
          {children}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] flex flex-col justify-between p-4 md:p-8 text-[#00f3ff] font-rajdhani uppercase tracking-widest">
      
      <AnimatePresence>
        {activePage && (
          <PageOverlay key={activePage} title={activePage === "HELP" ? "SYSTEM_MANUAL" : activePage === "IDENTITY" ? "SUBJECT_DOSSIER" : activePage === "PROJECTS" ? "RESEARCH_ARCHIVES" : "UPLINK_ESTABLISH"}>
            {activePage === "HELP" && (
              <div className="space-y-6 font-mono text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white mb-2 underline">CORE COMMANDS</h3>
                    <ul className="space-y-2">
                      <li><span className="text-white">IDENTITY</span> - DISPLAYS FULL PROFESSIONAL DOSSIER</li>
                      <li><span className="text-white">PROJECTS</span> - ACCESSES RESEARCH PROJECT DATABASE</li>
                      <li><span className="text-white">CONTACT</span> - OPENS COMMUNICATION CHANNELS</li>
                      <li><span className="text-white">CLEAR</span> - WIPES TERMINAL BUFFER</li>
                      <li><span className="text-white">EXIT</span> - CLOSES OVERLAY INTERFACES</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white mb-2 underline">NAVIGATION</h3>
                    <p>USE THE MOUSE SCROLL WHEEL OR TOUCH DRAG TO NAVIGATE THE 3D WORLD GRID.</p>
                  </div>
                </div>
              </div>
            )}
            {activePage === "IDENTITY" && (
              <div className="space-y-8">
                <section>
                  <h3 className="text-[#ff00a0] mb-2">// PROFESSIONAL SUMMARY</h3>
                  <p>JAVA DEVELOPER | SYSTEMS ENGINEER | RESEARCH-ORIENTED SOFTWARE ENGINEER</p>
                  <p className="text-sm mt-2 opacity-80">STRONG JAVA-FIRST ENGINEER WITH BACKEND, SYSTEMS, AND ARCHITECTURE FOCUS. RESEARCH-DRIVEN PROBLEM SOLVER COMFORTABLE WITH LARGE DATASETS AND PERFORMANCE CONSTRAINTS.</p>
                </section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-[#ff00a0] mb-2">// EDUCATION</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-white font-bold">MCA - 9.41 CGPA</p>
                        <p>DAYANANDA SAGAR COLLEGE OF ENGINEERING</p>
                        <p className="opacity-60">OCT 2022 - OCT 2024</p>
                      </div>
                      <div>
                        <p className="text-white font-bold">B.SC PHYSICS (HONS.) - 9.40 CGPA</p>
                        <p>AMITY UNIVERSITY</p>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h3 className="text-[#ff00a0] mb-2">// TECH_STACK</h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {["JAVA", "PYTHON", "C", "SQL", "SPRING BOOT", "MICROSERVICES", "AWS", "AZURE", "DYNAMICS", "ALGORITHMS"].map(skill => (
                        <span key={skill} className="border border-[#00f3ff]/50 px-2 py-1 bg-[#00f3ff]/10">{skill}</span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}
            {activePage === "PROJECTS" && (
              <div className="space-y-12">
                <div className="border-l-4 border-[#00f3ff] pl-6 py-2">
                  <h3 className="text-2xl text-white mb-2">IMD RAINFALL ANALYZER [FLAGSHIP]</h3>
                  <p className="text-sm mb-4">JAVA | PYTHON | ML | DATA VISUALIZATION</p>
                  <p className="text-base opacity-90">AUTOMATED SYSTEM TO ANALYZE LARGE-SCALE RAINFALL DATA. FEATURES SPATIO-TEMPORAL ANALYSIS, CHATBOT INTERACTIVITY, AND RESEARCH-GRADE ACCURACY. PATENTED SYSTEM (NO: 118561).</p>
                </div>
                <div className="border-l-4 border-[#ff00a0] pl-6 py-2">
                  <h3 className="text-2xl text-white mb-2">AUTOMATED IMAGE RECOGNITION</h3>
                  <p className="text-sm mb-4">JAVA | JAVA SWING | JDBC | OPENCV</p>
                  <p className="text-base opacity-90">COMPUTER VISION SYSTEM FOR REAL-TIME FACE DETECTION AND AUTOMATED CAPTURE. INTEGRATED WITH SEAMLESS USABILITY FOCUS.</p>
                </div>
              </div>
            )}
            {activePage === "CONTACT" && (
              <div className="space-y-6 text-center py-12">
                <p className="text-2xl">PRIMARY CHANNEL:</p>
                <p className="text-2xl md:text-4xl font-mono text-white select-all break-all">PRAJWALSHELAR.DEV@SYSTEM.LOCAL</p>
              </div>
            )}
          </PageOverlay>
        )}
      </AnimatePresence>
      
      <header className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-4xl font-orbitron font-bold border-l-4 border-[#00f3ff] pl-4 glitch-text"
            data-text="PRAJWAL SHELAR"
          >
            PRAJWAL SHELAR
          </motion.div>
          <div className="text-[10px] md:text-sm opacity-70 pl-5">SYSTEMS ENGINEER // RESEARCH DIVISION</div>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <div className="text-lg md:text-2xl font-mono">{time.toLocaleTimeString()}</div>
        </div>
      </header>

      <footer className="flex justify-between items-end w-full">
        <div className="flex flex-col gap-2 w-full max-w-sm md:max-w-md pointer-events-auto">
            <div className="text-[10px] md:text-xs opacity-60 font-mono h-16 md:h-24 overflow-hidden flex flex-col justify-end">
                {output.map((line, i) => (
                    <div key={i} className="text-[#00f3ff]/80">{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="flex gap-2 items-center bg-black/90 border-2 border-[#00f3ff] p-2 md:p-3 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
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
        <div className="hidden md:block border border-[#00f3ff]/30 px-4 py-2 text-sm bg-black/50 backdrop-blur-sm animate-pulse">
          [ SCROLL_WHEEL_NAV_ACTIVE ]
        </div>
      </footer>
      <div className="scanline" />
    </div>
  );
}
