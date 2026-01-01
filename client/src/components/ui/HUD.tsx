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
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> ACCESSING MANUAL..."]);
    } else if (cmd === "IDENTITY") {
      setActivePage("IDENTITY");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> RETRIEVING PROFILE..."]);
    } else if (cmd === "PROJECTS") {
      setActivePage("PROJECTS");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> ARCHIVE SYNCING..."]);
    } else if (cmd === "CONTACT") {
      setActivePage("CONTACT");
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> UPLINK READY."]);
    } else if (cmd === "EXIT") {
      setActivePage(null);
      setOutput(prev => [...prev.slice(-3), `> ${input}`, "> SYSTEM IDLE."]);
    } else if (cmd === "CLEAR") {
      setOutput([]);
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[45%] bg-black/90 border-l-2 border-[#00f3ff] p-8 md:p-12 z-[60] pointer-events-auto backdrop-blur-xl shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
          >
            <div className="h-full flex flex-col relative">
              <div className="flex justify-between items-center mb-8 border-b border-[#00f3ff]/30 pb-4">
                <h2 className="text-2xl font-orbitron text-[#00f3ff] flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00f3ff] animate-pulse" />
                  SYSTEM_{activePage}
                </h2>
                <button 
                  onClick={() => setActivePage(null)}
                  className="text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black px-4 py-1 border border-[#00f3ff] transition-all font-mono text-sm"
                >
                  [ TERMINATE ]
                </button>
              </div>

              <div className="flex-1 overflow-y-auto font-rajdhani text-xl space-y-8 scrollbar-hide pr-2">
                {activePage === "HELP" && (
                  <div className="space-y-6 font-mono text-sm">
                    <p className="text-white underline mb-4">AVAILABLE INTERFACE COMMANDS:</p>
                    <div className="space-y-4">
                      <p><span className="text-[#00f3ff] font-bold">IDENTITY</span> : SUBJECT ARCHIVE DATA</p>
                      <p><span className="text-[#00f3ff] font-bold">PROJECTS</span> : RESEARCH SYSTEM LOGS</p>
                      <p><span className="text-[#00f3ff] font-bold">CONTACT</span> : EXTERNAL UPLINK ADDR</p>
                      <p><span className="text-[#00f3ff] font-bold">CLEAR</span> : WIPE TERMINAL BUFFER</p>
                      <p><span className="text-[#00f3ff] font-bold">EXIT</span> : CLOSE ACTIVE TERMINAL</p>
                    </div>
                    <div className="mt-12 p-4 border border-[#00f3ff]/20 bg-[#00f3ff]/5">
                      <p className="text-[#00f3ff]/60">&gt; NOTE: USE MOUSE SCROLL WHEEL TO PILOT CAMERA THROUGH THE 3D VOID.</p>
                    </div>
                  </div>
                )}

                {activePage === "IDENTITY" && (
                  <div className="space-y-8">
                    <section>
                      <p className="text-[#ff00a0] text-sm mb-2">// PROFILE_CORE</p>
                      <p className="text-3xl font-orbitron">PRAJWAL SHELAR</p>
                      <p className="text-lg opacity-80 mt-2">SYSTEMS ENGINEER | JAVA DEVELOPER</p>
                    </section>
                    <section className="grid grid-cols-1 gap-6">
                      <div className="p-4 border border-[#00f3ff]/20 bg-black/50">
                        <p className="text-[#ff00a0] text-xs mb-2">ACADEMIC_RECORDS</p>
                        <p className="text-white">MCA (9.41 CGPA)</p>
                        <p className="text-sm opacity-60">DAYANANDA SAGAR COLLEGE OF ENG.</p>
                        <div className="h-px bg-[#00f3ff]/20 my-4" />
                        <p className="text-white">B.SC PHYSICS HONS (9.40 CGPA)</p>
                        <p className="text-sm opacity-60">AMITY UNIVERSITY</p>
                      </div>
                      <div className="p-4 border border-[#00f3ff]/20 bg-black/50">
                        <p className="text-[#ff00a0] text-xs mb-2">SYSTEM_LIBRARIES</p>
                        <p className="text-sm flex flex-wrap gap-2 mt-2">
                          {["JAVA", "SPRING", "PYTHON", "AWS", "SQL", "ALGORITHMS"].map(s => (
                            <span key={s} className="px-2 py-1 border border-[#00f3ff]/30 text-[10px]">{s}</span>
                          ))}
                        </p>
                      </div>
                    </section>
                  </div>
                )}

                {activePage === "PROJECTS" && (
                  <div className="space-y-8">
                    <div className="p-6 border-l-4 border-[#00f3ff] bg-[#00f3ff]/5">
                      <p className="text-xl font-bold mb-2 text-white">IMD RAINFALL ANALYZER</p>
                      <p className="text-sm opacity-80 mb-4">PATENTED RESEARCH SYSTEM (NO: 118561)</p>
                      <p className="text-base leading-relaxed">SPATIO-TEMPORAL ANALYSIS OF LARGE-SCALE RAINFALL DATASETS. ML-DRIVEN PREDICTIVE MODELING FOR AGRICULTURE.</p>
                    </div>
                    <div className="p-6 border-l-4 border-[#ff00a0] bg-[#ff00a0]/5">
                      <p className="text-xl font-bold mb-2 text-white">VISION RECOGNITION</p>
                      <p className="text-sm opacity-80 mb-4">COMPUTER VISION SECURITY CORE</p>
                      <p className="text-base leading-relaxed">REAL-TIME FACE DETECTION AND AUTOMATED IMAGE CAPTURE INTERFACE USING OPENCV INTEGRATION.</p>
                    </div>
                  </div>
                )}

                {activePage === "CONTACT" && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="w-20 h-20 border-2 border-[#00f3ff] rounded-full flex items-center justify-center animate-pulse mb-8">
                       <span className="text-3xl">@</span>
                    </div>
                    <p className="text-sm text-[#ff00a0] mb-2">DIRECT_UPLINK</p>
                    <p className="text-2xl md:text-3xl font-mono text-white select-all break-all">
                      PRAJWALSHELAR.DEV@SYSTEM.LOCAL
                    </p>
                    <div className="mt-12 flex flex-col gap-4 w-full">
                       <a href="#" className="p-3 border border-[#00f3ff]/30 hover:bg-[#00f3ff] hover:text-black transition-all">LINKEDIN_SYNC</a>
                       <a href="#" className="p-3 border border-[#00f3ff]/30 hover:bg-[#00f3ff] hover:text-black transition-all">GITHUB_REPO</a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 border-t border-[#00f3ff]/30 pt-4 flex justify-between text-[10px] font-mono opacity-50">
                <span>MEM_ADDR: 0x8F2A11</span>
                <span>STATUS: STABLE</span>
              </div>
            </div>
            
            {/* Visual scanline for the "screen" look */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#00f3ff]/5 to-transparent opacity-20 bg-[length:100%_4px]" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Top Bar (HUD Main) */}
      <header className="flex justify-between items-start w-full pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="text-2xl md:text-4xl font-orbitron font-bold border-l-4 border-[#00f3ff] pl-4 glitch-text" data-text="PRAJWAL SHELAR">
            PRAJWAL SHELAR
          </div>
          <div className="text-[10px] md:text-sm opacity-70 pl-5">SYSTEMS ENGINEER // ARCHIVE_01</div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="text-lg md:text-2xl font-mono">{time.toLocaleTimeString()}</div>
          <div className="text-[8px] md:text-[10px] text-[#ff00a0] mt-1 tracking-[0.2em]">CONNECTED_V4.0</div>
        </div>
      </header>

      {/* Bottom Bar (Input Terminal) */}
      <footer className="flex justify-between items-end w-full pointer-events-none">
        <div className="flex flex-col gap-2 w-full max-w-sm md:max-w-md pointer-events-auto">
            <div className="text-[10px] md:text-xs opacity-60 font-mono h-16 md:h-20 overflow-hidden flex flex-col justify-end">
                {output.map((line, i) => (
                    <div key={i} className="text-[#00f3ff]/80">{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="flex gap-2 items-center bg-black/90 border-2 border-[#00f3ff] p-2 md:p-3 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                <span className="text-[#00f3ff] font-bold animate-pulse">&gt;</span>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-[#00f3ff] font-mono text-sm w-full uppercase placeholder-[#00f3ff]/20"
                    placeholder="TYPE_CMD_HERE..."
                    autoFocus
                />
            </form>
        </div>
        
        <div className="hidden md:flex flex-col items-end gap-2 mb-2">
           <div className="text-[10px] opacity-40">NAV_MODULE: ONLINE</div>
           <div className="w-32 h-1 bg-gray-800">
              <div className="h-full bg-[#00f3ff] w-3/4" />
           </div>
        </div>
      </footer>
      
      {/* Global scanline */}
      <div className="scanline" />
    </div>
  );
}
