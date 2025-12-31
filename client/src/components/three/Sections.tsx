import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text, Image, Float } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { RainfallSimulation } from "./RainfallSimulation";

// Reusable Tech Badge
function TechBadge({ text, position, color = "#00f3ff" }: { text: string; position: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(state.camera.position);
      if (hovered) {
        ref.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group 
      position={position} 
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <planeGeometry args={[2.5, 0.8]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} wireframe={!hovered} side={THREE.DoubleSide} />
      </mesh>
      <Text
        fontSize={0.3}
        color={hovered ? "white" : color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/rajdhani/v15/L1T52bM712Muxd8aM94.woff"
      >
        {text}
      </Text>
    </group>
  );
}

// Project Panel
function ProjectPanel({ title, description, position, index, children }: { title: string; description: string; position: [number, number, number], index: number, children?: React.ReactNode }) {
    const ref = useRef<THREE.Group>(null);
    const scroll = useScroll();
    
    return (
        <group position={position} ref={ref}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Frame */}
                <mesh position={[0, 0, -0.1]}>
                    <boxGeometry args={[5, 3, 0.1]} />
                    <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh>
                    <boxGeometry args={[5.1, 3.1, 0.05]} />
                    <meshBasicMaterial color="#00f3ff" wireframe />
                </mesh>
                
                {/* Content */}
                <Text position={[-2.2, 1.2, 0.1]} fontSize={0.3} color="#00f3ff" anchorX="left" maxWidth={4}>
                    {`PROJECT_0${index + 1} //`}
                </Text>
                <Text position={[-2.2, 0.5, 0.1]} fontSize={0.5} color="white" anchorX="left" maxWidth={4.5}>
                    {title}
                </Text>
                <Text position={[-2.2, -0.5, 0.1]} fontSize={0.2} color="#cccccc" anchorX="left" maxWidth={4.5} lineHeight={1.5}>
                    {description}
                </Text>
                
                {children}
            </Float>
        </group>
    )
}

export function Sections() {
  const { width, height } = useThree((state) => state.viewport);

  return (
    <>
      {/* SECTION 2: SKILLS (Scroll Offset ~1-2) */}
      <group position={[0, -height * 1.5, 0]}>
        <Text position={[0, 3, 0]} fontSize={1} color="#00f3ff" font="https://fonts.gstatic.com/s/orbitron/v25/yMJRMI86ZGVGONoazC1WC98.woff">
            CORE SYSTEMS
        </Text>
        
        {/* Java Orbit */}
        <TechBadge text="JAVA SYSTEM" position={[-3, 1, 0]} />
        <TechBadge text="SPRING BOOT" position={[3, 1, 0]} />
        <TechBadge text="MICROSERVICES" position={[-3, -1, 0]} />
        <TechBadge text="SYSTEMS ARCHITECTURE" position={[3, -1, 0]} />
        <TechBadge text="DATA STRUCTURES" position={[0, -2.5, 0]} color="#ff9e00" />
      </group>

      {/* SECTION 3: PROJECTS (Scroll Offset ~2-3) */}
      <group position={[0, -height * 3, 0]}>
         <Text position={[-width/3, 4, 0]} fontSize={0.8} color="white" anchorX="left">
            RESEARCH ARCHIVES
         </Text>
         
         <ProjectPanel 
            index={0}
            title="IMD RAINFALL ANALYZER" 
            description="Automated system for spatio-temporal analysis of large-scale rainfall datasets. Research-grade accuracy."
            position={[-2, 1, 0]}
         >
             {/* Localized rainfall effect around this project */}
             <group position={[3, 0, 0]} scale={[0.5, 0.5, 0.5]}>
                <RainfallSimulation position={[0, 0, 0]} />
             </group>
         </ProjectPanel>
         
         <ProjectPanel 
            index={1}
            title="VISION RECOGNITION" 
            description="Real-time face detection & capture system using OpenCV and Java Swing for automated security."
            position={[2, -2.5, 0]}
         />
      </group>

      {/* SECTION 4: CONTACT (Scroll Offset ~4) */}
      <group position={[0, -height * 4.2, 0]}>
        <Text fontSize={1.5} color="#00f3ff" position={[0, 0, 0]}>
            INITIATE UPLINK
        </Text>
        <Text fontSize={0.3} color="white" position={[0, -1, 0]}>
            prajwalshelar.dev@system.local
        </Text>
      </group>
    </>
  );
}
