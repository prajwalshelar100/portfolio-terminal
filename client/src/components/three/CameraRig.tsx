import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();
  const vec = new THREE.Vector3();

  useFrame((state, delta) => {
    // Current scroll offset (0 to 1)
    const offset = scroll.offset;

    // Camera movement logic based on scroll
    // Start: [0, 0, 5]
    // Move down as we scroll
    
    const targetY = -offset * state.viewport.height * 8; // Match total height of sections
    
    // Smoothly interpolate camera position
    // We also add some noise/sway based on mouse position for "cockpit" feel
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.05);
    camera.lookAt(0, targetY, 0); // Always look at the center of the current section
    
    // Add subtle camera roll based on horizontal mouse movement
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, state.mouse.x * 0.05, 0.1);
  });

  return null;
}
