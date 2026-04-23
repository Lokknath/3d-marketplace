import React, { useState } from "react";
import "../Grouptable/TableApp.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
	const [formState, setFormState] = useState(
		defaultValue || {
			Name: "",
			EmailID: "",
			status: "Guest",
		}
	);
	const [errors, setErrors] = useState("");

	const validateForm = () => {
		if (formState.Name && formState.EmailID && formState.status) {
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
						<label htmlFor="RoleName"> Name</label>
						<input name="Name" onChange={handleChange} value={formState.Name} />
					</div>
					<div className="form-group">
						<label htmlFor="description">Email Id</label>
						<textarea
							name="description"
							onChange={handleChange}
							value={formState.EmailID}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="status">Role</label>
						<select
							name="status"
							onChange={handleChange}
							value={formState.status}
						>
							<option value="live">Admin</option>
							<option value="draft">User</option>
							<option value="Guest">Guest</option>
						</select>
					</div>
					{errors && <div className="Guest">{`Please include: ${errors}`}</div>}
					<button type="submit" className="btn" onClick={handleSubmit}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
