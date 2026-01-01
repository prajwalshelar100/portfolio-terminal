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
            transition={{ duration: 1 }}
            className="w-full h-full relative"
        >
            <Scene />
            <HUD />
        </motion.div>
      )}
    </main>
  );
}
