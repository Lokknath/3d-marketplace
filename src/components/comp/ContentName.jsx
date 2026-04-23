import React, { useState, useEffect } from "react";

const ContentName = ({ inputType, initialValue }) => {
	const [inputValue, setInputValue] = useState(initialValue || "");

	useEffect(() => {
		setInputValue(initialValue);
	}, [initialValue]);

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	const saveToLocalStorage = () => {
		localStorage.setItem(inputType, inputValue);
		alert(`${inputType} saved!`);
	};

	return (
		<div>
			<label htmlFor={inputType}>
				{inputType === "contentName" ? "Content Name" : "Description"}:
			</label>
			{inputType === "description" ? (
				<textarea
					id={inputType}
					name={inputType}
					value={inputValue}
					onChange={handleChange}
				/>
			) : (
				<input
					type="text"
					id={inputType}
					name={inputType}
					value={inputValue}
					onChange={handleChange}
				/>
			)}
			<button onClick={saveToLocalStorage}>Save to Local Storage</button>
		</div>
	);
};

export default ContentName;
