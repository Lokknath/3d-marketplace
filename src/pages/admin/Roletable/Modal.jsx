import React, { useState } from "react";
import "../Grouptable/TableApp.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
	const [formState, setFormState] = useState(
		defaultValue || {
			RoleName: "",
			description: "",
			Basedon: "live",
		}
	);
	const [errors, setErrors] = useState("");

	const validateForm = () => {
		if (formState.RoleName && formState.description && formState.status) {
			setErrors("");
			return true;
		} else {
			let errorFields = [];
			for (const [key, value] of Object.entries(formState)) {
				if (!value) {
					errorFields.push(key);
				}
			}
			setErrors(errorFields.join(", "));
			return false;
		}
	};

	const handleChange = (e) => {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		onSubmit(formState);

		closeModal();
	};

	return (
		<div
			className="modal-container"
			onClick={(e) => {
				if (e.target.className === "modal-container") closeModal();
			}}
		>
			<div className="modal">
				<form>
					<div className="form-group">
						<label htmlFor="RoleName">Role Name</label>
						<input
							name="RoleName"
							onChange={handleChange}
							value={formState.RoleName}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							onChange={handleChange}
							value={formState.description}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="status">Based on</label>
						<select
							name="status"
							onChange={handleChange}
							value={formState.status}
						>
							<option value="Role1">Role 1</option>
							<option value="Role2">Role 2</option>
							<option value="Role3">Role 3</option>
						</select>
					</div>
					{errors && <div className="Role3">{`Please include: ${errors}`}</div>}
					<button type="submit" className="btn" onClick={handleSubmit}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
