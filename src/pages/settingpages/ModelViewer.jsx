import React from "react";
import ModelViewer from "react-model-viewer";

const MyModelViewerComponent = () => {
	return (
		<div>
			<ModelViewer
				src="path_to_your_model.glb"
				alt="A 3D model"
				camera-controls
				auto-rotate
				background-color="#f0f0f0"
				style={{ width: "400px", height: "300px" }}
			></ModelViewer>
		</div>
	);
};

export default MyModelViewerComponent;
