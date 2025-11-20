import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, useTexture, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import astroImg from '../assets/astro.png';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';

function FloatingImage({ img, position, scale = [1, 1, 1], speed = 1, rotationIntensity = 0.1 }) {
  const texture = useTexture(img);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.1;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2 * speed) * 0.05;

      // Mouse parallax effect (lighter for background elements)
      const { x, y } = state.pointer;
      const parallaxFactor = 0.2;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + x * parallaxFactor, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + y * parallaxFactor, 0.1);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function Background() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, -x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -y * 0.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 25]} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={500} scale={10} size={2} speed={0.4} opacity={0.5} color="#d0d6f9" />

      <Background />

      {/* Main Mascot - Right side - Reduced size by 2x */}
      <FloatingImage img={astroImg} position={[3, 0, 0]} scale={[2, 2, 2]} speed={2} />

      {/* Floating Asset 1 - Top Left (Background) - Moved down */}
      <FloatingImage img={img1} position={[-4, 1.5, -2]} scale={[2, 2, 2]} speed={1.5} />

      {/* Floating Asset 2 - Bottom Left (Foreground) - Moved up */}
      <FloatingImage img={img2} position={[-3, -1.5, 1]} scale={[1.5, 1.5, 1.5]} speed={1.2} />

      {/* Floating Asset 3 - Top Right (Deep Background) - Moved down */}
      <FloatingImage img={img3} position={[4, 2.5, -5]} scale={[3, 3, 3]} speed={0.8} />
    </>
  );
}
