import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RainfallSimulation({ position }: { position: [number, number, number] }) {
  const count = 2000;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;
      const speed = 0.05 + Math.random() * 0.1;
      temp.push({ x, y, z, speed, initialY: y });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      particle.y -= particle.speed;
      if (particle.y < -5) {
        particle.y = 5;
      }
      
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(0.02, 0.4, 0.02); // Elongated drops
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
    </instancedMesh>
  );
}
