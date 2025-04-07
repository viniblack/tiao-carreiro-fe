import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link as ULink,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authAPI from "../services/authAPI";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.login(form);
      login(res.token);
      alert("Login realizado com sucesso");
      navigate("/");
    } catch (err) {
      alert("Erro ao logar");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <ULink
            component={Link}
            to="/register"
            underline="hover"
            sx={{ display: "block", textAlign: "end", mt: 1 }}
          >
            Cadastrar-se
          </ULink>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
