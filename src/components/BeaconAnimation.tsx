import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, SpotLight, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const Beacon = () => {
  const spotLight = useRef<THREE.SpotLight>(null);
  const lightCone = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (spotLight.current) {
      // Pulsate intensity
      spotLight.current.intensity = 5 + Math.sin(clock.getElapsedTime() * 2) * 2;
    }
    
    if (lightCone.current) {
      // Rotate the light cone
      lightCone.current.rotation.y += 0.005;
    }
  });

  // Create a simple lighthouse model
  return (
    <group position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[1.5, 2, 1, 32]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
      
      {/* Tower */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.8, 1.2, 4, 32]} />
        <meshStandardMaterial color="#1F2937" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Top dome */}
      <mesh position={[0, 3.5, 0]}>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Beacon light housing */}
      <mesh position={[0, 3.2, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.5, 16]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      {/* Beacon light */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#F59E0B" 
          emissive="#F59E0B" 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
      </mesh>
      
      {/* Spotlight */}
      <SpotLight
        ref={spotLight}
        position={[0, 3.2, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={8}
        color="#F59E0B"
        distance={10}
        castShadow
      />
      
      {/* Light cone visualization */}
      <group ref={lightCone}>
        <mesh position={[0, 0, 4]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[3, 8, 16, 1, true]} />
          <meshBasicMaterial 
            color="#F59E0B" 
            transparent={true} 
            opacity={0.2} 
            side={THREE.BackSide} 
          />
        </mesh>
      </group>
      
      {/* Platform rings */}
      {[-0.5, 0, 0.5].map((y, i) => (
        <mesh key={i} position={[0, 2 + y, 0]}>
          <torusGeometry args={[1 + (i * 0.05), 0.1, 16, 32]} />
          <meshStandardMaterial color={i === 1 ? "#3B82F6" : "#4B5563"} />
        </mesh>
      ))}
      
      {/* Decorative elements */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh 
            key={i} 
            position={[
              Math.cos(angle) * 0.9, 
              3.2, 
              Math.sin(angle) * 0.9
            ]}
          >
            <boxGeometry args={[0.1, 0.3, 0.1]} />
            <meshStandardMaterial color="#4B5563" />
          </mesh>
        );
      })}
      
      {/* Data particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 3 + Math.random() * 3;
        const yPos = Math.random() * 5 - 1;
        
        return (
          <mesh 
            key={i} 
            position={[
              Math.cos(angle) * radius, 
              yPos, 
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05 + Math.random() * 0.1]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#3B82F6" : "#10B981"} 
              emissive={Math.random() > 0.5 ? "#3B82F6" : "#10B981"}
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const BeaconScene = () => {
  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
    >
      <Beacon />
    </Float>
  );
};

const BeaconAnimation: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[10, 5, 10]} fov={30} />
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
                <directionalLight 
          position={[5, 8, 5]} 
          intensity={0.8} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <BeaconScene />
      </Canvas>
    </div>
  );
};

export default BeaconAnimation;
