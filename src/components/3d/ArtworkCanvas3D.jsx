import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Shape({ geometry, color, emissive, metalness, roughness }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "torusKnot":
        return <torusKnotGeometry args={[0.55, 0.18, 128, 16]} />;
      case "torus":
        return <torusGeometry args={[0.65, 0.28, 16, 100]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.8, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.85, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.75, 0]} />;
      case "sphere":
        return <sphereGeometry args={[0.8, 64, 64]} />;
      case "box":
        return <boxGeometry args={[1.1, 1.1, 1.1]} />;
      default:
        return <torusKnotGeometry args={[0.55, 0.18, 128, 16]} />;
    }
  };

  return (
    <mesh ref={meshRef}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        emissive={emissive || "#000000"}
        emissiveIntensity={0.4}
        metalness={metalness ?? 0.8}
        roughness={roughness ?? 0.2}
      />
    </mesh>
  );
}

export default function ArtworkCanvas3D({
  geometry,
  color,
  emissive,
  metalness,
  roughness,
  height = 220,
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      style={{ height, width: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -3, -3]} intensity={1} color={color} />
      <Shape
        geometry={geometry}
        color={color}
        emissive={emissive}
        metalness={metalness}
        roughness={roughness}
      />
    </Canvas>
  );
}
