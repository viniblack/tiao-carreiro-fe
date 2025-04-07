import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  TextField,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import musicAPI from "../services/musicAPI";
import adminAPI from "../services/adminAPI";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function AdminPanel() {
  const [currentPageSuggestions, setCurrentPageSuggestions] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);

  const [editOpen, setEditOpen] = useState(false);
  const [editingMusic, setEditingMusic] = useState(null);
  const [editedUrl, setEditedUrl] = useState("");

  const [newUrl, setNewUrl] = useState("");
  const queryClient = useQueryClient();

  const {
    data: musicApproval = {
      musics: [],
      pagination: { currentPage: 1, totalPages: 1, totalMusics: 0 },
    },
  } = useQuery({
    queryKey: ["musicApproval", currentPageSuggestions],
    queryFn: () => adminAPI.getApprove(currentPageSuggestions),
    keepPreviousData: true,
  });

  const {
    data: musicsData = {
      musics: [],
      pagination: { currentPage: 1, totalPages: 1, totalMusics: 0 },
    },
  } = useQuery({
    queryKey: ["musics", currentPageApproved],
    queryFn: () => musicAPI.getMusics(currentPageApproved),
    keepPreviousData: true,
  });

  const handleApprove = async (id) => {
    try {
      await adminAPI.approving(id);

      queryClient.invalidateQueries(["musicApproval"]);
    } catch (error) {
      console.error("Erro ao aprovar música:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminAPI.rejecting(id);
      queryClient.invalidateQueries(["musicApproval"]);
    } catch (error) {
      console.error("Erro ao rejeitar música:", error);
    }
  };

  const handleAdd = async () => {
    if (!newUrl) {
      alert("Cole o link do YouTube antes de adicionar.");
      return;
    }

    mutation.mutate({ youtube_url: newUrl });
  };

  const mutation = useMutation({
    mutationFn: (newMusic) => adminAPI.createMusicAdmin(newMusic),
    onSuccess: () => {
      queryClient.invalidateQueries(["musics"]);
      alert("Música adicionada com sucesso!");
      setNewUrl("");
    },
    onError: () => {
      alert("Erro ao adicionar música.");
    },
  });

  const openEditModal = (music) => {
    setEditingMusic(music);
    setEditedUrl(music.youtube_url || "");
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setEditingMusic(null);
    setEditedUrl("");
  };

  const editMutation = useMutation({
    mutationFn: ({ id, url }) => adminAPI.editMusic(id, { youtube_url: url }),
    onSuccess: () => {
      queryClient.invalidateQueries(["musics"]);
      alert("Link atualizado com sucesso!");
      closeEditModal();
    },
    onError: () => {
      alert("Erro ao atualizar música.");
    },
  });
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Painel de Administração
      </Typography>

      {/* SUGESTÕES */}
      <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Sugestões Pendentes
        </Typography>
        {musicApproval.message === "No musics to approve" ? (
          <Typography>Nenhuma sugestão pendente.</Typography>
        ) : (
          <>
            {musicApproval.musics?.map((suggestion) => (
              <Box key={suggestion.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Typography sx={{ maxWidth: "80%" }}>
                    {suggestion.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(suggestion.id)}
                      size="small"
                    >
                      Aprovar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(suggestion.id)}
                      size="small"
                    >
                      Reprovar
                    </Button>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}

            {musicApproval?.pagination?.totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={musicApproval.pagination.totalPages}
                    page={musicApproval.pagination.currentPage}
                    onChange={(e, page) => setCurrentPageSuggestions(page)}
                    shape="rounded"
                  />
                </Stack>
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* MÚSICAS APROVADAS */}
      <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Músicas Aprovadas
        </Typography>

        {/* Adicionar nova */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            label="Adicionar nova música (URL)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            disabled={mutation.isLoading}
            sx={{
              backgroundColor: "#8B4513",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            {mutation.isLoading ? "Adicionando..." : "Adicionar"}
          </Button>
        </Box>

        {musicsData.pagination.totalMusics === 0 ? (
          <Typography>Nenhuma música cadastrada.</Typography>
        ) : (
          <>
            {musicsData.musics?.map((music) => (
              <Box key={music.id}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Typography sx={{ maxWidth: "80%" }}>
                    {music.title}
                  </Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => openEditModal(music)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(music.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}

            {musicsData?.pagination?.totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={musicsData.pagination.totalPages}
                    page={musicsData.pagination.currentPage}
                    onChange={(e, page) => setCurrentPageApproved(page)}
                    shape="rounded"
                  />
                </Stack>
              </Box>
            )}
          </>
        )}
      </Paper>

      {editOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={closeEditModal}
        >
          <Paper
            sx={{
              p: 4,
              minWidth: "300px",
              maxWidth: "500px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6" gutterBottom>
              Editar URL da música
            </Typography>
            <TextField
              fullWidth
              label="URL do YouTube"
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button onClick={closeEditModal}>Cancelar</Button>
              <Button
                variant="contained"
                onClick={() =>
                  editMutation.mutate({ id: editingMusic.id, url: editedUrl })
                }
              >
                Salvar
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
