import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import musicAPI from "../services/musicAPI";

// Consulta para pegar as músicas
export function useMusics() {
  return useQuery({
    queryKey: ["musics"],
    queryFn: musicAPI.getMusics,
  });
}

// Mutação para enviar música
export function useCreateMusic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: musicAPI.createMusic,
    onSuccess: () => {
      // Atualiza o cache das músicas após criar
      queryClient.invalidateQueries({ queryKey: ["musics"] });
    },
  });
}