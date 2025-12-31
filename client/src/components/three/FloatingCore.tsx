import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Text, Float, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

export function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
    
    if (ringRef1.current) {
        ringRef1.current.rotation.x = time * 0.1;
        ringRef1.current.rotation.z = time * 0.1;
    }

    if (ringRef2.current) {
        ringRef2.current.rotation.y = -time * 0.2;
        ringRef2.current.rotation.x = time * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Main Core */}
        <Icosahedron args={[1, 1]} ref={meshRef}>
          <meshStandardMaterial
            color="black"
            emissive="#00f3ff"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={1}
            wireframe
          />
        </Icosahedron>
        
        {/* Inner Solid Core */}
        <Sphere args={[0.5, 32, 32]}>
           <meshBasicMaterial color="white" />
        </Sphere>
        
        {/* Outer Ring 1 */}
        <Torus args={[1.8, 0.02, 16, 100]} ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.3} />
        </Torus>
        
        {/* Outer Ring 2 */}
        <Torus args={[2.2, 0.01, 16, 100]} ref={ringRef2} rotation={[0, Math.PI / 2, 0]}>
            <meshBasicMaterial color="#ff00a0" transparent opacity={0.3} />
        </Torus>

      </Float>

      <Text
        position={[0, -2.5, 0]}
        fontSize={0.2}
        font="https://fonts.gstatic.com/s/orbitron/v25/yMJRMI86ZGVGONoazC1WC98.woff"
        color="#00f3ff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        SYSTEMS ARCHITECT
      </Text>
    </group>
  );
}
