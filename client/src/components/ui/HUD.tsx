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
    if (!input) return;
    
    const cmd = input.toUpperCase().trim();
    let response = `> COMMAND NOT RECOGNIZED: ${cmd}`;
    
    if (cmd === "HELP") {
      response = "> AVAILABLE COMMANDS: IDENTITY, PROJECTS, CONTACT, CLEAR, EXIT";
      setActivePage("HELP");
    } else if (cmd === "IDENTITY") {
      response = "> ACCESSING SUBJECT PROFILE: PRAJWAL SHELAR...";
      setActivePage("IDENTITY");
    } else if (cmd === "PROJECTS") {
      response = "> RETRIEVING RESEARCH ARCHIVES...";
      setActivePage("PROJECTS");
    } else if (cmd === "CONTACT") {
      response = "> UPLINK ESTABLISHED.";
      setActivePage("CONTACT");
    } else if (cmd === "EXIT") {
      response = "> CLOSING ACTIVE INTERFACE...";
      setActivePage(null);
    } else if (cmd === "CLEAR") {
      setOutput([]);
      setInput("");
      return;
    }

    setOutput(prev => [...prev.slice(-4), `> ${input}`, response]);
    setInput("");
  };

  const PageOverlay = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-12 pointer-events-auto"
    >
      <div className="bg-black/90 border-2 border-[#00f3ff] w-full max-w-4xl max-h-[80vh] overflow-y-auto p-12 backdrop-blur-xl relative">
        <button 
          onClick={() => setActivePage(null)}
          className="absolute top-6 right-6 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black px-4 py-2 border border-[#00f3ff] transition-colors font-mono"
        >
          [X] CLOSE
        </button>
        <h2 className="text-4xl font-orbitron text-[#00f3ff] mb-8 border-b border-[#00f3ff]/30 pb-4">{title}</h2>
        <div className="text-[#00f3ff] font-rajdhani text-xl leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-8 text-[#00f3ff] font-rajdhani uppercase tracking-widest">
      
      <AnimatePresence>
        {activePage === "HELP" && (
          <PageOverlay title="SYSTEM_MANUAL">
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
                  <p className="mt-4">THE CAMERA FOLLOWS A PRE-CALIBRATED RESEARCH PATH THROUGH CORE MODULES.</p>
                </div>
              </div>
            </div>
          </PageOverlay>
        )}

        {activePage === "IDENTITY" && (
          <PageOverlay title="SUBJECT_DOSSIER: PRAJWAL SHELAR">
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
          </PageOverlay>
        )}

        {activePage === "PROJECTS" && (
          <PageOverlay title="RESEARCH_ARCHIVES">
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
              <div className="border-l-4 border-[#00f3ff] pl-6 py-2">
                <h3 className="text-2xl text-white mb-2">WIKIPEDIA TRAFFIC ANALYSIS</h3>
                <p className="text-sm mb-4">PYTHON | NUMPY | PANDAS | SCIKIT-LEARN</p>
                <p className="text-base opacity-90">MACHINE LEARNING MODEL FORECASTING ACCESS SOURCES UNDER LANGUAGE CONSTRAINTS. EMPHASIS ON DATA INTERPRETATION.</p>
              </div>
            </div>
          </PageOverlay>
        )}

        {activePage === "CONTACT" && (
          <PageOverlay title="UPLINK_ESTABLISH">
            <div className="space-y-6 text-center py-12">
              <p className="text-2xl">PRIMARY CHANNEL:</p>
              <p className="text-4xl font-mono text-white select-all">PRAJWALSHELAR.DEV@SYSTEM.LOCAL</p>
              <div className="flex justify-center gap-8 mt-12">
                <a href="#" className="hover:text-white transition-colors border-b border-[#00f3ff]">LINKEDIN</a>
                <a href="#" className="hover:text-white transition-colors border-b border-[#00f3ff]">GITHUB</a>
                <a href="#" className="hover:text-white transition-colors border-b border-[#00f3ff]">RESEARCHGATE</a>
              </div>
            </div>
          </PageOverlay>
        )}
      </AnimatePresence>
      
      {/* Top Bar */}
      <header className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-orbitron font-bold border-l-4 border-[#00f3ff] pl-4 glitch-text"
            data-text="PRAJWAL SHELAR"
          >
            PRAJWAL SHELAR
          </motion.div>
          <div className="text-sm opacity-70 pl-5">SYSTEMS ENGINEER // RESEARCH DIVISION</div>
        </div>

        <div className="text-right flex flex-col items-end gap-1">
          <div className="text-2xl font-mono">{time.toLocaleTimeString()}</div>
          <div className="text-xs text-red-500 animate-pulse">LIVE FEED // ONLINE</div>
          <div className="h-1 w-32 bg-gray-800 mt-2 overflow-hidden">
             <div className="h-full bg-[#00f3ff] w-2/3 animate-[loading_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </header>

      {/* Side Bars */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 text-[10px] text-gray-400">
         <div className="w-1 h-24 bg-gradient-to-b from-transparent via-[#00f3ff] to-transparent opacity-50" />
         <div>COORD: 45.22.91</div>
         <div>VEL: 0.00 M/S</div>
         <div>ALT: 1024 FT</div>
      </div>

      {/* Bottom Bar */}
      <footer className="flex justify-between items-end w-full">
        <div className="flex flex-col gap-2 w-full max-w-md pointer-events-auto">
            <div className="text-xs opacity-60 font-mono h-24 overflow-hidden flex flex-col justify-end">
                {output.map((line, i) => (
                    <div key={i} className="text-[#00f3ff]/80">{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="flex gap-2 items-center bg-black/80 border-2 border-[#00f3ff] p-3 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                <span className="text-[#00f3ff] font-bold">&gt;</span>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-[#00f3ff] font-mono text-sm w-full uppercase placeholder-[#00f3ff]/30"
                    placeholder="TYPE 'HELP' TO START..."
                    autoFocus
                />
            </form>
        </div>

        <div className="flex gap-8 items-center">
           <div className="border border-[#00f3ff]/30 px-4 py-2 text-sm bg-black/50 backdrop-blur-sm animate-pulse">
             [ SCROLL_WHEEL_NAV_ACTIVE ]
           </div>
           <div className="w-16 h-16 border rounded-full border-dashed border-[#00f3ff] animate-[spin_10s_linear_infinite] flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
           </div>
        </div>
      </footer>
      
      <div className="scanline" />
    </div>
  );
}
