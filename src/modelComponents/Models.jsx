import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Scene from "./Scene";
import { Button } from "@mui/material";
import "./model.css";

function AutoRotate() {
	useFrame(({ scene }) => {
		scene.rotation.y += 0.01;
	});

	return null;
}

export default function Models() {
	const [isRotating, setIsRotating] = useState(false);

	const handleRotateClick = () => {
		setIsRotating(!isRotating);
	};

	return (
		<>
			<div className="card">
				<Canvas>
					<Suspense fallback={null}>
						<ambientLight />
						{isRotating && <AutoRotate />}
						<group>
							<Scene />
						</group>
						<Environment preset="sunset" />
						<OrbitControls />
					</Suspense>
				</Canvas>
			</div>

			<div style={{ marginLeft: "400px", marginTop: "10px" }}>
				<Button
					onClick={handleRotateClick}
					variant="outlined"
					sx={{ color: isRotating ? "green" : "red" }}
				>
					{isRotating ? "Stop Rotation" : "Start Rotation"}
				</Button>
				<Button
					variant="outlined"
					sx={{
						color: isRotating ? "green" : "red",

						margin: "20px",
					}}
				>
					{" "}
					Button 2
				</Button>
				<Button
					variant="outlined"
					sx={{
						color: isRotating ? "green" : "red",

						margin: "20px",
					}}
				>
					{" "}
					Button 4
				</Button>
				<Button
					variant="outlined"
					sx={{
						color: isRotating ? "green" : "red",

						margin: "20px",
					}}
				>
					{" "}
					Button 3
				</Button>
			</div>
		</>
	);
}
