import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function HUD() {
  const [time, setTime] = useState(new Date());
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    
    const cmd = input.toUpperCase();
    let response = `> COMMAND NOT RECOGNIZED: ${cmd}`;
    
    if (cmd === "HELP") response = "> COMMANDS: IDENTITY, PROJECTS, CONTACT, CLEAR";
    if (cmd === "IDENTITY") response = "> SUBJECT: PRAJWAL SHELAR | SYSTEMS ENGINEER";
    if (cmd === "PROJECTS") response = "> LOADING PROJECT DATABASE... 3 ENTRIES FOUND";
    if (cmd === "CONTACT") response = "> UPLINK ESTABLISHED. EMAIL: prajwalshelar.dev@system.local";
    if (cmd === "CLEAR") {
        setOutput([]);
        setInput("");
        return;
    }

    setOutput(prev => [...prev.slice(-4), `> ${input}`, response]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-8 text-[#00f3ff] font-rajdhani uppercase tracking-widest mix-blend-screen">
      
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

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 items-end">
          {[...Array(5)].map((_, i) => (
             <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-[#00f3ff]' : 'bg-gray-800'}`} />
          ))}
      </div>

      {/* Bottom Bar */}
      <footer className="flex justify-between items-end w-full">
        <div className="flex flex-col gap-2 w-1/3 pointer-events-auto">
            <div className="text-xs opacity-60 font-mono h-24 overflow-hidden flex flex-col justify-end">
                {output.map((line, i) => (
                    <div key={i} className="text-[#00f3ff]/80">{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="flex gap-2 items-center bg-black/50 border border-[#00f3ff]/30 p-2">
                <span className="text-[#00f3ff]">&gt;</span>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-[#00f3ff] font-mono text-sm w-full uppercase placeholder-[#00f3ff]/30"
                    placeholder="ENTER COMMAND..."
                />
            </form>
        </div>

        <div className="flex gap-8 items-center">
           <div className="border border-[#00f3ff]/30 px-4 py-2 text-sm bg-black/50 backdrop-blur-sm">
             SCROLL TO NAVIGATE
           </div>
           <div className="w-16 h-16 border rounded-full border-dashed border-[#00f3ff] animate-[spin_10s_linear_infinite] flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
           </div>
        </div>
      </footer>
      
      {/* CRT Scanline Overlay applied via CSS class .scanline in index.css */}
      <div className="scanline" />
    </div>
  );
}
