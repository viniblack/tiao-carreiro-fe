import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function Suggest() {
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

      <Box component="form" noValidate autoComplete="off">
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2, // ou 4
                fontSize: "1rem",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
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
            Enviar Link
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
