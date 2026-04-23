

import bg from "../../assets/bg/signin.svg";
import bgimg from "../../assets/bg/backimg.jpg";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useState, forwardRef } from "react";

import { Alert as MuiAlert, Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Slide, Snackbar, Stack, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const boxstyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "75%",
	height: "70%",
	bgcolor: "background.paper",
	boxShadow: 24,
};

const center = {
	position: "relative",
	top: "50%",
	left: "30%",
};

export default function ForgotPassword() {
	const darkTheme = createTheme({ palette: { mode: "dark" } });
	const [open, setOpen] = useState(false);
	const [remember, setRemember] = useState(false);
	const vertical = "top";
	const horizontal = "right";
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	function TransitionLeft(props) {
		return <Slide {...props} direction="left" />;
	}

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				TransitionComponent={TransitionLeft}
				anchorOrigin={{ vertical, horizontal }}
			>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					Password reset link sent.
				</Alert>
			</Snackbar>
			<div
				style={{
					backgroundImage: `url(${bgimg})`,
					backgroundSize: "cover",
					height: "100vh",
					color: "#f5f5f5",
				}}
			>
				<Box sx={boxstyle}>
					<Grid container>
						<Grid item xs={12} sm={12} lg={6}>
							<Box
								style={{
									backgroundImage: `url(${bg})`,
									backgroundSize: "cover",
									marginTop: "40px",
									marginLeft: "15px",
									marginRight: "15px",
									height: "63vh",
									color: "#f5f5f5",
								}}
							></Box>
						</Grid>
						<Grid item xs={12} sm={12} lg={6}>
							<Box
								style={{
									backgroundSize: "cover",
									height: "70vh",
									minHeight: "500px",
									backgroundColor: "#3b33d5",
								}}
							>
								<ThemeProvider theme={darkTheme}>
									<Container>
										<Box height={35} />
										<Box sx={center}>
											<Avatar
												sx={{ ml: "85px", mb: "4px", bgcolor: "#ffffff" }}
											>
												<LockOutlinedIcon />
											</Avatar>
											<Typography component="h1" variant="h4">
												Reset Password
											</Typography>
										</Box>
										<Box sx={{ mt: 2 }} />
										<form onSubmit={handleSubmit(onSubmit)}>
											<Grid container spacing={1}>
												<Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
													<TextField
														{...register("email", { required: true })}
														fullWidth
														id="email"
														label="Email"
														name="email"
														autoComplete="email"
													/>
													{errors.email && (
														<span
															style={{ color: "#f7d643", fontSize: "12px" }}
														>
															This field is required
														</span>
													)}
												</Grid>
												<Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
													<Button
														type="submit"
														variant="contained"
														fullWidth="true"
														size="large"
														sx={{
															mt: "15px",
															mr: "20px",
															borderRadius: 28,
															color: "#ffffff",
															minWidth: "170px",
															backgroundColor: "#FF9A01",
														}}
													>
														Send Reset Link
													</Button>
												</Grid>
												<Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
													<Stack direction="row" spacing={2}>
														<Typography
															variant="body1"
															component="span"
															style={{ marginTop: "10px" }}
														>
															Login to your Account.
															<span
																style={{ color: "#beb4fb", cursor: "pointer" }}
																onClick={() => {
																	navigate("/");
																}}
															>
																{" "}
																Sign In
															</span>
														</Typography>
													</Stack>
												</Grid>
											</Grid>
										</form>
									</Container>
								</ThemeProvider>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</div>
		</>
	);
}
