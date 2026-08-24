import { RegisterInput } from "@/modules/auth/auth.validation";
import { LoginInput } from "@/modules/auth/auth.validation";
export async function registerUser(data: RegisterInput) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}
export async function loginUser(data: LoginInput) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }); 

  const result = await response.json(); 

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}