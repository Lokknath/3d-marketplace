import * as React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { Card, CardContent, Stack, styled } from "@mui/material";
import Group from "./Group";
import Role from "./Role";
import User from "./User";
const StyledTabs = styled((props) => (
	<Tabs
		{...props}
		TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
	/>
))({
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	"& .MuiTabs-indicatorSpan": {
		maxWidth: 40,
		width: "100%",
		backgroundColor: "#635ee7",
	},
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: "none",
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		color: "red",
		// fontWeight: "400px",	"&.Mui-selected": {	color: "blue",},"&.Mui-focusVisible": {	backgroundColor: "rgba(100, 95, 228, 0.32)",
		// backgroundColor: " green",},
	})
);

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<>
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		</>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function AboutCards() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Card>
				<CardContent>
					<Box sx={{ width: "1240px", height: "500px" }}>
						<Box
							sx={{
								borderBottom: 1,
								borderColor: "divider",
							}}
						>
							<StyledTabs
								value={value}
								onChange={handleChange}
								aria-label="basic tabs example"
							>
								<StyledTab label="User" {...a11yProps(0)} />
								<StyledTab label="Role" {...a11yProps(1)} />
								<StyledTab label="Group" {...a11yProps(2)} />
							</StyledTabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<User />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={1}>
							<Role />
						</CustomTabPanel>
						<CustomTabPanel value={value} index={2}>
							<Group />
						</CustomTabPanel>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}
