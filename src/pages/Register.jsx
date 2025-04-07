import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import authAPI from "../services/authAPI";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const res = await authAPI.register(form);
      login(res.token);
      alert("Registrado com sucesso!");
      navigate("/");
    } catch (err) {
      alert("Erro no registro");
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            label="Nome"
            name="name"
            fullWidth
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            required
            label="Email"
            name="email"
            fullWidth
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            required
            label="Senha"
            name="password"
            type="password"
            fullWidth
            margin="dense"
            onChange={handleChange}
          />
          <TextField
            label="Confirmar Senha"
            name="password_confirmation"
            type="password"
            fullWidth
            margin="dense"
            onChange={handleChange}
          />
          <FormControl sx={{ marginTop: 1 }} fullWidth>
            <InputLabel id="role-select-label">Função</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              name="role"
              value={form.role}
              label="Função"
              onChange={handleChange}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"member"}>Member</MenuItem>
            </Select>
          </FormControl>
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginTop: 1 }}
              align="center"
            >
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Registrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
