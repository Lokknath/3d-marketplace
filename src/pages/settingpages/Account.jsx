import React from "react";

import { Box } from "@mui/material";

import SideNav from "../../components/ui/SideNav";
import NavBar from "../../components/ui/NavBar";

// import { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
const Account = () => {
	return (
		<>
			<NavBar />
			<Box height={30} />
			<Box sx={{ display: "flex" }}>
				<SideNav />

				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<h1>Account</h1>
					{/* <model-viewer
						alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
						src="../../../src/assets/car.glb"
						camera-controls
						touch-action="pan-y"
					></model-viewer> */}
					{/* <ModelViewer
						src="../../../src/assets/car.glb"
						alt="A 3D model"
						camera-controls
						auto-rotate
						background-color="#f0f0f0"
						style={{ width: "400px", height: "300px" }}
					></ModelViewer> */}
				</Box>
			</Box>

			{/* <Suspense>
				<Canvas>
					<OrbitControls target={[0, 0.35, 0]} />
					<PerspectiveCamera />
					<mesh>
						<boxGeometry args={[2, 2, 2]} />
						<meshBasicMaterial color={"red"} />
					</mesh>
				</Canvas>
			</Suspense> */}
		</>
	);
};

export default Account;
