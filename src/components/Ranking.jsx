import { Box, Paper, Typography } from "@mui/material";

export default function Ranking({ rankingData }) {
  const musicList = rankingData?.musics || [];

  function formatViews(numero) {
    switch (true) {
      case numero >= 1_000_000_000:
        return (numero / 1_000_000_000).toFixed(1).replace(".", ",") + "B";
      case numero >= 1_000_000:
        return (numero / 1_000_000).toFixed(1).replace(".", ",") + "M";
      case numero >= 1_000:
        return (numero / 1_000).toFixed(1).replace(".", ",") + "K";
      default:
        return numero.toString();
    }
  }

  const MusicCard = (music, index) => (
    <a
      key={music.id}
      href={`https://www.youtube.com/watch?v=${music.youtube_id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: { xs: "1rem", md: "1.5rem" },
          flexWrap: { xs: "wrap", sm: "nowrap" },
          mb: "1rem",
          display: "flex",
          alignItems: "center",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <Typography
          component="h4"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" },
            color: "#8B4513",
            fontWeight: "bold",
            paddingRight: "3rem",
            minWidth: { xs: "30px", sm: "40px" },
          }}
        >
          {index + 1}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography
            component="span"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              fontWeight: "bold",
              cursor: "pointer",
              mb: "0.2rem",
              "&:hover": {
                color: "#8B4513",
              },
            }}
          >
            {music.title}
          </Typography>
          <Typography
            component="span"
            sx={{ color: "#666", fontSize: "0.9rem" }}
          >
            {formatViews(music.views)} visualizações
          </Typography>
        </Box>
        <Box
          component="img"
          src={music.thumb}
          alt="Thumbnail"
          sx={{
            width: { xs: "100%", sm: "120px" },
            height: { xs: "auto", sm: "68px" },
            borderRadius: 1,
            ml: { xs: 0, sm: "1rem" },
            mt: { xs: "1rem", sm: 0 },
            objectFit: "cover",
          }}
        />
      </Paper>
    </a>
  );

  const EmptyState = () => (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: { xs: "1rem", md: "1.5rem" },
        flexWrap: { xs: "wrap", sm: "nowrap" },
        mb: "1rem",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "3rem",
            color: "#666",
            textAlign: "center",
            mb: ".5rem",
          }}
        >
          🎵
        </Box>
        <Typography
          component="span"
          sx={{ color: "#666", fontSize: "1.1rem", mb: "1.3rem" }}
        >
          Nenhuma música cadastrada ainda
        </Typography>
        <Typography
          component="span"
          sx={{ color: "#666", fontSize: "0.9rem", mb: "1rem" }}
        >
          Seja o primeiro a sugerir uma música usando o formulário acima!
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ width: "100%", maxWidth: "800px" }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ color: "#8B4513", fontWeight: "bold", paddingBottom: "1rem" }}
      >
        Ranking Atual
      </Typography>

      {musicList.length > 0
        ? musicList.map((music, index) => MusicCard(music, index))
        : EmptyState()}
    </Box>
  );
}
