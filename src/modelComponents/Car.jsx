import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Car(props) {
	const { nodes, materials } = useGLTF(`${import.meta.env.BASE_URL}models/car/car.gltf`);
	return (
		<group {...props} dispose={null}>
			<group position={[0.421, 0.322, 0.333]} rotation={[0.698, 0.08, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_40.geometry}
					material={materials.chrome}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_41.geometry}
					material={materials["Material.001"]}
				/>
			</group>
			<group
				position={[0.808, 0.654, -3.01]}
				rotation={[Math.PI / 2, 0, -Math.PI / 2]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_43.geometry}
					material={materials.chrome}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_44.geometry}
					material={materials["Material.001"]}
				/>
			</group>
			<group
				position={[-0.813, 0.651, -3.01]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_46.geometry}
					material={materials.chrome}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_47.geometry}
					material={materials["Material.001"]}
				/>
			</group>
			<group
				position={[-0.274, 0.751, -4.029]}
				rotation={[Math.PI / 2, 0, 2.962]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_49.geometry}
					material={materials.chrome}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_50.geometry}
					material={materials["Material.001"]}
				/>
			</group>
			<group position={[0.924, 0.336, -0.955]}>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_55.geometry}
						material={materials["rubber___tires.001"]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_56.geometry}
						material={materials.tireProtector}
					/>
				</group>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_53.geometry}
					material={materials["rims.001"]}
					position={[-0.01, 0, 0]}
					scale={0.343}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_58.geometry}
					material={materials.brakeCalipers}
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.001}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_60.geometry}
					material={materials["metal_1.001"]}
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.001}
				/>
			</group>
			<group position={[0.924, 0.336, -3.645]}>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_65.geometry}
						material={materials["rubber___tires.001"]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_66.geometry}
						material={materials.tireProtector}
					/>
				</group>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_63.geometry}
					material={materials["rims.001"]}
					position={[-0.01, 0, 0]}
					scale={0.343}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_68.geometry}
					material={materials.brakeCalipers}
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.001}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_70.geometry}
					material={materials["metal_1.001"]}
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.001}
				/>
			</group>
			<group
				position={[-0.917, 0.336, -3.645]}
				rotation={[-Math.PI, 0, -Math.PI]}
			>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_75.geometry}
						material={materials["rubber___tires.001"]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_76.geometry}
						material={materials.tireProtector}
					/>
				</group>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_73.geometry}
					material={materials["rims.001"]}
					position={[-0.01, 0, 0]}
					scale={0.343}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_78.geometry}
					material={materials.brakeCalipers}
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.001}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_80.geometry}
					material={materials["metal_1.001"]}
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.001}
				/>
			</group>
			<group
				position={[-0.917, 0.336, -0.955]}
				rotation={[-Math.PI, 0, -Math.PI]}
			>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_85.geometry}
						material={materials["rubber___tires.001"]}
					/>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Object_86.geometry}
						material={materials.tireProtector}
					/>
				</group>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_83.geometry}
					material={materials["rims.001"]}
					position={[-0.01, 0, 0]}
					scale={0.343}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_88.geometry}
					material={materials.brakeCalipers}
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.001}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_90.geometry}
					material={materials["metal_1.001"]}
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.001}
				/>
			</group>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_4.geometry}
				material={materials["body_color_supra.001"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_6.geometry}
				material={materials["Material.002"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_8.geometry}
				material={materials["Material.002"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_10.geometry}
				material={materials.chrome}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_12.geometry}
				material={materials.chrome}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_14.geometry}
				material={materials.chrome}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_16.geometry}
				material={materials.chrome}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_18.geometry}
				material={materials.chrome}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_20.geometry}
				material={materials.chrome}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_22.geometry}
				material={materials.plasticBlur}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_24.geometry}
				material={materials.headlightCovers}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_26.geometry}
				material={materials.plasticMatte}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_28.geometry}
				material={materials.blockers}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_30.geometry}
				material={materials.plasticBlur}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_32.geometry}
				material={materials.chrome}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_34.geometry}
				material={materials["Material.003"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_36.geometry}
				material={materials.chrome}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_38.geometry}
				material={materials.blockers}
			/>
		</group>
	);
}

useGLTF.preload(`${import.meta.env.BASE_URL}models/car/car.gltf`);
