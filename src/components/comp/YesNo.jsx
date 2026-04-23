import React, { useState } from "react";

function YesNO() {
	// Initialize state with 'No' as default or '' for no initial selection
	const [selection, setSelection] = useState("");

	const handleChange = (event) => {
		setSelection(event.target.value);
	};

	return (
		<div>
			<label htmlFor="yes-no-select">Choose an option for Animation: </label>
			<select id="yes-no-select" value={selection} onChange={handleChange}>
				<option value="">--Please choose an option--</option>{" "}
				{/* Optional: Prompt */}
				<option value="Yes">Yes</option>
				<option value="No">No</option>
			</select>
			{localStorage.setItem("Animation:", selection)}
			{/* Display the selection */}
		</div>
	);
}

export default YesNO;
