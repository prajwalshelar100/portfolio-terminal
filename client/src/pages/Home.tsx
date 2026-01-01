import Scene from "@/components/three/Scene";
import { HUD } from "@/components/ui/HUD";
import { BootSequence } from "@/components/ui/BootSequence";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="w-full h-screen bg-black overflow-hidden relative selection:bg-[#00f3ff] selection:text-black">
      <AnimatePresence mode="wait">
        {!booted && (
          <motion.div 
            key="boot"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100]"
          >
            <BootSequence onComplete={() => setBooted(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {booted && (
        <motion.div 
            key="main"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 2 }}
            className="w-full h-full relative"
        >
            {/* The 3D Scene comes first in the DOM for scrolling */}
            <div className="absolute inset-0 z-0">
              <Scene />
            </div>
            
            {/* The HUD is on top but its container has pointer-events-none */}
            {/* The interactive parts of the HUD (form, popups) have pointer-events-auto */}
            <HUD />
        </motion.div>
      )}
    </main>
  );
}
