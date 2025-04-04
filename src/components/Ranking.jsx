import { Box, Paper, Typography } from "@mui/material";

export default function Suggest() {
  return (
    <Box sx={{ width: "100%", maxWidth: "800px" }}>
      <Typography
        variant="h6"
        component="h3"
        sx={{ color: "#8B4513", fontWeight: "bold", paddingBottom: "1rem" }}
      >
        Ranking Atual
      </Typography>

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
          1
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography
            component="span"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              fontWeight: "bold",
              mb: "0.2rem",
              "&:hover": {
                color: "#8B4513",
              },
            }}
          >
            O Mineiro e o Italiano
          </Typography>
          <Typography
            component="span"
            sx={{ color: "#666", fontSize: "0.9rem" }}
          >
            47.7M visualizações
          </Typography>
        </Box>
        <Box
          component="img"
          src="https://img.youtube.com/vi/lkQaLTnmNFw/hqdefault.jpg"
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
    </Box>
  );
}
