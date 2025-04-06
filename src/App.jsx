import "./App.css";
import Header from "./components/Header";
import Suggest from "./components/Suggest";
import Ranking from "./components/Ranking";

import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import musicAPI from "./services/musicAPI";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: rankingData = {
      data: [],
      pagination: { currentPage: 1, totalPages: 1 },
    },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["musics", currentPage],
    queryFn: () => musicAPI.getMusics(currentPage),
    keepPreviousData: true,
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
          <Ranking
            rankingData={rankingData}
            currentPage={rankingData.pagination.currentPage}
            perPage={rankingData.pagination.perPage}
          />
        )}
      </Box>
      {rankingData.pagination?.totalPages &&
        rankingData.pagination?.currentPage && (
          <Box
            sx={{ display: "flex", justifyContent: "center", marginY: "2rem" }}
          >
            <Stack spacing={2}>
              <Pagination
                count={rankingData.pagination.totalPages}
                page={rankingData.pagination.currentPage}
                onChange={(e, page) => setCurrentPage(page)}
                shape="rounded"
              />
            </Stack>
          </Box>
        )}
    </>
  );
}
