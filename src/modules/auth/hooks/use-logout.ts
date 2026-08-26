"use client";

import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/modules/auth/api/auth.api";

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}