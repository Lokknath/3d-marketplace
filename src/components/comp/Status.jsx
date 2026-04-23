import React, { useState } from "react";

function Status() {
	// Initialize state with an empty string or a default status
	const [status, setStatus] = useState("");

	const handleChange = (event) => {
		setStatus(event.target.value);
	};

	return (
		<div>
			<label htmlFor="status-select">Select Status: </label>
			<select id="status-select" value={status} onChange={handleChange}>
				<option value="">--Please choose an option--</option>
				<option value="Active">Active</option>
				<option value="Inactive">Inactive</option>
				<option value="InProgress">In Progress</option>
			</select>
			{localStorage.setItem("staus:", status)}
		</div>
	);
}

export default Status;
