import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, Stars, Sparkles, useGLTF, Float, Text, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function DesktopSetup() {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={[0, -1, 0]}>
      {/* Table */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[10, 0.1, 5]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Monitor Stand */}
      <mesh position={[0, 0.2, -1.5]}>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Monitor Screen */}
      <group position={[0, 1.5, -1.5]} rotation={[-0.05, 0, 0]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[4.2, 2.5, 0.1]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        
        {/* Screen Content */}
        <mesh 
          position={[0, 0, 0.06]} 
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => window.open("https://www.prajwalshelar.online/", "_blank")}
        >
          <planeGeometry args={[4, 2.3]} />
          <meshBasicMaterial color={hovered ? "#00f3ff" : "#005577"} />
          
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="white"
            font="https://fonts.gstatic.com/s/orbitron/v25/yMJRMI86ZGVGONoazC1WC98.woff"
          >
            {hovered ? "INITIALIZE LINK" : "SYSTEM_IDLE"}
          </Text>
          
          <Text
            position={[0, -0.5, 0.01]}
            fontSize={0.1}
            color="#00f3ff"
            opacity={hovered ? 1 : 0.5}
          >
            CLICK TO OPEN PORTFOLIO
          </Text>
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, 0.1, -0.5]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[2, 0.1, 0.8]} />
        <meshStandardMaterial color="#0a0a0a" />
        {/* Key glow */}
        <pointLight position={[0, 0.2, 0]} intensity={0.5} color="#00f3ff" distance={2} />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[1.5, 0.1, -0.5]}>
        <capsuleGeometry args={[0.15, 0.2, 4, 8]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={10} blur={2} far={1} />
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
      <pointLight position={[-10, 10, 5]} intensity={0.5} color="#ff00a0" />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <DesktopSetup />
        </Float>
      </Suspense>

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={1} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-auto overflow-hidden">
      <Canvas 
        gl={{ antialias: true }} 
        dpr={[1, 2]}
        camera={{ position: [0, 2, 6], fov: 45 }}
      >
        <SceneContent />
        <Preload all />
      </Canvas>
    </div>
  );
}
