import { useTheme } from "@mui/material/styles";

export default function Testing() {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation(); // Use the useLocation hook here
	const open = useAppStore((state) => state.dopen);

	// Define your navigation items here
	const navItems = [
		{ label: "Home", icon: <FaHome />, path: "/home" },
		{ label: "About", icon: <CgProfile />, path: "/about" },
		{ label: "Setting", icon: <IoSettingsOutline />, path: "/setting" },
	];

	// Optionally, filter navItems based on the current location if needed
	// For example, this could remove the current page's nav item or modify the list based on the user's state or permissions
	const filteredNavItems = navItems.filter(
		(item) => item.path !== location.pathname
	);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<Box height={30} marginTop={5} />
					<IconButton
						onClick={() =>
							useAppStore.setState((state) => ({ dopen: !state.dopen }))
						}
						size="large"
						edge="start"
						color="inherit"
						aria-label={open ? "close drawer" : "open drawer"}
						sx={{ ml: 1 }}
					>
						{open ? <ChevronLeftIcon /> : <MenuIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider sx={{ height: "10px" }} />
				<List sx={{ mt: 3 }}>
					{filteredNavItems.map((item) => (
						<ListItem
							key={item.label} // Use unique keys for React items
							sx={{ display: "block" }}
							onClick={() => navigate(item.path)}
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
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={
										<Typography
											variant="body1"
											sx={{
												opacity: open ? 1 : 0,
												fontFamily: "sans-serif",
											}}
										>
											{item.label}
										</Typography>
									}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
}
