import React from "react";

import { Box } from "@mui/material";

import SideNav from "../components/ui/SideNav";
import NavBar from "../components/ui/NavBar";
import File from "../components/comp/File";

const About = () => {
	return (
		<>
			<NavBar />
			<Box height={30} />
			<Box sx={{ display: "flex" }}>
				<SideNav />

				<Box component="main" sx={{ p: 3, backgroundColor: "green" }}>
					<h1>
						<File />
					</h1>
				</Box>
			</Box>
		</>
	);
};

export default About;
