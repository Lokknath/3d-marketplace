import React, { useRef, useState, Suspense } from "react";
import { useGLTF, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import "./scene.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Scene(props) {
	const { nodes, materials } = useGLTF(`${import.meta.env.BASE_URL}models/scene/scene.gltf`);
	const navigate = useNavigate();
	return (
		<>
			<group {...props} dispose={null} rotation={[0, 80, 0]}>
				<group scale={0.001}>
					<group rotation={[-Math.PI / 2, 0, 0]} scale={70}>
						<mesh
							geometry={nodes.bridge_bridge_0.geometry}
							material={materials.bridge}
						/>
						<mesh
							geometry={nodes.bridge_bridge_0_1.geometry}
							material={materials.bridge}
						/>
						<mesh
							geometry={nodes.bridge_emission_0.geometry}
							material={materials.emission}
						/>
						<mesh
							geometry={nodes.bridge_glass_0.geometry}
							material={materials.glass}
						/>
					</group>
				</group>
			</group>
		</>
	);
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/scene/scene.gltf`);
