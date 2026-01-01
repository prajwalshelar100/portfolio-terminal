import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Preload, Float, Stars, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef, useState } from "react";
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
      
      <ScrollControls pages={10} damping={0.2} distance={1.5}>
        <CameraRig />
        <Scroll>
          {/* 3D Objects anchored to scroll positions */}
          <FloatingCore />
          <Sections />
        </Scroll>
        <Scroll html>
          {/* HTML Overlay Content managed by Scroll */}
          <div style={{ width: '100vw', height: '100vh' }} /> 
          {/* This empty div is just a spacer, actual content is in Overlay.tsx or handled via 3D text for immersion */}
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
    <div className="w-full h-screen bg-black absolute top-0 left-0 -z-10">
      <Canvas gl={{ antialias: false, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
