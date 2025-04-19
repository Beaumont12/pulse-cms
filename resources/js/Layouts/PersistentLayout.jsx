import React, { useState, useEffect } from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebase"; // ✅ Adjust if needed
import Sidebar from "./../Components/Sidebar";
import AppRoutes from "./../routes";
import logo from "./../assets/logo.svg";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const SIDEBAR_WIDTH_EXPANDED = 300;
const SIDEBAR_WIDTH_COLLAPSED = 80;

export default function PersistentLayout() {
    const [expanded, setExpanded] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        photoURL: "",
    });
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width:600px)");
    const theme = useTheme();
    const role = localStorage.getItem("userRole");

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(db, `users/${user.uid}`);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setUserData({
                        name: data.name || "User Name",
                        email: data.email || user.email,
                        photoURL: data.photoURL || "", // <-- add this field to Realtime DB
                    });
                }
            });
        }
    }, []);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={1}
                sx={{
                    backgroundColor: "#FAFAFF",
                    color: "#450001",
                    px: 2,
                    py: 1,
                    borderBottom: "1px solid #E0E0E0",
                    zIndex: 1300,
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{ justifyContent: "space-between", px: 2 }}
                >
                    {/* Left Section */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                            onClick={() => setExpanded((prev) => !prev)}
                            sx={{ color: "#450001" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            component="img"
                            src={logo}
                            alt="Pulse Logo"
                            sx={{ height: 40 }}
                        />
                        {!isMobile && (
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                color="#450001"
                                ml={0}
                            >
                                Pulse
                            </Typography>
                        )}
                    </Box>

                    {/* Right Section */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar
                            src={userData.photoURL}
                            alt="User Avatar"
                            sx={{ width: 40, height: 40 }}
                        />
                        {!isMobile && (
                            <Box sx={{ lineHeight: 1 }}>
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    color="#450001"
                                    sx={{ m: 0, p: 0 }}
                                >
                                    {userData.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: "0.75rem", m: 0, p: 0 }}
                                >
                                    {userData.email}
                                </Typography>
                            </Box>
                        )}
                        <IconButton
                            onClick={handleAvatarClick}
                            sx={{ color: "#450001", p: 0 }}
                        >
                            <ArrowDropDownIcon />
                        </IconButton>

                        {/* Dropdown Menu */}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={handleLogout}>
                                <LogoutOutlinedIcon sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar + Main Content */}
            <Box sx={{ display: "flex" }}>
                <Box
                    sx={{ mt: "64px", position: "fixed", top: 0, zIndex: 1200 }}
                >
                    <Sidebar
                        role={role}
                        expanded={expanded}
                        onToggle={() => setExpanded((prev) => !prev)}
                    />
                </Box>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        mt: "64px",
                        ml: {
                            xs: 0,
                            md: expanded
                                ? `${SIDEBAR_WIDTH_EXPANDED}px`
                                : `${SIDEBAR_WIDTH_COLLAPSED}px`,
                        },
                        transition: "margin 0.3s ease-in-out",
                        backgroundColor: "#F9F9FC",
                        width: "100%",
                        minHeight: "calc(100vh - 64px)",
                    }}
                >
                    <AnimatePresence mode="wait">
                        <AppRoutes
                            location={location}
                            key={location.pathname}
                        />
                    </AnimatePresence>
                </Box>
            </Box>
        </>
    );
}
