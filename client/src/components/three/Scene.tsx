import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, Preload, Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import * as THREE from "three";
import { FloatingCore } from "./FloatingCore";
import { Sections } from "./Sections";
import { CameraRig } from "./CameraRig";

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00a0" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#00f3ff" />
      
      <ScrollControls pages={10} damping={0.2} distance={1}>
        <CameraRig />
        <Scroll>
          <FloatingCore />
          <Sections />
        </Scroll>
      </ScrollControls>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-auto">
      <Canvas 
        gl={{ antialias: false, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }} 
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
