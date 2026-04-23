import { Suspense } from "react";
import { AmbientLight, PointLight } from "three";

export default function Scene() {
	return (
		<mesh>
			<boxGeometry />
			<meshNormalMaterial />
		</mesh>
	);
}
