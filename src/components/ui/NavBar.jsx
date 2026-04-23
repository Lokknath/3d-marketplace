import * as React from "react";
import { AppBar as MuiAppBar, Avatar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Slide, Toolbar, Typography, useScrollTrigger, alpha, styled } from "@mui/material";

import { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useAppStore } from "../../appStore";
// import { Tab, Tabs } from "@mui/material";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
import { Tab, Tabs, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import lok from "../../assets/lok.jpg";
import { RiArrowDropDownLine } from "react-icons/ri";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
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
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
}));
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function NavBar(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const updateOpen = useAppStore((state) => state.updateOpen);
	const dopen = useAppStore((state) => state.dopen);
	const user = useAppStore((state) => state.user);
	const logoutStore = useAppStore((state) => state.logout);
	const navigate = useNavigate();
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const setting = ["Profile", "Account", "Dashboard", "Logout"];
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [selectedSetting, setSelectedSetting] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = (event) => {
		setAnchorEl(null); // Ensure this resets correctly
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const [value, setValue] = React.useState("0");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);
	const handleCloseUserMenu = (setting) => {
		setAnchorElUser(null);
	};
	useEffect(() => {
		if (selectedSetting) {
			const s = selectedSetting.trim().toLowerCase();
			if (s === "logout") {
				logoutStore();
				navigate("/");
			} else {
				navigate(`/${s}`);
			}
			setSelectedSetting(null);
		}
	}, [selectedSetting, navigate, logoutStore]);

	function HideOnScroll(props) {
		const { children, window } = props;
		const trigger = useScrollTrigger({
			target: window ? window() : undefined,
		});

		return (
			<Slide appear={false} direction="down" in={!trigger}>
				{children}
			</Slide>
		);
	}

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{/* <MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem> */}
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		// <Box sx={{ flexGrow: 1 }}>
		<HideOnScroll {...props}>
			<AppBar position="relative">
				<Toolbar sx={{ height: "80px" }}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
						onClick={() => updateOpen(!dopen)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h3"
						noWrap
						component="div"
						// sx={a:{ textDecoration: 'none' }}
						sx={{
							"& a": {
								textDecoration: "none",
								color: "yellow",
								// textAlign: "center",
								display: "inline-block",
								// marginTop: "5px",
							},
						}}
					>
						<a href="/home">
							{" "}
							{/* <img src={imga} style={{ width: "50px", height: "50px" }} /> */}
							EVK
						</a>
					</Typography>
					<a
						style={{
							textDecoration: "none",
							color: "#c4b5fd",
							display: "inline-block",
							marginLeft: "40px",
							marginRight: "28px",
							fontSize: "16px",
							fontWeight: "600",
						}}
						href="/marketplace"
					>
						Marketplace
					</a>
					<a
						style={{
							textDecoration: "none",
							color: "#c4b5fd",
							display: "inline-block",
							marginRight: "28px",
							fontSize: "16px",
							fontWeight: "600",
						}}
						href="/about"
					>
						Admin
					</a>
					<a
						style={{
							textDecoration: "none",
							color: "#c4b5fd",
							display: "inline-block",
							fontSize: "16px",
							fontWeight: "600",
						}}
						href="/setting"
					>
						Upload
					</a>
					{user && (
						<span style={{ color: "#7c3aed", fontSize: "14px", marginLeft: "28px", fontWeight: 600 }}>
							{user.name}
						</span>
					)}
					<Box sx={{ flexGrow: 0, marginLeft: "auto", padding: "10px" }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
								<Avatar alt="" src={lok} sx={{ width: 69, height: 69 }} />
								<RiArrowDropDownLine size={50} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "50px", ml: "1290px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{setting.map((setting, index) => (
								<MenuItem
									key={index}
									onClick={() => {
										handleCloseUserMenu(setting);
										setSelectedSetting(setting);
									}}
									style={{ cursor: "pointer", padding: "10px" }}
								>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					{renderMobileMenu}
					{renderMenu}
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	);
}
