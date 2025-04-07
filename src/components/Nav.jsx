import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { token, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(to right, rgba(139,69,19,0.9), rgba(210,105,30,0.85))",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {userInfo?.user.role === "admin" && (
            <Button color="inherit" component={Link} to="/admin">
              Admin
            </Button>
          )}

          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
