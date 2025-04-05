import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import musicAPI from "../services/musicAPI";

export default function Suggest() {
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newMusic) => musicAPI.createMusic(newMusic),
    onSuccess: () => {
      queryClient.invalidateQueries(["musics"]);
      alert("Música enviada com sucesso!");
      setUrl("");
    },
    onError: () => {
      alert("Erro ao enviar música.");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!url) {
      alert("Por favor, cole um link do YouTube.");
      return;
    }

    mutation.mutate({ youtube_url: url });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "2rem",
        marginBottom: "2rem",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{ color: "#8B4513", fontWeight: "bold", paddingBottom: "1rem" }}
      >
        Sugerir Nova Música
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            mb: "1rem",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            id="youtube-link"
            name="url"
            label="Cole aqui o link do Youtube"
            variant="outlined"
            size="small"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: "1rem",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isLoading}
            sx={{
              backgroundColor: "#8B4513",
              color: "white",
              width: { xs: "100%", sm: "25%" },
              padding: "0.6rem 0",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.2s",
              textTransform: "capitalize",
            }}
          >
            {mutation.isLoading ? "Enviando..." : "Enviar Link"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
