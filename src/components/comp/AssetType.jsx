import React, { useState } from "react";

function AssetType() {
	const [mediaType, setMediaType] = useState("");

	const handleChange = (event) => {
		setMediaType(event.target.value);
	};

	return (
		<div>
			<label htmlFor="media-type">Choose a media type: </label>
			<select id="media-type" value={mediaType} onChange={handleChange}>
				<option value="">Select a type</option> {/* Optional */}
				<option value="2D">2D</option>
				<option value="3D">3D</option>
				<option value="360">360</option>
				<option value="Video">Video</option>
			</select>
			{localStorage.setItem("mediaType", mediaType)}
			{/* Display selected type */}
		</div>
	);
}

export default AssetType;
