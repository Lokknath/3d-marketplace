import React, { useState } from "react";

function UserType() {
	const [role, setRole] = useState(""); // Initialize state with empty string or default value

	const handleChange = (event) => {
		setRole(event.target.value);
	};

	return (
		<div>
			<label htmlFor="user-role">Choose a role: </label>
			<select id="user-role" value={role} onChange={handleChange}>
				<option value="">Select a role</option>{" "}
				{/* Optional: default selection prompt */}
				<option value="Admin">Admin</option>
				<option value="Student">Student</option>
				<option value="Teacher">Teacher</option>
			</select>
			{localStorage.setItem("Role:", role)}
		</div>
	);
}

export default UserType;
