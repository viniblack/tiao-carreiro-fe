import "./App.css";
import Header from "./components/Header";
import Suggest from "./components/Suggest";
import Ranking from "./components/Ranking";

import { Box } from "@mui/material";

function App() {
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
        <Ranking />
      </Box>
    </>
  );
}

export default App;
