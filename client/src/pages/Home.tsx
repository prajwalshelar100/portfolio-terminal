import Scene from "@/components/three/Scene";
import { HUD } from "@/components/ui/HUD";
import { BootSequence } from "@/components/ui/BootSequence";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="w-full h-screen bg-black relative selection:bg-[#00f3ff] selection:text-black">
      <AnimatePresence mode="wait">
        {!booted && (
          <motion.div 
            key="boot"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100]"
          >
            <BootSequence onComplete={() => setBooted(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {booted && (
        <div className="w-full h-full relative">
          <div className="absolute inset-0 z-0">
            <Scene />
          </div>
          <div className="absolute inset-0 z-10 pointer-events-none">
            <HUD />
          </div>
        </div>
      )}
    </main>
  );
}
