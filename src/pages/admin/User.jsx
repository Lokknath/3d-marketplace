import React from "react";
import { useState } from "react";
import "./Grouptable/TableApp.css";
import { Table } from "./Usertable/Table";
import { Modal } from "./Usertable/Modal";

const User = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [rows, setRows] = useState([
		{
			User: "Home",
			EmailID: "This is the main User of the website",
			status: "live",
		},
		{
			User: "About Us",
			EmailID: "This User has details about the company",
			status: "draft",
		},
		{
			User: "Pricing",
			EmailID: "Prices for different subscriptions",
			status: "error",
		},
	]);
	const [rowToEdit, setRowToEdit] = useState(null);

	const handleDeleteRow = (targetIndex) => {
		setRows(rows.filter((_, idx) => idx !== targetIndex));
	};

	const handleEditRow = (idx) => {
		setRowToEdit(idx);

		setModalOpen(true);
	};

	const handleSubmit = (newRow) => {
		rowToEdit === null
			? setRows([...rows, newRow])
			: setRows(
					rows.map((currRow, idx) => {
						if (idx !== rowToEdit) return currRow;

						return newRow;
					})
			  );
	};

	return (
		<>
			<div className="App">
				<Table
					rows={rows}
					deleteRow={handleDeleteRow}
					editRow={handleEditRow}
				/>
				<button onClick={() => setModalOpen(true)} className="btn">
					Add
				</button>
				{modalOpen && (
					<Modal
						closeModal={() => {
							setModalOpen(false);
							setRowToEdit(null);
						}}
						onSubmit={handleSubmit}
						defaultValue={rowToEdit !== null && rows[rowToEdit]}
					/>
				)}
			</div>
		</>
	);
};

export default User;
