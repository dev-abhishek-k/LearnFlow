import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/modules/auth/api/auth.api";


export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}