import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  
  const bootText = [
    "INITIALIZING KERNEL...",
    "LOADING MEMORY MODULES... [OK]",
    "MOUNTING FILE SYSTEMS... [OK]",
    "CHECKING GPU INTEGRITY... [OK]",
    "LOADING NEURAL INTERFACE...",
    "ESTABLISHING SECURE CONNECTION...",
    "USER IDENTITY VERIFIED: PRAJWAL SHELAR",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col justify-end p-10 font-mono text-xs md:text-sm text-[#00f3ff] leading-relaxed">
      {lines.map((line, i) => (
        <div key={i}>{`> ${line}`}</div>
      ))}
      <div className="animate-pulse">_</div>
      
      <div className="absolute top-10 right-10 border border-[#00f3ff] p-2 text-[10px] opacity-50">
        <div>BIOS v4.0.2</div>
        <div>RAM: 64GB OK</div>
        <div>CPU: 12 CORE OK</div>
      </div>
    </div>
  );
}
