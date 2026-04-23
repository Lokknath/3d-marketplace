import * as React from "react";
import { AppBar as MuiAppBar, Box, CssBaseline, Divider, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, styled, useTheme } from "@mui/material";

import { useState, useEffect } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../appStore";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { Collapse } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiFillFilePdf } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";

const drawerWidth = 240;

const userdata = ["User", "Group", "Role"];

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function SideNav() {
	const theme = useTheme();
	// const [open, setOpen] = React.useState(true);
	const updateOpen = useAppStore((state) => state.updateOpen);
	const open = useAppStore((state) => state.dopen);
	const navigate = useNavigate();
	const dopen = useAppStore((state) => state.dopen);
	const [isCollapse, setIsCollapse] = React.useState(false);

	const handleCollapse = () => {
		setIsCollapse(!isCollapse);
	};

	const [selectedSetting, setSelectedSetting] = useState(null);
	useEffect(() => {
		if (selectedSetting) {
			const toPath = `/${selectedSetting.toLowerCase()}`;
			navigate(toPath);
			setSelectedSetting(null); // Reset the selected setting after navigation
		}
	}, [selectedSetting, navigate]);

	return (
		<Box
			onMouseEnter={() => updateOpen(true)}
			onMouseLeave={() => updateOpen(false)}
			sx={{ display: "flex" }}
		>
			<CssBaseline />

			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<Box height={30} marginTop={5} />
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ ml: 1 }}
						// onClick={() => updateOpen(!dopen)}
					>
						<MenuIcon />
					</IconButton>
				</DrawerHeader>
				<Divider sx={{ height: "10px" }} />
				{/* <List></List> */}

				<List sx={{ mt: 3 }}>
					<ListItem
						// disablePadding
						sx={{ display: "block" }}
						onClick={() => {
							navigate("/home");
						}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
								fontSize: "30px",
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
									fontsize: "3px",
								}}
							>
								<FaHome />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										variant="body1"
										sx={{
											opacity: open ? 1 : 0,
											fontSize: "30px",
											fontFamily: "sans-serif",
										}} // Adjust text size here
									>
										Home
									</Typography>
								}
							/>
						</ListItemButton>
					</ListItem>

					<ListItem
						sx={{ display: "block" }}
						onClick={() => navigate("/marketplace")}
					>
						<ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2, fontSize: "30px" }}>
							<ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
								<MdStorefront />
							</ListItemIcon>
							<ListItemText primary={
								<Typography variant="body1" sx={{ opacity: open ? 1 : 0, fontSize: "22px", fontFamily: "sans-serif" }}>
									Market
								</Typography>
							} />
						</ListItemButton>
					</ListItem>

					<ListItem
						sx={{ display: "block" }}
						onClick={() => {
							navigate("/about");
						}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2,
								fontSize: "30px",
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
									fontsize: "3px",
								}}
							>
								<CgProfile />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										variant="body1"
										sx={{
											opacity: open ? 1 : 0,
											fontSize: "30px",
											fontFamily: "sans-serif",
										}} // Adjust text size here
									>
										Admin
									</Typography>
								}
							></ListItemText>
						</ListItemButton>
					</ListItem>
					{/* <Divider /> */}
					{/* <Collapse in={isCollapse} timeout="auto" unmountOnExit>
						<Divider />
						<List>
							{userdata.map((text, index) => (
								<ListItem
									key={text}
									onClick={() => setSelectedSetting(text)}
									disablePadding
									sx={{ display: "block" }}
								>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open ? "initial" : "center",
											px: 2.5,
										}}
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : "auto",
												justifyContent: "center",
											}}
										>
											{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
										</ListItemIcon>
										<ListItemText
											primary={text}
											sx={{ opacity: open ? 1 : 0 }}
										/>
									</ListItemButton>
								</ListItem>
							))}
						</List>
						<Divider />
					</Collapse> */}
					<ListItem
						// disablePadding
						sx={{ display: "block" }}
						onClick={() => {
							navigate("/asset");
						}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2,
								fontSize: "30px",
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
									fontsize: "3px",
								}}
							>
								<AiFillFilePdf />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										variant="body1"
										sx={{
											opacity: open ? 1 : 0,
											fontSize: "30px",
											fontFamily: "sans-serif",
										}} // Adjust text size here
									>
										Asset
									</Typography>
								}
							></ListItemText>
						</ListItemButton>
					</ListItem>
					<ListItem
						// disablePadding
						sx={{ display: "block" }}
						onClick={() => {
							navigate("/setting");
						}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
									fontSize: "30px",
								}}
							>
								<IoSettingsOutline />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography
										variant="body1"
										sx={{
											opacity: open ? 1 : 0,
											fontSize: "30px",
											fontFamily: "sans-serif",
										}} // Adjust text size here
									>
										Setting
									</Typography>
								}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</Box>
	);
}
