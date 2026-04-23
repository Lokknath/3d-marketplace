import React, { useEffect } from "react";

import { Box } from "@mui/material";

import SideNav from "../components/ui/SideNav";
import NavBar from "../components/ui/NavBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Test1 from "./admin/AboutCards";
import AboutCards from "./admin/AboutCards";

const About = () => {
	const navigate = useNavigate();

	const handleSubmit = () => {
		navigate("/test1");
	};

	return (
		<>
			<NavBar />
			<Box height={10} />
			<Box sx={{ display: "flex" }}>
				<SideNav />

				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<AboutCards />
					{/* <Button onClick={handleSubmit}>Submit</Button> */}
				</Box>
			</Box>
		</>
	);
};

export default About;
