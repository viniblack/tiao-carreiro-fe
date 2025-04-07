import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import musicAPI from "../services/musicAPI";

export function useMusics() {
  return useQuery({
    queryKey: ["musics"],
    queryFn: musicAPI.getMusics,
  });
}

export function useCreateMusic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: musicAPI.createMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["musics"] });
    },
  });
}