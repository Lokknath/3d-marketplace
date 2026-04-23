import React from "react";

import { Box } from "@mui/material";

import SideNav from "../../components/ui/SideNav";
import NavBar from "../../components/ui/NavBar";
import { Button, TextField } from "@mui/material";
import AssetType from "../../components/comp/AssetType";
import { useState, saveToLocalStorage } from "react";
import ContentName from "../../components/comp/ContentName";
import YesNO from "../../components/comp/YesNo";
// import FileUpload from "../../components/comp/FileUpload";
import { useNavigate } from "react-router-dom";
import File from "../../components/comp/File";

const Asset = () => {
	const [contentName, setContentName] = useState("");

	const handleChange = (event) => {
		setContentName(event.target.value);
	};
	const navigate = useNavigate();

	return (
		<>
			<NavBar />
			<Box height={30} />
			<Box
				sx={{
					display: "flex",
					// backgroundColor: "red",
					width: "900px",
					padding: 5,
				}}
			>
				<SideNav />

				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<h1>Asset</h1>
					<AssetType />
					<br />
					<ContentName
						inputType="contentName"
						initialValue="Initial Content Name"
					/>
					<br />
					<ContentName inputType="description" initialValue="Initial  Name" />
					<br />
					<YesNO />
					<br />
					<AssetType />
					<br />

					<br />
					<Button
						onClick={() => {
							navigate("/home");
						}}
						variant="outlined"
					>
						Cancel{" "}
					</Button>
				</Box>

				<Box
					sx={{
						display: "inline-block",
						// backgroundColor: "blue",
						width: "600px",
						// display: "flex",
						ml: 9,
					}}
				></Box>
			</Box>
		</>
	);
};

export default Asset;
