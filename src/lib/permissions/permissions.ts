import { Role } from "@/generated/prisma/enums";

export function hasPermission(
  userRole: Role,
  allowedRoles: Role[],
): boolean {
  return allowedRoles.includes(userRole);
}