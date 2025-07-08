
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Breadcrumbs,
  Link,
  Avatar,
  IconButton,
  Divider,
  Button,
  TextField,
  MenuItem,
  Modal,
  Chip,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { db } from "../../firebase";
import { get as dbGet, onValue, ref as dbRef, remove, update } from "firebase/database";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function SuperAdminManageUsers() {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    if (location.pathname.includes("SuperAdminAddUser")) return 1;
    if (location.pathname.includes("SuperAdminAccountRecovery")) return 2;
    return 0;
  };

  const [tabValue, setTabValue] = useState(getCurrentTab());
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState("");

  const tabLabels = ["Manage User", "Add User", "Account Recovery"];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) navigate("/super_admin/SuperAdminManageUsers", { replace: true });
    if (newValue === 1) navigate("/super_admin/SuperAdminAddUser", { replace: true });
    if (newValue === 2) navigate("/super_admin/SuperAdminAccountRecovery", { replace: true });
  };

  const handleDeleteUser = (uid) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      remove(dbRef(db, `users/${uid}`)).catch((error) => console.error("Error deleting user:", error));
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setEditOpen(true);
  };

 const handleEditSave = async () => {
  if (!formData?.uid) return;

  try {
    const res = await fetch("http://localhost:4000/update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: formData.uid,
        email: formData.email,
        name: formData.name,
        role: formData.role,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("User updated in Authentication & Database.");
      setEditOpen(false);
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to connect to update service.");
  }
};


  useEffect(() => {
    const usersRef = dbRef(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedUsers = Object.entries(data).map(([uid, userData]) => ({ uid, ...userData }));
        setUsers(loadedUsers);
      } else {
        setUsers([]);
      }
    });

    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userRef = dbRef(db, `users/${uid}`);
      dbGet(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          setCurrentUserRole(snapshot.val().role);
        }
      });
    }
  }, []);

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)", p: 2 }}>
      <Box sx={{ width: 340, minWidth: 300, backgroundColor: "#fff", borderRight: "1px solid #eee" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="semi-bold" color="#450001" ml={2} mt={1}>User Management</Typography>
          <Typography variant="caption" color="text.secondary" ml={2}>Manage users, roles and access</Typography>
        </Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="vertical"
          sx={{
            "& .MuiTab-root": {
              justifyContent: "flex-start",
              gap: 2,
              px: 3,
              alignItems: "center",
              color: "#8E0000",
              textTransform: "none",
              fontSize: "0.99rem",
              borderRadius: 2,
            },
            "& .Mui-selected": {
              bgcolor: "#F5F5F5",
              color: "#8E0000",
              fontWeight: "bold",
            },
            "& .MuiTab-wrapper": { flexDirection: "row", justifyContent: "flex-start" },
          }}
        >
          <Tab icon={<ManageAccountsOutlinedIcon />} iconPosition="start" label="Manage User" />
          <Tab icon={<PersonAddAltOutlinedIcon />} iconPosition="start" label="Add User" />
          <Tab icon={<AdminPanelSettingsOutlinedIcon />} iconPosition="start" label="Account Recovery" />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="#">User Management</Link>
          <Typography color="text.primary">{tabLabels[tabValue]}</Typography>
        </Breadcrumbs>

        {tabValue === 0 && (
          <>
            {users.length === 0 ? (
              <Typography sx={{ mx: 2 }}>No users found in Firebase.</Typography>
            ) : (
              <Grid container spacing={2}>
                {users
                  .filter((user) => {
                    if (currentUserRole === "super_admin") return true;
                    if (currentUserRole === "admin") return user.role === "teacher" || user.role === "student";
                    return false;
                  })
                  .map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.uid} sx={{ display: "flex" }}>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          border: "2px solid #fff",
                          height: "100%",
                          width: "100%",
                          minWidth: 360,
                        }}
                      >
                        <Box display="flex" gap={2} mb={1} alignItems="center">
                          <Avatar src={user.photoURL} alt={user.name} sx={{ width: 56, height: 56 }} />
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">{user.name}</Typography>
                            <Typography variant="body2">{user.email}</Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2"><strong>ID:</strong> {user.uid || "N/A"}</Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2"><strong>Role:</strong></Typography>
                          <Chip
                            label={user.role}
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              backgroundColor:
                                user.role === "super_admin" ? "#660200" :
                                user.role === "admin" ? "#C12923" :
                                user.role === "teacher" ? "#1976d2" : "#2e7d32",
                              color: "#fff"
                            }}
                          />
                        </Box>
                        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                          {(currentUserRole === "super_admin" && user.role === "admin") ||
                            (currentUserRole === "admin" && (user.role === "teacher" || user.role === "student")) ? (
                            <>
                              <IconButton color="success" onClick={() => handleEditClick(user)}><EditIcon /></IconButton>
                              <IconButton color="error" onClick={() => handleDeleteUser(user.uid)}><DeleteIcon /></IconButton>
                            </>
                          ) : (
                            <Chip label="Read Only" size="small" />
                          )}
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            )}

            <Modal open={editOpen} onClose={() => setEditOpen(false)}>
              <Box sx={{
                position: "absolute",
                top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                bgcolor: "#fff", borderRadius: 3, boxShadow: 24, p: 4,
                width: "90%", maxWidth: 500, display: "flex", flexDirection: "column", gap: 2,
              }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="bold" color="#450001">Edit User</Typography>
                  <IconButton onClick={() => setEditOpen(false)}><CloseIcon /></IconButton>
                </Box>
                <Divider />
                <TextField label="Name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth />
                <TextField label="Email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} fullWidth />
                <TextField
                  select
                  label="Role"
                  name="role"
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  fullWidth
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                </TextField>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="outlined" onClick={() => setEditOpen(false)}>Cancel</Button>
                  <Button variant="contained" color="primary" onClick={handleEditSave}>Save</Button>
                </Box>
              </Box>
            </Modal>
          </>
        )}

        {tabValue === 1 && <Typography color="text.secondary">Redirecting to Add User Page...</Typography>}
        {tabValue === 2 && <Typography color="text.secondary">[Password Reset Placeholder]</Typography>}
      </Box>
    </Box>
  );
}
