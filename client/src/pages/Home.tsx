import Scene from "@/components/three/Scene";
import { HUD } from "@/components/ui/HUD";
import { BootSequence } from "@/components/ui/BootSequence";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const { toast } = useToast();

  return (
    <main className="w-full h-screen bg-black overflow-hidden relative selection:bg-[#00f3ff] selection:text-black">
      <AnimatePresence>
        {!booted && (
          <motion.div 
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
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 2 }}
            className="w-full h-full"
        >
            <HUD />
            <Scene />
        </motion.div>
      )}
    </main>
  );
}
