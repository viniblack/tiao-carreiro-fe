import tiao from "../assets/tiao-carreiro-pardinho.png";
import background from "../assets/background.jpg";
import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        color: "white",
        textAlign: "center",
        px: 4,
        py: { xs: 6, sm: 8 },
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradiente Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(139,69,19,0.9), rgba(210,105,30,0.85))",
          zIndex: 1,
        }}
      />

      {/* Conteúdo */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Box
          component="img"
          src={tiao}
          alt="Tião e Pardinho"
          sx={{
            width: { xs: 150, md: 200 },
            height: { xs: 150, md: 200 },
            borderRadius: "50%",
            margin: "0 auto 2rem",
            display: "block",
            border: "4px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: "2em",
            fontWeight: "bold",
            mb: "0.5rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Top 5 Músicas Mais Tocadas
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: "1.5em",
            fontWeight: "bold",
            mt: 0,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Tião Carreiro & Pardinho
        </Typography>
      </Box>
    </Box>
  );
}
