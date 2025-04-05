import "./App.css";
import Header from "./components/Header";
import Suggest from "./components/Suggest";
import Ranking from "./components/Ranking";

import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import musicAPI from "./services/musicAPI";

export default function App() {
  const {
    data: rankingData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["musics"],
    queryFn: musicAPI.getMusics,
  });

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "2rem 1rem",
          flexDirection: "column",
        }}
      >
        <Suggest />
        {isLoading ? (
          <p>Carregando músicas...</p>
        ) : error ? (
          <p>Erro ao carregar o ranking 😢</p>
        ) : (
          <Ranking rankingData={rankingData} />
        )}
      </Box>
    </>
  );
}
