import React from "react";
import { useState } from "react";

import "./Grouptable/TableApp.css";
import { Table } from "./Grouptable/Table";
import { Modal } from "./Grouptable/Modal";

const Group = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [rows, setRows] = useState([
		{
			GroupName: "Home",
			description: "This is the main GroupName of the website",
			status: "live",
		},
		{
			GroupName: "About Us",
			description: "This GroupName has details about the company",
			status: "draft",
		},
		{
			GroupName: "Pricing",
			description: "Prices for different subscriptions",
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

export default Group;
